/* =========================================================
   Folien-Aufbau (Kopfzeilen, Heft-Einträge) + interaktive Mathe-Demos
   Läuft vor deck.js-Init (Skripte am Ende von <body>). Braucht mathcore.js.
   ========================================================= */
(function(){
  'use strict';
  var MC = window.MathCore;
  function $(s,r){return (r||document).querySelector(s)}
  function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
  function h(tag, cls, html){ var e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e; }
  var CH = window.CHAPTERS || [];
  var fmt = MC.fmt;
  function fnumStr(f){ return MC.fstr(f); }

  /* ---------- 1. Kopfzeilen + Typ-Abzeichen ---------- */
  var BADGE = { heft:['heft','i-pencil','Heft-Eintrag'], denk:['denk','i-chat','Denkfrage'], quiz:['quiz','i-hand','Quiz'],
                demo:['demo','i-play','Live-Demo'], merk:['merk','i-bulb','Merke'], uebung:['uebung','i-pencil','Üben'],
                loesung:['loesung','i-check','Lösungen'], text:['text','i-book','Textaufgabe'], fehler:['fehler','i-search','Fehler finden'] };
  $$('.slide').forEach(function(s){
    if(s.classList.contains('title') || s.classList.contains('chapter')) return;
    var c = parseInt(s.dataset.chapter||'1',10), ch = CH[c-1];
    if(ch && !$('.chip',s)) s.insertAdjacentHTML('afterbegin','<div class="chip"><span class="num">'+c+'</span>'+ch.name+'</div>');
    Object.keys(BADGE).forEach(function(k){
      if(s.classList.contains(k)){ var b=BADGE[k], txt=s.dataset.badge||b[2];
        s.insertAdjacentHTML('afterbegin','<div class="badge '+b[0]+'"><svg><use href="#'+b[1]+'"/></svg>'+txt+'</div>'); }
    });
  });

  /* ---------- 2. Heft-Einträge rendern ---------- */
  window.renderHeft = function(hf, steps){
    var st = steps ? ' step' : '';
    return hf.blocks.map(function(b){ return '<div class="hb '+(b.cls||'')+st+'">'+b.html+'</div>'; }).join('');
  };
  $$('.slide.heft[data-heft]').forEach(function(s){
    var hf = (window.HEFT||[]).filter(function(x){return x.n===+s.dataset.heft})[0]; if(!hf) return;
    var extra = Array.prototype.slice.call(s.childNodes).filter(function(n){ return !(n.classList && (n.classList.contains('chip')||n.classList.contains('badge'))); });
    var wrap = h('div','heft-body');
    wrap.innerHTML = '<div class="hkicker"><svg><use href="#i-pencil"/></svg>Heft-Eintrag '+hf.n+'</div><h2>'+hf.title+'</h2>'+window.renderHeft(hf,true);
    extra.forEach(function(n){ wrap.appendChild(n); });
    s.appendChild(wrap);
    s.insertAdjacentHTML('beforeend','<div class="holes">'+new Array(9).join('<i></i>')+'</div>'+
      '<div class="heft-hint"><span class="itag '+(hf.tagcls||'abschreiben')+'">'+(hf.tag||'ABSCHREIBEN')+'</span> Überschrift unterstreichen, Datum dazu!</div>');
    if(!s.dataset.title) s.dataset.title = 'HEFT '+hf.n+': '+hf.title;
  });

  /* ---------- 3. Sprung zu Kapitel ---------- */
  document.addEventListener('click', function(e){
    var b = e.target.closest('[data-goto-ch]'); if(!b || !window.Deck) return;
    var n = b.getAttribute('data-goto-ch'), idx = Deck.slides.findIndex(function(s){ return s.dataset.chapter===n; });
    if(idx>=0) Deck.go(idx);
  });

  /* ---------- 4. Quiz: Antwort anklicken ---------- */
  document.addEventListener('click', function(e){
    var o = e.target.closest('.quiz .opt'); if(!o) return;
    var q = o.closest('.slide');
    if(o.classList.contains('correct')){ if(window.Deck && Deck.current()===q) Deck.revealAll(); else q.classList.add('revealed'); if(window.DeckSound) DeckSound.tone(880,0,.15,'sine',.2); }
    else { o.classList.remove('wrong'); void o.offsetWidth; o.classList.add('wrong'); if(window.DeckSound) DeckSound.tone(200,0,.25,'square',.08); }
  });

  /* ---------- 5. Lösungs-Raster (Gleichungen untereinander) ---------- */
  function opHtml(op, label){
    if(!op) return '';
    if(op==='ZF'||op==='KA') return '<span class="lab">'+(label||'zusammenfassen')+'</span>';
    if(op==='swap') return '<span class="lab">⇄ Seiten tauschen</span>';
    var k=op[0], rest=op.slice(1), sym={'+':'+','-':'−','*':'·',':':':'}[k];
    return '| '+sym+' '+fmt(rest);
  }
  function splitEq(eq){ var i=eq.indexOf('='); return [eq.slice(0,i), eq.slice(i+1)]; }
  function solveHtml(lines, opts){
    opts=opts||{}; var st=opts.steps?' step':'', out='<div class="solve'+(opts.cls?' '+opts.cls:'')+'">';
    lines.forEach(function(l,i){ var p=splitEq(l.eq);
      out+='<div class="sl'+(i>0?st:'')+(i===lines.length-1&&opts.final!==false?' fin':'')+'"><span class="l">'+fmt(p[0])+'</span><span class="e">=</span><span class="r">'+fmt(p[1])+'</span><span class="o">'+opHtml(l.op,l.label)+'</span></div>'; });
    return out+'</div>';
  }
  window.solveHtml = solveHtml;
  function alignOne(s){
    s.style.setProperty('--lw','max-content'); s.style.setProperty('--rw','max-content');
    var L=0, R=0; $$('.sl', s).forEach(function(r){ L=Math.max(L, $('.l',r).scrollWidth); R=Math.max(R, $('.r',r).scrollWidth); });
    if(L) s.style.setProperty('--lw', Math.ceil(L+4)+'px'); if(R) s.style.setProperty('--rw', Math.ceil(R+4)+'px');
  }
  function tooWide(s){ var p=s.parentElement, cs=getComputedStyle(p), w=Math.min(s.clientWidth, p.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight)); if(!w||w<=0) return false; return $$('.sl', s).some(function(r){ return r.scrollWidth > w+2; }); }
  function alignSolve(root){
    $$('.solve', root).forEach(function(s){
      if(s.dataset.fs){ s.style.fontSize=''; delete s.dataset.fs; }
      alignOne(s);
      var k=0, base=parseFloat(getComputedStyle(s).fontSize);
      while(tooWide(s) && k<10){ k++; s.style.fontSize=(base*Math.pow(0.92,k)).toFixed(1)+'px'; s.dataset.fs='1'; alignOne(s); }
    });
  }
  window.alignSolve = alignSolve;
  function probeHtml(eq, x){
    var p = MC.probe(eq, x);
    return '<div class="probe">Probe mit <b>'+fmt('x='+fnumStr(MC.fnum(x)))+'</b>: &nbsp;<span>links: '+fmt(p.left)+' = '+fmt(MC.fstr(p.lv))+'</span> &nbsp; <span>rechts: '+fmt(p.right)+' = '+fmt(MC.fstr(p.rv))+'</span> '+(p.ok?'<b class="ok">✔ wahr</b>':'<b class="bad">✘ falsch</b>')+'</div>';
  }

  /* ---------- 6. Aufgabengenerator ---------- */
  function initGen(g){
    var levels=(g.dataset.levels||'1,2,3').split(',').map(Number), level=+(g.dataset.level||levels[0]), task=null, shown=0;
    g.innerHTML='<div class="gen-top"><div class="seg gen-lv">'+levels.map(function(l){ var L=MC.LEVELS[l]; return '<button data-l="'+l+'">'+'★★★'.slice(0,L.stars)+' '+fmt(L.name.indexOf('=')>0?L.name.replace(/ /g,'').replace('·','*'):'x')+(L.name.indexOf('=')>0?'':' '+L.name.replace('x ','')) +'</button>'; }).join('')+'</div>'+
      '<button class="btn primary gen-new"><span class="emoji">🎲</span> Neue Aufgabe</button></div>'+
      '<div class="gen-main"><div class="gen-task"></div><div class="gen-sol"></div><div class="gen-probe"></div></div>'+
      '<div class="gen-bot"><button class="btn gen-step">▶ Nächster Schritt</button><button class="btn gen-all">Alle Schritte</button><button class="btn gen-pr">✔ Probe</button><span class="gen-info"></span></div>';
    // Beschriftung der Stufen lesbarer machen
    $$('.gen-lv button',g).forEach(function(b){ var L=MC.LEVELS[b.dataset.l]; b.innerHTML='<span class="stars">'+'★★★'.slice(0,L.stars)+'</span> '+labelOf(L.name); });
    function labelOf(n){ if(/=/.test(n)) return fmt(n.replace(/\s/g,'').replace('·','*')); return n; }
    function draw(){
      $('.gen-task',g).innerHTML = '<span class="m">'+fmt(task.eq)+'</span>';
      var lines = task.steps.slice(0, shown+1);
      $('.gen-sol',g).innerHTML = shown>0 ? solveHtml(task.steps.slice(0,shown+1).map(function(l,i){ return i===shown?{eq:l.eq,op:''}:l; }), {final:shown>=task.steps.length-1}) : '';
      alignSolve(g);
      var done = shown>=task.steps.length-1;
      $('.gen-info',g).textContent = done ? (typeof task.sol==='string' ? (task.sol==='none'?'keine Lösung':'unendlich viele Lösungen') : 'Lösung gefunden!') : 'Schritt '+shown+' von '+(task.steps.length-1);
      $('.gen-step',g).disabled = done;
      $('.gen-pr',g).disabled = !done || typeof task.sol==='string';
    }
    function newTask(){ task = MC.gen(level); shown=0; $('.gen-probe',g).innerHTML=''; draw(); }
    $('.gen-lv',g).addEventListener('click', function(e){ var b=e.target.closest('button'); if(!b) return; level=+b.dataset.l; mark(); newTask(); });
    function mark(){ $$('.gen-lv button',g).forEach(function(b){ b.classList.toggle('on', +b.dataset.l===level); }); }
    $('.gen-new',g).addEventListener('click', newTask);
    $('.gen-step',g).addEventListener('click', function(){ if(shown<task.steps.length-1){ shown++; draw(); } });
    $('.gen-all',g).addEventListener('click', function(){ shown=task.steps.length-1; draw(); });
    $('.gen-pr',g).addEventListener('click', function(){ if(typeof task.sol!=='string') $('.gen-probe',g).innerHTML = probeHtml(task.eq, task.sol); });
    mark(); newTask();
    g._api = {newTask:newTask, state:function(){ return task; }, setLevel:function(l){ level=l; mark(); newTask(); }};
  }

  /* ---------- 7. Waage ---------- */
  function initWaage(w){
    var presets = JSON.parse(w.dataset.presets||'[{"l":[2,3],"r":[0,11],"x":4}]');
    var st, hist=[], log=[], reveal=false, P=0;
    var PIV={x:600,y:150}, HALF=410;
    w.innerHTML =
      '<div class="w-stage"><svg class="w-stand" viewBox="0 0 1200 620"><path d="M600 150 L600 575" stroke="#5b6b82" stroke-width="22" stroke-linecap="round"/><path d="M470 600 Q600 548 730 600 Z" fill="#5b6b82"/><rect x="440" y="592" width="320" height="22" rx="11" fill="#46546a"/><circle cx="600" cy="150" r="26" fill="#f2b705" stroke="#46546a" stroke-width="8"/></svg>'+
      '<div class="w-beam"></div><div class="w-pan L" data-side="L"><svg class="w-str" viewBox="0 0 360 370" preserveAspectRatio="none"><path d="M180 0 L8 350 M180 0 L352 350" stroke="#7a889c" stroke-width="4" fill="none"/></svg><div class="w-items"></div><div class="w-plate"></div></div>'+
      '<div class="w-pan R" data-side="R"><svg class="w-str" viewBox="0 0 360 370" preserveAspectRatio="none"><path d="M180 0 L8 350 M180 0 L352 350" stroke="#7a889c" stroke-width="4" fill="none"/></svg><div class="w-items"></div><div class="w-plate"></div></div>'+
      '<div class="w-warn">⚠ Nicht im Gleichgewicht!</div></div>'+
      '<div class="w-side"><div class="seg w-pre">'+presets.map(function(p,i){ return '<button data-p="'+i+'">'+fmt(eqOf(p.l,p.r))+'</button>'; }).join('')+'</div>'+
      '<div class="w-eq"></div><div class="w-msg"></div>'+
      '<div class="w-ops"><button class="btn" data-op="-1">− <span class="w1">1</span> auf beiden Seiten</button><button class="btn" data-op="-x">− <span class="wx">x</span> auf beiden Seiten</button>'+
      '<button class="btn" data-op="div">: 2 auf beiden Seiten</button><button class="btn" data-op="+1">+ <span class="w1">1</span> auf beiden Seiten</button></div>'+
      '<div class="w-pal"><span>Ziehen oder klicken:</span><div class="w-it x" data-t="x">x</div><div class="w-it u" data-t="u">1</div></div>'+
      '<div class="w-tools"><button class="btn mini" data-t="undo">↺ Rückgängig</button><button class="btn mini" data-t="reset">⟲ Neu</button><button class="btn mini" data-t="show">👁 x verraten</button></div>'+
      '<div class="w-log"></div></div>';
    function eqOf(l,r){ return side(l[0],l[1])+'='+side(r[0],r[1]); }
    function side(x,u){ var s=''; if(x) s=(x===1?'':x)+'x'; if(u) s+=(s?'+':'')+u; return s||'0'; }
    function load(i){ P=i; var p=presets[i]; st={L:{x:p.l[0],u:p.l[1]}, R:{x:p.r[0],u:p.r[1]}, xv:p.x}; hist=[]; log=[]; reveal=false; render(true);
      $$('.w-pre button',w).forEach(function(b){ b.classList.toggle('on', +b.dataset.p===i); }); }
    function save(){ hist.push(JSON.stringify({st:st,log:log})); }
    function weight(s){ return s.x*st.xv+s.u; }
    function balanced(){ return weight(st.L)===weight(st.R); }
    function divN(){ // Teiler, der zu genau einem x führt
      var xs = st.L.x>0 && st.R.x===0 ? st.L.x : (st.R.x>0 && st.L.x===0 ? st.R.x : 0);
      if(xs<2) { var g=MC.gcd(MC.gcd(st.L.x,st.L.u),MC.gcd(st.R.x,st.R.u)); return g>1?g:0; }
      return [st.L.x,st.L.u,st.R.x,st.R.u].every(function(v){ return v%xs===0; }) ? xs : 0;
    }
    function render(instant){
      ['L','R'].forEach(function(k){ var box=$('.w-pan.'+k+' .w-items',w), s=st[k], html='';
        for(var i=0;i<s.x;i++) html+='<div class="w-it x" data-t="x">'+(reveal?st.xv:'x')+'</div>';
        for(var j=0;j<s.u;j++) html+='<div class="w-it u" data-t="u">1</div>';
        box.innerHTML=html; });
      var d = weight(st.R)-weight(st.L), ang = Math.max(-10,Math.min(10,d*2.2)); if(d!==0 && Math.abs(ang)<3) ang = d>0?3:-3;
      var rad=ang*Math.PI/180, lx=PIV.x-HALF*Math.cos(rad), ly=PIV.y-HALF*Math.sin(rad), rx=PIV.x+HALF*Math.cos(rad), ry=PIV.y+HALF*Math.sin(rad);
      w.classList.toggle('instant', !!instant);
      $('.w-beam',w).style.transform='rotate('+ang+'deg)';
      $('.w-pan.L',w).style.transform='translate('+(lx-180)+'px,'+ly+'px)';
      $('.w-pan.R',w).style.transform='translate('+(rx-180)+'px,'+ry+'px)';
      var bal=balanced();
      w.classList.toggle('unbal', !bal);
      $('.w-eq',w).innerHTML = fmt(side(st.L.x,st.L.u))+(bal?' <b>=</b> ':' <b class="bad">≠</b> ')+fmt(side(st.R.x,st.R.u));
      var solved = bal && ((st.L.x===1&&st.L.u===0&&st.R.x===0)||(st.R.x===1&&st.R.u===0&&st.L.x===0));
      var msg = !bal ? '⚠ Du hast nur <b>eine</b> Seite verändert – die Waage kippt!' : solved ? '🎉 Geschafft: '+fmt('x='+st.xv)+' – eine Kiste wiegt '+st.xv+'.' : 'Im Gleichgewicht. Was machst du auf <b>beiden</b> Seiten?';
      $('.w-msg',w).innerHTML = msg; $('.w-msg',w).className='w-msg'+(!bal?' bad':solved?' ok':'');
      if(solved && !reveal){ reveal=true; setTimeout(function(){ render(); }, 50); }
      var n=divN();
      var bOp=function(o){ return $('[data-op="'+o+'"]',w); };
      bOp('-1').disabled = !(st.L.u>0 && st.R.u>0);
      bOp('-x').disabled = !(st.L.x>0 && st.R.x>0);
      bOp('+1').disabled = !(st.L.u<14 && st.R.u<14);
      bOp('div').disabled = !n; bOp('div').innerHTML = ': '+(n||'?')+' auf beiden Seiten';
      $('[data-t="undo"]',w).disabled = !hist.length;
      $('[data-t="show"]',w).textContent = reveal ? '🙈 x verstecken' : '👁 x verraten';
      $('.w-log',w).innerHTML = log.slice(-4).map(function(l){ return '<div>'+fmt(l.eq)+(l.op?' <span class="op">| '+l.op+'</span>':'')+'</div>'; }).join('');
    }
    function curEq(){ return side(st.L.x,st.L.u)+'='+side(st.R.x,st.R.u); }
    function leaveThen(sel, fn){ // Animation: Gegenstände fliegen weg
      var els=[]; ['L','R'].forEach(function(k){ var items=$$('.w-pan.'+k+' .w-it'+sel.t,w); var n=sel.n[k];
        items.slice(items.length-n).forEach(function(e){ els.push(e); }); });
      els.forEach(function(e){ e.classList.add('leaving'); });
      setTimeout(fn, els.length?420:0);
    }
    function both(op){
      save(); var eq0=curEq();
      if(op==='-1'){ leaveThen({t:'.u', n:{L:1,R:1}}, function(){ st.L.u--; st.R.u--; log.push({eq:eq0,op:'−1'}); render(); }); }
      else if(op==='+1'){ st.L.u++; st.R.u++; log.push({eq:eq0,op:'+1'}); render(); }
      else if(op==='-x'){ leaveThen({t:'.x', n:{L:1,R:1}}, function(){ st.L.x--; st.R.x--; log.push({eq:eq0,op:'−x'}); render(); }); }
      else if(op==='div'){ var n=divN(); if(!n) return;
        leaveThen({t:'', n:{L:(st.L.x+st.L.u)-(st.L.x+st.L.u)/n, R:(st.R.x+st.R.u)-(st.R.x+st.R.u)/n}}, function(){
          st.L.x/=n; st.L.u/=n; st.R.x/=n; st.R.u/=n; log.push({eq:eq0,op:': '+n}); render(); }); }
    }
    $('.w-ops',w).addEventListener('click', function(e){ var b=e.target.closest('button'); if(b && !b.disabled) both(b.dataset.op); });
    $('.w-pre',w).addEventListener('click', function(e){ var b=e.target.closest('button'); if(b) load(+b.dataset.p); });
    $('.w-tools',w).addEventListener('click', function(e){ var b=e.target.closest('button'); if(!b) return; var t=b.dataset.t;
      if(t==='undo' && hist.length){ var o=JSON.parse(hist.pop()); st=o.st; log=o.log; render(); }
      if(t==='reset') load(P);
      if(t==='show'){ reveal=!reveal; render(); } });
    // Klick / Ziehen
    var drag=null;
    function scale(){ return parseFloat(getComputedStyle(document.getElementById('stage')).getPropertyValue('--scale'))||1; }
    function panAt(x,y){ var r=null; $$('.w-pan',w).forEach(function(p){ var b=p.getBoundingClientRect(); if(x>=b.left-20&&x<=b.right+20&&y>=b.top&&y<=b.bottom+30) r=p.dataset.side; }); return r; }
    w.addEventListener('pointerdown', function(e){
      var it=e.target.closest('.w-it'); if(!it) return; e.preventDefault();
      var from = it.closest('.w-pan') ? it.closest('.w-pan').dataset.side : null;
      var g=it.cloneNode(true); g.classList.add('ghost'); g.style.transform='translate(-50%,-50%) scale('+scale()+')'; document.body.appendChild(g);
      drag={t:it.dataset.t, from:from, g:g, x0:e.clientX, y0:e.clientY, moved:false, src:it};
      move(e);
    });
    function move(e){ if(!drag) return; drag.g.style.left=e.clientX+'px'; drag.g.style.top=e.clientY+'px'; if(Math.abs(e.clientX-drag.x0)+Math.abs(e.clientY-drag.y0)>10){ drag.moved=true; if(drag.src) drag.src.style.opacity=drag.from?'.25':''; } }
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', function(e){
      if(!drag) return; var d=drag; drag=null; d.g.remove(); if(d.src) d.src.style.opacity='';
      var to = panAt(e.clientX,e.clientY), eq0=curEq(), k=d.t==='x'?'x':'u';
      if(!d.moved){ // Klick
        if(d.from){ save(); st[d.from][k]--; log.push({eq:eq0,op:'nur '+(d.from==='L'?'links':'rechts')+' −'+(k==='x'?'x':'1')}); render(); }
        return; }
      if(d.from===to) return;
      save();
      if(d.from) st[d.from][k]--;
      if(to){ if(st[to].x+st[to].u<16) st[to][k]++; }
      log.push({eq:eq0, op:(to?(to==='L'?'links':'rechts')+' +':'')+(d.from?' '+(d.from==='L'?'links':'rechts')+' −':'')+(k==='x'?'x':'1')});
      render();
    });
    load(0);
    w._api={load:load, state:function(){ return {st:st, balanced:balanced()}; }, both:both};
  }

  /* ---------- 8. Gleichungs-Schritt-Animator ---------- */
  function initAnim(a){
    var presets = JSON.parse(a.dataset.presets||'["3x+5=20"]');
    var S, rows, hist, orig, mode, kind='-';
    a.innerHTML =
      '<div class="an-top"><div class="seg an-pre">'+presets.map(function(p,i){ return '<button data-p="'+i+'">'+fmt(p)+'</button>'; }).join('')+'</div>'+
      '<input class="txt an-own" placeholder="eigene Gleichung, z. B. 4x-3=2x+7"><button class="btn mini an-go">Los</button></div>'+
      '<div class="an-body"><div class="an-lines"><div class="solve an-solve"></div><div class="an-probe"></div></div>'+
      '<div class="an-pad"><div class="an-q">Was machst du auf <b>beiden</b> Seiten?</div>'+
      '<div class="an-kinds"><button data-k="+">+</button><button data-k="-" class="on">−</button><button data-k="*">·</button><button data-k=":">:</button>'+
      '<input class="txt an-val" placeholder="z. B. 5 oder 2x"></div><div class="an-chips"></div>'+
      '<div class="an-btns"><button class="btn primary an-apply">✔ auf beide Seiten</button><button class="btn an-zf">🧹 Klammern auflösen / zusammenfassen</button>'+
      '<button class="btn an-tip">💡 Tipp</button><button class="btn an-undo">↺ Zurück</button><button class="btn an-probeb">✔ Probe</button></div>'+
      '<div class="an-msg"></div></div></div>';
    function lin2(l){ return MC.linStr(l,'x',mode); }
    function canon(){ return lin2(S.L)+'='+lin2(S.R); }
    function load(eq){
      var E; try { E=MC.parseEq(eq); } catch(err){ msg('⚠ Das verstehe ich nicht: '+err.message, 'bad'); return; }
      orig=MC.norm(eq); mode=/\{/.test(eq)?'frac':(/[a-z]:\d/.test(eq)&&!/\(/.test(eq)?'colon':'dec'); S={L:E.L,R:E.R,raw:orig}; hist=[]; rows=[{eq:orig,op:''}]; draw(); msg('Ziel: <b>x allein</b> auf einer Seite!','');
      $('.an-probe',a).innerHTML=''; chips();
    }
    function isCanon(){ return MC.norm(S.raw)===canon(); }
    function status(){ var L=S.L,R=S.R;
      if(MC.feq(L.a,MC.F(0)) && MC.feq(R.a,MC.F(0))) return MC.feq(L.b,R.b)?'all':'none';
      if(MC.feq(L.a,MC.F(1)) && L.b.n===0 && R.a.n===0) return 'solved';
      if(MC.feq(R.a,MC.F(1)) && R.b.n===0 && L.a.n===0) return 'solvedR';
      return ''; }
    function draw(anim){
      var sv=$('.an-solve',a); sv.innerHTML = solveHtml(rows.slice(-6), {final:!!status()}).replace(/^<div class="solve[^"]*">|<\/div>$/g,'');
      alignSolve(a);
      var last=sv.lastElementChild; if(anim && last) last.classList.add('fresh');
      $('.an-zf',a).disabled = isCanon();
      $('.an-undo',a).disabled = !hist.length;
      var s=status(); $('.an-probeb',a).disabled = !(s==='solved'||s==='solvedR');
      if(s==='solved'||s==='solvedR') msg('🎉 Gelöst: '+fmt('x='+MC.fstr(s==='solved'?S.R.b:S.L.b, mode))+' – jetzt die Probe!','ok');
      else if(s==='all') msg('Wahre Aussage ('+fmt(canon())+') → <b>unendlich viele Lösungen</b>: jede Zahl passt.','ok');
      else if(s==='none') msg('Falsche Aussage ('+fmt(canon().replace('=','≠'))+') → <b>keine Lösung</b>: '+fmt('L')+' = { }','bad');
    }
    function msg(t,c){ var m=$('.an-msg',a); m.innerHTML=t; m.className='an-msg '+(c||''); }
    function apply(k, vs){
      var q; try { q=MC.parseLin(vs); } catch(err){ msg('⚠ Wert nicht lesbar: '+err.message,'bad'); return; }
      if(!vs.trim()){ msg('Gib zuerst eine Zahl oder einen Term ein (z. B. 5 oder 2x).','bad'); return; }
      if((k==='*'||k===':') && q.a.n!==0){ msg('⚠ Mit x malnehmen oder durch x teilen ist <b>keine</b> erlaubte Umformung.','bad'); return; }
      if((k==='*'||k===':') && q.b.n===0){ msg(k===':'?'⚠ Durch 0 teilen ist verboten!':'⚠ Mal 0 macht beide Seiten zu 0 – dabei geht die Gleichung verloren. Verboten!','bad'); return; }
      hist.push(JSON.stringify({S:S,rows:rows}));
      var vAs = MC.linStr(q,'x',mode), opAscii = k+((k==='*'||k===':')&&/^-/.test(vAs)?'('+vAs+')':vAs);
      var p=MC.norm(S.raw).split('=');
      function wrapS(s){ return (k==='*'||k===':') && /[+\-]/.test(s.replace(/^-/,'')) ? '('+s+')' : s; }
      var opH = {'+':' + ','-':' − ','*':' · ',':':' : '}[k] + fmt((k==='*'||k===':')&&/^-/.test(vAs)?'('+vAs+')':vAs);
      rows[rows.length-1].op = opAscii.replace(/^([+\-*:])/,'$1');
      // Zwischenzeile
      rows.push({eq:'x=x', inter:true});
      var nl = MC.parseLin('('+p[0]+')'+k+'('+vAs+')'), nr = MC.parseLin('('+p[1]+')'+k+'('+vAs+')');
      draw(true);
      var last=$('.an-solve',a).lastElementChild;
      last.classList.add('inter');
      $('.l',last).innerHTML = fmt(wrapS(p[0]))+'<b class="hl">'+opH+'</b>'; $('.r',last).innerHTML = fmt(wrapS(p[1]))+'<b class="hl">'+opH+'</b>';
      alignSolve(a);
      var my = ++apply.n;
      setTimeout(function(){ if(my!==apply.n) return; S={L:nl,R:nr,raw:''}; S.raw=canon(); rows[rows.length-1]={eq:S.raw,op:''}; draw(true); chips(); }, 1100);
    }
    apply.n=0;
    function chips(){ // Vorschläge: Zahlen und x-Terme der aktuellen Gleichung
      var c=[], L=S.L, R=S.R;
      [L.b,R.b].forEach(function(b){ if(b.n) c.push(MC.fstr(b.n<0?MC.neg(b):b,mode)); });
      [L.a,R.a].forEach(function(x){ if(x.n) c.push(MC.linStr({a:x.n<0?MC.neg(x):x,b:MC.F(0)},'x',mode)); });
      [L.a,R.a].forEach(function(x){ if(x.n && !(x.n===x.d)) c.push(MC.fstr(x,mode)); });
      c = c.filter(function(v,i){ return c.indexOf(v)===i; }).slice(0,6);
      $('.an-chips',a).innerHTML = c.map(function(v){ return '<button data-v="'+v+'">'+fmt(v)+'</button>'; }).join('');
    }
    function tip(){
      if(!isCanon()) return msg('💡 Tipp: Erst <b>Klammern auflösen</b> und <b>zusammenfassen</b>!','');
      var s=MC.solveSteps(canon(),{mode:mode}), op=s.lines[0].op;
      if(!op) return msg('Fertig – mach die Probe!','ok');
      if(op==='swap') return msg('💡 Tipp: Seiten tauschen – dann steht x links.','');
      var names={'+':'addiere','-':'subtrahiere','*':'multipliziere mit',':':'teile durch'};
      msg('💡 Tipp: '+opHtml(op)+' &nbsp;→ '+names[op[0]]+' '+fmt(op.slice(1))+' auf beiden Seiten.','');
    }
    $('.an-pre',a).addEventListener('click', function(e){ var b=e.target.closest('button'); if(!b) return; $$('.an-pre button',a).forEach(function(x){ x.classList.toggle('on',x===b); }); load(presets[+b.dataset.p]); });
    $('.an-go',a).addEventListener('click', function(){ var v=$('.an-own',a).value; if(v.trim()) load(v); });
    $('.an-own',a).addEventListener('keydown', function(e){ if(e.key==='Enter'){ var v=this.value; if(v.trim()) load(v); this.blur(); } });
    $('.an-kinds',a).addEventListener('click', function(e){ var b=e.target.closest('button'); if(!b) return; kind=b.dataset.k; $$('.an-kinds button',a).forEach(function(x){ x.classList.toggle('on',x===b); }); });
    $('.an-chips',a).addEventListener('click', function(e){ var b=e.target.closest('button'); if(b) $('.an-val',a).value=b.dataset.v.replace('.',','); });
    $('.an-val',a).addEventListener('keydown', function(e){ if(e.key==='Enter'){ apply(kind,this.value); this.blur(); } });
    $('.an-apply',a).addEventListener('click', function(){ apply(kind,$('.an-val',a).value); });
    $('.an-zf',a).addEventListener('click', function(){ if(isCanon()) return; hist.push(JSON.stringify({S:S,rows:rows})); rows[rows.length-1].op='ZF'; rows[rows.length-1].label=/\(/.test(S.raw)?'Klammern auflösen, zusammenfassen':'zusammenfassen'; if(/\{/.test(S.raw)) rows[rows.length-1].label='zusammenfassen';
      S.raw=canon(); rows.push({eq:S.raw,op:''}); draw(true); chips(); });
    $('.an-tip',a).addEventListener('click', tip);
    $('.an-undo',a).addEventListener('click', function(){ if(!hist.length) return; apply.n++; var o=JSON.parse(hist.pop()); S=o.S; rows=o.rows; draw(); chips(); $('.an-probe',a).innerHTML=''; });
    $('.an-probeb',a).addEventListener('click', function(){ var s=status(); var x = s==='solved'?S.R.b:S.L.b; $('.an-probe',a).innerHTML = probeHtml(orig, x); });
    $('.an-pre button',a).classList.add('on');
    load(presets[0]);
    a._api={load:load, apply:apply, zf:function(){ $('.an-zf',a).click(); }, state:function(){ return {S:S, rows:rows, status:status()}; }};
  }

  /* ---------- 9. Pfeilschema ---------- */
  var OPSYM={'+':'+','-':'−','*':'·',':':':'};
  function initPfeil(p){
    var ch, stage=0;
    p.innerHTML='<div class="pf-text"></div><div class="pf-eq"></div>'+
      '<div class="pf-rows"><div class="pf-lbl">vorwärts</div><div class="pf-row pf-f"></div><div class="pf-lbl back">rückwärts</div><div class="pf-row pf-b"></div></div>'+
      '<div class="pf-res"></div>'+
      '<div class="pf-btns"><button class="btn primary pf-step">▶ Nächster Schritt</button><button class="btn pf-all">Alles zeigen</button><button class="btn pf-new"><span class="emoji">🎲</span> Neue Aufgabe</button><button class="btn pf-reset">↺</button></div>';
    function box(v, cls){ return '<div class="pf-box '+(cls||'')+'">'+v+'</div>'; }
    function arrow(o, dir, cls){ return '<div class="pf-arr '+dir+' '+(cls||'')+'"><span class="pf-op">'+OPSYM[o.op]+' '+o.v+'</span><svg viewBox="0 0 200 40" preserveAspectRatio="none"><path d="'+(dir==='fw'?'M4 20 H180 M166 6 L190 20 L166 34':'M196 20 H20 M34 6 L10 20 L34 34')+'" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'; }
    function draw(){
      var n=ch.ops.length;
      $('.pf-text',p).textContent = ch.text; $('.pf-eq',p).innerHTML = 'Gleichung: <span class="m">'+fmt(ch.eq)+'</span>';
      var f=''; for(var i=0;i<=n;i++){ f+=box(i===0?'<i>x</i>':(i===n?ch.result:(stage>n?fmt(String(ch.vals[i])):'?')), i===0?'x':(i===n?'res':'')); if(i<n) f+=arrow(ch.ops[i],'fw'); }
      $('.pf-f',p).innerHTML=f;
      // rückwärts: gleiche Spalten, Pfeile nach links
      var b=''; var bv=ch.vals.slice(); // bv[i] = Wert nach i Operationen
      for(var j=0;j<=n;j++){ var shown = (j===n) || (n-j)<=stage; b+=box(shown?(j===0&&stage>=n?'<b>'+ch.vals[0]+'</b>':ch.vals[j]):'', 'b'+(shown?' on':'')+(j===0?' x':'')); if(j<n){ var o=ch.ops[j]; b+=arrow({op:MC.INV[o.op], v:o.v},'bw', (n-j)<=stage?'on':'off'); } }
      $('.pf-b',p).innerHTML=b;
      $('.pf-res',p).innerHTML = stage>=n ? 'Lösung: <span class="m">'+fmt('x='+ch.x)+'</span> &nbsp; <span class="small">Probe: '+fmt(MC.substitute(ch.eq.split('=')[0],ch.x))+' = '+ch.result+' ✔</span>' : '';
      $('.pf-step',p).disabled = stage>n;
    }
    function set(c){ ch=c; stage=0; draw(); }
    $('.pf-step',p).addEventListener('click', function(){ stage++; draw(); });
    $('.pf-all',p).addEventListener('click', function(){ stage=ch.ops.length+1; draw(); });
    $('.pf-new',p).addEventListener('click', function(){ set(MC.chainGen()); });
    $('.pf-reset',p).addEventListener('click', function(){ stage=0; draw(); });
    var pre = p.dataset.chain ? JSON.parse(p.dataset.chain) : null;
    set(pre ? MC.chainFrom(pre.x, pre.ops) : MC.chainGen());
    p._api={state:function(){ return {ch:ch, stage:stage}; }};
  }

  /* ---------- 10. Zahlenrätsel-Maschine ---------- */
  function initMachine(m){
    var PRE=[ [{op:'*',v:3},{op:'+',v:5}], [{op:'+',v:4},{op:'*',v:2}], [{op:'*',v:5},{op:'-',v:7}], [{op:'-',v:3},{op:'*',v:4},{op:'+',v:10}] ];
    var ops=PRE[0], secret=7, hidden=true, busy=false, k=0;
    m.innerHTML='<div class="mc-row"><div class="mc-in"><div class="mc-lbl">Geheimzahl</div><div class="mc-val mc-inv">?</div>'+
      '<div class="mc-inctl"><input class="txt mc-inp" type="text" inputmode="numeric" value="7"><button class="btn mini mc-hide">🙈</button></div></div>'+
      '<div class="mc-track"><div class="mc-stations"></div><div class="mc-ball">?</div></div>'+
      '<div class="mc-out"><div class="mc-lbl">Ergebnis</div><div class="mc-val mc-outv">…</div></div></div>'+
      '<div class="mc-btns"><button class="btn primary mc-run">▶ Maschine starten</button><button class="btn mc-back">◀ Rückwärts rechnen</button><button class="btn mc-new"><span class="emoji">🎲</span> Andere Maschine</button></div>'+
      '<div class="mc-say"></div>';
    function st(){ return $$('.mc-st',m); }
    function drawSt(back){ $('.mc-stations',m).innerHTML = ops.map(function(o,i){ var oo = back?{op:MC.INV[o.op],v:o.v}:o; return '<div class="mc-st'+(back?' back':'')+'"><svg class="gear" viewBox="0 0 100 100"><path d="'+gearPath()+'" fill="currentColor"/><circle cx="50" cy="50" r="16" fill="#fff"/></svg><span>'+OPSYM[oo.op]+' '+oo.v+'</span></div>'; }).join(''); }
    function gearPath(){ var d='', n=10; for(var i=0;i<n*2;i++){ var r=i%2?38:48, a=i*Math.PI/n; d+=(i?'L':'M')+(50+r*Math.cos(a)).toFixed(1)+' '+(50+r*Math.sin(a)).toFixed(1); } return d+'Z'; }
    function readSecret(){ var v=parseInt($('.mc-inp',m).value,10); if(isNaN(v)) v=7; secret=Math.max(-99,Math.min(999,v)); }
    function showIn(v){ $('.mc-inv',m).textContent = hidden ? '?' : v; }
    function say(){ $('.mc-say',m).innerHTML = 'Ich denke mir eine Zahl, '+ops.map(function(o){ return MC.OPN[o.op]+' '+o.v; }).join(', ')+' …'; }
    function moveBall(i, n, back){ // Position über Station i (−1 = Eingang, n = Ausgang)
      var track=$('.mc-track',m), ball=$('.mc-ball',m), sts=st();
      var x = i<0 ? 0 : i>=n ? track.clientWidth-ball.offsetWidth : sts[i].offsetLeft+sts[i].offsetWidth/2-ball.offsetWidth/2;
      ball.style.transform='translateX('+x+'px)';
    }
    function run(back){
      if(busy) return; busy=true; readSecret(); drawSt(back); var n=ops.length, ball=$('.mc-ball',m), v, i;
      var vals=[secret]; ops.forEach(function(o){ vals.push(MC.applyOp(vals[vals.length-1],o)); });
      var res=vals[n];
      if(!back){ showIn(secret); v=secret; ball.textContent = hidden?'?':v; ball.classList.remove('back'); moveBall(-1,n); $('.mc-outv',m).textContent='…'; i=0; }
      else { v=res; ball.textContent=v; ball.classList.add('back'); moveBall(n,n); i=n-1; }
      var myk=++k;
      function stepF(){ if(myk!==k) return;
        if(!back){ if(i>=n){ moveBall(n,n); setTimeout(function(){ $('.mc-outv',m).textContent=res; ball.textContent=res; busy=false; },700); return; }
          moveBall(i,n); var s=st()[i]; setTimeout(function(){ s.classList.add('spin'); v=vals[i+1]; setTimeout(function(){ s.classList.remove('spin'); ball.textContent = hidden?'?':v; i++; stepF(); },650); },650); }
        else { if(i<0){ moveBall(-1,n); setTimeout(function(){ hidden=false; showIn(secret); $('.mc-inv',m).classList.add('pop'); busy=false; },700); return; }
          moveBall(i,n); var s2=st()[i]; setTimeout(function(){ s2.classList.add('spin'); v=vals[i]; setTimeout(function(){ s2.classList.remove('spin'); ball.textContent=v; i--; stepF(); },650); },650); }
      }
      setTimeout(stepF, 350);
    }
    $('.mc-run',m).addEventListener('click', function(){ run(false); });
    $('.mc-back',m).addEventListener('click', function(){ if($('.mc-outv',m).textContent==='…'){ return; } run(true); });
    $('.mc-new',m).addEventListener('click', function(){ if(busy) return; var i=PRE.indexOf(ops); ops=PRE[(i+1)%PRE.length]; drawSt(false); say(); $('.mc-outv',m).textContent='…'; hidden=true; showIn(); moveBall(-1,ops.length); });
    $('.mc-hide',m).addEventListener('click', function(){ hidden=!hidden; readSecret(); showIn(secret); });
    $('.mc-inp',m).addEventListener('keydown', function(e){ if(e.key==='Enter'){ this.blur(); run(false); } });
    drawSt(false); say(); showIn();
    m._api={run:run, state:function(){ return {out:$('.mc-outv',m).textContent, inp:$('.mc-inv',m).textContent, busy:busy}; }};
  }

  /* ---------- 11. Probier-Tabelle (Einsetzen) ---------- */
  function initProbier(pb){
    var eqs=JSON.parse(pb.dataset.eqs||'["2x+3=11"]'), rng=(pb.dataset.range||'0,8').split(',').map(Number), cur=0, tried=[];
    pb.innerHTML='<div class="pr-top"><div class="seg pr-eqs">'+eqs.map(function(e,i){ return '<button data-i="'+i+'">'+fmt(e)+'</button>'; }).join('')+'</div></div>'+
      '<div class="pr-nums"><span>Setze ein: '+fmt('x')+' =</span>'+(function(){ var s=''; for(var v=rng[0];v<=rng[1];v++) s+='<button data-v="'+v+'">'+fmt(String(v))+'</button>'; return s; })()+'</div>'+
      '<table class="pr-tab"><thead><tr><th>'+fmt('x')+'</th><th>linke Seite</th><th>rechte Seite</th><th>Aussage</th></tr></thead><tbody></tbody></table>';
    function set(i){ cur=i; tried=[]; $$('.pr-eqs button',pb).forEach(function(b){ b.classList.toggle('on',+b.dataset.i===i); }); $$('.pr-nums button',pb).forEach(function(b){ b.classList.remove('ok','no'); }); draw(); }
    function draw(){
      var eq=eqs[cur], p=MC.norm(eq).split('=');
      $('tbody',pb).innerHTML = tried.map(function(v){ var pr=MC.probe(eq,v);
        return '<tr class="'+(pr.ok?'ok':'no')+'"><td>'+fmt(String(v))+'</td><td>'+fmt(pr.left)+' = <b>'+fmt(MC.fstr(pr.lv))+'</b></td><td>'+fmt(pr.right)+' = <b>'+fmt(MC.fstr(pr.rv))+'</b></td><td>'+(pr.ok?'<b class="ok">✔ wahr → Lösung!</b>':'<span class="bad">✘ falsch</span>')+'</td></tr>'; }).join('');
    }
    $('.pr-eqs',pb).addEventListener('click', function(e){ var b=e.target.closest('button'); if(b) set(+b.dataset.i); });
    $('.pr-nums',pb).addEventListener('click', function(e){ var b=e.target.closest('button'); if(!b) return; var v=+b.dataset.v; if(tried.indexOf(v)<0) tried.push(v); if(tried.length>6) tried.shift();
      b.classList.add(MC.probe(eqs[cur],v).ok?'ok':'no'); draw(); });
    set(0);
    pb._api={try:function(v){ $('.pr-nums button[data-v="'+v+'"]',pb).click(); }};
  }

  /* ---------- 12. Rechteck-Flächenmodell a·(x + b) ---------- */
  function initFlaeche(f){
    var A=3, B=4, X=5, U=46;
    f.innerHTML='<div class="fl-ctrl"><div><span>Faktor '+fmt('a')+'</span><div class="seg fl-a">'+[2,3,4,5].map(function(v){return '<button data-v="'+v+'">'+v+'</button>'}).join('')+'</div></div>'+
      '<div><span>Zahl '+fmt('b')+'</span><div class="seg fl-b">'+[1,2,3,4,5,6].map(function(v){return '<button data-v="'+v+'">'+v+'</button>'}).join('')+'</div></div>'+
      '<div><span>'+fmt('x')+' = <b class="fl-xv"></b></span><input type="range" class="fl-x" min="1" max="9" value="5"></div></div>'+
      '<div class="fl-main"><svg class="fl-svg" viewBox="0 0 1000 400"></svg><div class="fl-eq"></div></div>';
    function draw(){
      $$('.fl-a button',f).forEach(function(b){ b.classList.toggle('on',+b.dataset.v===A); }); $$('.fl-b button',f).forEach(function(b){ b.classList.toggle('on',+b.dataset.v===B); });
      $('.fl-xv',f).textContent=X;
      var W=X*U, V=B*U, H=A*U, x0=60, y0=40, s='';
      s+='<rect x="'+x0+'" y="'+y0+'" width="'+W+'" height="'+H+'" fill="#ede4ff" stroke="#7c3aed" stroke-width="5"/>';
      s+='<rect x="'+(x0+W)+'" y="'+y0+'" width="'+V+'" height="'+H+'" fill="#d7f2ee" stroke="#0f766e" stroke-width="5"/>';
      for(var i=1;i<A;i++) s+='<path d="M'+x0+' '+(y0+i*U)+'h'+(W+V)+'" stroke="#fff" stroke-width="3" opacity=".9"/>';
      for(var j=1;j<X;j++) s+='<path d="M'+(x0+j*U)+' '+y0+'v'+H+'" stroke="#c9b6f5" stroke-width="2" stroke-dasharray="6 6"/>';
      for(var k=1;k<B;k++) s+='<path d="M'+(x0+W+k*U)+' '+y0+'v'+H+'" stroke="#9fd9d0" stroke-width="3"/>';
      s+='<text x="'+(x0+W/2)+'" y="'+(y0+H/2+18)+'" text-anchor="middle" class="fl-t x">'+A+'·x</text>';
      s+='<text x="'+(x0+W+V/2)+'" y="'+(y0+H/2+18)+'" text-anchor="middle" class="fl-t n">'+(A*B)+'</text>';
      s+='<text x="'+(x0+W/2)+'" y="'+(y0+H+44)+'" text-anchor="middle" class="fl-t x">x</text><text x="'+(x0+W+V/2)+'" y="'+(y0+H+44)+'" text-anchor="middle" class="fl-t n">'+B+'</text>';
      s+='<text x="'+(x0-18)+'" y="'+(y0+H/2+14)+'" text-anchor="end" class="fl-t">'+A+'</text>';
      s+='<path d="M'+x0+' '+(y0+H+10)+'v12M'+(x0+W)+' '+(y0+H+10)+'v12M'+(x0+W+V)+' '+(y0+H+10)+'v12" stroke="#1b2536" stroke-width="3"/>';
      $('.fl-svg',f).innerHTML=s; $('.fl-svg',f).setAttribute('viewBox','0 0 '+Math.max(1000,x0+W+V+40)+' '+(y0+H+70));
      $('.fl-eq',f).innerHTML='<div class="m big">'+fmt(A+'*(x+'+B+')')+' = '+fmt(A+'x+'+(A*B))+'</div>'+
        '<div class="fl-row"><span class="tag x">Ausmultiplizieren →</span><span class="tag n">← Ausklammern</span></div>'+
        '<div class="fl-chk">Für '+fmt('x='+X)+': &nbsp; '+fmt(A+'*('+X+'+'+B+')')+' = '+(A*(X+B))+' &nbsp;und&nbsp; '+fmt(A+'*'+X+'+'+(A*B))+' = '+(A*X+A*B)+' ✔</div>';
    }
    $('.fl-a',f).addEventListener('click',function(e){ var b=e.target.closest('button'); if(b){ A=+b.dataset.v; draw(); } });
    $('.fl-b',f).addEventListener('click',function(e){ var b=e.target.closest('button'); if(b){ B=+b.dataset.v; draw(); } });
    $('.fl-x',f).addEventListener('input',function(){ X=+this.value; draw(); });
    $('.fl-x',f).addEventListener('change',function(){ this.blur(); });
    draw();
  }

  /* ---------- 13. Rechteck-Umfang (Sachaufgabe) ---------- */
  function initUmfang(u){
    var X=4, D=+(u.dataset.d||4), T=+(u.dataset.target||40), S=26;
    u.innerHTML='<div class="um-ctrl"><span>Breite '+fmt('x')+' = <b class="um-xv"></b> cm</span><input type="range" class="um-x" min="1" max="14" value="4"></div><div class="um-main"><svg class="um-svg" viewBox="0 0 700 440"></svg><div class="um-info"></div></div>';
    function draw(){
      var L=X+D, uu=2*X+2*L, w=L*S, hh=X*S, x0=40, y0=30;
      $('.um-xv',u).textContent=X;
      $('.um-svg',u).innerHTML='<rect x="'+x0+'" y="'+y0+'" width="'+w+'" height="'+hh+'" rx="6" fill="'+(uu===T?'#dcfce7':'#e6f2ef')+'" stroke="'+(uu===T?'#15803d':'#0f766e')+'" stroke-width="6"/>'+
        '<text x="'+(x0+w/2)+'" y="'+(y0+hh+46)+'" text-anchor="middle" class="um-t">x + '+D+' = '+L+' cm</text>'+
        '<text x="'+(x0+w+16)+'" y="'+(y0+hh/2+12)+'" class="um-t x">x = '+X+' cm</text>';
      $('.um-info',u).innerHTML='<div class="m">'+fmt('u=2*x+2*(x+'+D+')')+'</div><div class="m">'+fmt('u=2*'+X+'+2*('+X+'+'+D+')')+' = <b>'+uu+' cm</b></div>'+
        '<div class="um-goal '+(uu===T?'ok':uu<T?'lo':'hi')+'">'+(uu===T?'🎯 Treffer: Umfang '+T+' cm!':uu<T?'zu klein ⬆ (Ziel: '+T+' cm)':'zu groß ⬇ (Ziel: '+T+' cm)')+'</div>';
    }
    $('.um-x',u).addEventListener('input',function(){ X=+this.value; draw(); });
    $('.um-x',u).addEventListener('change',function(){ this.blur(); });
    draw();
    u._api={set:function(v){ X=v; $('.um-x',u).value=v; draw(); }};
  }

  /* ---------- 14. Treffpunkt (Bewegung) ---------- */
  function initTreff(t){
    var D=36, v1=14, v2=10, T=0, raf=null;
    t.innerHTML='<svg class="tr-svg" viewBox="0 0 1500 260"></svg><div class="tr-ctrl"><span>Zeit '+fmt('t')+' = <b class="tr-t"></b> h</span><input type="range" class="tr-r" min="0" max="8" value="0"><button class="btn primary tr-play">▶ Abspielen</button></div><div class="tr-info"></div>';
    function draw(){
      var s1=v1*T, s2=v2*T, met = s1+s2>=D-1e-9, X0=90, X1=1410, k=(X1-X0)/D, p1=X0+Math.min(s1,D)*k, p2=X1-Math.min(s2,D)*k;
      if(met){ p1=X0+21*k; p2=p1; }
      var sv='<rect x="'+X0+'" y="150" width="'+(X1-X0)+'" height="18" rx="9" fill="#cbd5e1"/>';
      for(var i=0;i<=D;i+=6) sv+='<path d="M'+(X0+i*k)+' 172v14" stroke="#64748b" stroke-width="3"/><text x="'+(X0+i*k)+'" y="214" text-anchor="middle" class="tr-km">'+i+' km</text>';
      sv+='<path d="M'+X0+' 159H'+p1+'" stroke="#2563eb" stroke-width="18" stroke-linecap="round"/><path d="M'+p2+' 159H'+X1+'" stroke="#e8590c" stroke-width="18" stroke-linecap="round"/>';
      sv+='<text x="'+p1+'" y="120" text-anchor="'+(met?'end':'middle')+'" class="tr-bike">🚲</text><text x="'+p2+'" y="120" text-anchor="'+(met?'start':'middle')+'" class="tr-bike flip">🚲</text>';
      sv+='<text x="'+X0+'" y="252" class="tr-n b">Tom · 14 km/h</text><text x="'+X1+'" y="252" text-anchor="end" class="tr-n o">Lisa · 10 km/h</text>';
      if(met) sv+='<text x="'+p1+'" y="60" text-anchor="middle" class="tr-meet">🤝 Treffpunkt</text>';
      $('.tr-svg',t).innerHTML=sv; $('.tr-t',t).textContent=MC.fstr(MC.fnum(T)).replace('.',',');
      $('.tr-info',t).innerHTML='Tom: '+fmt('14*'+MC.fstr(MC.fnum(T)))+' = <b>'+fmt(MC.fstr(MC.fnum(s1)))+' km</b> &nbsp;·&nbsp; Lisa: '+fmt('10*'+MC.fstr(MC.fnum(T)))+' = <b>'+fmt(MC.fstr(MC.fnum(s2)))+' km</b> &nbsp;·&nbsp; zusammen: <b>'+fmt(MC.fstr(MC.fnum(s1+s2)))+' km</b>'+(met?' <b class="ok">= 36 km ✔</b>':'');
    }
    $('.tr-r',t).addEventListener('input',function(){ T=+this.value/4; draw(); });
    $('.tr-r',t).addEventListener('change',function(){ this.blur(); });
    $('.tr-play',t).addEventListener('click',function(){ cancelAnimationFrame(raf); var t0=performance.now();
      (function f(now){ var q=Math.min(1,(now-t0)/4000); T=Math.round(q*6)/4; $('.tr-r',t).value=T*4; draw(); if(q<1) raf=requestAnimationFrame(f); })(t0); });
    draw();
  }

  /* ---------- 15. Formel-Umsteller ---------- */
  function initFormel(fm){
    var F=JSON.parse(fm.dataset.formulas), cur=0, shown=0;
    fm.innerHTML='<div class="seg fo-sel">'+F.map(function(f,i){ return '<button data-i="'+i+'">'+f.label+'</button>'; }).join('')+'</div>'+
      '<div class="fo-main"><div class="fo-task"></div><div class="fo-sol"></div><div class="fo-ex"></div></div>'+
      '<div class="fo-btns"><button class="btn primary fo-step">▶ Nächster Schritt</button><button class="btn fo-all">Alle Schritte</button><button class="btn fo-exb">🔢 Mit Zahlen prüfen</button></div>';
    function draw(){ var f=F[cur];
      $$('.fo-sel button',fm).forEach(function(b){ b.classList.toggle('on',+b.dataset.i===cur); });
      $('.fo-task',fm).innerHTML='Stelle <span class="m">'+fmt(f.steps[0][0])+'</span> nach <span class="m">'+fmt(f.target)+'</span> um.';
      var rows=f.steps.slice(0,shown+1).map(function(s,i){ return {eq:s[0], op:i<shown?s[1]:''}; });
      $('.fo-sol',fm).innerHTML = shown ? solveHtml(rows,{final:shown===f.steps.length-1}) : '';
      alignSolve(fm);
      $('.fo-step',fm).disabled = shown>=f.steps.length-1;
    }
    $('.fo-sel',fm).addEventListener('click',function(e){ var b=e.target.closest('button'); if(b){ cur=+b.dataset.i; shown=0; $('.fo-ex',fm).innerHTML=''; draw(); } });
    $('.fo-step',fm).addEventListener('click',function(){ shown++; draw(); });
    $('.fo-all',fm).addEventListener('click',function(){ shown=F[cur].steps.length-1; draw(); });
    $('.fo-exb',fm).addEventListener('click',function(){ $('.fo-ex',fm).innerHTML='🔢 '+F[cur].ex; });
    draw();
  }

  /* ---------- Start ---------- */
  $$('.gen').forEach(initGen);
  $$('.waage').forEach(initWaage);
  $$('.anim').forEach(initAnim);
  $$('.pfeil').forEach(initPfeil);
  $$('.machine').forEach(initMachine);
  $$('.probier').forEach(initProbier);
  $$('.flaeche').forEach(initFlaeche);
  $$('.umfang').forEach(initUmfang);
  $$('.treff').forEach(initTreff);
  $$('.formel').forEach(initFormel);
  document.addEventListener('deck:ready', function(){ alignSolve(document); setTimeout(function(){ alignSolve(document); }, 400); });
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ alignSolve(document); });
})();
