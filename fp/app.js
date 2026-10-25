/* fp/app.js – hierarchical menu driven by <script id="menu-data"> (any depth).
   Address: #/unterricht/mathematik/klasse-10  (browser back/forward + deep links work) */
(function (w, d) {
  'use strict';
  var $ = function (id) { return d.getElementById(id); };
  var T = {
    de: { back: 'Zurück zu', start: 'Start', home: 'Willkommen', homeSub: 'Bereich wählen · Choose a section',
          pages: function (n) { return n === 1 ? '1 Seite' : n + ' Seiten'; }, locked: 'passwortgeschützt', ext: 'externe Seite',
          note: 'Seiten mit Schloss sind passwortgeschützt – das Passwort gibt es bei der Lehrkraft.',
          foot: 'Theodor Fontane Gemeinschaftsschule · Lehrer P. Kurlavičius',
          level: function (l, n) { return 'Ebene ' + l + ', ' + n + (n === 1 ? ' Eintrag' : ' Einträge'); },
          sOn: 'Ton ausschalten', sOff: 'Ton einschalten' },
    en: { back: 'Back to', start: 'Start', home: 'Welcome', homeSub: 'Choose a section',
          pages: function (n) { return n === 1 ? '1 page' : n + ' pages'; }, locked: 'password protected', ext: 'external site',
          note: 'Pages marked with a lock are password-protected.',
          foot: 'P. Kurlavičius · Computer Science',
          level: function (l, n) { return 'Level ' + l + ', ' + n + (n === 1 ? ' entry' : ' entries'); },
          sOn: 'Turn sound off', sOff: 'Turn sound on' }
  };
  var ICON = {
    chev: '<svg class="go" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
    arrow: '<svg class="go" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>',
    ext: '<svg class="go" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'
  };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var root, cur = null, reduced = false, net = null, snd = w.FPSound || null, busy = false;

  function prep(n, parent) {
    n.parent = parent || null;
    n.lang = n.lang || (parent && parent.lang) || 'de';
    n.hue = n.hue || (parent && parent.hue) || '#2dd4bf';
    n.path = parent ? parent.path.concat(n.id) : [];
    n.depth = n.path.length;
    if (n.children) n.children.forEach(function (c) { prep(c, n); });
    n.leaves = n.children ? n.children.reduce(function (a, c) { return a + (c.children ? c.leaves : 1); }, 0) : 1;
    n.locked = n.children ? n.children.some(function (c) { return c.locked; }) : !!n.locked;
  }
  function find(path) {
    var n = root;
    for (var i = 0; i < path.length; i++) {
      var nx = (n.children || []).filter(function (c) { return c.id === path[i]; })[0];
      if (!nx) break; n = nx;
    }
    return n.children ? n : n.parent; // a leaf in the URL → show its parent level
  }
  function hashFor(n) { return '#/' + n.path.join('/'); }
  function fromHash() { return find(decodeURIComponent(location.hash.replace(/^#\/?/, '')).split('/').filter(Boolean)); }

  function itemHTML(c, i) {
    var t = T[c.lang], style = ' style="--c:' + esc(c.hue) + '"';
    var tag = c.tag ? '<span class="tag">' + esc(c.tag) + '</span>' : '';
    var desc = c.sub || (c.children ? c.children.map(function (x) { return x.label; }).join(' · ') : '');
    var txt = '<span class="txt">' + tag + '<span class="lbl">' + esc(c.label) + '</span>' + (desc ? '<span class="desc">' + esc(desc) + '</span>' : '') + '</span>';
    var lock = c.locked ? '<span class="lock" title="' + t.locked + '">' + ICON.lock + '<span class="sr">(' + t.locked + ')</span></span>' : '';
    if (c.children) {
      return '<li><button type="button" class="item branch" lang="' + c.lang + '" data-i="' + i + '"' + style + ' aria-label="' + esc(c.label + ' – ' + t.pages(c.leaves)) + '">' +
        '<span class="node" aria-hidden="true"></span>' + txt +
        '<span class="meta"><span class="count" aria-hidden="true">' + t.pages(c.leaves) + '</span>' + ICON.chev + '</span></button></li>';
    }
    var ext = /^https?:/i.test(c.href);
    return '<li><a class="item leaf" lang="' + c.lang + '" data-i="' + i + '" href="' + esc(c.href) + '"' + style + '>' +
      '<span class="node" aria-hidden="true"></span>' + txt +
      '<span class="meta">' + lock + (ext ? ICON.ext + '<span class="sr">(' + t.ext + ')</span>' : ICON.arrow) + '</span></a></li>';
  }

  function render(n, dir, focusId, user) {
    var t = T[n.depth ? n.lang : 'de'], menu = $('menu'), list = $('items');
    // breadcrumbs
    var chain = [], p = n; while (p) { chain.unshift(p); p = p.parent; }
    $('crumbs').innerHTML = chain.map(function (c, i) {
      var lbl = c.depth ? esc(c.label) : T.de.start;
      return '<li' + (c.depth ? ' lang="' + c.lang + '"' : '') + '>' + (i === chain.length - 1 ? '<span aria-current="page">' + lbl + '</span>' : '<a href="' + hashFor(c) + '">' + lbl + '</a>') + '</li>';
    }).join('');
    menu.setAttribute('lang', n.depth ? n.lang : 'de');
    menu.style.setProperty('--accent', n.hue);
    $('level-title').textContent = n.depth ? n.label : t.home;
    $('level-sub').textContent = n.depth ? (n.sub || '') : t.homeSub;
    var back = $('back');
    back.hidden = !n.depth;
    if (n.parent) { var bl = t.back + ' ' + (n.parent.depth ? n.parent.label : t.start); $('back-label').textContent = bl; back.title = bl; }
    $('level-note').innerHTML = n.locked || n.children.some(function (c) { return c.children && c.locked; }) ? ICON.lock + '<span>' + t.note + '</span>' : '';
    $('foot-text').textContent = n.depth ? t.foot : 'Ohne Tracking · ohne externe Dienste';
    $('foot-text').setAttribute('lang', n.depth ? n.lang : 'de');
    if (net) net.setAccent(n.hue);
    d.title = n.depth ? chain.slice(1).map(function (c) { return c.label; }).reverse().join(' · ') + ' · P. Kurlavičius' : 'P. Kurlavičius · Unterricht & Computer Science';

    var html = n.children.map(itemHTML).join('');
    var swap = function () {
      list.innerHTML = html;
      if (user || focusId) {
        var target = null;
        if (focusId) n.children.forEach(function (c, i) { if (c.id === focusId) target = list.querySelector('[data-i="' + i + '"]'); });
        (target || list.querySelector('.item') || $('level-title')).focus({ preventScroll: false });
      }
    };
    if (dir && !reduced && list.animate) {
      busy = true;
      var a = list.animate([{ opacity: 1, transform: 'none', filter: 'blur(0)' }, { opacity: 0, transform: 'translateX(' + (-28 * dir) + 'px)', filter: 'blur(3px)' }], { duration: 150, easing: 'ease-in', fill: 'forwards' });
      a.onfinish = function () {
        swap(); a.cancel();
        var items = list.querySelectorAll('li');
        list.animate([{ opacity: 0, transform: 'translateX(' + (28 * dir) + 'px)' }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'cubic-bezier(.2,.7,.2,1)' });
        Array.prototype.forEach.call(items, function (li, i) {
          li.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 320, delay: 40 + i * 45, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' });
        });
        busy = false;
      };
    } else swap();
    $('live').textContent = T[n.depth ? n.lang : 'de'].level(n.depth ? n.label : t.start, n.children.length);
    cur = n;
  }

  function panelCenter() { var r = $('menu').getBoundingClientRect(); return [r.left + r.width / 2, r.top + Math.min(r.height / 2, 160)]; }

  function go(n, origin) {
    if (!n || n === cur) return;
    var dir = n.depth > cur.depth ? 1 : -1;
    var fromId = dir < 0 ? (function () { var p = cur; while (p && p.parent !== n) p = p.parent; return p && p.id; })() : null;
    var pt = origin || panelCenter();
    if (net) net.burst(pt[0], pt[1], dir > 0 ? 1 : 0.7);
    if (snd) snd.whoosh(dir);
    render(n, dir, fromId, true);
    var h = hashFor(n);
    if (location.hash !== h && !(h === '#/' && !location.hash)) history.pushState(null, '', h === '#/' ? location.pathname + location.search : h);
  }

  function items() { return Array.prototype.slice.call($('items').querySelectorAll('.item')); }

  function bind() {
    var list = $('items');
    list.addEventListener('click', function (e) {
      var el = e.target.closest('.item'); if (!el || busy) { if (busy && el && el.classList.contains('branch')) e.preventDefault(); return; }
      var c = cur.children[+el.getAttribute('data-i')], r = el.getBoundingClientRect(), pt = [r.left + r.width / 2, r.top + r.height / 2];
      if (c.children) { go(c, pt); return; }
      // leaf: let modified clicks behave normally; otherwise show a short pulse, then navigate
      if (e.button || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      if (net) net.burst(pt[0], pt[1], 1.1);
      if (snd) snd.whoosh(1);
      if (!reduced) { e.preventDefault(); var href = el.href; setTimeout(function () { location.href = href; }, 260); }
    });
    var hoverIdx = -1;
    list.addEventListener('pointerover', function (e) {
      var el = e.target.closest('.item'); if (!el) return;
      var i = +el.getAttribute('data-i'); if (i !== hoverIdx) { hoverIdx = i; if (snd) snd.blip(i + cur.depth); }
    });
    list.addEventListener('pointerout', function (e) { if (!e.relatedTarget || !e.relatedTarget.closest || !list.contains(e.relatedTarget)) hoverIdx = -1; });
    list.addEventListener('pointermove', function (e) {
      var el = e.target.closest('.item'); if (!el) return; var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
    list.addEventListener('focusin', function (e) {
      var el = e.target.closest('.item'); if (!el || !el.matches(':focus-visible')) return;
      var r = el.getBoundingClientRect(); if (net) net.attract(r.right - 30, r.top + r.height / 2);
      if (snd) snd.blip(+el.getAttribute('data-i') + cur.depth);
    });
    list.addEventListener('focusout', function () { if (net) net.attract(null); });
    $('back').addEventListener('click', function () { if (cur.parent) go(cur.parent); });
    $('crumbs').addEventListener('click', function (e) {
      var a = e.target.closest('a'); if (!a) return; e.preventDefault();
      go(find(a.getAttribute('href').replace(/^#\/?/, '').split('/').filter(Boolean)));
    });
    w.addEventListener('popstate', function () { var n = fromHash(); if (n !== cur) { var dir = n.depth > cur.depth ? 1 : -1; if (net) { var p = panelCenter(); net.burst(p[0], p[1], 0.6); } if (snd) snd.whoosh(dir); render(n, dir, null, false); } });
    w.addEventListener('hashchange', function () { var n = fromHash(); if (n !== cur) render(n, n.depth > cur.depth ? 1 : -1, null, false); });

    d.addEventListener('keydown', function (e) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      var tag = (e.target.tagName || '').toLowerCase(); if (tag === 'input' || tag === 'textarea') return;
      var its = items(), i = its.indexOf(d.activeElement);
      switch (e.key) {
        case 'ArrowDown': case 'ArrowUp':
          e.preventDefault();
          if (!its.length) return;
          i = i < 0 ? (e.key === 'ArrowDown' ? 0 : its.length - 1) : (i + (e.key === 'ArrowDown' ? 1 : -1) + its.length) % its.length;
          its[i].focus(); break;
        case 'Home': if (i >= 0) { e.preventDefault(); its[0].focus(); } break;
        case 'End': if (i >= 0) { e.preventDefault(); its[its.length - 1].focus(); } break;
        case 'ArrowRight':
          if (i >= 0 && its[i].classList.contains('branch')) { e.preventDefault(); its[i].click(); } break;
        case 'ArrowLeft': case 'Escape': case 'Backspace':
          if (cur.parent) { e.preventDefault(); go(cur.parent); } break;
      }
    });
  }

  function soundUI() {
    var b = $('sound'); if (!snd || !snd.supported) return;
    b.hidden = false;
    var sync = function () { var on = snd.isOn(), t = T[cur && cur.depth ? cur.lang : 'de']; b.setAttribute('aria-pressed', on); $('sound-label').textContent = on ? t.sOn : t.sOff; b.title = (on ? 'Ton aus · Sound off' : 'Ton an · Sound on'); };
    sync();
    b.addEventListener('click', function () { snd.set(!snd.isOn()); sync(); if (snd.isOn()) snd.whoosh(1); });
    // browsers need a gesture before audio may start
    var unlock = function () { snd.unlock(); };
    d.addEventListener('pointerdown', unlock, true); d.addEventListener('keydown', unlock, true);
    d.addEventListener('visibilitychange', function () { snd.suspend(d.hidden); });
  }

  function fail(err) {
    if (w.console) console.error('[frontpage] falling back to plain list:', err);
    d.documentElement.classList.remove('js');
    var m = $('menu'); if (m) m.hidden = true;
  }

  try {
    root = JSON.parse($('menu-data').textContent);
    prep(root, null);
    reduced = !!(w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches);
    try { if (w.FPNet && w.HTMLCanvasElement) { net = w.FPNet.init($('net')); if (snd) net.onSignal = function () { snd.sparkle(); }; } }
    catch (e) { net = null; if (w.console) console.warn('[frontpage] background disabled:', e); }
    $('menu').hidden = false;
    render(fromHash(), 0, null, false);
    bind();
    soundUI();
    w.FP_READY = true;
    w.FP = { go: function (path) { go(find(path.split('/').filter(Boolean))); }, current: function () { return cur.path.join('/'); }, root: root };
  } catch (e) { fail(e); }
})(window, document);
