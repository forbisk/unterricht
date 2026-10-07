/* fp/network.js – "neural network" background (Canvas 2D, no dependencies)
   API: FPNet.init(canvas) · FPNet.burst(x,y) · FPNet.setAccent('#hex') · FPNet.attract(x,y|null)
        FPNet.onSignal = fn(x,y) · FPNet.stats */
(function (w) {
  'use strict';
  var PALETTE = ['#2dd4bf', '#22d3ee', '#5eead4', '#a78bfa', '#14b8a6', '#818cf8'];
  var cv, cx, W = 0, H = 0, DPR = 1, nodes = [], signals = [], rings = [];
  var L = 140, L2 = L * L, R = 190, running = false, raf = 0, last = 0, spawnT = 0, energy = 0;
  var pointer = { x: 0, y: 0, on: false, s: 0 }, focusPt = null;
  var accent = [45, 212, 191], accentT = accent.slice();
  var reduced = false, mq, sprites = {}, adj = [], frameSkip = 0;
  var stats = { fps: 0, nodes: 0, frames: 0 };
  var fpsAcc = 0, fpsN = 0;

  function hex(h) { h = h.replace('#', ''); return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)]; }
  function rnd(a, b) { return a + Math.random() * (b - a); }

  function sprite(col) { // pre-rendered glow dot
    if (sprites[col]) return sprites[col];
    var s = document.createElement('canvas'), n = 64; s.width = s.height = n;
    var g = s.getContext('2d'), c = hex(col), gr = g.createRadialGradient(n / 2, n / 2, 0, n / 2, n / 2, n / 2);
    gr.addColorStop(0, 'rgba(255,255,255,1)');
    gr.addColorStop(0.12, 'rgba(' + c + ',0.95)');
    gr.addColorStop(0.35, 'rgba(' + c + ',0.32)');
    gr.addColorStop(1, 'rgba(' + c + ',0)');
    g.fillStyle = gr; g.fillRect(0, 0, n, n);
    return (sprites[col] = s);
  }

  function target() { // node budget by screen size
    var n = Math.round((W * H) / 8800);
    if (reduced) n = Math.round(n * 0.7);
    return Math.max(34, Math.min(160, n));
  }
  function mk(x, y) {
    var a = Math.random() * Math.PI * 2, sp = rnd(0.08, 0.32);
    return { x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, bs: sp, r: rnd(1.1, 2.5),
             c: PALETTE[(Math.random() * PALETTE.length) | 0], g: 0, ph: Math.random() * 6.28 };
  }

  function resize() {
    var ow = W || 1, oh = H || 1;
    W = w.innerWidth; H = w.innerHeight;
    DPR = Math.min(w.devicePixelRatio || 1, 2);
    cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
    cx.setTransform(DPR, 0, 0, DPR, 0, 0);
    L = Math.max(115, Math.min(170, Math.min(W, H) * 0.2)); L2 = L * L;
    R = Math.max(150, Math.min(230, Math.min(W, H) * 0.3));
    for (var i = 0; i < nodes.length; i++) { nodes[i].x *= W / ow; nodes[i].y *= H / oh; }
    var t = target();
    while (nodes.length < t) nodes.push(mk(Math.random() * W, Math.random() * H));
    if (nodes.length > t) { nodes.length = t; signals.length = 0; }
    stats.nodes = nodes.length;
    if (!running) draw(0); // static frame (reduced motion / paused)
  }

  function spawnSignal(from, hops, color) {
    var nb = adj[from]; if (!nb || !nb.length) return;
    var to = nb[(Math.random() * nb.length) | 0];
    signals.push({ a: from, b: to, t: 0, sp: rnd(1.4, 2.4), hops: hops, c: color || PALETTE[(Math.random() * 4) | 0] });
  }

  function step(dt) {
    var i, n, dx, dy, d, f, k = reduced ? 0.15 : 1;
    // smooth accent colour
    for (i = 0; i < 3; i++) accent[i] += (accentT[i] - accent[i]) * Math.min(1, dt * 0.05);
    energy *= Math.pow(0.965, dt);
    pointer.s += ((pointer.on ? 1 : 0) - pointer.s) * Math.min(1, 0.08 * dt);
    var att = pointer.on ? pointer : focusPt;
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      if (att && !reduced) {
        dx = att.x - n.x; dy = att.y - n.y; d = Math.sqrt(dx * dx + dy * dy) || 1;
        if (d < R) {
          f = (1 - d / R);
          var pull = (d < 46 ? -0.05 : 0.022) * f * (att === focusPt ? 0.5 : 1);
          n.vx += dx / d * pull * dt; n.vy += dy / d * pull * dt;
          n.g = Math.max(n.g, f * 0.85);
        }
      }
      // relax speed toward base drift
      var sp = Math.sqrt(n.vx * n.vx + n.vy * n.vy) || 0.0001, want = n.bs;
      var m = 1 + (want / sp - 1) * 0.02 * dt; n.vx *= m; n.vy *= m;
      if (sp > 6) { n.vx *= 6 / sp; n.vy *= 6 / sp; }
      n.x += n.vx * dt * k; n.y += n.vy * dt * k;
      // wrap
      if (n.x < -30) n.x = W + 30; else if (n.x > W + 30) n.x = -30;
      if (n.y < -30) n.y = H + 30; else if (n.y > H + 30) n.y = -30;
      n.g *= Math.pow(0.95, dt);
    }
    // signals
    for (i = signals.length - 1; i >= 0; i--) {
      var s = signals[i], A = nodes[s.a], B = nodes[s.b];
      if (!A || !B) { signals.splice(i, 1); continue; }
      dx = B.x - A.x; dy = B.y - A.y; d = Math.sqrt(dx * dx + dy * dy) || 1;
      if (d > L * 1.35) { signals.splice(i, 1); continue; }
      s.t += s.sp * dt * k / d * 3.2;
      if (s.t >= 1) {
        B.g = 1;
        if (w.FPNet.onSignal && Math.random() < 0.35) w.FPNet.onSignal(B.x, B.y);
        signals.splice(i, 1);
        if (s.hops > 0 && signals.length < 60) {
          var nb = adj[s.b];
          if (nb && nb.length) {
            var to = nb[(Math.random() * nb.length) | 0];
            if (to === s.a && nb.length > 1) to = nb[(nb.indexOf(to) + 1) % nb.length];
            signals.push({ a: s.b, b: to, t: 0, sp: s.sp, hops: s.hops - 1, c: s.c });
          }
        }
      }
    }
    // spontaneous signals
    spawnT -= dt;
    if (spawnT <= 0 && nodes.length) {
      spawnSignal((Math.random() * nodes.length) | 0, (Math.random() * 4) | 0);
      spawnT = reduced ? rnd(200, 400) : rnd(25, 75) * (1 - energy * 0.7);
    }
    for (i = rings.length - 1; i >= 0; i--) { rings[i].r += 9 * dt; rings[i].a *= Math.pow(0.94, dt); if (rings[i].a < 0.02) rings.splice(i, 1); }
  }

  function draw() {
    var i, j, a, b, dx, dy, d2, al, N = nodes.length;
    cx.clearRect(0, 0, W, H);
    // adjacency + edges
    for (i = 0; i < N; i++) { if (adj[i]) adj[i].length = 0; else adj[i] = []; }
    adj.length = N;
    var ar = accent[0] | 0, ag = accent[1] | 0, ab = accent[2] | 0;
    cx.lineWidth = 1;
    cx.strokeStyle = 'rgb(' + ar + ',' + ag + ',' + ab + ')';
    var px = pointer.x, py = pointer.y, ps = pointer.s, R2 = R * R;
    for (i = 0; i < N; i++) {
      a = nodes[i];
      for (j = i + 1; j < N; j++) {
        b = nodes[j]; dx = a.x - b.x; if (dx > L || dx < -L) continue;
        dy = a.y - b.y; if (dy > L || dy < -L) continue;
        d2 = dx * dx + dy * dy; if (d2 > L2) continue;
        adj[i].push(j); adj[j].push(i);
        var q = 1 - Math.sqrt(d2) / L;
        al = q * (0.16 + q * 0.34 + energy * 0.5) + (a.g + b.g) * 0.22 * q;
        if (ps > 0.01) {
          var mx = (a.x + b.x) / 2 - px, my = (a.y + b.y) / 2 - py, md = mx * mx + my * my;
          if (md < R2) al += (1 - md / R2) * 0.55 * q * ps;
        }
        if (al < 0.015) continue;
        cx.globalAlpha = al > 1 ? 1 : al;
        cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke();
      }
    }
    // pointer "synapses"
    if (ps > 0.01) {
      cx.strokeStyle = 'rgb(165,243,252)';
      for (i = 0; i < N; i++) {
        a = nodes[i]; dx = a.x - px; dy = a.y - py; d2 = dx * dx + dy * dy;
        if (d2 < R2 * 0.55) {
          cx.globalAlpha = (1 - d2 / (R2 * 0.55)) * 0.45 * ps;
          cx.beginPath(); cx.moveTo(px, py); cx.lineTo(a.x, a.y); cx.stroke();
        }
      }
    }
    cx.globalCompositeOperation = 'lighter';
    // rings
    for (i = 0; i < rings.length; i++) {
      var rg = rings[i]; cx.globalAlpha = rg.a; cx.strokeStyle = rg.c; cx.lineWidth = 1.5;
      cx.beginPath(); cx.arc(rg.x, rg.y, rg.r, 0, 6.2832); cx.stroke();
    }
    cx.lineWidth = 1;
    // nodes
    var t = performance.now() / 1000;
    for (i = 0; i < N; i++) {
      a = nodes[i];
      var tw = 0.55 + 0.25 * Math.sin(t * 1.3 + a.ph), gl = a.g;
      var s = a.r * (5 + gl * 7);
      cx.globalAlpha = Math.min(1, tw * 0.6 + gl * 0.7 + energy * 0.3);
      cx.drawImage(sprite(a.c), a.x - s, a.y - s, s * 2, s * 2);
    }
    if (ps > 0.01) { var ms = 26; cx.globalAlpha = 0.5 * ps; cx.drawImage(sprite('#a5f3fc'), px - ms, py - ms, ms * 2, ms * 2); }
    // signals
    for (i = 0; i < signals.length; i++) {
      var sg = signals[i], A = nodes[sg.a], B = nodes[sg.b]; if (!A || !B) continue;
      var x = A.x + (B.x - A.x) * sg.t, y = A.y + (B.y - A.y) * sg.t, t0 = Math.max(0, sg.t - 0.35);
      var x0 = A.x + (B.x - A.x) * t0, y0 = A.y + (B.y - A.y) * t0;
      cx.globalAlpha = 0.8; cx.strokeStyle = sg.c; cx.lineWidth = 1.6;
      cx.beginPath(); cx.moveTo(x0, y0); cx.lineTo(x, y); cx.stroke();
      cx.globalAlpha = 1; cx.drawImage(sprite(sg.c), x - 9, y - 9, 18, 18);
    }
    cx.globalAlpha = 1; cx.lineWidth = 1; cx.globalCompositeOperation = 'source-over';
  }

  function loop(now) {
    raf = w.requestAnimationFrame(loop);
    var dt = last ? (now - last) / 16.667 : 1; 
    if (reduced && (frameSkip = (frameSkip + 1) % 4)) return; // ~15 fps when reduced motion
    last = now; if (dt > 3) dt = 3;
    step(dt); draw();
    stats.frames++; fpsAcc += dt * 16.667; fpsN++;
    if (fpsAcc > 1000) { stats.fps = Math.round(fpsN * 1000 / fpsAcc); fpsAcc = 0; fpsN = 0; }
  }
  function start() { if (running) return; running = true; last = 0; raf = w.requestAnimationFrame(loop); }
  function stop() { running = false; w.cancelAnimationFrame(raf); }

  var api = w.FPNet = {
    stats: stats, onSignal: null,
    init: function (canvas) {
      cv = canvas; cx = cv.getContext('2d', { alpha: true });
      if (!cx) throw new Error('no canvas 2d');
      mq = w.matchMedia ? w.matchMedia('(prefers-reduced-motion: reduce)') : null;
      reduced = !!(mq && mq.matches);
      if (mq && mq.addEventListener) mq.addEventListener('change', function (e) { reduced = e.matches; resize(); });
      var rt; w.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 120); });
      resize();
      w.addEventListener('pointermove', function (e) { pointer.x = e.clientX; pointer.y = e.clientY; pointer.on = true; }, { passive: true });
      w.addEventListener('pointerdown', function (e) {
        pointer.x = e.clientX; pointer.y = e.clientY; pointer.on = true;
        if (e.target === document.documentElement || e.target === document.body || (e.target.classList && e.target.classList.contains('shell'))) api.burst(e.clientX, e.clientY, 0.45);
      }, { passive: true });
      w.addEventListener('pointerup', function (e) { if (e.pointerType !== 'mouse') pointer.on = false; }, { passive: true });
      document.addEventListener('pointerleave', function () { pointer.on = false; });
      w.addEventListener('blur', function () { pointer.on = false; });
      document.addEventListener('mouseout', function (e) { if (!e.relatedTarget) pointer.on = false; });
      document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });
      draw();
      for (var i = 0; i < 6; i++) spawnSignal((Math.random() * nodes.length) | 0, 2);
      start();
      return api;
    },
    burst: function (x, y, power) {
      power = power == null ? 1 : power;
      if (x == null) { x = W / 2; y = H / 2; }
      rings.push({ x: x, y: y, r: 6, a: 0.55 * power + 0.1, c: 'rgb(' + accentT.join(',') + ')' });
      if (reduced) { energy = Math.min(1, energy + 0.3 * power); return; }
      energy = Math.min(1.2, energy + power);
      var maxD = Math.sqrt(W * W + H * H) * 0.6, near = [];
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i], dx = n.x - x, dy = n.y - y, d = Math.sqrt(dx * dx + dy * dy) || 1;
        var f = Math.max(0, 1 - d / maxD);
        n.vx += dx / d * f * 1.6 * power; n.vy += dy / d * f * 1.6 * power;
        n.g = Math.max(n.g, f * power);
        near.push([d, i]);
      }
      near.sort(function (a, b) { return a[0] - b[0]; });
      var cnt = Math.round(6 + 12 * power);
      for (var k = 0; k < cnt && k < near.length; k++) spawnSignal(near[k][1], 2 + ((Math.random() * 4) | 0));
    },
    setAccent: function (h) { accentT = hex(h); },
    attract: function (x, y) { focusPt = x == null ? null : { x: x, y: y }; },
    isReduced: function () { return reduced; }
  };
})(window);
