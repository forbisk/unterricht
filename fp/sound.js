/* fp/sound.js – generated ambience & UI sounds (Web Audio API, no audio files).
   OFF by default; preference stored in localStorage('fp-sound'). Browsers only allow
   audio after a user gesture, so the context is created lazily on the first interaction. */
(function (w) {
  'use strict';
  var KEY = 'fp-sound', AC = w.AudioContext || w.webkitAudioContext;
  var ctx = null, master = null, padGain = null, padNodes = [], enabled = false, wanted = false;
  var lastBlip = 0, lastSparkle = 0, noiseBuf = null;
  try { wanted = localStorage.getItem(KEY) === '1'; } catch (e) {}

  function ensure() {
    if (!AC) return false;
    if (!ctx) {
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = 0;
      var comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -18; comp.ratio.value = 3;
      master.connect(comp); comp.connect(ctx.destination);
      // tiny feedback delay for a sense of space
      w.FPSound._fx = delayBus();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return true;
  }
  function delayBus() {
    var inp = ctx.createGain(), d = ctx.createDelay(1), fb = ctx.createGain(), lp = ctx.createBiquadFilter(), out = ctx.createGain();
    d.delayTime.value = 0.28; fb.gain.value = 0.32; lp.type = 'lowpass'; lp.frequency.value = 2400; out.gain.value = 0.5;
    inp.connect(d); d.connect(lp); lp.connect(fb); fb.connect(d); lp.connect(out); out.connect(master);
    return inp;
  }
  function noise() {
    if (noiseBuf) return noiseBuf;
    var len = ctx.sampleRate * 1.2, b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return (noiseBuf = b);
  }

  function startPad() {
    if (padNodes.length) return;
    var t = ctx.currentTime;
    padGain = ctx.createGain(); padGain.gain.setValueAtTime(0, t); padGain.gain.linearRampToValueAtTime(0.3, t + 4);
    var lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520; lp.Q.value = 0.7;
    var lfo = ctx.createOscillator(), lfoG = ctx.createGain(); lfo.frequency.value = 0.045; lfoG.gain.value = 240;
    lfo.connect(lfoG); lfoG.connect(lp.frequency); lfo.start();
    padGain.connect(lp); lp.connect(master);
    // D minor-ish open chord: D2, A2, D3, F3 (soft), E4 shimmer
    [[73.42, 'sine', 0.22], [110.0, 'triangle', 0.10], [146.83, 'sine', 0.10], [174.61, 'sine', 0.05], [329.63, 'sine', 0.018]].forEach(function (v, i) {
      [-4, 4].forEach(function (det) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = v[1]; o.frequency.value = v[0]; o.detune.value = det + (i * 1.7);
        // slow tremolo per voice
        var tl = ctx.createOscillator(), tg = ctx.createGain(); tl.frequency.value = 0.07 + i * 0.031; tg.gain.value = v[2] * 0.45;
        g.gain.value = v[2]; tl.connect(tg); tg.connect(g.gain); tl.start();
        o.connect(g); g.connect(padGain); o.start();
        padNodes.push(o, tl);
      });
    });
    padNodes.push(lfo);
  }
  function stopPad() {
    if (!padNodes.length) return;
    var t = ctx.currentTime, nodes = padNodes, g = padGain;
    g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(g.gain.value, t); g.gain.linearRampToValueAtTime(0, t + 0.8);
    setTimeout(function () { nodes.forEach(function (n) { try { n.stop(); } catch (e) {} }); g.disconnect(); }, 900);
    padNodes = [];
  }

  function tone(freq, dur, vol, type, when, toFx) {
    var t = ctx.currentTime + (when || 0), o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master); if (toFx) g.connect(w.FPSound._fx);
    o.start(t); o.stop(t + dur + 0.05);
  }

  var api = w.FPSound = {
    supported: !!AC,
    isOn: function () { return wanted; },
    set: function (on) {
      wanted = !!on;
      try { localStorage.setItem(KEY, wanted ? '1' : '0'); } catch (e) {}
      if (wanted) api.unlock(); else if (ctx) {
        enabled = false; var t = ctx.currentTime;
        master.gain.cancelScheduledValues(t); master.gain.setValueAtTime(master.gain.value, t); master.gain.linearRampToValueAtTime(0, t + 0.6);
        stopPad();
      }
    },
    /* call from a user gesture */
    unlock: function () {
      if (!wanted || enabled) return;
      if (!ensure()) return;
      enabled = true;
      var t = ctx.currentTime;
      master.gain.cancelScheduledValues(t); master.gain.setValueAtTime(master.gain.value, t); master.gain.linearRampToValueAtTime(0.55, t + 1.2);
      startPad();
    },
    suspend: function (yes) { if (ctx) { if (yes) ctx.suspend(); else if (enabled) ctx.resume(); } },
    blip: function (i) { // hover
      if (!enabled) return; var n = performance.now(); if (n - lastBlip < 70) return; lastBlip = n;
      var scale = [659.25, 739.99, 880, 987.77, 1108.73, 1318.5];
      tone(scale[(i || 0) % scale.length], 0.12, 0.05, 'sine', 0, true);
    },
    whoosh: function (dir) { // level change / click
      if (!enabled) return;
      var t = ctx.currentTime, src = ctx.createBufferSource(), bp = ctx.createBiquadFilter(), g = ctx.createGain();
      src.buffer = noise(); bp.type = 'bandpass'; bp.Q.value = 1.2;
      var f0 = dir < 0 ? 2600 : 380, f1 = dir < 0 ? 420 : 2800;
      bp.frequency.setValueAtTime(f0, t); bp.frequency.exponentialRampToValueAtTime(f1, t + 0.45);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.09, t + 0.12); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
      src.connect(bp); bp.connect(g); g.connect(master); src.start(t); src.stop(t + 0.65);
      // chime
      var base = dir < 0 ? 587.33 : 880;
      tone(base, 0.9, 0.04, 'sine', 0.06, true);
      tone(base * 1.5, 0.8, 0.022, 'sine', 0.12, true);
      if (dir > 0) tone(base * 2, 0.7, 0.012, 'triangle', 0.18, true);
    },
    sparkle: function () { // network signal
      if (!enabled) return; var n = performance.now(); if (n - lastSparkle < 1400) return; lastSparkle = n;
      var f = [1760, 1975.5, 2349.3, 2637][(Math.random() * 4) | 0];
      tone(f, 0.25, 0.008, 'sine', 0, true);
    }
  };
})(window);
