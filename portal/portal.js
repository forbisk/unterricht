/* Schüler-Portal – Oberfläche (reines JavaScript, keine Fremdbibliotheken).
   - Anmeldung einmal (Benutzername + Code), Sitzung bleibt auf dem Gerät (localStorage), Abmelden-Knopf.
   - Menü nur mit den Seiten der eigenen Klasse; Klassenpasswörter kommen erst nach dem Login vom Server (als StatiCrypt-Schlüssel)
     und werden in den "Angemeldet bleiben"-Speicher der jeweiligen Seite geschrieben (tfgs_sc_<ordner>) – die Schüler tippen sie nie.
   - Lehrer (Superuser): alle Klassen/Seiten, Freigaben für Tests, Sitzungen widerrufen, Fortschritts-Dashboard (echte Daten, nur Lehrer). */
(function () {
  "use strict";
  var LS = "tfgs_portal_v1", LSC = "tfgs_portal_cache", LSG = "tfgs_portal_gates";
  var API = window.PORTAL_API || "";
  var FACH = { mathe: "Mathe", informatik: "Informatik", klasse: "Klasse", privat: "Sonstiges" };
  var ART = { material: ["Material", "📘"], mission: ["Missionen", "🚀"], selbstlernen: ["Selbstlernen", "🧠"], karten: ["Karteikarten", "🗂️"], tool: ["Werkzeug", "🧮"], test: ["Test", "📝"] };
  var app = document.getElementById("app");
  var S = { sess: null, seiten: [], offline: false, tab: "menue", klasse: "", admin: null, dash: null, dashKlasse: "", dashSeite: "", dashSort: "name", dashDetail: "", dashLoading: false, dashErr: "", dashAt: 0, busy: false };

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
  /* Spalte "Gate-Key" im Blatt: entweder nur der Schlüssel der eigenen Seite, oder "schluessel;ordner=schluessel;…" (zusätzliche Ordner,
     die von dieser Seite aus verlinkt sind bzw. dasselbe Klassenpasswort haben). Nur 64 Hex-Zeichen und gültige Ordnernamen werden übernommen. */
  function parseGate(own, g) {
    var m = {}; String(g || "").split(";").forEach(function (p, i) {
      p = p.trim(); var e = p.indexOf("="), f = own, k = p;
      if (e > 0) { f = p.slice(0, e); k = p.slice(e + 1); } else if (i > 0) return;
      if (okFolder(f) && /^[0-9a-f]{64}$/.test(k) && !m[f]) m[f] = k;
    });
    return m;
  }
  function gatesOf(seiten) {
    var all = {};
    seiten.forEach(function (s) { if (!s.gate || !okFolder(s.ordner)) return; var m = parseGate(s.ordner, s.gate); Object.keys(m).forEach(function (f) { if (!all[f] || f === s.ordner) all[f] = m[f]; }); });
    return all;
  }
  function applyGates(all) {
    var old = lsGet(LSG) || {}, now = {};
    Object.keys(all).forEach(function (o) { try { localStorage.setItem(gateKeyName(o), all[o]); now[o] = all[o]; } catch (e) {} });
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
    S.gates = gatesOf(S.seiten);
    applyGates(S.gates);
    lsSet(LS, S.sess);
    lsSet(LSC, { seiten: S.seiten.map(function (s) { var c = {}; Object.keys(s).forEach(function (k) { if (k !== "gate") c[k] = s[k]; }); return c; }) });
  }
  function dropSession(msg) {
    clearGates(); lsDel(LS); lsDel(LSC); S.sess = null; S.seiten = []; S.admin = null; S.dash = null; S.dashDetail = ""; S.dashKlasse = ""; S.dashSeite = ""; S.tab = "menue"; S.klasse = "";
    renderLogin(msg || "");
  }
  function logout() {
    var tok = S.sess && S.sess.token; if (tok) api({ action: "logout", token: tok });   // best effort
    dropSession("Du bist abgemeldet.");
  }
  /* Rücksprung von einer verschlüsselten Seite: ?weiter=<ordner>/<datei> -> nach der Anmeldung dorthin (Schlüssel liegen dann schon im Speicher). */
  function weiterZiel() {
    var m = /[?&]weiter=([^&#]*)/.exec(location.search); if (!m) return "";
    var w; try { w = decodeURIComponent(m[1]); } catch (e) { return ""; }
    var p = /^([a-z0-9][a-z0-9\-]*)\/([A-Za-z0-9_\-]+(?:\.[A-Za-z0-9_\-]+)?)?$/.exec(w);
    return p && w.indexOf("..") < 0 ? "../" + w : "";
  }
  function gehWeiter() { var z = weiterZiel(); if (z) { try { history.replaceState(null, "", location.pathname); } catch (e) {} location.replace(z); return true; } return false; }
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
      if (r.ok) { takePayload(r); if (gehWeiter()) return; render(); }
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
        if (r.ok) { takePayload(r); S.tab = "menue"; if (gehWeiter()) return; render(); }
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
    app.className = (S.sess.rolle === "lehrer" && S.tab === "dash") ? "wide" : "";
    var kids = [header()];
    if (S.offline) kids.push(h("div", { class: "banner", text: "Offline – Anzeige vom letzten Mal. Zum Öffnen der Seiten brauchst du Internet." }));
    if (S.sess.rolle === "lehrer") kids.push(teacherTabs()); else kids.push(groups(S.seiten));
    app.replaceChildren.apply(app, kids);
  }

  /* ---------- Lehrer ---------- */
  function teacherTabs() {
    var tabs = [["menue", "Seiten"], ["freigaben", "Freigaben"], ["konten", "Sitzungen"], ["dash", "Dashboard"]];
    var bar = h("div", { class: "tabs glass", role: "tablist" }, tabs.map(function (t) {
      return h("button", { role: "tab", "aria-selected": S.tab === t[0] ? "true" : "false", text: t[1], onclick: function () { S.tab = t[0]; if (t[0] === "freigaben" || t[0] === "konten") loadAdmin(); if (t[0] === "dash") loadDash(false); render(); } });
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

  /* ---------- Dashboard (Lehrer): echte Daten aus admin_fortschritt (Portal + alte Backends, nur lesend) ---------- */
  var INFO = [["logins", "Anmeldungen"], ["aufgaben", "Aufgaben gelöst"], ["quote", "1. Versuch richtig (%)"], ["lernzeitMin", "Lernzeit (Min.)"], ["aufwaermen", "Aufwärmen gelöst"],
    ["training", "Training richtig"], ["pruefung", "Prüfungsaufgaben bearbeitet"], ["beispiele", "Beispiele angesehen"], ["zuletztSeite", "Zuletzt auf"]];
  function loadDash(frisch) {
    if (!S.sess || S.dashLoading) return;
    if (!frisch && S.dash && Date.now() - (S.dashAt || 0) < 60000) return;
    S.dashLoading = true; S.dashErr = ""; if (S.tab === "dash") render();
    api({ action: "admin_fortschritt", token: S.sess.token, frisch: !!frisch }).then(function (r) {
      S.dashLoading = false;
      if (r.ok) { S.dash = r; S.dashAt = Date.now(); S.dashErr = ""; }
      else if (r.relogin) return dropSession("Bitte melde dich neu an.");
      else S.dashErr = r.error || "Daten konnten nicht geladen werden.";
      if (S.tab === "dash") render();
    });
  }
  function ago(ms) {
    if (!ms) return "–"; var m = (Date.now() - ms) / 60000;
    if (m < 2) return "gerade eben"; if (m < 60) return "vor " + Math.round(m) + " Min."; var hh = m / 60; if (hh < 24) return "vor " + Math.round(hh) + " Std.";
    var dd = hh / 24; if (dd < 14) return "vor " + Math.round(dd) + " Tg."; return new Date(ms).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "2-digit" });
  }
  function fdt(ms) { return ms ? new Date(ms).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" }) : "–"; }
  function r1(n) { return String(Math.round(n * 10) / 10).replace(".", ","); }
  function cls(c) {
    if (!c) return "c0"; var p = c.pct;
    if (c.skala === "pct" && p != null) return p >= 85 ? "c4" : p >= 66 ? "c3" : p >= 33 ? "c2" : "c1";
    if (c.status === "fertig") return "c4"; if (c.zwischenstand) return "cz";
    return p == null ? (c.wert != null ? "cn" : "c1") : p >= 66 ? "c3" : p >= 33 ? "c2" : "c1";
  }
  function ctext(c) {
    if (!c) return "–"; if (c.skala === "pct") return c.pct != null ? String(Math.round(c.pct)) : "·";
    if (c.status === "fertig") return "✓"; if (c.pct != null) return String(Math.round(c.pct)); return c.wert != null ? String(c.wert) : "·";
  }
  function cdesc(c) {   // Klartext für Tooltip und Detail
    if (!c) return "nicht begonnen";
    if (c.zwischenstand) return "Test begonnen, noch nicht abgegeben (Zwischenstand)";
    var s = [];
    if (c.skala === "pct") { if (c.wert != null && c.max) s.push(r1(c.wert) + " von " + r1(c.max) + " P."); if (c.pct != null) s.push(r1(c.pct) + " %"); if (c.note) s.push((c.endnote ? "Endnote " : "Note ") + c.note); if (c.endnote && (c.autoNote || c.autoP != null)) s.push("(automatisch: " + (c.autoP != null ? r1(c.autoP) + " von " + r1(c.autoMx) + " P." : "") + (c.autoNote ? ", Note " + c.autoNote : "") + ")"); if (c.versuche > 1) s.push(c.versuche + " Abgaben (letzte gezählt)"); }
    else if (c.max === 100) s.push(r1(c.wert) + " %"); else if (c.max) s.push(c.wert + " von " + c.max + (c.pct != null ? " (" + r1(c.pct) + " %)" : "")); else if (c.wert != null) s.push(String(c.wert));
    s.push(c.status === "fertig" && c.skala !== "pct" ? "fertig" : c.status === "begonnen" && c.skala !== "pct" ? "begonnen" : "");
    return s.filter(Boolean).join(" · ");
  }
  /* sichtbare Seiten/Spalten/Schüler nach den Filtern */
  function dashView() {
    var d = S.dash, sites = d.seiten || [], byKey = {}; sites.forEach(function (s) { byKey[s.key] = s; });
    var klassen = []; d.schueler.forEach(function (s) { if (s.klasse && klassen.indexOf(s.klasse) < 0) klassen.push(s.klasse); });
    klassen.sort(function (a, b) { return parseInt(a) - parseInt(b) || (a < b ? -1 : 1); });
    var pages = sites.filter(function (s) { return S.dashSeite ? s.key === S.dashSeite : (!S.dashKlasse || (s.klassen || []).indexOf(S.dashKlasse) >= 0); });
    var keep = {}; pages.forEach(function (s) { keep[s.key] = 1; });
    var th = d.themen.filter(function (t) { return keep[t.seite]; });
    var sch = d.schueler.filter(function (s) {
      if (S.dashKlasse) return s.klasse === S.dashKlasse;
      if (S.dashSeite && byKey[S.dashSeite]) return (byKey[S.dashSeite].klassen || []).indexOf(s.klasse) >= 0;
      return true;
    });
    sch.forEach(function (s) { var z = d.zellen[s.id] || {}, sum = 0, any = false, last = s.zuletzt || 0;
      pages.forEach(function (p) { var g = z[p.key + "|gesamt"] || z[p.key + "|ergebnis"], v = null;
        if (g) v = g.status === "fertig" && g.pct == null ? 100 : g.pct;
        else { var ps = []; th.forEach(function (t) { if (t.seite === p.key && z[p.key + "|" + t.thema] && z[p.key + "|" + t.thema].pct != null) ps.push(z[p.key + "|" + t.thema].pct); }); if (ps.length) v = ps.reduce(function (a, b) { return a + b; }, 0) / ps.length; }
        if (v != null) sum += v; });
      th.forEach(function (t) { var c = z[t.seite + "|" + t.thema]; if (c && (c.status === "begonnen" || c.status === "fertig")) any = true; });
      s._score = pages.length ? sum / pages.length : 0; s._any = any; s._last = last; });
    sch.sort(function (a, b) {
      if (S.dashSort === "zuletzt") return (b._last - a._last) || (a.anzeige < b.anzeige ? -1 : 1);
      if (S.dashSort === "fortschritt") return (b._score - a._score) || (a.anzeige < b.anzeige ? -1 : 1);
      return (parseInt(a.klasse) - parseInt(b.klasse)) || (a.klasse < b.klasse ? -1 : a.klasse > b.klasse ? 1 : (a.anzeige < b.anzeige ? -1 : a.anzeige > b.anzeige ? 1 : 0));
    });
    return { klassen: klassen, pages: pages, th: th, sch: sch, byKey: byKey };
  }
  function chipRow(list, cur, onpick, scroll) {
    return h("div", { class: "chips" + (scroll ? " scroll" : "") }, list.map(function (k) { return h("button", { "aria-pressed": cur === k[0] ? "true" : "false", text: k[1], onclick: function () { onpick(k[0]); } }); }));
  }
  function detailSheet(v) {
    var d = S.dash, st = null; d.schueler.forEach(function (s) { if (s.id === S.dashDetail) st = s; }); if (!st) return null;
    var z = d.zellen[st.id] || {}, inf = d.info[st.id] || {}, body = [];
    d.seiten.forEach(function (p) {
      var rows = d.themen.filter(function (t) { return t.seite === p.key; }), has = rows.some(function (t) { return z[p.key + "|" + t.thema]; }) || inf[p.key];
      if (!has && (p.klassen || []).indexOf(st.klasse) < 0) return;
      var box = h("div", { class: "dsec" }, h("div", { class: "dh" }, h("b", { text: p.titel }), !has && h("span", { class: "tag", text: "keine Daten" })));
      rows.forEach(function (t) {
        var c = z[p.key + "|" + t.thema]; if (!c && !has) return;
        var w = c ? (c.pct != null ? c.pct : (c.status === "fertig" ? 100 : 0)) : 0;
        box.appendChild(h("div", { class: "drow" }, h("span", { class: "dl", text: t.label }),
          h("span", { class: "bar" }, h("i", { class: cls(c), style: "width:" + Math.max(c ? 4 : 0, Math.min(100, w)) + "%" })), h("span", { class: "dv", text: cdesc(c) })));
      });
      var i = inf[p.key];
      if (i) {
        var kv = [];
        if (i.zuletzt) kv.push(["Letzte Aktivität", fdt(i.zuletzt)]); if (i.erste) kv.push(["Erste Aktivität", fdt(i.erste)]);
        if (i.felder && i.felder[1]) kv.push(["Felder ausgefüllt", i.felder[0] + " von " + i.felder[1]]);
        INFO.forEach(function (k) { if (i[k[0]] != null && i[k[0]] !== "") kv.push([k[1], String(i[k[0]])]); });
        if (kv.length) box.appendChild(h("div", { class: "kv" }, kv.map(function (x) { return h("span", {}, h("em", { text: x[0] }), " " + x[1]); })));
      }
      body.push(box);
    });
    if (!body.length) body.push(h("p", { class: "muted", text: "Keine Daten vorhanden." }));
    function close() { S.dashDetail = ""; render(); }
    return h("div", { class: "sheet-bg", onclick: function (e) { if (e.target === e.currentTarget) close(); } },
      h("div", { class: "sheet glass", role: "dialog", "aria-modal": "true", "aria-label": "Details " + st.anzeige },
        h("div", { class: "sh-top" }, h("div", {}, h("h3", { text: st.anzeige }), h("div", { class: "s muted", text: "Klasse " + st.klasse + " · zuletzt aktiv: " + (st.zuletzt ? fdt(st.zuletzt) + " (" + ago(st.zuletzt) + ")" : "noch nie") })),
          h("button", { class: "btn ghost small", text: "Schließen", onclick: close })), body));
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && S.dashDetail) { S.dashDetail = ""; render(); } });
  function teacherDash() {
    if (!S.dash) {
      if (S.dashLoading) return h("div", { class: "glass empty" }, h("p", { class: "muted", text: "Fortschritt wird geladen … (beim ersten Mal ca. 5–10 Sekunden)" }));
      return h("div", { class: "glass empty" }, h("p", { class: "muted", text: S.dashErr || "Noch keine Daten." }), h("div", { style: "margin-top:12px" }, h("button", { class: "btn small", text: "Erneut versuchen", onclick: function () { loadDash(true); } })));
    }
    if (!S.dash.seiten) return h("div", { class: "glass empty" }, h("p", { class: "muted", text: "Das Backend liefert noch keine Altdaten (neue Code.gs-Version fehlt, siehe DEPLOY-dashboard.md)." }));
    var d = S.dash, v = dashView(), now = Date.now(), week = 0, started = 0;
    v.sch.forEach(function (s) { if (s._last && now - s._last < 7 * 86400e3) week++; if (s._any) started++; });
    var bad = (d.quellen || []).filter(function (q) { return !q.ok; });
    var srcLine = h("div", { class: "src" }, "Stand " + new Date(d.erzeugt || now).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) + " · ",
      (d.quellen || []).map(function (q) { return h("span", { class: q.ok ? "ok" : "bad", title: q.ok ? (q.n + " Zeilen gelesen" + (q.zugeordnet != null ? ", " + q.zugeordnet + " zugeordnet" : "") + (q.nichtZugeordnet ? ", " + q.nichtZugeordnet + " nicht zuordenbar" : "")) : (q.fehler || "nicht lesbar"), text: (q.ok ? "✓ " : "⚠ ") + q.titel.replace(/ \(.*\)/, "") + " "}); }),
      h("button", { class: "btn ghost small", disabled: S.dashLoading ? true : null, text: S.dashLoading ? "Lädt …" : "↻ Aktualisieren", onclick: function () { loadDash(true); } }));
    var head1 = [h("th", { class: "l", rowspan: "2", text: "Schüler" })], head2 = [];
    v.pages.forEach(function (p) { var n = v.th.filter(function (t) { return t.seite === p.key; }).length; if (n) head1.push(h("th", { class: "pg", colspan: String(n), text: p.titel, title: p.key })); });
    v.th.forEach(function (t) { head2.push(h("th", { text: t.label, title: (v.byKey[t.seite] ? v.byKey[t.seite].titel + " · " : "") + t.label })); });
    head1.push(h("th", { rowspan: "2", text: "Zuletzt" }));
    var tbl = h("table", {}, h("thead", {}, h("tr", {}, head1), h("tr", {}, head2)),
      h("tbody", {}, v.sch.map(function (s) {
        var z = d.zellen[s.id] || {};
        return h("tr", { class: "rw", onclick: function () { S.dashDetail = s.id; render(); } }, h("th", { class: "l" }, h("button", { class: "nm", type: "button", text: s.anzeige, title: "Klasse " + s.klasse + " – Details" }), !S.dashKlasse && h("small", { text: " " + s.klasse })),
          v.th.map(function (t) { var c = z[t.seite + "|" + t.thema]; return h("td", { class: cls(c), text: ctext(c), title: t.label + ": " + cdesc(c) + (c && c.zuletzt ? " · " + fdt(c.zuletzt) : "") }); }),
          h("td", { class: "lt", text: ago(s._last), title: s._last ? fdt(s._last) : "keine Aktivität" }));
      })));
    return h("div", {},
      bad.length > 0 && h("div", { class: "banner", text: "Nicht lesbar: " + bad.map(function (q) { return q.titel; }).join(", ") + ". Die übrigen Daten sind trotzdem aktuell. (Zugriff/Freigabe prüfen, dann „Aktualisieren“.)" }),
      srcLine,
      chipRow([["", "Alle Klassen"]].concat(v.klassen.map(function (k) { return [k, k]; })), S.dashKlasse, function (k) { S.dashKlasse = k; if (S.dashSeite && v.byKey[S.dashSeite] && k && (v.byKey[S.dashSeite].klassen || []).indexOf(k) < 0) S.dashSeite = ""; render(); }),
      chipRow([["", "Alle Seiten"]].concat((S.dashKlasse ? d.seiten.filter(function (s) { return (s.klassen || []).indexOf(S.dashKlasse) >= 0; }) : d.seiten).map(function (s) { return [s.key, s.titel]; })), S.dashSeite, function (k) { S.dashSeite = k; render(); }, true),
      chipRow([["name", "Name"], ["zuletzt", "Zuletzt aktiv"], ["fortschritt", "Fortschritt"]], S.dashSort, function (k) { S.dashSort = k; render(); }),
      h("div", { class: "tiles" }, [[v.sch.length, "Schüler"], [week, "aktiv (7 Tage)"], [started, "mit Fortschritt"], [v.sch.length - started, "ohne Fortschritt"]].map(function (t) { return h("div", { class: "tile glass" }, h("b", { text: String(t[0]) }), h("span", { text: t[1] })); })),
      v.sch.length && v.th.length ? h("div", { class: "heat glass" }, tbl) : h("div", { class: "glass empty" }, h("p", { class: "muted", text: "Für diese Auswahl gibt es keine Schüler oder Spalten." })),
      h("div", { class: "legend" }, [["c0", "nicht begonnen"], ["c1", "< 33 %"], ["c2", "33–66 %"], ["c3", "> 66 %"], ["c4", "fertig / Test ≥ 85 %"], ["cz", "Test nur begonnen"], ["cn", "Anzahl (ohne Prozent)"]].map(function (l) { return h("span", {}, h("i", { class: l[0] }), l[1]); })),
      h("p", { class: "note", text: "Zahl = Prozent bzw. Aufgaben; ✓ = fertig. Test-Spalten zeigen das Ergebnis in Prozent (Tooltip: Punkte, Note). Altdaten stammen aus den bisherigen Seiten (Missionen, Selbstlernen/Wiederholung 10a, Tests) und werden nur gelesen. Klick auf einen Namen öffnet die Details." }),
      S.dashDetail ? detailSheet(v) : null);
  }

  boot();
})();
