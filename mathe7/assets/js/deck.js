/* =========================================================
   Mini-Präsentations-Engine (ohne Abhängigkeiten, läuft unter file://)
   Tasten: → ↓ Leertaste PageDown = weiter | ← ↑ PageUp Backspace = zurück
           F / F5 = Vollbild | O / M = Kapitelmenü | N = Notizen
           T = Timer | B / . = Bild schwarz | A = alles aufdecken | H / ? = Hilfe
           Zahl + Enter = zu Folie springen | Pos1 / Ende = erste / letzte Folie
   ========================================================= */
(function(){
  'use strict';
  var params = new URLSearchParams(location.search);
  var EMBED = params.has('embed');
  var deck = { idx:0, slides:[], listeners:{} };
  window.Deck = deck;

  var stage, viewport, slides, chapters = window.CHAPTERS || [];

  function $(s,r){return (r||document).querySelector(s)}
  function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
  function el(tag,cls,html){var e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e}

  /* ---------- Skalierung ---------- */
  function fit(){
    var s = Math.min(window.innerWidth/1920, window.innerHeight/1080);
    stage.style.setProperty('--scale', s);
  }

  /* ---------- Schritte ---------- */
  function stepsOf(slide){ return $$('.step', slide); }
  function visibleCount(slide){ return stepsOf(slide).filter(function(s){return s.classList.contains('visible')}).length; }
  function showStep(s, on){
    if(on === s.classList.contains('visible')) return;
    s.classList.toggle('visible', on);
    var tc = s.getAttribute('data-toggle-class');
    if(tc){ var t = s.getAttribute('data-target') ? $(s.getAttribute('data-target')) : s.parentElement.closest('.quiz,.slide'); if(t) t.classList.toggle(tc, on); }
  }
  function setSteps(slide, n){ // n = Anzahl sichtbarer Schritte (in DOM-Reihenfolge), -1 = alle
    var st = stepsOf(slide); if(n<0) n = st.length;
    st.forEach(function(s,i){ showStep(s, i<n); });
    slide._hist = st.slice(0,n);
    emit(slide,'step');
  }
  function nextStep(slide){
    var st = stepsOf(slide).filter(function(s){return !s.classList.contains('visible')});
    if(!st.length) return false;
    showStep(st[0], true); (slide._hist = slide._hist||[]).push(st[0]); emit(slide,'step'); return true;
  }
  function prevStep(slide){
    var h = slide._hist||[];
    while(h.length){ var s=h.pop(); if(s.classList.contains('visible')){ showStep(s,false); emit(slide,'step'); return true; } }
    var vis = stepsOf(slide).filter(function(s){return s.classList.contains('visible')});
    if(vis.length){ showStep(vis[vis.length-1],false); emit(slide,'step'); return true; }
    return false;
  }
  function emit(slide, type){
    var ev = new CustomEvent('deck:'+type, {detail:{slide:slide, steps:visibleCount(slide), total:stepsOf(slide).length}});
    slide.dispatchEvent(ev);
    if(type==='step' || type==='enter') { updateHud();  }
  }

  /* ---------- Navigation ---------- */
  function go(i, opts){
    opts = opts||{};
    i = Math.max(0, Math.min(slides.length-1, i));
    var prev = slides[deck.idx], cur = slides[i], forward = i >= deck.idx;
    if(prev && prev!==cur){ prev.classList.remove('active'); emit(prev,'leave'); }
    slides.forEach(function(s,k){ s.classList.toggle('past', k<i); if(k!==i) s.classList.remove('active'); });
    deck.idx = i;
    if(opts.steps!=null) setSteps(cur, opts.steps);
    else if(prev!==cur) setSteps(cur, forward ? 0 : -1);
    cur.classList.add('active');
    stage.classList.toggle('on-chapter', cur.classList.contains('chapter')||cur.classList.contains('title'));
    stage.classList.toggle('on-title', cur.classList.contains('title'));
    document.body.style.setProperty('--pa', getComputedStyle(cur).getPropertyValue('--accent'));
    stage.style.setProperty('--pa', getComputedStyle(cur).getPropertyValue('--accent'));
    if(!EMBED){ var h = '#'+(i+1); if(location.hash!==h) history.replaceState(null,'',h); }
    emit(cur,'enter');
    renderNotes(); markOverview();
  }
  deck.go = go;
  deck.next = function(skip){ var s=slides[deck.idx]; if(!skip && nextStep(s)) return; if(deck.idx<slides.length-1) go(deck.idx+1); };
  deck.prev = function(skip){ var s=slides[deck.idx]; if(!skip && prevStep(s)) return; if(deck.idx>0) go(deck.idx-1); };
  deck.revealAll = function(){ setSteps(slides[deck.idx], -1); };
  deck.current = function(){ return slides[deck.idx]; };

  /* ---------- HUD ---------- */
  var hud, bar, chapLabel, stepsDots;
  function titleOf(s){ return s.getAttribute('data-title') || (s.querySelector('h1,h2,.qq,.rq,.bubble')||{}).textContent || 'Folie'; }
  function chapterOf(s){ return parseInt(s.getAttribute('data-chapter')||'1',10); }
  function buildHud(){
    var prog = el('div','', '<div class="bar"></div><div class="ticks"></div>'); prog.id='progress'; stage.appendChild(prog);
    bar = $('.bar',prog);
    // Kapitel-Markierungen
    var ticks = $('.ticks',prog), last=null;
    slides.forEach(function(s,i){ var c=chapterOf(s); if(last!==null && c!==last){ var t=el('i'); t.style.left=(i/(slides.length)*100)+'%'; ticks.appendChild(t);} last=c; });
    hud = el('div','', '<span class="credit">Theodor Fontane Gemeinschaftsschule · Lehrer P. Kurlavičius</span><button data-a="menu" title="Kapitelmenü (O)">☰</button><button data-a="prev" title="Zurück (←)">‹</button><span class="num"></span><button data-a="next" title="Weiter (→)">›</button>');
    hud.id='hud'; stage.appendChild(hud);
    hud.addEventListener('click', function(e){ var a=e.target.closest('button'); if(!a) return; a=a.dataset.a;
      if(a==='menu') toggle('overview'); if(a==='prev') deck.prev(); if(a==='next') deck.next(); });
    chapLabel = el('div'); chapLabel.id='chapterlabel'; stage.appendChild(chapLabel);
    stepsDots = el('div'); stepsDots.id='steps-left'; stage.appendChild(stepsDots);
  }
  function updateHud(){
    if(!hud) return;
    var s = slides[deck.idx];
    $('.num',hud).textContent = (deck.idx+1)+' / '+slides.length;
    bar.style.width = ((deck.idx+1)/slides.length*100)+'%';
    var c = chapters[chapterOf(s)-1];
    chapLabel.textContent = c ? ('Kapitel '+chapterOf(s)+' · '+c.name) : '';
    var rest = stepsOf(s).filter(function(x){return !x.classList.contains('visible')}).length;
    stepsDots.innerHTML = rest ? new Array(Math.min(rest,12)+1).join('<i></i>') : '';
    stepsDots.title = rest ? ('Noch '+rest+' Schritt(e) zum Aufdecken') : '';
  }

  /* ---------- Overlays ---------- */
  var ov = {};
  function overlay(id, html){ var o=el('div','overlay',html||''); o.id=id; stage.appendChild(o); ov[id]=o; return o; }
  function toggle(id, force){
    var o = ov[id]; if(!o) return;
    var on = force!=null ? force : !o.classList.contains('show');
    if(on && id!=='notes') Object.keys(ov).forEach(function(k){ if(k!==id && k!=='notes') ov[k].classList.remove('show'); });
    o.classList.toggle('show', on);
    if(id==='overview' && on) markOverview(true);
  }
  deck.toggle = toggle;
  var TYPE_ICON = {heft:'✏️', uebung:'⭐', check:'✅', denk:'💬', quiz:'✋', demo:'▶️', chapter:'📌', title:'🏠', merk:'💡'};
  function typeOf(s){ var t=['heft','uebung','check','denk','quiz','demo','chapter','title','merk'].filter(function(k){return s.classList.contains(k)}); return t[0]||''; }
  function buildOverview(){
    var o = overlay('overview');
    var html = '<h2>Kapitelmenü <small>Klick = springen · O / Esc = schließen</small></h2><div class="chapters">';
    chapters.forEach(function(c,ci){
      var n=ci+1, items=slides.map(function(s,i){return {s:s,i:i}}).filter(function(x){return chapterOf(x.s)===n});
      if(!items.length) return;
      html += '<div class="chap" data-chapter="'+n+'"><header data-go="'+items[0].i+'"><span>'+(c.lesson||'')+' · Kapitel '+n+'</span>'+c.name+'</header><ol>';
      items.forEach(function(x){ var t=typeOf(x.s); html += '<li data-go="'+x.i+'"><b>'+(x.i+1)+'</b><span class="t emoji">'+(TYPE_ICON[t]||'•')+'</span><span>'+esc(titleOf(x.s))+'</span></li>'; });
      html += '</ol></div>';
    });
    o.innerHTML = html+'</div>';
    o.addEventListener('click', function(e){ var g=e.target.closest('[data-go]'); if(g){ go(+g.dataset.go); toggle('overview',false);} });
  }
  function markOverview(scroll){ if(!ov.overview) return; $$('li[data-go]',ov.overview).forEach(function(li){ var c=+li.dataset.go===deck.idx; li.classList.toggle('cur',c); if(c&&scroll) li.scrollIntoView({block:'nearest'}); }); }
  function esc(t){ return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}).replace(/\s+/g,' ').trim(); }
  function notesHtml(s){ var n=$('aside.notes',s); return n ? n.innerHTML : '<i>Keine Notizen.</i>'; }
  function renderNotes(){
    if(!ov.notes) return;
    var s=slides[deck.idx], nx=slides[deck.idx+1];
    ov.notes.innerHTML = '<h4>Notizen für die Lehrkraft · Folie '+(deck.idx+1)+' – '+esc(titleOf(s))+'</h4>'+notesHtml(s)+
      (nx?'<div class="next">Nächste Folie: '+esc(titleOf(nx))+'</div>':'');
  }
  function buildHelp(){
    overlay('help','<h2>Tastenkürzel</h2><table>'+
     [['→  ↓  Leertaste  Bild↓','weiter (deckt erst Schritte auf)'],['←  ↑  Bild↑  Rücktaste','zurück'],['Umschalt + → / ←','Folie wechseln ohne Schritte'],
      ['F  (oder F5)','Vollbild an / aus'],['O  oder  M','Kapitelmenü'],['N','Notizen für die Lehrkraft einblenden'],
      ['T','großer Timer (1–9 = Minuten, Leertaste = Start/Pause)'],['A','alle Schritte der Folie aufdecken'],['B  oder  .','Bild schwarz (Aufmerksamkeit!)'],
      ['Zahl + Enter','zu Folie springen'],['Pos1 / Ende','erste / letzte Folie'],['Wischen','weiter / zurück auf Touch-Geräten']]
     .map(function(r){return '<tr><td>'+r[0]+'</td><td>'+r[1]+'</td></tr>'}).join('')+'</table>');
    ov.help.addEventListener('click', function(){ toggle('help',false); });
  }

  /* ---------- Timer ---------- */
  var T = { total:300, remaining:300, running:false, endAt:0, source:null, done:false, label:'Arbeitsphase' };
  deck.timer = T;
  var RING = 2*Math.PI*290;
  function fmt(sec){ sec=Math.max(0,Math.ceil(sec)); var m=Math.floor(sec/60), s=sec%60; return m+':'+(s<10?'0':'')+s; }
  function buildTimer(){
    var o = overlay('timer',
      '<div class="label">Arbeitsphase</div><div class="ring"><svg viewBox="0 0 640 640"><circle cx="320" cy="320" r="290" fill="none" stroke="#2c3850" stroke-width="36"/>'+
      '<circle class="arc" cx="320" cy="320" r="290" fill="none" stroke="#22a45d" stroke-width="36" stroke-linecap="round" stroke-dasharray="'+RING+'" stroke-dashoffset="0"/></svg><div class="time">5:00</div></div>'+
      '<div class="ctrl"><button data-t="-60">− 1 min</button><button class="primary" data-t="go">▶ Start</button><button data-t="+60">+ 1 min</button><button data-t="reset">↺</button><button data-t="close">✕ Schließen</button></div>'+
      '<div class="hint">Tasten: 1–9 = Minuten · Leertaste = Start/Pause · ↑↓ = ±1 min · T/Esc = schließen (Timer läuft weiter)</div>');
    o.addEventListener('click', function(e){ var b=e.target.closest('button'); if(!b) return; var a=b.dataset.t;
      if(a==='go') timerToggle(); else if(a==='reset') timerSet(T.total); else if(a==='close') toggle('timer',false); else timerAdd(+a); });
    var mt = el('div','', '⏱ <span>5:00</span>'); mt.id='minitimer'; stage.appendChild(mt);
    mt.addEventListener('click', function(){ toggle('timer',true); });
    setInterval(timerTick, 200);
  }
  function timerSet(sec, label, source){ T.total=sec; T.remaining=sec; T.running=false; T.done=false; if(label) T.label=label; if(source!==undefined) T.source=source; timerRender(); }
  function timerAdd(d){ if(T.running){ T.endAt+=d*1000; T.total=Math.max(60,T.total+d); } else { T.remaining=Math.max(0,T.remaining+d); T.total=Math.max(T.remaining,60);} T.done=false; timerRender(); }
  function timerToggle(){ if(T.done) timerSet(T.total); if(T.running){ T.remaining=(T.endAt-Date.now())/1000; T.running=false; } else { if(T.remaining<=0) T.remaining=T.total; T.endAt=Date.now()+T.remaining*1000; T.running=true; Sound.unlock(); } timerRender(); }
  deck.timerStart = function(min,label,source){ timerSet(Math.round(min*60),label,source||null); timerToggle(); };
  deck.timerSet = timerSet; deck.timerToggle = timerToggle; deck.fmt = fmt;
  function timerTick(){ if(!T.running) return; T.remaining=(T.endAt-Date.now())/1000; if(T.remaining<=0){ T.remaining=0; T.running=false; T.done=true; Sound.gong(); } timerRender(); }
  function timerRender(){
    var o=ov.timer; if(!o) return;
    $('.time',o).textContent = fmt(T.remaining);
    $('.label',o).textContent = T.done ? '⏰ Zeit ist um!' : T.label;
    var frac = T.total ? T.remaining/T.total : 0;
    var arc=$('.arc',o); arc.setAttribute('stroke-dashoffset', RING*(1-frac)); arc.setAttribute('stroke', frac<.2 ? '#ff6b6b' : frac<.5 ? '#ffc53d' : '#22a45d');
    $('[data-t=go]',o).textContent = T.running ? '⏸ Pause' : '▶ Start';
    o.classList.toggle('done', T.done);
    var mt=$('#minitimer'); mt.classList.toggle('show', (T.running||T.done) && !o.classList.contains('show')); mt.classList.toggle('done',T.done); $('span',mt).textContent=fmt(T.remaining);
    document.dispatchEvent(new CustomEvent('deck:timer',{detail:T}));
    
  }
  deck.timerRender = timerRender;

  /* ---------- Sound (WebAudio) ---------- */
  var Sound = window.DeckSound = {
    ctx:null,
    unlock:function(){ try{ if(!this.ctx) this.ctx=new (window.AudioContext||window.webkitAudioContext)(); if(this.ctx.state==='suspended') this.ctx.resume(); }catch(e){} return this.ctx; },
    tone:function(freq,start,dur,type,vol){ var c=this.unlock(); if(!c) return; var o=c.createOscillator(), g=c.createGain(); o.type=type||'sine'; o.frequency.value=freq;
      var t=c.currentTime+start; g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(vol||.3,t+.01); g.gain.setValueAtTime(vol||.3,t+Math.max(.01,dur-.02)); g.gain.linearRampToValueAtTime(0,t+dur);
      o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+dur+.05); },
    gong:function(){ var self=this; [0,0.9,1.8].forEach(function(t){ self.tone(660,t,.7,'sine',.35); self.tone(990,t,.5,'sine',.12); }); }
  };

  /* ---------- Vollbild ---------- */
  function fullscreen(){
    var d=document; if(!d.fullscreenElement && !d.webkitFullscreenElement){ var r=d.documentElement; (r.requestFullscreen||r.webkitRequestFullscreen).call(r); }
    else (d.exitFullscreen||d.webkitExitFullscreen).call(d);
  }

  /* ---------- Tastatur ---------- */
  var numBuf='', numTimer;
  function onKey(e){
    var t=e.target; if(t && (t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable)){ if(e.key==='Escape') t.blur(); return; }
    if(e.ctrlKey||e.metaKey||e.altKey) return;
    var k=e.key, timerOpen = ov.timer.classList.contains('show');
    if(timerOpen){
      if(k===' '||k==='Enter'){ timerToggle(); e.preventDefault(); return; }
      if(/^[1-9]$/.test(k)){ timerSet(+k*60); return; }
      if(k==='0'){ timerSet(600); return; }
      if(k==='ArrowUp'||k==='+'){ timerAdd(60); e.preventDefault(); return; }
      if(k==='ArrowDown'||k==='-'){ timerAdd(-60); e.preventDefault(); return; }
      if(k==='Escape'||k==='t'||k==='T'){ toggle('timer',false); return; }
      return;
    }
    if(ov.black.classList.contains('show') && k!=='F5'){ toggle('black',false); e.preventDefault(); return; }
    if(/^[0-9]$/.test(k)){ numBuf+=k; clearTimeout(numTimer); numTimer=setTimeout(function(){numBuf=''},2500); return; }
    if(k==='Enter' && numBuf){ go(parseInt(numBuf,10)-1); numBuf=''; return; }
    switch(k){
      case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown': case 'Spacebar': deck.next(e.shiftKey); e.preventDefault(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace': deck.prev(e.shiftKey); e.preventDefault(); break;
      case 'Home': go(0); break;
      case 'End': go(slides.length-1); break;
      case 'f': case 'F': case 'F5': fullscreen(); e.preventDefault(); break;
      case 'o': case 'O': case 'm': case 'M': toggle('overview'); break;
      case 'Escape': Object.keys(ov).forEach(function(k2){ ov[k2].classList.remove('show'); }); break;
      case 'n': case 'N': toggle('notes'); renderNotes(); break;
      case 't': case 'T': toggle('timer'); timerRender(); break;
      case 'b': case 'B': case '.': toggle('black'); break;
      case 'a': case 'A': deck.revealAll(); break;
      case 'h': case 'H': case '?': toggle('help'); break;
    }
  }

  /* ---------- Touch ---------- */
  function touch(){
    var x0=null,y0=null,t0=0;
    viewport.addEventListener('touchstart',function(e){ if(e.touches.length!==1) return; x0=e.touches[0].clientX; y0=e.touches[0].clientY; t0=Date.now(); },{passive:true});
    viewport.addEventListener('touchend',function(e){ if(x0===null) return; var t=e.changedTouches[0], dx=t.clientX-x0, dy=t.clientY-y0; x0=null;
      if(Math.abs(dx)>60 && Math.abs(dx)>Math.abs(dy)*1.3 && Date.now()-t0<800){ if(dx<0) deck.next(); else deck.prev(); } },{passive:true});
  }

  /* ---------- Start ---------- */
  function init(){
    viewport=$('#viewport'); stage=$('#stage'); slides=deck.slides=$$('.slide',stage);
    if(EMBED) document.body.classList.add('embed','no-anim');
    fit(); window.addEventListener('resize', fit);
    buildHud(); buildOverview(); overlay('notes'); buildHelp(); overlay('black'); buildTimer();
    // Klick auf Abdeckung
    stage.addEventListener('click', function(e){
      var c=e.target.closest('.step.cover:not(.visible), .step.flip:not(.visible)'); if(!c) return;
      var s=c.closest('.slide'); showStep(c,true); (s._hist=s._hist||[]).push(c); emit(s,'step');
    });
    // Folien-Timer-Widgets
    $$('.twidget').forEach(function(w){
      var min=parseFloat(w.dataset.min||'5'), lbl=w.dataset.label||'Arbeitsphase', R=2*Math.PI*62;
      w.innerHTML='<div class="tw-ring"><svg viewBox="0 0 150 150"><circle cx="75" cy="75" r="62" fill="none" stroke="#2c3850" stroke-width="14"/><circle class="a" cx="75" cy="75" r="62" fill="none" stroke="#22a45d" stroke-width="14" stroke-linecap="round" stroke-dasharray="'+R+'"/></svg><div class="tw-time">'+fmt(min*60)+'</div></div>'+
        '<div class="tw-btns"><button class="go">▶ Start '+min+' min</button><button class="bigt">⛶ Groß zeigen</button></div>';
      $('.go',w).addEventListener('click',function(){ if(T.source===w && (T.running||T.remaining<T.total)) timerToggle(); else deck.timerStart(min,lbl,w); });
      $('.bigt',w).addEventListener('click',function(){ if(T.source!==w) timerSet(min*60,lbl,w); toggle('timer',true); timerRender(); });
      document.addEventListener('deck:timer',function(){
        var mine=T.source===w, rem=mine?T.remaining:min*60, tot=mine?T.total:min*60;
        $('.tw-time',w).textContent=fmt(rem); $('.a',w).setAttribute('stroke-dashoffset', R*(1-rem/tot));
        $('.a',w).setAttribute('stroke', rem/tot<.2?'#ff6b6b':rem/tot<.5?'#ffc53d':'#22a45d');
        $('.go',w).textContent = mine&&T.running ? '⏸ Pause' : mine&&T.done ? '↺ Neu' : mine&&rem<tot ? '▶ Weiter' : '▶ Start '+min+' min';
        w.classList.toggle('done', mine&&T.done);
      });
    });
    if(!EMBED){ document.addEventListener('keydown', onKey); touch(); }
    // Sprung-Links innerhalb von Folien
    stage.addEventListener('click', function(e){ var g=e.target.closest('[data-goto]'); if(g){ go(+g.dataset.goto-1); } });
    function fromHash(){ var m=/^#(\d+)(?::(-?\d+))?/.exec(location.hash); if(m){ go(parseInt(m[1],10)-1, m[2]!=null?{steps:+m[2]}:{}); return true;} return false; }
    window.addEventListener('hashchange', fromHash);
    document.dispatchEvent(new CustomEvent('deck:ready'));
    if(!fromHash()) go(0);
    timerRender();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
