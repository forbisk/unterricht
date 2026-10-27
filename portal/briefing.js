/* Briefing als Lernfolien – Folien-Renderer (nur Lehrkraft). Reines JavaScript, keine Fremdbibliotheken/Schriften.
   Wird von portal.js erst geladen, wenn die Lehrkraft #/briefing/<id> öffnet. Enthält KEINE Briefing-Daten: der Inhalt kommt nach dem
   Lehrer-Login per Aktion briefing_open vom Backend und wird ausschließlich mit textContent in den DOM geschrieben (nie als HTML).
   Folientypen: title, agenda, timeline, cards, checklist, takeaway, weekgrid, quiz. */
(function () {
  "use strict";
  var TONES = { high: "high", mid: "mid", low: "low", info: "info", ok: "ok" }, TONE_LABEL = { high: "Wichtig", mid: "Bald", low: "Später", info: "Info", ok: "Erledigt" };
  var TYP = { daily: ["Tagesbriefing", "🗓️"], weekly: ["Wochenbriefing", "🗂️"] };
  var LOADING_MS = 25000;

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
  function str(v, max) { return v == null ? "" : String(v).slice(0, max || 400); }
  function icon(v, dflt) { var a = Array.from(str(v, 20)); return a.length ? a.slice(0, 4).join("") : (dflt || ""); }
  function tone(v, dflt) { return TONES[String(v)] || dflt || "info"; }
  function arr(v, max) { return Array.isArray(v) ? v.slice(0, max || 14) : []; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  /* ---------- Folien ---------- */
  function slideTitle(t, sub) { return [h("h2", { class: "bt", text: str(t, 120) }), sub ? h("p", { class: "bsub", text: str(sub, 200) }) : null]; }
  var R = {
    title: function (s, ctx) {
      var ty = TYP[ctx.typ] || TYP.daily;
      return h("div", { class: "b-title" },
        h("div", { class: "b-logo", "aria-hidden": "true", text: icon(s.icon, ty[1]) }),
        h("div", { class: "b-kicker", text: str(s.kicker, 60) || ty[0] }),
        h("h1", { class: "b-h1", text: str(s.title, 120) }),
        s.subtitle ? h("p", { class: "b-lead", text: str(s.subtitle, 240) }) : null,
        s.date ? h("div", { class: "b-chip", text: str(s.date, 60) }) : null,
        s.greeting ? h("p", { class: "b-greet", text: str(s.greeting, 300) }) : null);
    },
    agenda: function (s) {
      return h("div", {}, slideTitle(s.title, s.subtitle),
        h("div", { class: "b-tiles" }, arr(s.tiles, 8).map(function (t) {
          return h("div", { class: "b-tile t-" + tone(t.tone, "info") }, h("div", { class: "ti", "aria-hidden": "true", text: icon(t.icon) }),
            h("div", { class: "tv", text: str(t.value, 12) }), h("div", { class: "tl", text: str(t.label, 60) }));
        })), s.note ? h("p", { class: "b-note", text: str(s.note, 300) }) : null);
    },
    timeline: function (s) {
      return h("div", {}, slideTitle(s.title, s.subtitle),
        h("ol", { class: "b-time" }, arr(s.items, 12).map(function (it) {
          return h("li", { class: "t-" + tone(it.tone, "info") }, h("span", { class: "tm", text: str(it.time, 20) }), h("span", { class: "dot", "aria-hidden": "true" }),
            h("div", { class: "tx" }, h("b", { text: str(it.title, 120) }), it.detail ? h("span", { text: str(it.detail, 240) }) : null));
        })), !arr(s.items).length ? h("p", { class: "b-note", text: "Keine Einträge." }) : null);
    },
    cards: function (s) {
      return h("div", {}, slideTitle(s.title, s.subtitle),
        h("div", { class: "b-cards" }, arr(s.items, 10).map(function (it) {
          var tn = tone(it.priority, "info");
          return h("div", { class: "b-item t-" + tn }, h("div", { class: "ic", "aria-hidden": "true", text: icon(it.icon, "•") }),
            h("div", { class: "tx" }, h("b", { text: str(it.title, 140) }), it.detail ? h("span", { text: str(it.detail, 300) }) : null),
            it.priority ? h("em", { class: "pill", text: TONE_LABEL[tn] }) : null);
        })));
    },
    checklist: function (s) {
      return h("div", {}, slideTitle(s.title, s.subtitle),
        h("ul", { class: "b-check" }, arr(s.items, 12).map(function (it) {
          var li = h("li", { class: "t-" + tone(it.priority, "info") + (it.done ? " done" : ""), role: "checkbox", tabindex: "0", "aria-checked": it.done ? "true" : "false" },
            h("span", { class: "bx", "aria-hidden": "true" }), h("div", { class: "tx" }, h("b", { text: str(it.text, 160) }), it.detail ? h("span", { text: str(it.detail, 280) }) : null));
          function tog() { var on = li.getAttribute("aria-checked") !== "true"; li.setAttribute("aria-checked", on ? "true" : "false"); li.classList.toggle("done", on); }
          li.addEventListener("click", tog); li.addEventListener("keydown", function (e) { if (e.key === " " || e.key === "Enter") { e.preventDefault(); e.stopPropagation(); tog(); } });
          return li;
        })), h("p", { class: "b-note", text: "Antippen = abhaken (nur auf diesem Bildschirm)." }));
    },
    takeaway: function (s) {
      return h("div", { class: "b-take" }, h("div", { class: "b-kicker", text: "Merke" }), h("h2", { class: "bt big", text: str(s.title, 140) }),
        s.text ? h("p", { class: "b-quote", text: str(s.text, 400) }) : null,
        h("ul", { class: "b-points" }, arr(s.points, 6).map(function (p) { return h("li", {}, h("span", { class: "ck", "aria-hidden": "true", text: "✓" }), h("span", { text: str(p, 240) })); })));
    },
    weekgrid: function (s) {
      return h("div", {}, slideTitle(s.title, s.subtitle),
        h("div", { class: "b-week", "data-noswipe": "1" }, arr(s.days, 7).map(function (d) {
          var items = arr(d.items, 6);
          return h("div", { class: "b-day" + (d.today ? " today" : "") + (d.free ? " free" : "") }, h("div", { class: "dh" }, h("b", { text: str(d.label, 12) }), h("span", { text: str(d.date, 12) })),
            items.length ? items.map(function (it) { return h("div", { class: "di t-" + tone(it.tone, "info") }, it.time ? h("i", { text: str(it.time, 12) }) : null, h("span", { text: str(it.text, 100) })); })
              : h("div", { class: "di empty", text: str(d.note, 60) || "–" }), items.length && d.note ? h("div", { class: "dn", text: str(d.note, 80) }) : null);
        })));
    },
    quiz: function (s) {
      var box = h("div", { class: "b-quiz" }, h("div", { class: "b-kicker", text: s.kind === "fact" ? "Wusstest du?" : "Mini-Check" }), h("h2", { class: "bt big", text: str(s.question || s.title, 240) }));
      var opts = arr(s.options, 5), ans = typeof s.answer === "number" ? s.answer : -1, rev = s.reveal ? h("div", { class: "b-reveal", hidden: true, text: str(s.reveal, 400) }) : null;
      if (opts.length) {
        var list = h("div", { class: "b-opts" }), btns = [];
        opts.forEach(function (o, i) {
          var b = h("button", { type: "button", class: "b-opt", text: str(o, 140), onclick: function () {
            btns.forEach(function (x, j) { x.disabled = true; if (ans >= 0) x.classList.add(j === ans ? "right" : (x === b ? "wrong" : "dim")); else if (x === b) x.classList.add("picked"); });
            if (rev) rev.hidden = false; } });
          btns.push(b); list.appendChild(b);
        });
        box.appendChild(list);
      } else if (rev) {
        box.appendChild(h("button", { type: "button", class: "b-btn", text: "Antwort zeigen", onclick: function (e) { rev.hidden = false; e.currentTarget.hidden = true; } }));
      }
      if (s.hint) box.appendChild(h("p", { class: "b-note", text: str(s.hint, 300) }));
      if (rev) box.appendChild(rev);
      return box;
    }
  };
  function renderSlide(s, ctx) {
    var type = R[s && s.type] ? s.type : "cards";
    var body = R[type](s || {}, ctx);
    var kids = body.children, i; for (i = 0; i < kids.length; i++) kids[i].style.setProperty("--i", String(i));   // gestaffelter Einstieg
    return h("section", { class: "b-slide s-" + type, "aria-roledescription": "Folie" }, h("div", { class: "b-card" }, body));
  }

  /* ---------- Rahmen ---------- */
  function mount(root, opts) {
    var timers = [], keyFn = null, dead = false;
    function destroy() { dead = true; document.documentElement.classList.remove("briefing-open"); timers.forEach(clearInterval); timers = []; if (keyFn) document.removeEventListener("keydown", keyFn); keyFn = null; }
    document.documentElement.classList.add("briefing-open");   // kein Zurück-Wischen des Browsers beim Blättern
    var shell = h("div", { class: "bdeck" }, h("div", { class: "bbg", "aria-hidden": "true" }, h("i"), h("i"), h("i")));
    root.replaceChildren(shell);
    function page(icon_, title, text, btns) {
      shell.querySelectorAll(".bmsg").forEach(function (n) { n.remove(); });
      shell.appendChild(h("div", { class: "bmsg" }, h("div", { class: "b-card narrow" }, h("div", { class: "b-logo", "aria-hidden": "true", text: icon_ }), h("h1", { class: "b-h1 sm", text: title }), h("p", { class: "b-lead", text: text }), h("div", { class: "b-actions" }, btns))));
    }
    function exit() { destroy(); opts.onExit(); }
    function expired() {
      destroy(); shell.replaceChildren(shell.firstChild);
      page("⏳", "Dieses Briefing ist abgelaufen", "Briefing-Folien löschen sich 1 Stunde nach dem ersten Öffnen. Das nächste Briefing erscheint automatisch – im Portal unter „Briefings“.", [h("button", { class: "b-btn", text: "Zurück zum Portal", onclick: exit })]);
    }
    function load() {
      page("⏳", "Folien werden geladen …", "Einen Moment bitte.", []);
      opts.api({ action: "briefing_open", token: opts.token, id: opts.id }).then(function (r) {
        if (dead) return;
        if (r && r.ok && r.payload && Array.isArray(r.payload.slides)) return start(r);
        if (r && r.abgelaufen) return expired();
        if (r && r.relogin) { destroy(); return opts.onRelogin(); }
        if (r && r.network) return page("📡", "Keine Verbindung", "Die Folien konnten nicht geladen werden. Bitte Internet prüfen und erneut versuchen.", [h("button", { class: "b-btn", text: "Erneut versuchen", onclick: load }), h("button", { class: "b-btn ghost", text: "Zurück", onclick: exit })]);
        page("🔒", "Kein Zugriff", "Dieses Briefing gibt es nicht oder du darfst es nicht öffnen.", [h("button", { class: "b-btn", text: "Zurück zum Portal", onclick: exit })]);
      });
    }
    function start(r) {
      var slides = r.payload.slides.slice(0, 40), n = slides.length, cur = 0, skew = (+r.jetzt || Date.now()) - Date.now(), until = +r.loeschenAb || 0;
      var ctx = { typ: r.typ };
      shell.replaceChildren(shell.firstChild);
      var bar = h("div", { class: "b-prog", role: "progressbar", "aria-valuemin": "1", "aria-valuemax": String(n) }, slides.map(function () { return h("i"); }));
      var count = h("span", { class: "b-count" }), cd = h("span", { class: "b-cd", role: "timer", "aria-live": "off" });
      var closeB = h("button", { class: "b-x", type: "button", "aria-label": "Folien schließen", text: "✕", onclick: exit });
      var stage = h("div", { class: "b-stage" }), els = slides.map(function (s) { var e = renderSlide(s, ctx); stage.appendChild(e); return e; });
      var prev = h("button", { class: "b-nav prev", type: "button", "aria-label": "Zurück", text: "‹", onclick: function () { go(cur - 1); } });
      var next = h("button", { class: "b-nav next", type: "button", "aria-label": "Weiter", text: "›", onclick: function () { go(cur + 1); } });
      var deck = h("div", { class: "b-deck" }, h("div", { class: "b-top" }, closeB, h("div", { class: "b-meta" }, count, cd)), bar, stage, h("div", { class: "b-bot" }, prev, h("div", { class: "b-hint", text: "‹ › Tasten oder wischen" }), next));
      shell.appendChild(deck);
      function go(i) {
        i = Math.max(0, Math.min(n - 1, i)); if (i === cur && deck.dataset.ready) return; var first = !deck.dataset.ready; deck.dataset.ready = "1";
        els.forEach(function (e, j) { e.classList.toggle("on", j === i); e.classList.toggle("before", j < i); e.classList.toggle("after", j > i); e.setAttribute("aria-hidden", j === i ? "false" : "true"); e.inert = j !== i; });
        Array.prototype.forEach.call(bar.children, function (b, j) { b.className = j < i ? "done" : j === i ? "cur" : ""; });
        bar.setAttribute("aria-valuenow", String(i + 1)); count.textContent = (i + 1) + " / " + n;
        prev.disabled = i === 0; next.disabled = i === n - 1; cur = i; if (!first) els[i].firstChild.scrollTop = 0;
      }
      function tick() {
        var left = until - (Date.now() + skew);
        if (left <= 0) return expired();
        var s = Math.ceil(left / 1000); cd.textContent = "Löscht sich in " + pad(Math.floor(s / 60)) + ":" + pad(s % 60); cd.className = "b-cd" + (s < 300 ? " low" : "");
        cd.title = "Diese Folien löschen sich in " + pad(Math.floor(s / 60)) + ":" + pad(s % 60);
      }
      tick(); if (dead) return; timers.push(setInterval(tick, 1000));
      go(0);
      keyFn = function (e) {
        if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
        var k = e.key;
        if (k === "ArrowRight" || k === "ArrowDown" || k === "PageDown" || k === " ") { e.preventDefault(); go(cur + 1); }
        else if (k === "ArrowLeft" || k === "ArrowUp" || k === "PageUp") { e.preventDefault(); go(cur - 1); }
        else if (k === "Home") go(0); else if (k === "End") go(n - 1); else if (k === "Escape") exit();
      };
      document.addEventListener("keydown", keyFn);
      var sx = 0, sy = 0, st = 0, ok = false;
      stage.addEventListener("touchstart", function (e) { var t = e.touches[0]; sx = t.clientX; sy = t.clientY; st = Date.now(); ok = e.touches.length === 1 && !(e.target.closest && e.target.closest("[data-noswipe]")); }, { passive: true });
      stage.addEventListener("touchend", function (e) {
        if (!ok) return; var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4 && Date.now() - st < 900) go(cur + (dx < 0 ? 1 : -1));
      }, { passive: true });
    }
    load();
    return { destroy: destroy };
  }
  window.PortalBriefing = { mount: mount, _renderers: Object.keys(R) };
})();
