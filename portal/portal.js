/* Schüler-Portal – Oberfläche (reines JavaScript, keine Fremdbibliotheken).
   - Anmeldung einmal (Benutzername + Code), Sitzung bleibt auf dem Gerät (localStorage), Abmelden-Knopf.
   - Menü nur mit den Seiten der eigenen Klasse; Klassenpasswörter kommen erst nach dem Login vom Server (als StatiCrypt-Schlüssel)
     und werden in den "Angemeldet bleiben"-Speicher der jeweiligen Seite geschrieben (tfgs_sc_<ordner>) – die Schüler tippen sie nie.
   - Lehrer (Superuser): alle Klassen/Seiten, Freigaben für Tests, Sitzungen widerrufen, Dashboard-Vorschau. */
(function () {
  "use strict";
  var LS = "tfgs_portal_v1", LSC = "tfgs_portal_cache", LSG = "tfgs_portal_gates";
  var API = window.PORTAL_API || "";
  var FACH = { mathe: "Mathe", informatik: "Informatik", klasse: "Klasse", privat: "Sonstiges" };
  var ART = { material: ["Material", "📘"], mission: ["Missionen", "🚀"], selbstlernen: ["Selbstlernen", "🧠"], karten: ["Karteikarten", "🗂️"], tool: ["Werkzeug", "🧮"], test: ["Test", "📝"] };
  var app = document.getElementById("app");
  var S = { sess: null, seiten: [], offline: false, tab: "menue", klasse: "", admin: null, dash: null, dashKlasse: "", dashSeite: "", busy: false };

  /* ---------- Hilfen ---------- */
  function h(tag, attrs) {
    var e = document.createElement(tag), a = attrs || {};
    Object.keys(a).forEach(function (k) {
      var v = a[k]; if (v == null || v === false) return;
      if (k === "class") e.className = v; else if (k === "text") e.textContent = v;
      else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), v); else e.setAttribute(k, v === true ? "" : v);
    });
    (function add(list) { for (var i = 0; i < list.length; i++) { var c = list[i]; if (c == null || c === false) continue;
      if (Array.isArray(c)) add(c); else e.appendChild(c.nodeType ? c : document.createTextNode(String(c))); } })(Array.prototype.slice.call(arguments, 2));
    return e;
  }
  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function okFolder(o) { return /^[a-z0-9][a-z0-9\-]*$/.test(String(o)); }
  function fachKey(f) { f = String(f || "").toLowerCase(); return FACH[f] ? f : "privat"; }
  function api(body) {
    if (!API) return Promise.resolve({ ok: false, error: "Das Portal ist noch nicht eingerichtet." });
    var ctl = window.AbortController ? new AbortController() : null, t = ctl && setTimeout(function () { ctl.abort(); }, 25000);
    return fetch(API, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body), signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.json(); }).then(function (j) { if (t) clearTimeout(t); return j; })
      .catch(function () { if (t) clearTimeout(t); return { ok: false, network: true, error: "Keine Verbindung. Bitte Internet prüfen." }; });
  }

  /* ---------- Klassenpasswort-Schlüssel der Seiten (StatiCrypt "Angemeldet bleiben") ---------- */
  function gateKeyName(o) { return "tfgs_sc_" + o; }
  function applyGates(seiten) {
    var old = lsGet(LSG) || {}, now = {};
    seiten.forEach(function (s) {
      if (!s.gate || !okFolder(s.ordner)) return;
      try { localStorage.setItem(gateKeyName(s.ordner), s.gate); now[s.ordner] = s.gate; } catch (e) {}
    });
    Object.keys(old).forEach(function (o) {   // nicht mehr sichtbare Seiten: nur entfernen, wenn der Schlüssel vom Portal stammt
      if (!now[o] && okFolder(o)) { try { if (localStorage.getItem(gateKeyName(o)) === old[o]) localStorage.removeItem(gateKeyName(o)); } catch (e) {} }
    });
    lsSet(LSG, now);
  }
  function clearGates() {
    var old = lsGet(LSG) || {};
    Object.keys(old).forEach(function (o) { if (!okFolder(o)) return; try { if (localStorage.getItem(gateKeyName(o)) === old[o]) localStorage.removeItem(gateKeyName(o)); } catch (e) {} });
    lsDel(LSG);
  }

  /* ---------- Sitzung ---------- */
  function takePayload(p) {
    S.sess = { token: (p.token || (S.sess && S.sess.token)), benutzer: p.profil.benutzer, name: p.profil.name, klasse: p.profil.klasse, rolle: p.profil.rolle };
    S.seiten = p.seiten || []; S.offline = false;
    S.gates = {}; S.seiten.forEach(function (x) { if (x.gate && okFolder(x.ordner)) S.gates[x.ordner] = x.gate; });
    applyGates(S.seiten);
    lsSet(LS, S.sess);
    lsSet(LSC, { seiten: S.seiten.map(function (s) { var c = {}; Object.keys(s).forEach(function (k) { if (k !== "gate") c[k] = s[k]; }); return c; }) });
  }
  function dropSession(msg) {
    clearGates(); lsDel(LS); lsDel(LSC); S.sess = null; S.seiten = []; S.admin = null; S.dash = null; S.tab = "menue"; S.klasse = "";
    renderLogin(msg || "");
  }
  function logout() {
    var tok = S.sess && S.sess.token; if (tok) api({ action: "logout", token: tok });   // best effort
    dropSession("Du bist abgemeldet.");
  }
  function boot() {
    var s = lsGet(LS), c = lsGet(LSC);
    if (!s || !s.token) return renderLogin("");
    S.sess = s;
    if (c && c.seiten) { S.seiten = c.seiten; render(); }
    refresh();
  }
  function refresh() {
    if (!S.sess) return;
    api({ action: "sitzung", token: S.sess.token }).then(function (r) {
      if (r.ok) { takePayload(r); render(); }
      else if (r.relogin) dropSession("Bitte melde dich neu an.");
      else if (r.network) { S.offline = true; if (lsGet(LSC)) render(); else renderLogin(r.error); }
      else { S.offline = true; render(); }
    });
  }
  document.addEventListener("visibilitychange", function () { if (!document.hidden && S.sess && Date.now() - (S.last || 0) > 300000) { S.last = Date.now(); refresh(); } });

  /* ---------- Ansichten ---------- */
  function renderLogin(msg) {
    var user = h("input", { id: "u", type: "text", autocomplete: "username", autocapitalize: "none", autocorrect: "off", spellcheck: "false", required: true });
    var code = h("input", { id: "c", type: "password", autocomplete: "current-password", autocapitalize: "none", autocorrect: "off", spellcheck: "false", required: true });
    var err = h("div", { class: "err", role: "alert", text: msg || "" });
    var btn = h("button", { class: "btn", type: "submit", text: "Anmelden" });
    var form = h("form", { class: "glass login", onsubmit: function (e) {
      e.preventDefault(); if (!user.value.trim() || !code.value.trim()) return;
      btn.disabled = true; err.textContent = "";
      api({ action: "login", user: user.value.trim(), code: code.value, geraet: (navigator.userAgent || "").replace(/\(.*?\)/g, "").slice(0, 50) }).then(function (r) {
        if (r.ok) { takePayload(r); S.tab = "menue"; render(); }
        else { btn.disabled = false; err.textContent = r.error || "Anmeldung fehlgeschlagen."; code.value = ""; code.focus(); }
      });
    } },
      h("div", { class: "logo", text: "🎓" }), h("h1", { text: "Unterricht" }),
      h("p", { class: "sub muted", text: "Melde dich einmal an. Danach bleibst du auf diesem Gerät angemeldet." }),
      h("label", { class: "field" }, h("span", { text: "Benutzername" }), user),
      h("label", { class: "field" }, h("span", { text: "Code" }), code),
      btn, err,
      h("p", { class: "note", text: "Benutzername und Code stehen auf deinem Zettel von Herrn Kurlavičius. Auf fremden Geräten bitte danach abmelden." }));
    app.replaceChildren(form); user.focus();
  }

  function card(s) {
    var f = fachKey(s.fach), isTest = s.art === "test", a = ART[s.art] || ART.material;
    var tags = h("div", { class: "tags" }, h("span", { class: "tag" + (isTest ? " test" : ""), text: a[0] }), s.eigenerLogin && h("span", { class: "tag lg", text: "eigener Login" }));
    var link = h("a", { class: "card glass", href: okFolder(s.ordner) ? "../" + s.ordner + "/" : "#" ,
      onclick: function () { if (S.gates && S.gates[s.ordner]) { try { localStorage.setItem(gateKeyName(s.ordner), S.gates[s.ordner]); } catch (e) {} } } },
      h("div", { class: "ico " + (isTest ? "test" : f), text: a[1], "aria-hidden": "true" }),
      h("div", {}, h("div", { class: "t", text: s.titel }), s.untertitel && h("div", { class: "s", text: s.untertitel }), tags),
      h("div", { class: "chev", text: "›", "aria-hidden": "true" }));
    return link;
  }
  function groups(list) {
    var by = {}, order = [];
    list.forEach(function (s) { var f = fachKey(s.fach); if (!by[f]) { by[f] = []; order.push(f); } by[f].push(s); });
    var box = h("div", {});
    var tests = list.filter(function (s) { return s.art === "test"; });
    order.forEach(function (f) {
      var items = by[f].filter(function (s) { return s.art !== "test"; }); if (!items.length) return;
      box.appendChild(h("h2", { text: FACH[f] })); box.appendChild(h("div", { class: "list" }, items.map(card)));
    });
    if (tests.length) { box.appendChild(h("h2", { text: "Tests – vom Lehrer freigegeben" })); box.appendChild(h("div", { class: "list" }, tests.map(card))); }
    if (!list.length) box.appendChild(h("div", { class: "glass empty" }, h("p", { class: "muted", text: "Für dich sind gerade keine Seiten freigeschaltet." })));
    return box;
  }
  function header() {
    var s = S.sess, lehrer = s.rolle === "lehrer";
    return h("div", { class: "top" },
      h("div", {}, h("div", { class: "hello" }, "Hallo" + (s.name ? ", " + s.name.split(" ")[0] : ""), !lehrer && s.klasse && h("span", { class: "chip", text: s.klasse }), lehrer && h("span", { class: "chip", text: "Lehrkraft" })), h("h1", { text: lehrer ? "Alle Klassen" : "Meine Seiten" })),
      h("button", { class: "btn ghost", onclick: logout, "aria-label": "Abmelden", text: "Abmelden" }));
  }
  function render() {
    if (!S.sess) return renderLogin("");
    var kids = [header()];
    if (S.offline) kids.push(h("div", { class: "banner", text: "Offline – Anzeige vom letzten Mal. Zum Öffnen der Seiten brauchst du Internet." }));
    if (S.sess.rolle === "lehrer") kids.push(teacherTabs()); else kids.push(groups(S.seiten));
    app.replaceChildren.apply(app, kids);
  }

  /* ---------- Lehrer ---------- */
  function teacherTabs() {
    var tabs = [["menue", "Seiten"], ["freigaben", "Freigaben"], ["konten", "Sitzungen"], ["dash", "Dashboard"]];
    var bar = h("div", { class: "tabs glass", role: "tablist" }, tabs.map(function (t) {
      return h("button", { role: "tab", "aria-selected": S.tab === t[0] ? "true" : "false", text: t[1], onclick: function () { S.tab = t[0]; if (t[0] === "freigaben" || t[0] === "konten") loadAdmin(); if (t[0] === "dash") loadDash(); render(); } });
    }));
    var body = h("div", {});
    if (S.tab === "menue") body = teacherMenu(); else if (S.tab === "freigaben") body = teacherFreigaben(); else if (S.tab === "konten") body = teacherKonten(); else body = teacherDash();
    return h("div", {}, bar, body);
  }
  function classChips(cur, onpick, all) {
    var ks = (S.admin && Object.keys(S.admin.klassen)) || []; var seen = {}; ks.forEach(function (k) { seen[k] = 1; });
    S.seiten.forEach(function (s) { (s.klassen || []).forEach(function (k) { if (k !== "*") seen[k] = 1; }); });
    var names = Object.keys(seen).sort(function (a, b) { return parseInt(a) - parseInt(b) || (a < b ? -1 : 1); });
    return h("div", { class: "chips" }, [""].concat(names).map(function (k) { return h("button", { "aria-pressed": cur === k ? "true" : "false", text: k || all, onclick: function () { onpick(k); } }); }));
  }
  function teacherMenu() {
    var list = S.seiten.filter(function (s) { return !S.klasse || (s.klassen || []).indexOf(S.klasse) >= 0; });
    return h("div", {}, classChips(S.klasse, function (k) { S.klasse = k; render(); }, "Alle Klassen"), groupsTeacher(list));
  }
  function groupsTeacher(list) {   // Lehrer sehen Tests immer, gekennzeichnet
    var box = groups(list.filter(function (s) { return s.art !== "test"; })), tests = list.filter(function (s) { return s.art === "test"; });
    if (tests.length) { box.appendChild(h("h2", { text: "Tests (Schüler sehen sie nur nach Freigabe)" })); box.appendChild(h("div", { class: "list" }, tests.map(card))); }
    return box;
  }
  function loadAdmin() { api({ action: "admin_uebersicht", token: S.sess.token }).then(function (r) { if (r.ok) { S.admin = r; render(); } else if (r.relogin) dropSession("Bitte melde dich neu an."); }); }
  function teacherFreigaben() {
    if (!S.admin) return h("div", { class: "glass empty" }, h("p", { class: "muted", text: "Lade …" }));
    var dauer = h("select", { id: "dauer", "aria-label": "Dauer der Freigabe" }, h("option", { value: "0", text: "bis ich ausschalte" }), h("option", { value: "day", text: "nur heute" }), h("option", { value: "hour", text: "1 Stunde" }));
    var box = h("div", {}, h("div", { class: "row glass", style: "margin-top:12px;border-radius:18px" }, h("div", { class: "grow" }, h("div", { class: "t", text: "Dauer beim Einschalten" }), h("div", { class: "s", text: "Tests sind für Schüler standardmäßig unsichtbar." })), dauer));
    var tests = S.admin.seiten.filter(function (s) { return s.art === "test"; });
    var fr = {}; S.admin.freigaben.forEach(function (f) { fr[f.seite + "|" + f.klasse.toLowerCase()] = f; });
    tests.forEach(function (s) {
      var g = h("div", { class: "group glass" }, h("div", { class: "hd", text: s.titel }));
      (s.klassen || []).forEach(function (k) {
        var f = fr[s.key + "|" + k.toLowerCase()], on = !!(f && f.aktiv && !(f.bis && Date.now() > f.bis));
        var sw = h("button", { class: "sw", role: "switch", "aria-checked": on ? "true" : "false", "aria-label": s.titel + " für " + k, onclick: function () {
          var want = sw.getAttribute("aria-checked") !== "true", bis = 0, d = dauer.value;
          if (want && d === "hour") bis = Date.now() + 3600e3; if (want && d === "day") { var e = new Date(); e.setHours(23, 59, 59, 0); bis = e.getTime(); }
          sw.setAttribute("aria-checked", want ? "true" : "false");
          api({ action: "admin_freigabe", token: S.sess.token, seite: s.key, klasse: k, aktiv: want, bis: bis }).then(function (r) { if (!r.ok) sw.setAttribute("aria-checked", want ? "false" : "true"); else loadAdmin(); });
        } });
        g.appendChild(h("div", { class: "row" }, h("div", { class: "grow" }, h("div", { class: "t", text: "Klasse " + k }), !!(on && f.bis) && h("div", { class: "s", text: "bis " + new Date(f.bis).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" }) })), sw));
      });
      box.appendChild(g);
    });
    if (!tests.length) box.appendChild(h("div", { class: "glass empty" }, h("p", { class: "muted", text: "Keine Test-Seiten vorhanden." })));
    return box;
  }
  function teacherKonten() {
    if (!S.admin) return h("div", { class: "glass empty" }, h("p", { class: "muted", text: "Lade …" }));
    var box = h("div", {}, h("p", { class: "note", text: "Widerrufen beendet alle angemeldeten Geräte einer Person (verlorenes Handy). Mit dem Code kann sie sich danach wieder anmelden." }));
    var by = {}; S.admin.konten.forEach(function (k) { if (k.rolle === "lehrer") return; (by[k.klasse] = by[k.klasse] || []).push(k); });
    Object.keys(by).sort().forEach(function (kl) {
      var g = h("div", { class: "group glass" }, h("div", { class: "hd", text: "Klasse " + kl + " · " + by[kl].length + " Konten" }));
      by[kl].forEach(function (k) {
        g.appendChild(h("div", { class: "row" }, h("div", { class: "grow" }, h("div", { class: "t", text: k.name || k.benutzer }), h("div", { class: "s", text: k.sitzungen + " Gerät(e)" + (k.zuletzt ? " · zuletzt " + new Date(k.zuletzt).toLocaleDateString("de-DE") : "") + (k.aktiv ? "" : " · gesperrt") })),
          h("button", { class: "btn ghost small", disabled: k.sitzungen ? null : true, text: "Widerrufen", onclick: function () { api({ action: "admin_widerrufen", token: S.sess.token, benutzer: k.benutzer }).then(loadAdmin); } })));
      });
      box.appendChild(g);
    });
    box.appendChild(h("div", { style: "margin:14px 0" }, h("button", { class: "btn ghost", text: "Alle Schüler-Sitzungen beenden", onclick: function () { if (confirm("Wirklich alle Schüler auf allen Geräten abmelden?")) api({ action: "admin_widerrufen", token: S.sess.token, alle: true }).then(loadAdmin); } })));
    return box;
  }

  /* ---------- Dashboard (nur Platzhalter/Vorschau; Daten: admin_fortschritt, sonst Demo) ---------- */
  function loadDash() {
    api({ action: "admin_fortschritt", token: S.sess.token, klasse: S.dashKlasse, seite: S.dashSeite }).then(function (r) { if (r.ok) { S.dash = r; render(); } });
  }
  function demoData() {
    var th = [["informatik6-missionen", "M1", "Mission 1"], ["informatik6-missionen", "M2", "Mission 2"], ["informatik6-missionen", "M3", "Mission 3"], ["informatik6-missionen", "M4", "Mission 4"], ["mathe10-selbstlernen", "m1", "Modul 1"], ["mathe10-selbstlernen", "m2", "Modul 2"], ["mathe10-selbstlernen", "m3", "Modul 3"]];
    var sch = [], z = {}, seed = 7;
    function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    for (var i = 1; i <= 14; i++) { var id = "demo" + i; sch.push({ id: id, anzeige: "SuS " + (i < 10 ? "0" : "") + i, klasse: i % 2 ? "6a" : "10a" }); z[id] = {};
      th.forEach(function (t) { var fit = (t[0].indexOf("informatik") === 0) === (i % 2 === 1); if (!fit) return; var r = rnd(); if (r < .25) return; var w = Math.round(r * 100); z[id][t[0] + "|" + t[1]] = { wert: w, max: 100, status: w > 92 ? "fertig" : "begonnen" }; }); }
    return { demo: true, schueler: sch, themen: th.map(function (t) { return { seite: t[0], thema: t[1], label: t[2] }; }), zellen: z };
  }
  function cls(c) { if (!c) return "c0"; if (c.status === "fertig") return "c4"; var p = c.max ? 100 * c.wert / c.max : 0; return p >= 66 ? "c3" : p >= 33 ? "c2" : "c1"; }
  function teacherDash() {
    var d = S.dash && S.dash.schueler && S.dash.schueler.length && S.dash.themen && S.dash.themen.length ? S.dash : demoData();
    var sch = d.schueler.filter(function (s) { return !S.dashKlasse || s.klasse === S.dashKlasse; });
    var th = d.themen.filter(function (t) { return !S.dashSeite || t.seite === S.dashSeite; });
    var started = 0, done = 0;
    sch.forEach(function (s) { var z = d.zellen[s.id] || {}, any = false, all = th.length > 0; th.forEach(function (t) { var c = z[t.seite + "|" + t.thema]; if (c) any = true; if (!c || c.status !== "fertig") all = false; }); if (any) started++; if (all) done++; });
    var sites = []; d.themen.forEach(function (t) { if (sites.indexOf(t.seite) < 0) sites.push(t.seite); });
    var klassen = []; d.schueler.forEach(function (s) { if (klassen.indexOf(s.klasse) < 0) klassen.push(s.klasse); });
    var tbl = h("table", {}, h("thead", {}, h("tr", {}, h("th", { class: "l", text: "Schüler" }), th.map(function (t) { return h("th", { text: t.label, title: t.seite }); }))),
      h("tbody", {}, sch.map(function (s) { var z = d.zellen[s.id] || {}; return h("tr", {}, h("th", { class: "l", text: s.anzeige }), th.map(function (t) { var c = z[t.seite + "|" + t.thema]; return h("td", { class: cls(c), text: c ? (c.status === "fertig" ? "✓" : (c.max ? Math.round(100 * c.wert / c.max) : "·")) : "–", title: c ? (c.status || "") : "nicht begonnen" }); })); })));
    return h("div", {},
      d.demo && h("div", { class: "banner", text: "Vorschau mit Demo-Daten (erfundene Namen). Echte Daten aus Missionen, Selbstlernen und neuen Seiten folgen in einer späteren Phase." }),
      h("div", { class: "chips" }, [""].concat(klassen).map(function (k) { return h("button", { "aria-pressed": S.dashKlasse === k ? "true" : "false", text: k || "Alle Klassen", onclick: function () { S.dashKlasse = k; if (!d.demo) loadDash(); render(); } }); })),
      h("div", { class: "chips" }, [""].concat(sites).map(function (k) { return h("button", { "aria-pressed": S.dashSeite === k ? "true" : "false", text: k || "Alle Themen", onclick: function () { S.dashSeite = k; if (!d.demo) loadDash(); render(); } }); })),
      h("div", { class: "tiles" },
        [[sch.length, "Schüler"], [started, "begonnen"], [done, "alles fertig"], [sch.length - started, "nicht begonnen"]].map(function (t) { return h("div", { class: "tile glass" }, h("b", { text: String(t[0]) }), h("span", { text: t[1] })); })),
      h("div", { class: "heat glass" }, tbl),
      h("div", { class: "legend" }, [["c0", "nicht begonnen"], ["c1", "< 33 %"], ["c2", "33–66 %"], ["c3", "> 66 %"], ["c4", "fertig"]].map(function (l) { return h("span", {}, h("i", { class: l[0] }), l[1]); })));
  }

  boot();
})();
