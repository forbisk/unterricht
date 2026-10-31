/* Portal-Tab „Meldungen“ (⚑ Fehler melden aus Prüfungsfit u. a.). Daten: Selbstlern-Backend, Blatt „Meldungen“ (Aktionen listReports/setReportStatus).
   Lehrer-Passwort des Selbstlern-Backends wird nur im Speicher dieses Tabs gehalten (nicht in localStorage). Kommentare nur als Text (textContent). */
(function () {
  var URL = "https://script.google.com/macros/s/AKfycbw9iDp8f4R9eOdrTF2CfHNlv3Xn_u7IjPZUO904wGawIZZGin3M7jXTDHjktZTU3tYTDQ/exec";
  if (window.PF_REPORT_API) URL = window.PF_REPORT_API;
  var M = { pw: "", list: null, err: "", busy: false, open: "" };
  var ST = { "new": "neu", confirmed: "bestätigt", rejected: "abgelehnt", fixed: "behoben" };
  function api(o) { return fetch(URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(o), redirect: "follow" }).then(function (r) { return r.json(); }).catch(function () { return { ok: false, error: "Keine Verbindung." }; }); }
  function load(rr) { M.busy = true; M.err = ""; rr(); api({ action: "listReports", pw: M.pw }).then(function (r) { M.busy = false; if (r.ok) M.list = r.reports || []; else { M.err = r.error || "Fehler"; if (/berechtigt/.test(M.err)) M.pw = ""; } rr(); }); }
  function setSt(ids, st, rr) { api({ action: "setReportStatus", pw: M.pw, ids: ids, status: st }).then(function (r) { if (!r.ok) { M.err = r.error || "Fehler"; return rr(); } M.list.forEach(function (x) { if (ids.indexOf(x.report_id) >= 0) x.status = st; }); rr(); }); }
  function taskUrl(r) { var t = String(r.task_id).replace(/^pf:/, ""); return "../pruefungsfit-mathe/#/rv/" + encodeURIComponent(t) + "/" + encodeURIComponent(r.seed) + (/^test/.test(r.task_variant) ? "/t" : ""); }
  window.PortalMeldungen = { state: M, view: function (h, rr) {
    if (!M.pw) {
      var inp = h("input", { type: "password", placeholder: "Lehrer-Passwort Selbstlernen", autocomplete: "off" });
      return h("form", { class: "glass", style: "padding:16px", onsubmit: function (e) { e.preventDefault(); M.pw = inp.value; load(rr); } },
        h("p", { text: "Meldungen kommen aus dem Selbstlern-Backend. Bitte einmal das Lehrer-Passwort eingeben (wird nicht gespeichert)." }), inp, h("button", { class: "btn small", type: "submit", text: "Laden" }), M.err ? h("p", { class: "muted", text: M.err }) : null);
    }
    if (!M.list) return h("div", { class: "glass empty" }, h("p", { class: "muted", text: M.busy ? "Lädt …" : (M.err || "Keine Daten.") }));
    var g = {}; M.list.forEach(function (r) { (g[r.task_id] = g[r.task_id] || []).push(r); });
    var keys = Object.keys(g).sort(function (a, b) { return g[b].length - g[a].length || (a < b ? -1 : 1); });
    var top = h("div", { class: "glass", style: "padding:10px 14px;display:flex;gap:10px;align-items:center" }, h("b", { text: M.list.length + " Meldungen · " + keys.length + " Aufgaben" }),
      h("button", { class: "btn ghost small", text: M.busy ? "Lädt …" : "↻ Aktualisieren", onclick: function () { load(rr); } }), M.err ? h("span", { class: "muted", text: M.err }) : null);
    return h("div", { class: "meld" }, top, keys.map(function (k) {
      var l = g[k], test = l.filter(function (r) { return r.test_status === "running"; }).length, offen = l.filter(function (r) { return r.status === "new"; }).length, ids = l.map(function (r) { return r.report_id; });
      var det = M.open === k ? h("div", { class: "mdet" }, l.map(function (r) {
        return h("div", { class: "mrow" }, h("div", {}, h("b", { text: r.reason }), r.test_status === "running" ? h("span", { class: "mbadge", text: "⏱ im laufenden Test" }) : r.test_status === "finished" ? h("span", { class: "mbadge f", text: "nach Test" }) : null,
          h("span", { class: "muted", text: " · " + new Date(r.created_at).toLocaleString("de-DE", { timeZone: "Europe/Berlin", dateStyle: "short", timeStyle: "short" }) + " · " + r.mode + " · Klasse " + (r.class_code || "–") })),
          h("div", { class: "muted", text: "Antwort: " + (r.given_answer || "–") + " · erwartet: " + (r.expected_answer || "–") + " · Variante " + r.task_variant + " / Seed " + r.seed + (r.test_attempt_id ? " · Versuch " + r.test_attempt_id : "") }),
          r.comment ? h("div", { class: "mcom", text: "„" + r.comment + "“" }) : null,
          h("div", { class: "mbtns" }, h("a", { class: "btn ghost small", href: taskUrl(r), target: "_blank", rel: "noopener", text: "Aufgabe (genaue Variante) öffnen" }),
            Object.keys(ST).map(function (s) { return h("button", { class: "btn small" + (r.status === s ? "" : " ghost"), text: ST[s], onclick: function () { setSt([r.report_id], s, rr); } }); })));
      }), h("div", { class: "mbtns" }, h("span", { class: "muted", text: "Alle dieser Aufgabe: " }), Object.keys(ST).map(function (s) { return h("button", { class: "btn ghost small", text: ST[s], onclick: function () { setSt(ids, s, rr); } }); }))) : null;
      return h("div", { class: "glass mgrp" }, h("button", { class: "mhead", type: "button", onclick: function () { M.open = M.open === k ? "" : k; rr(); } },
        h("span", { class: "mcnt", text: String(l.length) }), h("b", { text: k }), test ? h("span", { class: "mbadge", text: "⏱ " + test + "× im Test" }) : null, h("span", { class: "muted", text: offen + " neu" })), det);
    }));
  } };
})();
