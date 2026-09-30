/* =========================================================
   Folien-Aufbau (Kopfzeilen, Arbeitsanweisungen, Heft-Einträge) + interaktive Mathe-Demos.
   Läuft vor deck.js-Init (Skripte am Ende von <body>). Benötigt mathgen.js (window.MG).
   ========================================================= */
(function(){
  'use strict';
  function $(s,r){return (r||document).querySelector(s)}
  function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
  function h(tag, cls, html){ var e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e; }
  var CH = window.CHAPTERS || [], MG = window.MG, MINUS = '\u2212';
  var SVGNS = 'http://www.w3.org/2000/svg';
  function sv(tag, attrs, parent){ var e=document.createElementNS(SVGNS, tag); for(var k in attrs) e.setAttribute(k, attrs[k]); if(parent) parent.appendChild(e); return e; }
  function fnum(v){ v=Math.round(v*1000)/1000; var s=String(Math.abs(v)).replace('.',','); return (v<0?MINUS:'')+s; }
  function pt(x,y){ return '('+fnum(x)+'|'+fnum(y)+')'; }
  function par(v){ return v<0 ? '('+fnum(v)+')' : fnum(v); }
  function onSlide(el, type, fn){ var s=el.closest('.slide'); if(s) s.addEventListener('deck:'+type, fn); }
  function btn(label, cls, fn){ var b=h('button','btn '+(cls||''),label); b.addEventListener('click', function(e){ fn(e); }); return b; }
  function seg(options, onChange, initial){ var d=h('div','seg'); options.forEach(function(o,i){ var b=h('button', (initial===undefined?i===0:o[0]===initial)?'on':'', o[1]); b.dataset.v=o[0];
      b.addEventListener('click', function(){ $$('button',d).forEach(function(x){x.classList.remove('on')}); b.classList.add('on'); onChange(o[0]); }); d.appendChild(b); }); return d; }
  function rnd(a,b){ return a+Math.floor(Math.random()*(b-a+1)); }
  var AUDIO = function(type){ var S=window.DeckSound; if(!S) return; try{ if(type==='ok'){ S.tone(660,0,.12,'sine',.25); S.tone(990,.12,.2,'sine',.25); } else if(type==='bad'){ S.tone(220,0,.25,'square',.12); } else S.tone(520,0,.08,'sine',.18); }catch(e){} };

  /* ---------- 1. Kopfzeilen, Typ-Abzeichen, Arbeitsanweisungen ---------- */
  var BADGE = { heft:['heft','i-pencil','Heft-Eintrag'], denk:['denk','i-chat','Denkfrage'], quiz:['quiz','i-hand','Quiz'], demo:['demo','i-play','Ausprobieren'],
                merk:['merk','i-bulb','Merksatz'], uebung:['uebung','i-star','Üben'], check:['check','i-check','Quick-Check'] };
  var AUF = { schriftlich:['schriftlich','✍ Schriftlich'], diskutieren:['diskutieren','💬 Diskutieren'], lesen:['lesen','👀 Nur lesen'], beispiel:['beispiel','✏ Beispiel ins Heft'],
              muendlich:['muendlich','🙋 Mitmachen'], partner:['partner','👥 Partnerarbeit'], kontrolle:['kontrolle','✔ Kontrollieren'], abschreiben:['abschreiben','✏ Abschreiben'] };
  $$('.slide').forEach(function(s){
    if(s.classList.contains('title') || s.classList.contains('chapter')) return;
    var c = parseInt(s.dataset.chapter||'1',10), ch = CH[c-1];
    if(ch && !$('.chip',s)) s.insertAdjacentHTML('afterbegin','<div class="chip"><span class="num">'+c+'</span>'+ch.name+'</div>');
    var tags = '';
    Object.keys(BADGE).forEach(function(k){ if(s.classList.contains(k)){ var b=BADGE[k]; tags += '<div class="badge '+b[0]+'"><svg><use href="#'+b[1]+'"/></svg>'+(s.dataset.badge||b[2])+'</div>'; } });
    var a = s.dataset.auftrag || (s.classList.contains('heft') ? 'abschreiben' : '');
    if(a && AUF[a]) tags += '<div class="auftrag '+AUF[a][0]+'">'+AUF[a][1]+'</div>';
    if(tags) s.insertAdjacentHTML('afterbegin','<div class="tagbar">'+tags+'</div>');
  });
  $$('.takeaway,.merkbox').forEach(function(el){
    var kids = Array.prototype.slice.call(el.childNodes), lead = kids.filter(function(n){ return n.nodeType===1 && n.classList.contains('emoji'); })[0];
    if(kids.length===2 && kids[1].nodeType===1 && kids[1].tagName==='SPAN' && !kids[1].classList.contains('m')) return;
    var span = document.createElement('span'); span.className='txt'; kids.forEach(function(n){ if(n!==lead) span.appendChild(n); }); el.appendChild(span);
  });
  var stage = $('#stage');
  if(stage){ var sf=h('div','', (window.SCHOOL||'')+' · '+(window.TEACHER||'')+' · Mathematik 7'); sf.id='schoolfoot'; stage.appendChild(sf); }

  /* ---------- 2. Heft-Einträge rendern ---------- */
  $$('.slide.heft[data-heft]').forEach(function(s){
    var hf = (window.HEFT||[]).filter(function(x){return x.n===+s.dataset.heft})[0]; if(!hf) return;
    var wrap = h('div','heft-body');
    wrap.innerHTML = '<div class="hkicker"><svg><use href="#i-pencil"/></svg>Heft-Eintrag '+hf.n+'</div><h2>'+hf.title+'<span class="date">Datum: ______</span></h2>'+window.renderHeft(hf,true);
    s.appendChild(wrap);
    s.insertAdjacentHTML('beforeend','<div class="holes">'+new Array(9).join('<i></i>')+'</div>');
  });

  /* ---------- 3. Sprung zu Kapitel, Buttons nicht fokussiert lassen ---------- */
  document.addEventListener('click', function(e){
    var b = e.target.closest('[data-goto-ch]');
    if(b && window.Deck){ var n=b.getAttribute('data-goto-ch'), idx=Deck.slides.findIndex(function(s){ return s.dataset.chapter===n; }); if(idx>=0) Deck.go(idx); }
    var bt = e.target.closest('button'); if(bt) setTimeout(function(){ bt.blur(); }, 0);
  });

  /* ---------- 4. Quiz: Antworten anklickbar ---------- */
  $$('.quiz .opt').forEach(function(o){
    o.addEventListener('click', function(){
      var q=o.closest('.slide'); $$('.opt',q).forEach(function(x){ x.classList.remove('pick-ok','pick-bad'); });
      if(o.classList.contains('correct')){ o.classList.add('pick-ok'); AUDIO('ok'); } else { o.classList.add('pick-bad'); AUDIO('bad'); }
    });
  });

  /* ---------- 5. Zufallsnummer (nur Nummern, keine Namen) ---------- */
  function classSize(){ return parseInt(localStorage.getItem('mathe7-klassengroesse')||'24',10) || 24; }
  $$('.pickwidget').forEach(function(w){
    w.innerHTML = '<button class="pickbtn" title="Zufällige Schülernummer">🎲 <span class="nr">Nr. ?</span></button><button class="pickset" title="Klassengröße ändern">von <b>'+classSize()+'</b> ✎</button>';
    $('.pickbtn',w).addEventListener('click', function(){ var n=classSize(), k=0, sp=$('.nr',w); var t=setInterval(function(){ sp.textContent='Nr. '+rnd(1,n); if(++k>12){ clearInterval(t); AUDIO('ok'); w.classList.add('hit'); setTimeout(function(){w.classList.remove('hit')},600);} }, 70); });
    $('.pickset',w).addEventListener('click', function(){ var v=prompt('Wie viele Schüler hat die Klasse?', classSize()); if(v && +v>1){ localStorage.setItem('mathe7-klassengroesse', +v); $$('.pickset b').forEach(function(b){ b.textContent=+v; }); } });
  });

  /* ---------- 6. Selbstcheck-Tabelle ---------- */
  $$('.selfcheck tr').forEach(function(tr){ $$('td',tr).slice(1).forEach(function(td){ td.addEventListener('click', function(){ var on=td.classList.contains('x'); $$('td',tr).forEach(function(x){x.classList.remove('x')}); if(!on) td.classList.add('x'); }); }); });

  /* =========================================================
     Koordinatensystem-Zeichner (gleicher Stil wie die Python-SVGs)
     ========================================================= */
  function KS(r, u, opts){
    opts=opts||{}; u=u||60; var pad=opts.pad||0.9, x0=r[0],x1=r[1],y0=r[2],y1=r[3];
    var W=(x1-x0+2*pad)*u, H=(y1-y0+2*pad)*u;
    var svg = sv('svg',{viewBox:'0 0 '+W+' '+H,'class':'ks '+(opts.cls||'')});
    var X=function(x){return (x-x0+pad)*u}, Y=function(y){return (y1-y+pad)*u};
    var g=sv('g',{stroke:'#c9dcef','stroke-width':u/30},svg);
    for(var x=x0;x<=x1;x++) sv('line',{x1:X(x),y1:Y(y1)-u*.4,x2:X(x),y2:Y(y0)+u*.4},g);
    for(var y=y0;y<=y1;y++) sv('line',{x1:X(x0)-u*.4,y1:Y(y),x2:X(x1)+u*.4,y2:Y(y)},g);
    var ax=sv('g',{stroke:'#1b2536','stroke-width':u/18,fill:'#1b2536'},svg);
    sv('line',{x1:X(x0)-u*.6,y1:Y(0),x2:X(x1)+u*.55,y2:Y(0)},ax); sv('line',{x1:X(0),y1:Y(y0)+u*.6,x2:X(0),y2:Y(y1)-u*.55},ax);
    sv('path',{d:'M'+(X(x1)+u*.75)+' '+Y(0)+' l'+(-u*.35)+' '+(-u*.18)+' l0 '+(u*.36)+' z',stroke:'none'},ax);
    sv('path',{d:'M'+X(0)+' '+(Y(y1)-u*.75)+' l'+(-u*.18)+' '+(u*.35)+' l'+(u*.36)+' 0 z',stroke:'none'},ax);
    var lb=sv('g',{'font-family':'Nunito,Segoe UI,sans-serif','font-weight':800,'font-size':u*.42,fill:'#3b4658','text-anchor':'middle'},svg);
    for(x=x0;x<=x1;x++){ if(!x) continue; sv('line',{x1:X(x),y1:Y(0)-u*.1,x2:X(x),y2:Y(0)+u*.1,stroke:'#1b2536','stroke-width':u/18},lb); var t=sv('text',{x:X(x)-(x<0?u*.06:0),y:Y(0)+u*.5},lb); t.textContent=fnum(x); }
    for(y=y0;y<=y1;y++){ if(!y) continue; sv('line',{x1:X(0)-u*.1,y1:Y(y),x2:X(0)+u*.1,y2:Y(y),stroke:'#1b2536','stroke-width':u/18},lb); var t2=sv('text',{x:X(0)-u*.18,y:Y(y)+u*.15,'text-anchor':'end'},lb); t2.textContent=fnum(y); }
    var t0=sv('text',{x:X(0)-u*.15,y:Y(0)+u*.48,'text-anchor':'end'},lb); t0.textContent='0';
    var tx=sv('text',{x:X(x1)+u*.55,y:Y(0)+u*.6,'font-size':u*.52,'font-style':'italic',fill:'#1b2536'},lb); tx.textContent='x';
    var ty=sv('text',{x:X(0)+u*.45,y:Y(y1)-u*.4,'font-size':u*.52,'font-style':'italic',fill:'#1b2536'},lb); ty.textContent='y';
    var layer = sv('g',{},svg);
    function toData(evt){ var p=svg.createSVGPoint(); p.x=evt.clientX; p.y=evt.clientY; var q=p.matrixTransform(svg.getScreenCTM().inverse()); return {x:q.x/u+x0-pad, y:y1+pad-q.y/u}; }
    function point(x,y,label,col,cls){ var gg=sv('g',{'class':'kpt '+(cls||'')},layer); sv('circle',{cx:X(x),cy:Y(y),r:u*.17,fill:col||'#d9483b',stroke:'#fff','stroke-width':u*.05},gg);
      if(label){ var tt=sv('text',{x:X(x)+(x>=0?u*.28:-u*.28),y:Y(y)-u*.22,'text-anchor':x>=0?'start':'end','font-family':'Fredoka,Nunito,sans-serif','font-weight':600,'font-size':u*.55,fill:col||'#d9483b','paint-order':'stroke',stroke:'#fff','stroke-width':u*.12},gg); tt.textContent=label; }
      return gg; }
    svg.__ks = {X:X, Y:Y}; // für automatische Tests
    return {svg:svg, X:X, Y:Y, u:u, layer:layer, toData:toData, point:point, r:r};
  }
  window.KSDraw = KS;
  function polyStr(k, pts){ return pts.map(function(p){ return k.X(p[0])+','+k.Y(p[1]); }).join(' '); }

  /* =========================================================
     DEMO: Kopfrechen-Blitz
     ========================================================= */
  (function(){
    var root=$('#blitz'); if(!root) return;
    var N=10, secs=8, tasks=[], i=-1, timer=null, t0=0, revealed=false, running=false;
    root.innerHTML='<div class="bl-left"><div class="bl-card"><div class="bl-no">Bereit?</div><div class="bl-task">Start drücken!</div><div class="bl-ans"></div><div class="bl-bar"><i></i></div></div><div class="bl-dots"></div></div>'+
      '<div class="bl-right"><div class="bl-ctrl"></div><div class="bl-sum"></div></div>';
    var card=$('.bl-card',root), task=$('.bl-task',root), ans=$('.bl-ans',root), no=$('.bl-no',root), bar=$('.bl-bar i',root), dots=$('.bl-dots',root), sum=$('.bl-sum',root);
    var ctrl=$('.bl-ctrl',root);
    ctrl.appendChild(h('div','lbl','Sekunden pro Aufgabe:'));
    ctrl.appendChild(seg([[5,'5 s'],[8,'8 s'],[12,'12 s'],[0,'ohne']], function(v){ secs=+v; }, 8));
    var bStart=btn('▶ Neue Runde','primary',start), bShow=btn('👁 Lösung','',reveal), bNext=btn('⏭ Weiter','',next);
    var row=h('div','btnrow'); row.appendChild(bStart); row.appendChild(bShow); row.appendChild(bNext); ctrl.appendChild(row);
    function start(){ tasks=[]; var seen={}; while(tasks.length<N){ var t=MG.G.blitz(); if(seen[t.e]) continue; seen[t.e]=1; tasks.push(t); } i=-1; running=true; sum.innerHTML=''; dots.innerHTML=new Array(N+1).join('<i></i>'); next(); }
    function show(){ var t=tasks[i]; no.textContent='Aufgabe '+(i+1)+' / '+N; task.innerHTML=MG.m(t.e)+' <span class="m">=</span> <span class="qm">?</span>'; ans.innerHTML=''; revealed=false; card.classList.remove('rev');
      $$('i',dots).forEach(function(d,k){ d.className = k<i?'done':k===i?'cur':''; }); t0=Date.now(); card.classList.add('pop'); setTimeout(function(){card.classList.remove('pop')},300); }
    function reveal(){ if(i<0||i>=tasks.length) return; var t=tasks[i]; ans.innerHTML='<span class="m">= '+MG.numH(t.a)+'</span>'; task.innerHTML=MG.m(t.e); revealed=true; card.classList.add('rev'); }
    function next(){ if(!running) return; if(i>=0 && !revealed){ reveal(); return; } i++; if(i>=N){ finish(); return; } show(); }
    function finish(){ running=false; no.textContent='Fertig!'; task.innerHTML='🎉'; ans.innerHTML=''; bar.style.width='0';
      sum.innerHTML='<b>Alle Aufgaben</b><ol>'+tasks.map(function(t){ return '<li>'+MG.m(t.e)+' <span class="m">= '+MG.numH(t.a)+'</span></li>'; }).join('')+'</ol>'; $$('i',dots).forEach(function(d){d.className='done'}); }
    function tick(){ if(!running||i<0||i>=N||!secs){ bar.style.width= running&&!secs?'100%':'0'; return; } var el=(Date.now()-t0)/1000;
      if(!revealed){ bar.style.width=Math.max(0,100-el/secs*100)+'%'; if(el>=secs){ reveal(); t0=Date.now(); } }
      else { bar.style.width='0'; if(el>=2.2){ next(); } } }
    onSlide(root,'enter',function(){ clearInterval(timer); timer=setInterval(tick,100); });
    onSlide(root,'leave',function(){ clearInterval(timer); });
  })();

  /* =========================================================
     DEMO: Umkehr-Maschine
     ========================================================= */
  (function(){
    var root=$('#umkehr'); if(!root) return;
    var a=-3,b=4, st=0;
    root.innerHTML='<div class="uk-top"><div class="uk-mul"></div><div class="uk-note">Multiplikation (kennen wir schon)</div></div>'+
      '<div class="uk-arrows"><div class="uk-arr l">⤵</div><div class="uk-arr r">⤵</div></div>'+
      '<div class="uk-row"><div class="uk-card c1"><small>Umkehraufgabe 1</small><div class="uk-q q1"></div><div class="uk-rule r1"></div></div><div class="uk-card c2"><small>Umkehraufgabe 2</small><div class="uk-q q2"></div><div class="uk-rule r2"></div></div></div>'+
      '<div class="btnrow uk-ctrl"></div>';
    var ctrl=$('.uk-ctrl',root);
    ctrl.appendChild(btn('⤵ Umkehren','primary',function(){ st=Math.min(2,st+1); render(); }));
    ctrl.appendChild(btn('🎲 Neue Zahlen','',function(){ var t=MG.G.umkehr(); a=t.a; b=t.b; st=0; render(); }));
    [[-3,4],[-3,-4],[5,-6],[-7,-2]].forEach(function(p){ ctrl.appendChild(btn(MG.m(MG.signed(p[0])+'*'+MG.signed(p[1])),'mini',function(){ a=p[0]; b=p[1]; st=0; render(); })); });
    function box(v,c){ return '<span class="uk-n '+c+'">'+par(v)+'</span>'; }
    function sg(v){ return v<0?'−':'+'; }
    function render(){ var c=a*b;
      $('.uk-mul',root).innerHTML=box(a,'na')+' <span class="op">·</span> '+box(b,'nb')+' <span class="op">=</span> '+box(c,'nc');
      $('.q1',root).innerHTML=box(c,'nc')+' <span class="op">:</span> '+box(b,'nb')+' <span class="op">=</span> '+(st>=1?box(a,'na pop'):'<span class="uk-qm">?</span>');
      $('.q2',root).innerHTML=box(c,'nc')+' <span class="op">:</span> '+box(a,'na')+' <span class="op">=</span> '+(st>=2?box(b,'nb pop'):'<span class="uk-qm">?</span>');
      $('.r1',root).innerHTML=st>=1?'<span class="rs">'+sg(c)+' : '+sg(b)+' = '+sg(a)+'</span>':''; $('.r2',root).innerHTML=st>=2?'<span class="rs">'+sg(c)+' : '+sg(a)+' = '+sg(b)+'</span>':'';
      $('.c1',root).classList.toggle('on',st>=1); $('.c2',root).classList.toggle('on',st>=2); }
    render();
  })();

  /* =========================================================
     DEMO: Division an der Zahlengeraden
     ========================================================= */
  (function(){
    var root=$('#nlinediv'); if(!root) return;
    var A=-12, B=4, st=0, MAXST=0;
    root.innerHTML='<div class="nl-head"><div class="nl-task"></div><div class="nl-msg"></div></div><div class="nl-svg"></div><div class="btnrow nl-ctrl"></div>';
    var ctrl=$('.nl-ctrl',root);
    ctrl.appendChild(btn('▶ Nächster Schritt','primary',function(){ if(st<MAXST){ st++; render(true); } }));
    ctrl.appendChild(btn('↺','',function(){ st=0; render(); }));
    [[-12,4],[12,-4],[-12,-4],[-15,3],[18,-6],[-8,-2]].forEach(function(p){ ctrl.appendChild(btn(MG.m(MG.signed(p[0])+':'+MG.signed(p[1])),'mini',function(){ A=p[0]; B=p[1]; st=0; render(); })); });
    ctrl.appendChild(btn('🎲 Neue Aufgabe','',function(){ var q,b; do{ b=MG.nz(-6,6); q=MG.nz(-6,6); }while(Math.abs(b)<2||Math.abs(q*b)>24); A=q*b; B=b; st=0; render(); }));
    function render(anim){
      var R=A/B, n=Math.abs(B), part=A/n, L=Math.max(12, Math.ceil(Math.max(Math.abs(A),Math.abs(R))/4)*4+2);
      MAXST = B<0 ? 4 : 3;
      var W=1600, H=420, u=(W-120)/(2*L), X=function(v){return 60+(v+L)*u}, y0=260;
      var svg=sv('svg',{viewBox:'0 0 '+W+' '+H,'class':'nlsvg'});
      sv('line',{x1:30,y1:y0,x2:W-30,y2:y0,stroke:'#1b2536','stroke-width':5},svg);
      sv('path',{d:'M'+(W-20)+' '+y0+' l-26 -14 v28z',fill:'#1b2536'},svg);
      for(var v=-L; v<=L; v++){ var big=v%(L>16?4:2)===0; sv('line',{x1:X(v),y1:y0-(big?16:9),x2:X(v),y2:y0+(big?16:9),stroke:'#1b2536','stroke-width':big?4:2},svg);
        if(big){ var t=sv('text',{x:X(v),y:y0+54,'text-anchor':'middle','font-size':30,'font-weight':800,'font-family':'Nunito',fill:v===0?'#1b2536':'#3b4658'},svg); t.textContent=fnum(v); } }
      function newest(g,k){ if(anim && k===st) g.setAttribute('class',(g.getAttribute('class')||'')+' pop'); }
      var msg='';
      if(st>=1){ var g1=sv('g',{},svg); var col=A<0?'#2f6fe0':'#d9483b';
        sv('line',{x1:X(0),y1:y0-40,x2:X(A),y2:y0-40,stroke:col,'stroke-width':12,'stroke-linecap':'round',opacity:st>=2?.25:1},g1);
        sv('path',{d:'M'+X(A)+' '+(y0-40)+' l'+(A<0?22:-22)+' -16 v32z',fill:col,opacity:st>=2?.25:1},g1);
        var tl=sv('text',{x:(X(0)+X(A))/2,y:y0-64,'text-anchor':'middle','font-size':34,'font-weight':900,'font-family':'Nunito',fill:col},g1); tl.textContent='Dividend '+fnum(A); newest(g1,1);
        msg='Pfeil von 0 bis zum Dividenden '+fnum(A)+'.'; }
      if(st>=2){ var g2=sv('g',{},svg);
        for(var k=0;k<n;k++){ var a0=k*part, a1=(k+1)*part, xm=(X(a0)+X(a1))/2, hgt=70;
          sv('path',{d:'M'+X(a0)+' '+(y0-8)+' Q'+xm+' '+(y0-8-hgt*2)+' '+X(a1)+' '+(y0-8),fill:'none',stroke:k===0&&st>=3?'#e8772e':'#8e4fd8','stroke-width':k===0&&st>=3?9:6},g2);
          sv('circle',{cx:X(a1),cy:y0,r:9,fill:'#8e4fd8'},g2); }
        var t2=sv('text',{x:(X(0)+X(A))/2,y:y0-8-150,'text-anchor':'middle','font-size':32,'font-weight':900,'font-family':'Nunito',fill:'#8e4fd8'},g2); t2.textContent=n+' gleich große Sprünge'; newest(g2,2);
        msg='In |'+fnum(B)+'| = '+n+' gleich große Sprünge zerlegen.'; }
      if(st>=3){ var g3=sv('g',{},svg); var xm3=(X(0)+X(part))/2;
        var bx=sv('rect',{x:xm3-120,y:y0+74,width:240,height:62,rx:16,fill:'#e8772e'},g3);
        var t3=sv('text',{x:xm3,y:y0+117,'text-anchor':'middle','font-size':34,'font-weight':900,'font-family':'Nunito',fill:'#fff'},g3); t3.textContent='1 Sprung = '+fnum(part); newest(g3,3);
        msg = B>0 ? 'Ein Sprung ist das Ergebnis: '+fnum(A)+' : '+fnum(B)+' = '+fnum(R) : 'Ein Sprung ist '+fnum(part)+' – aber der Divisor ist negativ …'; }
      if(st>=4){ var g4=sv('g',{},svg);
        sv('path',{d:'M'+X(part)+' '+(y0+30)+' Q'+X(0)+' '+(y0+150)+' '+X(-part)+' '+(y0+30),fill:'none',stroke:'#1f9d6a','stroke-width':6,'stroke-dasharray':'4 12','stroke-linecap':'round'},g4);
        sv('circle',{cx:X(-part),cy:y0,r:18,fill:'#1f9d6a'},g4);
        var t4=sv('text',{x:X(-part),y:y0-36,'text-anchor':'middle','font-size':38,'font-weight':900,'font-family':'Nunito',fill:'#1f9d6a'},g4); t4.textContent=fnum(R); newest(g4,4);
        msg='Divisor negativ → an der 0 spiegeln (Vorzeichen wechselt): '+fnum(A)+' : ('+fnum(B)+') = '+fnum(R); }
      var holder=$('.nl-svg',root); holder.innerHTML=''; holder.appendChild(svg);
      $('.nl-task',root).innerHTML=MG.m(MG.signed(A)+':'+MG.signed(B))+' <span class="m">= '+(st>=MAXST?'<b class="res">'+MG.numH(new MG.Q(A,B))+'</b>':'?')+'</span>';
      $('.nl-msg',root).textContent = msg || 'Klicke auf „Nächster Schritt“.';
    }
    render();
  })();

  /* =========================================================
     DEMO: Aufgabengenerator (Division)
     ========================================================= */
  $$('.gen[data-gen="div"]').forEach(function(root){
    var level='int', cur=null, hist=[];
    root.innerHTML='<div class="gen-top"></div><div class="gen-card"><div class="gen-task"></div><div class="gen-ans"></div><div class="gen-probe"></div></div><div class="btnrow gen-ctrl"></div><div class="gen-hist"></div>';
    $('.gen-top',root).appendChild(seg([['int','★ Ganze Zahlen'],['dec','★★ Dezimalzahlen'],['frac','★★★ Brüche'],['mix','🎲 Gemischt']], function(v){ level=v; neu(); }));
    var ctrl=$('.gen-ctrl',root);
    ctrl.appendChild(btn('🎲 Neue Aufgabe','primary',neu)); ctrl.appendChild(btn('👁 Lösung','',sol)); ctrl.appendChild(btn('✔ Probe','',probe));
    ctrl.appendChild(h('div','pickwidget'));
    function neu(){ if(cur){ hist.unshift(cur); hist=hist.slice(0,4); } cur=MG.G.div(level); $('.gen-task',root).innerHTML=MG.m(cur.e)+' <span class="m">= ?</span>'; $('.gen-ans',root).innerHTML=''; $('.gen-probe',root).innerHTML='';
      $('.gen-hist',root).innerHTML = hist.length ? '<span>Vorher:</span> '+hist.map(function(t){ return MG.m(t.e)+' <span class="m">= '+MG.numH(t.a,t.mode)+'</span>'; }).join(' &nbsp;·&nbsp; ') : ''; }
    function sol(){ if(!cur) return; $('.gen-task',root).innerHTML=MG.m(cur.e)+' <span class="m">= <b class="res">'+MG.numH(cur.a,cur.mode)+'</b></span>'; }
    function probe(){ if(!cur) return; sol(); var t=MG.parse(cur.e); var bq=MG.evaluate(t.b), aq=MG.evaluate(t.a);
      $('.gen-probe',root).innerHTML='Probe: <span class="m">'+(cur.a.n<0?'('+MG.numH(cur.a,cur.mode)+')':MG.numH(cur.a,cur.mode))+' · '+(bq.n<0?'('+MG.numH(bq,'mixed')+')':MG.numH(bq,'mixed'))+' = '+MG.numH(aq,'mixed')+'</span> ✓'; }
    neu();
  });

  /* =========================================================
     DEMO: Komma verschieben
     ========================================================= */
  (function(){
    var root=$('#kommashift'); if(!root) return;
    var PRE=[['-7.5','0.5'],['1.2','-0.04'],['-0.36','-0.6'],['-4.8','1.2'],['9','-0.3']], cur=0, st=0, A, B;
    root.innerHTML='<div class="ks-task"></div><div class="ks-rows"><div class="ksr r1"><span class="sn">1</span><span class="tx">Vorzeichen</span><span class="val v1"></span></div>'+
      '<div class="ksr r2"><span class="sn">2</span><span class="tx">Komma verschieben</span><span class="val v2"><span class="numbox na"></span><span class="op">:</span><span class="numbox nb"></span><span class="shift"></span></span></div>'+
      '<div class="ksr r3"><span class="sn">3</span><span class="tx">Rechnen</span><span class="val v3"></span></div>'+
      '<div class="ksr r4"><span class="sn">4</span><span class="tx">Ergebnis</span><span class="val v4"></span></div></div><div class="btnrow ks-ctrl"></div>';
    var ctrl=$('.ks-ctrl',root);
    ctrl.appendChild(btn('▶ Nächster Schritt','primary',function(){ if(st<4){ st++; render(); } }));
    ctrl.appendChild(btn('↺','',function(){ st=0; render(); }));
    ctrl.appendChild(btn('⏭ Nächstes Beispiel','',function(){ cur=(cur+1)%PRE.length; A=PRE[cur][0]; B=PRE[cur][1]; st=0; render(); }));
    ctrl.appendChild(btn('🎲 Neue Aufgabe','',function(){ var t=MG.G.div('dec'), tr=MG.parse(t.e); var qa=MG.evaluate(tr.a), qb=MG.evaluate(tr.b);
      A=(MG.decStr(qa)||'0').replace(MINUS,'-').replace(',','.'); B=(MG.decStr(qb)||'1').replace(MINUS,'-').replace(',','.'); st=0; render(); }));
    A=PRE[0][0]; B=PRE[0][1];
    function dec(s){ var p=s.replace('-','').split('.'); return p[1]?p[1].length:0; }
    function cells(s, shiftBy){ // Ziffern-Zellen mit beweglichem Komma
      var neg=s.charAt(0)==='-', p=s.replace('-','').split('.'), ip=p[0], fp=p[1]||'', digits=(ip+fp).split(''), comma=ip.length;
      while(digits.length<comma+shiftBy) digits.push('0');
      var pos=comma+(shiftBy||0), html='';
      digits.forEach(function(d,i){ var lead=(i<pos-1 && i===0 && d==='0' && shiftBy) || (shiftBy && i<pos-1 && digits.slice(0,i+1).every(function(x){return x==='0'})); html+='<span class="dg'+(lead?' lead':'')+(i>=ip.length+fp.length?' added':'')+'">'+d+'</span>'; });
      var showComma = pos<digits.length;
      return '<span class="cells" style="--n:'+digits.length+'">'+html+'<span class="cm'+(showComma?'':' gone')+'" style="--p:'+comma+'" data-to="'+pos+'">,</span></span>';
    }
    function render(){
      var qa=MG.fromDec(A.replace('-','')).mul(new MG.Q(A.charAt(0)==='-'?-1:1)), qb=MG.fromDec(B.replace('-','')).mul(new MG.Q(B.charAt(0)==='-'?-1:1));
      var k=dec(B), sa=A.charAt(0)==='-'?-1:1, sb=B.charAt(0)==='-'?-1:1, rs=sa*sb;
      var expr=(sa<0?'('+A+')':A)+':'+(sb<0?'('+B+')':B);
      $('.ks-task',root).innerHTML=MG.m(expr)+' <span class="m">= ?</span>';
      $$('.ksr',root).forEach(function(r,i){ r.classList.toggle('on', st>i); r.classList.toggle('cur', st===i+1); });
      $('.v1',root).innerHTML = st>=1 ? '<b class="'+(sa<0?'minus':'plus')+'">'+(sa<0?'−':'+')+'</b> : <b class="'+(sb<0?'minus':'plus')+'">'+(sb<0?'−':'+')+'</b> → Ergebnis <b class="'+(rs<0?'minus':'plus')+'">'+(rs<0?'negativ (−)':'positiv (+)')+'</b>' : '';
      var absA=A.replace('-',''), absB=B.replace('-','');
      if(st>=2){ $('.na',root).innerHTML=cells(absA,0); $('.nb',root).innerHTML=cells(absB,0);
        $('.shift',root).innerHTML = k ? '→ Komma bei beiden um <b>'+k+'</b> Stelle'+(k>1?'n':'')+' nach rechts' : '→ Divisor ist schon ganz – nichts verschieben';
        setTimeout(function(){ $$('.cm',root).forEach(function(c){ c.style.setProperty('--p', c.dataset.to); if(k) c.classList.add('moved'); }); }, 350);
      } else { $('.na',root).innerHTML=''; $('.nb',root).innerHTML=''; $('.shift',root).innerHTML=''; }
      var a2=MG.fromDec(absA).mul(new MG.Q(Math.pow(10,k))), b2=MG.fromDec(absB).mul(new MG.Q(Math.pow(10,k))), r=a2.div(b2);
      $('.v3',root).innerHTML = st>=3 ? '<span class="m">'+MG.numH(a2)+' : '+MG.numH(b2)+' = '+MG.numH(r)+'</span>' : '';
      $('.v4',root).innerHTML = st>=4 ? '<span class="m">'+MG.toH(expr)+' = <b class="res">'+MG.numH(qa.div(qb))+'</b></span>' : '';
    }
    render();
  })();

  /* =========================================================
     DEMO: Durchschnittstemperatur
     ========================================================= */
  (function(){
    var root=$('#tempmean'); if(!root) return;
    var DAYS=['Mo','Di','Mi','Do','Fr','Sa','So'], vals=[-3,-5,1,-2,-6,0,-6], showSum=false, showMean=false;
    root.innerHTML='<div class="tm-chart"></div><div class="tm-side"><div class="tm-q">Schätze zuerst: Wo liegt der Durchschnitt? 👉</div><div class="tm-sum"></div><div class="tm-mean"></div><div class="btnrow tm-ctrl"></div></div>';
    var ctrl=$('.tm-ctrl',root);
    ctrl.appendChild(btn('Σ Summe','primary',function(){ showSum=true; render(); }));
    ctrl.appendChild(btn('⌀ Durchschnitt','primary',function(){ showSum=true; showMean=true; render(); }));
    ctrl.appendChild(btn('🎲 Neue Woche','',function(){ vals=MG.G.week(); showSum=showMean=false; render(); }));
    function render(){
      var W=1000,H=620, top=40, bot=520, ymin=-12, ymax=8, Y=function(v){ return top+(ymax-v)/(ymax-ymin)*(bot-top); }, bw=90, gap=(W-120-7*bw)/7;
      var svg=sv('svg',{viewBox:'0 0 '+W+' '+H,'class':'tmsvg'});
      for(var v=ymin; v<=ymax; v+=2){ sv('line',{x1:90,y1:Y(v),x2:W-10,y2:Y(v),stroke:v===0?'#1b2536':'#dde6f0','stroke-width':v===0?4:2},svg); var t=sv('text',{x:78,y:Y(v)+9,'text-anchor':'end','font-size':26,'font-weight':800,'font-family':'Nunito',fill:'#3b4658'},svg); t.textContent=fnum(v)+'°'; }
      vals.forEach(function(val,i){ var x=100+gap/2+i*(bw+gap), y=Math.min(Y(val),Y(0)), hh=Math.max(4,Math.abs(Y(val)-Y(0)));
        sv('rect',{x:x,y:y,width:bw,height:hh,rx:12,fill:val<0?'#2f6fe0':val>0?'#d9483b':'#8a94a6','class':'tmbar'},svg);
        var tv=sv('text',{x:x+bw/2,y:val<0?Y(val)-14:Y(val)-12,'text-anchor':'middle','font-size':30,'font-weight':900,'font-family':'Nunito',fill:val<0?'#fff':'#1b2536'},svg); tv.textContent=fnum(val);
        if(val<0 && hh<50){ tv.setAttribute('y',Y(val)+36); tv.setAttribute('fill','#1b2536'); }
        var td=sv('text',{x:x+bw/2,y:H-60,'text-anchor':'middle','font-size':30,'font-weight':800,'font-family':'Nunito',fill:'#1b2536'},svg); td.textContent=DAYS[i];
        var up=sv('text',{x:x+bw/2-24,y:H-14,'text-anchor':'middle','font-size':32,'class':'tmbtn',fill:'#d9483b'},svg); up.textContent='▲'; up.addEventListener('click',function(){ vals[i]=Math.min(7,vals[i]+1); render(); });
        var dn=sv('text',{x:x+bw/2+24,y:H-14,'text-anchor':'middle','font-size':32,'class':'tmbtn',fill:'#2f6fe0'},svg); dn.textContent='▼'; dn.addEventListener('click',function(){ vals[i]=Math.max(-12,vals[i]-1); render(); });
      });
      var s=vals.reduce(function(a,b){return a+b},0), m=new MG.Q(s,7), mv=s/7, exact=MG.decStr(m)!==null;
      if(showMean){ sv('line',{x1:90,y1:Y(mv),x2:W-10,y2:Y(mv),stroke:'#e8772e','stroke-width':6,'stroke-dasharray':'18 10','class':'pop'},svg); var tm=sv('text',{x:W-14,y:Y(mv)-12,'text-anchor':'end','font-size':30,'font-weight':900,'font-family':'Nunito',fill:'#e8772e'},svg); tm.textContent='⌀ '+(exact?MG.numH(m):'≈ '+fnum(Math.round(mv*10)/10))+' °C'; }
      var c=$('.tm-chart',root); c.innerHTML=''; c.appendChild(svg);
      $('.tm-sum',root).innerHTML = showSum ? '<small>Summe</small><span class="m">'+vals.map(par).join(' + ')+' = '+fnum(s)+'</span>' : '';
      $('.tm-mean',root).innerHTML = showMean ? '<small>Durchschnitt = Summe : Anzahl</small><span class="m">'+par(s)+' : 7 = '+(exact?'<b class="res">'+MG.numH(m)+'</b>':MG.numH(m,'frac')+' ≈ <b class="res">'+fnum(Math.round(mv*100)/100)+'</b>')+'</span> °C' : '';
    }
    render();
  })();

  /* =========================================================
     DEMO: Rechenbaum („Zahlen oben, Rechnung nach unten, Ergebnis unten“)
     ========================================================= */
  (function(){
    var root=$('#rbaum'); if(!root) return;
    var EX=['8+3*(-2)','(-12):(4-7)+2*(-3)^2','-2^2+(-2)^2','(-20):4-6','5*(-2+7)','1.5*(-4)+0.5*6'], expr=EX[0], nodes=[], order=[], done=0;
    root.innerHTML='<div class="rb-top"><div class="rb-expr"></div><div class="rb-log"></div></div><div class="rb-svg"></div><div class="btnrow rb-ctrl"></div>';
    var ctrl=$('.rb-ctrl',root);
    ctrl.appendChild(btn('▶ Nächster Schritt','primary',function(){ if(done<order.length){ done++; draw(true); } }));
    ctrl.appendChild(btn('⏩ Alles','',function(){ done=order.length; draw(); }));
    ctrl.appendChild(btn('↺','',function(){ done=0; draw(); }));
    var sel=h('select','rb-sel'); EX.forEach(function(e){ var o=h('option','',''); o.value=e; o.innerHTML=MG.toH(e).replace(/<[^>]+>/g,'').replace(/(\d)\s*$/,'$1'); sel.appendChild(o); });
    sel.addEventListener('change',function(){ load(sel.value); }); ctrl.appendChild(sel);
    [1,2,3].forEach(function(l){ ctrl.appendChild(btn('🎲 Niveau '+l,'mini',function(){ load(MG.G.vorrang(l).e); })); });
    function txt(q){ return MG.numH(q).replace(/<span class="fr"><span>(\d+)<\/span><span>(\d+)<\/span><\/span>/g,'$1/$2'); }
    function build(t){ // Baum mit Blättern (Zahlen) und Rechenknoten
      if(t.k==='num'||t.k==='frac'||t.k==='mixed') return {leaf:true, q:MG.evaluate(t)};
      if(t.k==='neg' && (t.a.k==='num'||t.a.k==='frac') && !t.a.paren) return {leaf:true, q:MG.evaluate(t)};
      if(t.k==='neg') return {op:'neg', kids:[build(t.a)], q:MG.evaluate(t)};
      if(t.k==='pos') return build(t.a);
      return {op:t.op, kids:[build(t.a),build(t.b)], q:MG.evaluate(t)};
    }
    function load(e){ expr=e; nodes=[]; order=[]; done=0; var root2=build(MG.parse(e)); var leaves=0;
      (function lay(n){ if(n.leaf){ n.col=leaves++; n.row=0; nodes.push(n); return; } n.kids.forEach(lay); n.row=1+Math.max.apply(null,n.kids.map(function(k){return k.row})); n.col=n.kids.reduce(function(a,k){return a+k.col},0)/n.kids.length; nodes.push(n); })(root2);
      var ops=nodes.filter(function(n){return !n.leaf}); // Reihenfolge: nach Ebene, dann links nach rechts
      ops.sort(function(a,b){ return a.row-b.row || a.col-b.col; }); order=ops; nodes.leaves=leaves; nodes.root=root2;
      $('.rb-expr',root).innerHTML=MG.m(e); draw(); }
    var SYM={'+':'+','-':'−','*':'·',':':':','^':'hoch','neg':'Gegenzahl'};
    function draw(anim){
      var nl=nodes.leaves, rows=nodes.root.row+1, W=Math.max(1100, nl*190), rowH=Math.min(170, 560/Math.max(1,rows-1||1)), H=90+(rows-1)*rowH+90;
      var X=function(c){ return (W/nl)*(c+.5); }, Y=function(r){ return 60+r*rowH; };
      var svg=sv('svg',{viewBox:'0 0 '+W+' '+H,'class':'rbsvg'});
      var doneSet=order.slice(0,done), next=order[done];
      nodes.forEach(function(n){ if(n.leaf) return; n.kids.forEach(function(k){ sv('line',{x1:X(k.col),y1:Y(k.row)+30,x2:X(n.col),y2:Y(n.row)-30,stroke:(n===next)?'#e0a614':(doneSet.indexOf(n)>=0?'#1f9d6a':'#aab4c3'),'stroke-width':n===next?9:6,'stroke-linecap':'round'},svg); }); });
      nodes.forEach(function(n){
        var g=sv('g',{},svg), x=X(n.col), y=Y(n.row), isDone=n.leaf||doneSet.indexOf(n)>=0, isNext=n===next;
        if(n.leaf){ sv('rect',{x:x-78,y:y-32,width:156,height:64,rx:18,fill:'#fff',stroke:'#2f6fe0','stroke-width':5},g); var t=sv('text',{x:x,y:y+13,'text-anchor':'middle','font-size':38,'font-weight':800,'font-family':'Nunito',fill:'#1b2536'},g); t.textContent=txt(n.q); }
        else if(isDone){ var last=n===doneSet[doneSet.length-1]&&anim; sv('rect',{x:x-82,y:y-34,width:164,height:68,rx:20,fill:n===nodes.root?'#1f9d6a':'#eafaf0',stroke:'#1f9d6a','stroke-width':5},g); var t2=sv('text',{x:x,y:y+14,'text-anchor':'middle','font-size':40,'font-weight':900,'font-family':'Nunito',fill:n===nodes.root?'#fff':'#1b2536'},g); t2.textContent=txt(n.q);
          var ts=sv('text',{x:x+96,y:y-20,'font-size':30,'font-weight':900,'font-family':'Nunito',fill:'#8a94a6'},g); ts.textContent=SYM[n.op]; if(last) g.setAttribute('class','pop'); }
        else { sv('circle',{cx:x,cy:y,r:34,fill:isNext?'#ffe38a':'#fff',stroke:isNext?'#e0a614':'#aab4c3','stroke-width':5},g); var t3=sv('text',{x:x,y:y+(n.op==='^'||n.op==='neg'?9:15),'text-anchor':'middle','font-size':n.op==='^'||n.op==='neg'?(n.op==='neg'?16:24):44,'font-weight':900,'font-family':'Nunito',fill:'#1b2536'},g); t3.textContent=SYM[n.op]; }
      });
      var hold=$('.rb-svg',root); hold.innerHTML=''; hold.appendChild(svg);
      var log=doneSet.map(function(n){ var a=n.kids[0], b=n.kids[1]; var s = n.op==='neg' ? '−('+txt(a.q)+')' : n.op==='^' ? '('+txt(a.q)+')^'+txt(b.q) : (a.q.n<0&&!(a===nodes.root)?'('+txt(a.q)+')':txt(a.q))+' '+SYM[n.op]+' '+(b.q.n<0?'('+txt(b.q)+')':txt(b.q));
        return '<span>'+s.replace(/\(([^()]+)\)\^(\S+)/,function(_,x,y){ return (x.charAt(0)==='−'?'('+x+')':x)+'<sup>'+y+'</sup>'; })+' = <b>'+txt(n.q)+'</b></span>'; });
      $('.rb-log',root).innerHTML = log.length ? log.join('') : '<span class="muted">Zahlen oben · Rechnung nach unten · Ergebnis unten</span>';
      $('.rb-expr',root).innerHTML = MG.m(expr) + (done===order.length && order.length ? ' <span class="m">= <b class="res">'+MG.numH(nodes.root.q)+'</b></span>' : '');
    }
    load(expr);
  })();

  /* =========================================================
     DEMO: Tauschkarten (Kommutativ- und Assoziativgesetz)
     ========================================================= */
  (function(){
    var root=$('#tausch'); if(!root) return;
    var EXAMPLES = window.TAUSCH_EXAMPLES = [
      {name:'(−25) · 7 · 4', states:[
        {t:['a:(−25)','o1:·','b:7','o2:·','c:4'], e:'(-25)*7*4', law:''},
        {t:['a:(−25)','o1:·','c:4','o2:·','b:7'], e:'(-25)*4*7', law:'Kommutativgesetz: Faktoren tauschen'},
        {t:['p1:(','a:(−25)','o1:·','c:4','p2:)','o2:·','b:7'], e:'((-25)*4)*7', law:'Assoziativgesetz: geschickt zusammenfassen'},
        {t:['r:(−100)','o2:·','b:7'], e:'(-100)*7', law:'Rechnen: (−25) · 4 = −100'},
        {t:['z:−700'], e:'-700', law:'Ergebnis'}]},
      {name:'17 + (−38) + (−17)', states:[
        {t:['a:17','o1:+','b:(−38)','o2:+','c:(−17)'], e:'17+(-38)+(-17)', law:''},
        {t:['a:17','o1:+','c:(−17)','o2:+','b:(−38)'], e:'17+(-17)+(-38)', law:'Kommutativgesetz: Summanden tauschen'},
        {t:['p1:(','a:17','o1:+','c:(−17)','p2:)','o2:+','b:(−38)'], e:'(17+(-17))+(-38)', law:'Assoziativgesetz: zusammenfassen'},
        {t:['r:0','o2:+','b:(−38)'], e:'0+(-38)', law:'Rechnen: 17 + (−17) = 0'},
        {t:['z:−38'], e:'-38', law:'Ergebnis'}]},
      {name:'(−0,5) · 9 · (−2)', states:[
        {t:['a:(−0,5)','o1:·','b:9','o2:·','c:(−2)'], e:'(-0.5)*9*(-2)', law:''},
        {t:['a:(−0,5)','o1:·','c:(−2)','o2:·','b:9'], e:'(-0.5)*(-2)*9', law:'Kommutativgesetz: Faktoren tauschen'},
        {t:['p1:(','a:(−0,5)','o1:·','c:(−2)','p2:)','o2:·','b:9'], e:'((-0.5)*(-2))*9', law:'Assoziativgesetz: zusammenfassen'},
        {t:['r:1','o2:·','b:9'], e:'1*9', law:'Rechnen: (−0,5) · (−2) = 1'},
        {t:['z:9'], e:'9', law:'Ergebnis'}]},
      {name:'4 · (−13) · 25', states:[
        {t:['a:4','o1:·','b:(−13)','o2:·','c:25'], e:'4*(-13)*25', law:''},
        {t:['a:4','o1:·','c:25','o2:·','b:(−13)'], e:'4*25*(-13)', law:'Kommutativgesetz: Faktoren tauschen'},
        {t:['p1:(','a:4','o1:·','c:25','p2:)','o2:·','b:(−13)'], e:'(4*25)*(-13)', law:'Assoziativgesetz: zusammenfassen'},
        {t:['r:100','o2:·','b:(−13)'], e:'100*(-13)', law:'Rechnen: 4 · 25 = 100'},
        {t:['z:−1300'], e:'-1300', law:'Ergebnis'}]}
    ];
    var ex=0, st=0;
    root.innerHTML='<div class="tk-top"></div><div class="tk-stage"><div class="tk-cards"></div></div><div class="tk-law"></div><div class="tk-hist"></div><div class="btnrow tk-ctrl"></div>';
    $('.tk-top',root).appendChild(seg(EXAMPLES.map(function(e,i){ return [i,e.name]; }), function(v){ ex=+v; st=0; render(true); }));
    var ctrl=$('.tk-ctrl',root);
    ctrl.appendChild(btn('▶ Nächster Schritt','primary',function(){ if(st<EXAMPLES[ex].states.length-1){ st++; render(); } }));
    ctrl.appendChild(btn('◀ Zurück','',function(){ if(st>0){ st--; render(); } }));
    var cardsEl=$('.tk-cards',root);
    function render(reset){
      var S=EXAMPLES[ex].states[st], old={};
      if(!reset) $$('.tk',cardsEl).forEach(function(c){ old[c.dataset.id]=c.getBoundingClientRect(); });
      cardsEl.innerHTML='';
      S.t.forEach(function(tok){ var id=tok.split(':')[0], txt=tok.slice(id.length+1); var c=h('span','tk '+(id.charAt(0)==='o'?'op':id.charAt(0)==='p'?'par':id==='z'?'res':id==='r'?'mid':'num'),txt); c.dataset.id=id; cardsEl.appendChild(c); });
      if(!reset){ var sc=parseFloat(getComputedStyle(document.getElementById('stage')).getPropertyValue('--scale'))||1;
        $$('.tk',cardsEl).forEach(function(c){ var o=old[c.dataset.id], n=c.getBoundingClientRect(); if(o){ c.style.transition='none'; c.style.transform='translate('+((o.left-n.left)/sc)+'px,'+((o.top-n.top)/sc)+'px)'; requestAnimationFrame(function(){ requestAnimationFrame(function(){ c.style.transition='transform .7s cubic-bezier(.3,1.3,.5,1)'; c.style.transform=''; }); }); } else c.classList.add('pop'); }); }
      $('.tk-law',root).innerHTML = S.law ? '<b>'+S.law+'</b>' : 'Rechne zuerst im Kopf, wie es dasteht – geht das leicht?';
      $('.tk-hist',root).innerHTML = EXAMPLES[ex].states.slice(0,st+1).map(function(s,i){ return '<span>'+(i?'= ':'')+s.t.map(function(t){return t.split(':').slice(1).join(':')}).join(' ')+'</span>'; }).join(' ');
    }
    render(true);
  })();

  /* =========================================================
     DEMO: Erst gehen, dann steigen/fallen
     ========================================================= */
  (function(){
    var root=$('#walker'); if(!root) return;
    var k=KS([-6,6,-5,5],58,{cls:'ks-walk'}), P={x:-3,y:2}, anim=null;
    root.innerHTML='<div class="wk-ks"></div><div class="wk-side"><div class="wk-pt"></div><div class="wk-s1"></div><div class="wk-s2"></div><div class="btnrow wk-ctrl"></div></div>';
    $('.wk-ks',root).appendChild(k.svg);
    var trail=sv('g',{},k.layer), fig=sv('g',{'class':'walkfig'},k.layer);
    sv('circle',{cx:0,cy:0,r:24,fill:'#e8772e',stroke:'#fff','stroke-width':5},fig); sv('circle',{cx:-8,cy:-5,r:4,fill:'#1b2536'},fig); sv('circle',{cx:8,cy:-5,r:4,fill:'#1b2536'},fig); sv('path',{d:'M-8 8 q8 7 16 0',stroke:'#1b2536','stroke-width':3,fill:'none'},fig);
    var ctrl=$('.wk-ctrl',root);
    ctrl.appendChild(btn('▶ Losgehen','primary',go));
    [[-3,2],[4,-3],[-5,-4],[2,5],[0,-4]].forEach(function(p){ ctrl.appendChild(btn(pt(p[0],p[1]),'mini',function(){ P={x:p[0],y:p[1]}; reset(); })); });
    ctrl.appendChild(btn('🎲 Neuer Punkt','',function(){ P=MG.G.point(5); reset(); }));
    function place(x,y){ fig.setAttribute('transform','translate('+k.X(x)+' '+k.Y(y)+')'); }
    function reset(){ if(anim) cancelAnimationFrame(anim); trail.innerHTML=''; place(0,0); $('.wk-pt',root).innerHTML='<span class="m">P'+pt(P.x,P.y)+'</span>'; $('.wk-s1',root).innerHTML=''; $('.wk-s2',root).innerHTML=''; }
    function dir(v,a,b){ return Math.abs(v)+' '+(v<0?a:b); }
    function go(){ reset(); var t0=null, d1=Math.max(.3,Math.abs(P.x)*.28), d2=Math.max(.3,Math.abs(P.y)*.28);
      var l1=sv('line',{x1:k.X(0),y1:k.Y(0),x2:k.X(0),y2:k.Y(0),stroke:'#2f6fe0','stroke-width':12,'stroke-linecap':'round'},trail), l2=null;
      $('.wk-s1',root).innerHTML='<span class="n1">1</span> x = '+fnum(P.x)+' → <b>'+(P.x?dir(P.x,'nach links','nach rechts')+' gehen':'nicht gehen')+'</b>';
      function step(ts){ if(!t0) t0=ts; var t=(ts-t0)/1000;
        if(t<d1){ var x=P.x*t/d1; l1.setAttribute('x2',k.X(x)); place(x,0); }
        else if(t<d1+d2){ if(!l2){ l1.setAttribute('x2',k.X(P.x)); l2=sv('line',{x1:k.X(P.x),y1:k.Y(0),x2:k.X(P.x),y2:k.Y(0),stroke:'#1f9d6a','stroke-width':12,'stroke-linecap':'round'},trail);
            $('.wk-s2',root).innerHTML='<span class="n2">2</span> y = '+fnum(P.y)+' → <b>'+(P.y?(P.y<0?Math.abs(P.y)+' nach unten fallen':P.y+' nach oben steigen'):'nicht steigen')+'</b>'; }
          var y=P.y*(t-d1)/d2; l2.setAttribute('y2',k.Y(y)); place(P.x,y); }
        else { place(P.x,P.y); if(l2) l2.setAttribute('y2',k.Y(P.y)); else { $('.wk-s2',root).innerHTML='<span class="n2">2</span> y = '+fnum(P.y)+' → <b>'+(P.y?(P.y<0?Math.abs(P.y)+' nach unten fallen':P.y+' nach oben steigen'):'nicht steigen')+'</b>'; }
          var g=k.point(P.x,P.y,'P'+pt(P.x,P.y),'#d9483b','pop'); trail.appendChild(g); AUDIO('ok'); return; }
        anim=requestAnimationFrame(step); }
      anim=requestAnimationFrame(step); }
    reset();
  })();

  /* =========================================================
     SPIEL: Wer findet den Punkt zuerst?
     ========================================================= */
  (function(){
    var root=$('#ksgame'); if(!root) return;
    var k=KS([-6,6,-5,5],58,{cls:'ks-game'}), mode='find', target=null, team=0, score=[0,0], axes=false, locked=false;
    root.innerHTML='<div class="kg-ks"></div><div class="kg-side"><div class="kg-mode"></div><div class="kg-task"></div><div class="kg-fb"></div><div class="kg-score"><div class="tm t0"><b>Team A</b><span>0</span><button>+1</button></div><div class="tm t1"><b>Team B</b><span>0</span><button>+1</button></div></div><div class="btnrow kg-ctrl"></div></div>';
    $('.kg-ks',root).appendChild(k.svg);
    var marks=sv('g',{},k.layer), hover=sv('circle',{r:k.u*.2,fill:'none',stroke:'#e0a614','stroke-width':6,opacity:0},k.layer);
    $('.kg-mode',root).appendChild(seg([['find','📍 Punkt finden'],['name','🗣 Koordinaten nennen']], function(v){ mode=v; neu(); }));
    var ctrl=$('.kg-ctrl',root);
    ctrl.appendChild(btn('🎲 Neuer Punkt','primary',neu)); ctrl.appendChild(btn('👁 Lösung','',solve));
    var cb=h('label','chk','<input type="checkbox"> auch auf den Achsen'); cb.querySelector('input').addEventListener('change',function(e){ axes=e.target.checked; }); ctrl.appendChild(cb);
    ctrl.appendChild(btn('↺ Punkte auf 0','mini',function(){ score=[0,0]; upd(); }));
    $$('.tm',root).forEach(function(t,i){ $('button',t).addEventListener('click',function(){ score[i]++; upd(); AUDIO('ok'); }); t.addEventListener('click',function(e){ if(e.target.tagName!=='BUTTON'){ team=i; upd(); } }); });
    function upd(){ $$('.tm',root).forEach(function(t,i){ $('span',t).textContent=score[i]; t.classList.toggle('turn', mode==='find' && i===team); }); }
    function neu(){ marks.innerHTML=''; locked=false; target=MG.G.point(5,axes); $('.kg-fb',root).innerHTML='';
      if(mode==='find'){ $('.kg-task',root).innerHTML='<small>Team '+(team?'B':'A')+', finde:</small><span class="m big">'+pt(target.x,target.y)+'</span>'; }
      else { $('.kg-task',root).innerHTML='<small>Wie heißt dieser Punkt?</small><span class="m big">(?|?)</span>'; var g=k.point(target.x,target.y,'','#8e4fd8','pop'); marks.appendChild(g); }
      upd(); }
    function solve(){ if(!target) return; if(mode==='name'){ $('.kg-task',root).innerHTML='<small>Lösung:</small><span class="m big">'+pt(target.x,target.y)+'</span>'; }
      else { marks.appendChild(k.point(target.x,target.y,pt(target.x,target.y),'#1f9d6a','pop')); } }
    k.svg.addEventListener('mousemove',function(e){ if(mode!=='find'||locked) { hover.setAttribute('opacity',0); return; } var d=k.toData(e), x=Math.round(d.x), y=Math.round(d.y); if(x<-6||x>6||y<-5||y>5){ hover.setAttribute('opacity',0); return; } hover.setAttribute('cx',k.X(x)); hover.setAttribute('cy',k.Y(y)); hover.setAttribute('opacity',1); });
    k.svg.addEventListener('click',function(e){ if(mode!=='find'||!target||locked) return; var d=k.toData(e), x=Math.round(d.x), y=Math.round(d.y);
      if(x<-6||x>6||y<-5||y>5) return;
      if(x===target.x && y===target.y){ locked=true; marks.appendChild(k.point(x,y,pt(x,y),'#1f9d6a','pop')); score[team]++; $('.kg-fb',root).innerHTML='<span class="okfb">✔ Richtig! +1 für Team '+(team?'B':'A')+'</span>'; AUDIO('ok'); team=1-team; upd(); }
      else { var g=sv('g',{'class':'pop'},marks); var t=sv('text',{x:k.X(x),y:k.Y(y)+16,'text-anchor':'middle','font-size':54,'font-weight':900,fill:'#d63b3b','font-family':'Nunito'},g); t.textContent='✗';
        $('.kg-fb',root).innerHTML='<span class="badfb">✗ Das ist '+pt(x,y)+' – erst x, dann y!</span>'; AUDIO('bad'); locked=true; marks.appendChild(k.point(target.x,target.y,pt(target.x,target.y),'#1f9d6a','pop')); team=1-team; upd(); } });
    neu();
  })();

  /* =========================================================
     DEMO: Punkte verbinden – Bild entsteht
     ========================================================= */
  (function(){
    var root=$('#bilddemo'); if(!root) return;
    var PICS = window.PICS = {
      'Fisch':[[[-5,0],[-2,3],[2,3],[4,1],[6,3],[6,-3],[4,-1],[2,-3],[-2,-3],[-5,0]],[[-1,3],[0,5],[2,3]],[[-1,-3],[0,-5],[1,-3]],[[-3,1]]],
      'Rakete':[[[0,6],[2,3],[2,-3],[-2,-3],[-2,3],[0,6]],[[-2,-1],[-4,-4],[-2,-3]],[[2,-1],[4,-4],[2,-3]],[[-1,-3],[0,-5],[1,-3]],[[-1,1],[1,1],[1,2],[-1,2],[-1,1]]],
      'Stern':[[[0,5],[1,2],[5,2],[2,0],[3,-4],[0,-2],[-3,-4],[-2,0],[-5,2],[-1,2],[0,5]]],
      'Haus':[[[-4,-4],[4,-4],[4,1],[0,5],[-4,1],[-4,-4]],[[-4,1],[4,1]],[[-1,-4],[-1,-1],[1,-1],[1,-4]],[[2,0],[3,0],[3,-1],[2,-1],[2,0]],[[2,3],[2,5],[3,5],[3,2]]]
    };
    var name='Fisch', li=0, pi=0, k=null;
    root.innerHTML='<div class="bd-ks"></div><div class="bd-side"><div class="bd-sel"></div><div class="bd-list"></div><div class="btnrow bd-ctrl"></div><div class="bd-guess">Was wird das? 🤔</div></div>';
    $('.bd-sel',root).appendChild(seg(Object.keys(PICS).map(function(n){return [n,n+' ?'];}), function(v){ name=v; reset(); }));
    var ctrl=$('.bd-ctrl',root);
    ctrl.appendChild(btn('▶ Nächster Punkt','primary',nextPt)); ctrl.appendChild(btn('⏩ Alles','',function(){ var g=0; while(nextPt(true) && g++<200); })); ctrl.appendChild(btn('↺','',reset));
    function reset(){ var box=$('.bd-ks',root); box.innerHTML=''; k=KS([-6,6,-6,6],50,{cls:'ks-bild'}); box.appendChild(k.svg); li=0; pi=0; list(); $('.bd-guess',root).textContent='Was wird das? 🤔'; }
    function list(){ var P=PICS[name]; $('.bd-list',root).innerHTML=P.map(function(l,i){ return '<div class="bl'+(i===li?' cur':'')+(i<li?' done':'')+'"><b>'+(i+1)+'.</b> '+l.map(function(p,j){ return '<span class="'+((i<li)||(i===li&&j<pi)?'d':'')+(i===li&&j===pi?' nx':'')+'">'+pt(p[0],p[1])+'</span>'; }).join(' ')+'</div>'; }).join(''); }
    function nextPt(fast){ var P=PICS[name]; if(li>=P.length) return false; var line=P[li], p=line[pi];
      if(line.length===1){ var dot=sv('circle',{cx:k.X(p[0]),cy:k.Y(p[1]),r:12,fill:'#1c3f8a','class':fast?'':'pop'},k.layer); }
      else { if(pi>0){ var q=line[pi-1]; var ln=sv('line',{x1:k.X(q[0]),y1:k.Y(q[1]),x2:k.X(p[0]),y2:k.Y(p[1]),stroke:'#1c3f8a','stroke-width':8,'stroke-linecap':'round','class':fast?'':'draw'},k.layer); var L=Math.hypot(k.X(p[0])-k.X(q[0]),k.Y(p[1])-k.Y(q[1])); ln.style.setProperty('--len',L); }
        var c=sv('circle',{cx:k.X(p[0]),cy:k.Y(p[1]),r:9,fill:'#d9483b','class':fast?'':'pop'},k.layer); }
      if(!fast) AUDIO();
      pi++; if(pi>=line.length){ li++; pi=0; } list();
      if(li>=P.length) $('.bd-guess',root).innerHTML='Fertig: <b>'+name+'</b>! 🎉';
      return true; }
    reset();
  })();

  /* =========================================================
     DEMO: Spiegeln an den Achsen
     ========================================================= */
  (function(){
    var root=$('#spiegel'); if(!root) return;
    var tri=[[1,2],[5,1],[3,5]], k=null, done={y:false,x:false};
    root.innerHTML='<div class="sp-ks"></div><div class="sp-side"><table class="sp-tab"></table><div class="sp-rule"></div><div class="btnrow sp-ctrl"></div></div>';
    var ctrl=$('.sp-ctrl',root);
    ctrl.appendChild(btn('⇆ an der y-Achse','primary',function(){ mirror('y'); }));
    ctrl.appendChild(btn('⇅ an der x-Achse','primary',function(){ mirror('x'); }));
    ctrl.appendChild(btn('↺','',reset));
    ctrl.appendChild(btn('🎲 Neue Figur','',function(){ var q=Math.random()<.5?1:-1; do{ tri=[[rnd(1,5)*q,rnd(1,5)],[rnd(1,5)*q,rnd(1,5)],[rnd(1,5)*q,rnd(1,5)]]; }while(Math.abs((tri[1][0]-tri[0][0])*(tri[2][1]-tri[0][1])-(tri[2][0]-tri[0][0])*(tri[1][1]-tri[0][1]))<4); reset(); }));
    var N=['A','B','C'];
    function drawTri(pts,col,suffix,cls){ var g=sv('g',{'class':cls||''},k.layer); sv('polygon',{points:polyStr(k,pts),fill:col,'fill-opacity':.2,stroke:col,'stroke-width':6,'stroke-linejoin':'round'},g);
      pts.forEach(function(p,i){ sv('circle',{cx:k.X(p[0]),cy:k.Y(p[1]),r:9,fill:col},g); var t=sv('text',{x:k.X(p[0])+(p[0]>=0?14:-14),y:k.Y(p[1])-12,'text-anchor':p[0]>=0?'start':'end','font-size':30,'font-weight':700,'font-family':'Fredoka',fill:col,'paint-order':'stroke',stroke:'#fff','stroke-width':6},g); t.textContent=N[i]+suffix; }); return g; }
    function reset(){ var box=$('.sp-ks',root); box.innerHTML=''; k=KS([-6,6,-6,6],50,{cls:'ks-sp'}); box.appendChild(k.svg); drawTri(tri,'#e8772e',''); done={y:false,x:false}; table(); $('.sp-rule',root).innerHTML='Wohin wandert das Dreieck? Vermute zuerst!'; }
    function table(){ var hd='<tr><th>Original</th>'+(done.y?'<th class="cy">an y-Achse</th>':'')+(done.x?'<th class="cx">an x-Achse</th>':'')+'</tr>';
      $('.sp-tab',root).innerHTML=hd+tri.map(function(p,i){ return '<tr><td>'+N[i]+'<span class="m">'+pt(p[0],p[1])+'</span></td>'+(done.y?'<td>'+N[i]+'′<span class="m">(<b class="flip">'+fnum(-p[0])+'</b>|'+fnum(p[1])+')</span></td>':'')+(done.x?'<td>'+N[i]+'″<span class="m">('+fnum(p[0])+'|<b class="flip">'+fnum(-p[1])+'</b>)</span></td>':'')+'</tr>'; }).join(''); }
    function mirror(ax){ if(done[ax]) return; done[ax]=true; var col=ax==='y'?'#2f6fe0':'#1f9d6a';
      var axl=sv('line',ax==='y'?{x1:k.X(0),y1:k.Y(6.4),x2:k.X(0),y2:k.Y(-6.4)}:{x1:k.X(-6.4),y1:k.Y(0),x2:k.X(6.4),y2:k.Y(0)},k.layer); axl.setAttribute('stroke',col); axl.setAttribute('stroke-width',14); axl.setAttribute('opacity',.35); axl.setAttribute('class','pop');
      var img=tri.map(function(p){ return ax==='y'?[-p[0],p[1]]:[p[0],-p[1]]; });
      tri.forEach(function(p,i){ sv('line',{x1:k.X(p[0]),y1:k.Y(p[1]),x2:k.X(img[i][0]),y2:k.Y(img[i][1]),stroke:col,'stroke-width':3,'stroke-dasharray':'8 8',opacity:.8,'class':'pop'},k.layer); });
      var g=drawTri(tri,col,ax==='y'?'′':'″','mirroring'); g.style.transformOrigin=(ax==='y'?k.X(0)+'px 0px':'0px '+k.Y(0)+'px'); g.style.transformBox='view-box';
      g.style.transform='scale(1,1)'; requestAnimationFrame(function(){ requestAnimationFrame(function(){ g.style.transition='transform 1.4s cubic-bezier(.5,0,.3,1)'; g.style.transform=ax==='y'?'scale(-1,1)':'scale(1,-1)'; }); });
      setTimeout(function(){ g.remove(); drawTri(img,col,ax==='y'?'′':'″',''); table(); }, 1500);
      $('.sp-rule',root).innerHTML = ax==='y' ? 'An der <b class="cy">y-Achse</b>: <b>x</b> wechselt das Vorzeichen, y bleibt.' : 'An der <b class="cx">x-Achse</b>: <b>y</b> wechselt das Vorzeichen, x bleibt.'; }
    reset();
  })();

  /* =========================================================
     DEMO: Verschieben
     ========================================================= */
  (function(){
    var root=$('#verschieb'); if(!root) return;
    var fig=[[-2,-1],[1,-1],[1,1],[-0.5,2.5],[-2,1]], dx=0, dy=0, k=null, g=null, arrow=null, task=null;
    fig=[[-2,-1],[1,-1],[1,1],[-1,3],[-2,1]];
    root.innerHTML='<div class="vs-ks"></div><div class="vs-side"><div class="vs-pad"><button data-d="u">▲</button><button data-d="l">◀</button><button data-d="r">▶</button><button data-d="d">▼</button></div><div class="vs-info"></div><table class="vs-tab"></table><div class="btnrow vs-ctrl"></div></div>';
    $$('.vs-pad button',root).forEach(function(b){ b.addEventListener('click',function(){ var d=b.dataset.d; if(d==='u') dy++; if(d==='d') dy--; if(d==='l') dx--; if(d==='r') dx++; dx=Math.max(-4,Math.min(5,dx)); dy=Math.max(-4,Math.min(2,dy)); move(); AUDIO(); }); });
    var ctrl=$('.vs-ctrl',root);
    ctrl.appendChild(btn('↺','',function(){ dx=dy=0; task=null; move(); }));
    ctrl.appendChild(btn('🎲 Auftrag','primary',function(){ do{ task=[rnd(-4,4),rnd(-4,2)]; }while(!task[0]||!task[1]); dx=dy=0; move(); }));
    ctrl.appendChild(btn('👁 Zeigen','',function(){ if(task){ dx=task[0]; dy=task[1]; move(); } }));
    var N=['A','B','C','D','E'];
    function init(){ var box=$('.vs-ks',root); box.innerHTML=''; k=KS([-6,6,-5,5],54,{cls:'ks-vs'}); box.appendChild(k.svg);
      var ghost=sv('polygon',{points:polyStr(k,fig),fill:'#e8772e','fill-opacity':.12,stroke:'#e8772e','stroke-width':4,'stroke-dasharray':'10 8'},k.layer);
      arrow=sv('g',{},k.layer); g=sv('g',{'class':'vs-fig'},k.layer); sv('polygon',{points:polyStr(k,fig),fill:'#8e4fd8','fill-opacity':.25,stroke:'#8e4fd8','stroke-width':6,'stroke-linejoin':'round'},g);
      fig.forEach(function(p){ sv('circle',{cx:k.X(p[0]),cy:k.Y(p[1]),r:8,fill:'#8e4fd8'},g); }); move(); }
    function words(){ var a=[]; if(dx) a.push(Math.abs(dx)+' nach '+(dx>0?'rechts':'links')); if(dy) a.push(Math.abs(dy)+' nach '+(dy>0?'oben':'unten')); return a.join(', ')||'noch nicht verschoben'; }
    function move(){ g.setAttribute('transform','translate('+(dx*k.u)+' '+(-dy*k.u)+')');
      arrow.innerHTML=''; if(dx||dy){ var p=fig[0]; sv('line',{x1:k.X(p[0]),y1:k.Y(p[1]),x2:k.X(p[0]+dx),y2:k.Y(p[1]+dy),stroke:'#d9483b','stroke-width':6,'marker-end':''},arrow); sv('circle',{cx:k.X(p[0]+dx),cy:k.Y(p[1]+dy),r:12,fill:'#d9483b'},arrow); }
      $('.vs-info',root).innerHTML=(task?'<div class="vs-task">Auftrag: <b>'+(Math.abs(task[0])+' nach '+(task[0]>0?'rechts':'links')+', '+Math.abs(task[1])+' nach '+(task[1]>0?'oben':'unten'))+'</b></div>':'')+'<div>Verschiebung: <b>'+words()+'</b></div>';
      function sg(v){ return v>=0?'+ '+v:'− '+Math.abs(v); }
      $('.vs-tab',root).innerHTML='<tr><th>vorher</th><th>nachher</th></tr>'+fig.slice(0,3).map(function(p,i){ return '<tr><td>'+N[i]+'<span class="m">'+pt(p[0],p[1])+'</span></td><td>'+N[i]+'′<span class="m">('+fnum(p[0])+' '+sg(dx)+' | '+fnum(p[1])+' '+sg(dy)+') = '+pt(p[0]+dx,p[1]+dy)+'</span></td></tr>'; }).join(''); }
    init();
  })();

  /* =========================================================
     DEMO: Strecken und Rechtecke
     ========================================================= */
  (function(){
    var root=$('#strecke'); if(!root) return;
    var R={x1:-3,x2:4,y1:-2,y2:3}, k=null, layer=null, st={a:false,b:false,calc:false,area:false};
    root.innerHTML='<div class="st-ks"></div><div class="st-side"><div class="st-pts"></div><div class="st-res"></div><div class="btnrow st-ctrl"></div></div>';
    var ctrl=$('.st-ctrl',root);
    ctrl.appendChild(btn('① Seite a zählen','',function(){ count('a'); }));
    ctrl.appendChild(btn('② Seite b zählen','',function(){ count('b'); }));
    ctrl.appendChild(btn('③ Rechnen','primary',function(){ st.calc=true; info(); }));
    ctrl.appendChild(btn('④ Fläche','primary',area));
    ctrl.appendChild(btn('🎲 Neues Rechteck','',function(){ R=MG.G.rect(); draw(); }));
    function draw(){ var box=$('.st-ks',root); box.innerHTML=''; k=KS([-6,6,-5,5],54,{cls:'ks-st'}); box.appendChild(k.svg); st={a:false,b:false,calc:false,area:false};
      layer=sv('g',{},k.layer); var P=[[R.x1,R.y1],[R.x2,R.y1],[R.x2,R.y2],[R.x1,R.y2]];
      sv('polygon',{points:polyStr(k,P),fill:'#1f9d6a','fill-opacity':.1,stroke:'#1f9d6a','stroke-width':6},k.layer);
      ['A','B','C','D'].forEach(function(n,i){ k.layer.appendChild(k.point(P[i][0],P[i][1],n,'#1f9d6a')); });
      $('.st-pts',root).innerHTML=['A','B','C','D'].map(function(n,i){ return '<span class="m">'+n+pt(P[i][0],P[i][1])+'</span>'; }).join(' '); info(); }
    function count(side){ st[side]=true; var n= side==='a'? R.x2-R.x1 : R.y2-R.y1, i=0;
      var t=setInterval(function(){ if(i>=n){ clearInterval(t); info(); return; }
        var cx= side==='a' ? k.X(R.x1+i+.5) : k.X(R.x2)+26, cy= side==='a' ? k.Y(R.y1)+30 : k.Y(R.y1+i+.5)+10;
        if(side==='a') sv('line',{x1:k.X(R.x1+i)+4,y1:k.Y(R.y1),x2:k.X(R.x1+i+1)-4,y2:k.Y(R.y1),stroke:'#e8772e','stroke-width':12,'stroke-linecap':'round','class':'pop'},layer);
        else sv('line',{x1:k.X(R.x2),y1:k.Y(R.y1+i)-4,x2:k.X(R.x2),y2:k.Y(R.y1+i+1)+4,stroke:'#2f6fe0','stroke-width':12,'stroke-linecap':'round','class':'pop'},layer);
        var tx=sv('text',{x:cx,y:cy,'text-anchor':side==='a'?'middle':'start','font-size':28,'font-weight':900,'font-family':'Nunito',fill:side==='a'?'#e8772e':'#2f6fe0','paint-order':'stroke',stroke:'#fff','stroke-width':6,'class':'pop'},layer); tx.textContent=String(i+1);
        AUDIO(); i++; }, 260); }
    function area(){ st.area=true; st.calc=true; var a=R.x2-R.x1, b=R.y2-R.y1, i=0, n=a*b;
      var t=setInterval(function(){ if(i>=n){ clearInterval(t); info(); return; } var cx=R.x1+(i%a), cy=R.y1+Math.floor(i/a);
        sv('rect',{x:k.X(cx)+3,y:k.Y(cy+1)+3,width:k.u-6,height:k.u-6,rx:6,fill:'#1f9d6a','fill-opacity':.35,'class':'pop'},layer); i++; }, Math.max(25, 1400/n)); info(); }
    function info(){ var a=R.x2-R.x1, b=R.y2-R.y1, o='';
      if(st.a) o+='<div>Seite a (AB): <b>'+a+' LE</b> gezählt</div>'; if(st.b) o+='<div>Seite b (BC): <b>'+b+' LE</b> gezählt</div>';
      if(st.calc) o+='<div class="calc-l"><span class="m">a = '+fnum(R.x2)+' − '+par(R.x1)+' = '+a+'</span> LE</div><div class="calc-l"><span class="m">b = '+fnum(R.y2)+' − '+par(R.y1)+' = '+b+'</span> LE</div>';
      if(st.area) o+='<div class="calc-l big"><span class="m">A = a · b = '+a+' · '+b+' = <b class="res">'+(a*b)+'</b></span> FE</div><div class="small">Umfang: <span class="m">u = 2 · ('+a+' + '+b+') = '+(2*(a+b))+'</span> LE</div>';
      $('.st-res',root).innerHTML = o || 'Wie lang sind die Seiten? Zählen oder rechnen!'; }
    draw();
  })();

  /* =========================================================
     DEMO: Temperaturverlauf einer Nacht (Ausblick Zuordnung)
     ========================================================= */
  (function(){
    var root=$('#tempkurve'); if(!root) return;
    var X=[-4,-3,-2,-1,0,1,2,3,4], T=[3,2,0,-1,-3,-5,-4,-4,-2], U=['20','21','22','23','0','1','2','3','4'], n=0, joined=false, k=null;
    window.TEMPKURVE={x:X,t:T};
    root.innerHTML='<div class="tk2-left"><table class="tk2-tab"></table><div class="tk2-q"></div></div><div class="tk2-ks"></div>';
    var ctrlRow=h('div','btnrow tk2-ctrl'); $('.tk2-left',root).appendChild(ctrlRow);
    ctrlRow.appendChild(btn('▶ Nächster Punkt','primary',function(){ if(n<X.length){ n++; draw(); } }));
    ctrlRow.appendChild(btn('⏩ Alle','',function(){ n=X.length; draw(); }));
    ctrlRow.appendChild(btn('〰 Verbinden','',function(){ n=X.length; joined=true; draw(); }));
    ctrlRow.appendChild(btn('❓ Fragen','',function(){ $('.tk2-q',root).innerHTML='<div>Am kältesten: <b>1 Uhr</b> (x = 1) mit <b>−5 °C</b></div><div>0 °C um <b>22 Uhr</b> (x = −2)</div><div>Punkt im II. Quadranten: vor 22 Uhr war es über 0 °C.</div>'; }));
    ctrlRow.appendChild(btn('↺','mini',function(){ n=0; joined=false; $('.tk2-q',root).innerHTML=''; draw(); }));
    function draw(){ $('.tk2-tab',root).innerHTML='<tr><th>Uhrzeit</th>'+U.map(function(u,i){ return '<td class="'+(i<n?'on':'')+'">'+u+'</td>'; }).join('')+'</tr><tr><th>x</th>'+X.map(function(x,i){ return '<td class="'+(i<n?'on':'')+'">'+fnum(x)+'</td>'; }).join('')+'</tr><tr><th>y (°C)</th>'+T.map(function(t,i){ return '<td class="'+(i<n?'on':'')+'">'+fnum(t)+'</td>'; }).join('')+'</tr>';
      var box=$('.tk2-ks',root); box.innerHTML=''; k=KS([-5,5,-6,4],50,{cls:'ks-tk'}); box.appendChild(k.svg);
      if(joined){ sv('polyline',{points:X.map(function(x,i){return k.X(x)+','+k.Y(T[i]);}).join(' '),fill:'none',stroke:'#2f6fe0','stroke-width':6,'stroke-linejoin':'round','class':'draw-all'},k.layer); }
      for(var i=0;i<n;i++){ k.layer.appendChild(k.point(X[i],T[i], i===n-1?pt(X[i],T[i]):'', T[i]<0?'#2f6fe0':T[i]>0?'#d9483b':'#6b7688', i===n-1?'pop':'')); } }
    draw();
  })();

})();
