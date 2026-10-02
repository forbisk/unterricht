/* Interaktive Elemente: Sitzplan-Umschalter, Ruhesignal, Punktekonto, Abschluss */
(function(){
  'use strict';
  function $(s,r){return (r||document).querySelector(s)}
  function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}

  /* ---------- Sound (WebAudio, erzeugt – keine Datei) ---------- */
  var AC=null;
  function ctx(){ try{ if(!AC) AC=new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==='suspended') AC.resume(); }catch(e){ AC=null; } return AC; }
  function bell(freq, at, vol){
    var c=ctx(); if(!c) return; var t=c.currentTime+(at||0);
    var master=c.createGain(); master.gain.value=vol||0.22; master.connect(c.destination);
    [[1,1,3.2],[2.01,.35,2.2],[2.76,.22,1.6],[5.4,.08,.9]].forEach(function(p){
      var o=c.createOscillator(), g=c.createGain(); o.type='sine'; o.frequency.value=freq*p[0];
      g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(p[1],t+.012); g.gain.exponentialRampToValueAtTime(.0005,t+p[2]);
      o.connect(g); g.connect(master); o.start(t); o.stop(t+p[2]+.1);
    });
  }
  function chime(){ bell(659.25,0,.2); bell(523.25,.45,.18); }
  function tick(){ var c=ctx(); if(!c) return; var t=c.currentTime, o=c.createOscillator(), g=c.createGain(); o.frequency.value=880; g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.05,t+.005); g.gain.exponentialRampToValueAtTime(.0005,t+.12); o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+.15); }
  window.AppSound={chime:chime,bell:bell};

  /* ---------- Konfetti ---------- */
  function confetti(host, n){
    host=host||$('#stage'); var cols=['#2f6fe0','#e8772e','#1b9a64','#8e4fd8','#e0a614','#e2455b'];
    var box=document.createElement('div'); box.className='confetti'; host.appendChild(box);
    for(var i=0;i<(n||90);i++){ var p=document.createElement('i'); p.style.left=(Math.random()*100)+'%'; p.style.background=cols[i%cols.length];
      p.style.animationDelay=(Math.random()*.6)+'s'; p.style.animationDuration=(1.8+Math.random()*1.4)+'s'; p.style.setProperty('--dx',(Math.random()*240-120)+'px'); p.style.setProperty('--rot',(Math.random()*900-450)+'deg'); box.appendChild(p); }
    setTimeout(function(){ box.remove(); }, 3800);
  }
  window.confetti=confetti;

  function init(){
    /* Bühne nie verschieben (Fokus/Scroll in overflow:hidden-Containern) */
    document.addEventListener('scroll',function(e){ var t=e.target; if(t && (t.id==='viewport'||t.id==='stage'||(t.classList&&t.classList.contains('slide'))) && (t.scrollTop||t.scrollLeft)){ t.scrollTop=0; t.scrollLeft=0; } },true);
    /* Sitzplan */
    var svg=$('#plan');
    if(svg && window.SeatPlan){
      var plan=SeatPlan.build(svg), hint=$('#modehint');
      $$('#planseg button').forEach(function(b){ b.addEventListener('click',function(){
        $$('#planseg button').forEach(function(x){ x.classList.toggle('on',x===b); });
        plan.set(b.dataset.mode);
        hint.textContent = b.dataset.mode==='g' ? 'Gruppenphase: Tische zusammen – Gruppen mit 3–4 Kindern.' : 'Normal: U-Form. Alle schauen nach vorn.';
      }); });
      // beim Verlassen der Folie zurück auf U-Form
      var sl=svg.closest('.slide'); if(sl) sl.addEventListener('deck:leave',function(){ var b=$('#planseg [data-mode=u]'); if(b) b.click(); });
    }

    /* Ruhesignal */
    var cb=$('#calmBtn');
    if(cb){
      var cnt=$('#calmCnt'), msg=$('#calmMsg'), box=$('#calm'), timer=null, base=cnt.innerHTML;
      var stop=function(){ clearInterval(timer); timer=null; box.classList.remove('running','done'); cnt.innerHTML=base; msg.textContent='Klick: Gong + Countdown 5 … 1'; box.style.removeProperty('--p'); };
      cb.addEventListener('click',function(){
        if(timer){ stop(); return; }
        box.classList.remove('done'); box.classList.add('running'); chime();
        var n=5; var show=function(){ cnt.innerHTML='<b class="num">'+n+'</b>'; box.style.setProperty('--p',(n/5)); msg.textContent='Hand hoch – Mund zu – Blick nach vorn'; };
        show();
        timer=setInterval(function(){ n--; if(n>0){ show(); tick(); } else { clearInterval(timer); timer=null; box.classList.remove('running'); box.classList.add('done'); box.style.setProperty('--p',0);
          cnt.innerHTML='<b class="ok-txt">Ruhe!</b>'; msg.textContent='Super – genau so! 👍'; bell(783.99,0,.12); } },1000);
      });
      var s2=cb.closest('.slide'); if(s2) s2.addEventListener('deck:leave',stop);
    }

    /* Punktekonto (localStorage) */
    var pts=$('#points');
    if(pts){
      var KEY='regeln7a.punktekonto.v1', st={p:0,goal:10};
      try{ var raw=localStorage.getItem(KEY); if(raw){ var o=JSON.parse(raw); if(o && typeof o.p==='number') st.p=o.p; if(o && typeof o.goal==='number') st.goal=o.goal; } }catch(e){}
      var bar=$('#pbar'), resetArm=null, wasDone=st.p>=st.goal;
      var save=function(){ try{ localStorage.setItem(KEY,JSON.stringify(st)); }catch(e){} };
      var render=function(pop){
        st.goal=Math.max(3,Math.min(20,st.goal)); st.p=Math.max(0,Math.min(st.goal,st.p));
        var html=''; for(var i=0;i<st.goal;i++) html+='<span class="seg'+(i<st.p?' full':'')+(pop && i===st.p-1?' pop':'')+'"><svg><use href="#i-star"/></svg></span>';
        bar.innerHTML=html; bar.style.setProperty('--n',st.goal);
        $('#pVal').textContent=st.p; $('#pGoalVal').textContent=st.goal; $('#pgoalTxt').textContent=st.goal;
        var done=st.p>=st.goal; pts.classList.toggle('done',done);
        if(done && !wasDone){ confetti(); bell(659.25,0,.16); bell(783.99,.18,.16); bell(1046.5,.36,.16); }
        wasDone=done; save();
      };
      $('#pPlus').addEventListener('click',function(){ if(st.p<st.goal){ st.p++; render(true); if(st.p<st.goal) bell(880,0,.1); } });
      $('#pMinus').addEventListener('click',function(){ if(st.p>0){ st.p--; render(); } });
      $('#gPlus').addEventListener('click',function(){ st.goal++; render(); });
      $('#gMinus').addEventListener('click',function(){ st.goal--; render(); });
      var rb=$('#pReset');
      rb.addEventListener('click',function(){
        if(!resetArm){ rb.classList.add('on'); rb.textContent='Wirklich? Nochmal klicken'; resetArm=setTimeout(function(){ resetArm=null; rb.classList.remove('on'); rb.textContent='↺ Zurücksetzen'; },3500); return; }
        clearTimeout(resetArm); resetArm=null; rb.classList.remove('on'); rb.textContent='↺ Zurücksetzen'; st.p=0; render();
      });
      render();
    }

    /* Abschluss */
    var jb=$('#joinBtn');
    if(jb){
      var crew=$('#crew');
      jb.addEventListener('click',function(){ crew.classList.remove('up'); void crew.offsetWidth; crew.classList.add('up'); confetti(); chime(); });
      var s3=jb.closest('.slide'); if(s3) s3.addEventListener('deck:leave',function(){ crew.classList.remove('up'); });
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
