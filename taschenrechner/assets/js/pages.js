/* Seitenlogik: Start, Tasten, Anleitungen, Fehler, Quiz, Spickzettel. Eigene Arbeit. */
(function(){
"use strict";
var TR = window.TR, $ = function(s,r){ return (r||document).querySelector(s); };
var page = document.body.getAttribute("data-page");
function h(tag, cls, html){ var e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e; }
function norm(s){ return String(s||"").toLowerCase().replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/ß/g,"ss").replace(/<[^>]+>/g," "); }
function modelName(m){ return TR.models[m].info.name; }
/* Text mit Tastenwörtern -> Chips + Text */
TR.mixedChips = function(str, m){
  return str.split("·").map(function(part){
    part = part.trim(); var words = part.split(/\s+/), out=[], buf=[];
    function flushKeys(){ if (buf.length){ out.push(TR.chips(buf.join(" "), m)); buf=[]; } }
    words.forEach(function(w){
      var t = TR.tokens(w, m), ok = t.length && t.every(function(id){ return TR.keyMap[m][id]; });
      if (ok) buf.push(w); else { flushKeys(); out.push('<span class="kc gap">'+TR.esc(w)+'</span>'); }
    });
    flushKeys(); return out.join(" ");
  }).join(' <span class="kc gap">·</span> ');
};

/* ================= Start ================= */
if (page==="index"){
  TR.mini(); TR.fillSeqs(document);
  var cur = TR.getModel(), stored = TR.store.get("tr-model");
  document.querySelectorAll(".calc-card").forEach(function(c){
    if (stored && c.dataset.model===stored) c.classList.add("mine");
    c.addEventListener("click", function(){ TR.store.set("tr-model", c.dataset.model); });
  });
}

/* ================= Tasten erklärt ================= */
if (page==="rechner"){
  var m = TR.getModel(), calc, info=$("#info"), selId=null, firstLoad=true;
  var build = function(){
    m = TR.getModel();
    calc = TR.Calc($("#calc"), m, {onKey: function(id){ showInfo(id, true); }});
    if ($("#impbtn").getAttribute("aria-pressed")==="true") calc.el.classList.add("imp");
    var parts=(location.hash||"").replace("#","").split("/");
    if (parts[1] && TR.keyMap[m][parts[1]]) showInfo(parts[1]); else welcome();
    doSearch();
  };
  var welcome = function(){
    selId=null;
    var imp = TR.models[m].keys.filter(function(k){ return k.lvl===1; });
    info.innerHTML = '<div class="hint-empty"><span class="big">👆</span><h2 style="justify-content:center">Tippe auf eine Taste!</h2><p>Du siehst dann, was sie macht – mit Beispiel und Tipp.</p></div>'+
      '<h3>Die wichtigsten Tasten beim '+modelName(m)+'</h3><p class="seq imp-list">'+imp.map(function(k){ return '<button type="button" class="kbtn" data-id="'+k.id+'" style="border:0;background:none;padding:0" title="'+TR.esc(k.name)+'">'+TR.chip(k.id,m)+'</button>'; }).join("")+'</p>'+
      '<p class="tip">Nimm deinen Rechner in die Hand und drücke die Tasten mit, während du liest.</p>';
    info.querySelectorAll(".kbtn").forEach(function(b){ b.addEventListener("click", function(){ showInfo(b.dataset.id, true); }); });
  };
  var showInfo = function(id, user){
    var k = TR.keyMap[m][id]; if (!k) return; selId=id; calc.select(id); calc.stop();
    try { history.replaceState(null,"","#"+m+"/"+id); } catch(e){}
    var badge = k.lvl===1 ? '<span class="badge imp">⭐ wichtig</span>' : k.lvl===3 ? '<span class="badge rare">selten gebraucht</span>' : '<span class="badge">nützlich</span>';
    var html = '<h2>'+TR.chip(id,m)+' '+TR.esc(k.name)+' '+badge+'</h2><p class="what">'+k.what+'</p>';
    if (k.shift) html += '<div class="fn-row sh">'+TR.chips("SHIFT "+id, m)+'<div><b>Gelb: '+TR.labHTML(k.shift.lab)+'</b> – '+k.shift.what+'</div></div>';
    if (k.alpha) html += '<div class="fn-row al">'+TR.chips("ALPHA "+id, m)+'<div><b>Rot: '+TR.labHTML(k.alpha.lab)+'</b> – '+k.alpha.what+'</div></div>';
    if (k.blue) html += '<div class="fn-row bl"><span class="kc" style="background:#1971c2">'+TR.esc(k.blue)+'</span><div><b>Blau:</b> '+(m==="ms"?"Statistik-Funktion (nur im SD-Modus, mit SHIFT).":"Zahlensystem (nur im Modus Basis-N, Klasse 7–10 nicht nötig).")+'</div></div>';
    if (k.blue2) html += '<div class="fn-row bl"><span class="kc" style="background:#1971c2">DT</span><div><b>Blau (unten):</b> Im Statistik-Modus SD gibt M+ einen Datenwert ein (DT). CL (mit SHIFT) löscht einen Wert.</div></div>';
    (k.ex||[]).forEach(function(ex, j){
      html += '<div class="ex"><h4>Beispiel'+((k.ex.length>1)?" "+(j+1):"")+': '+ex.t+'</h4><div class="ex-grid"><div>'+
        (ex.pre ? '<p class="pre">Vorher gerechnet: '+TR.chips(ex.pre,m)+'</p>' : '')+
        '<div>'+TR.chips(ex.s,m)+'</div><button type="button" class="btn ghost showbtn" data-ex="'+j+'">▶ Auf dem Rechner zeigen</button></div><div class="lcdslot" data-ex="'+j+'"></div></div></div>';
    });
    if (k.tip) html += '<p class="tip">'+k.tip+'</p>';
    html += '<button type="button" class="btn ghost back-top">↑ Zurück zum Rechner</button>';
    info.innerHTML = html;
    (k.ex||[]).forEach(function(ex,j){
      var st = {i:ex.i, o:ex.o, ind: ex.ind || "D"};
      if (!ex.o && !ex.i) st = m==="ms" ? {o:"", ind:"", off:1} : {i:"",o:"",ind:"",off:1};
      if (ex.s==="SHIFT AC") st = {off:1};
      info.querySelector('.lcdslot[data-ex="'+j+'"]').appendChild(TR.lcdBox(m, st));
    });
    info.querySelectorAll(".showbtn").forEach(function(b){ b.addEventListener("click", function(){
      var ex = k.ex[+b.dataset.ex]; calc.select(null);
      if (window.innerWidth<=900) calc.el.scrollIntoView({behavior:"smooth", block:"start"});
      calc.setLCD(m==="ms"?{o:"0.",ind:"D"}:{i:"",o:"",ind:"D"});
      calc.play(ex.s, {onDone: function(){ calc.setLCD({i:ex.i, o:ex.o, ind:ex.ind||"D", off: ex.s==="SHIFT AC"}); calc.select(id); }});
    }); });
    var bt = info.querySelector(".back-top"); if (bt) bt.addEventListener("click", function(){ calc.el.scrollIntoView({behavior:"smooth", block:"start"}); });
    if (user && window.innerWidth<=900){ var r=info.getBoundingClientRect(); if (r.top>window.innerHeight*0.6 || r.top<0) info.scrollIntoView({behavior:"smooth", block:"start"}); }
  };
  /* Suche */
  var input = $("#keysearch"), res = $("#searchres");
  var doSearch = function(){
    var q = norm(input.value).trim(); res.innerHTML=""; if (q.length<2) return;
    var words = q.split(/\s+/).filter(function(w){ return w.length>1; });
    var hits=[];
    TR.models[m].keys.forEach(function(k){
      var base = norm([k.name,k.kw,k.what].join(" ")), sh = k.shift?norm(k.shift.lab+" "+k.shift.what):"", al = k.alpha?norm(k.alpha.lab+" "+k.alpha.what):"";
      var score=0, via="";
      words.forEach(function(w){
        if (norm(k.kw).indexOf(w)>=0) score+=5; if (norm(k.name).indexOf(w)>=0) score+=4; if (norm(k.what).indexOf(w)>=0) score+=1;
        if (sh.indexOf(w)>=0){ score+=3; if(!via) via="SHIFT"; } if (al.indexOf(w)>=0){ score+=2; if(!via) via="ALPHA"; }
        if (via && norm(k.name).indexOf(w)>=0) via="";
      });
      if (score>0) hits.push({k:k, s:score + (k.lvl===1?1.5:0) - (k.lvl===3?1:0), via:via});
    });
    hits.sort(function(a,b){ return b.s-a.s; });
    var gh = TR.guides.filter(function(g){ var t=norm(g.title+" "+g.intro); return words.some(function(w){ return t.indexOf(w)>=0; }); }).slice(0,3);
    if (!hits.length && !gh.length){ res.innerHTML='<p class="sr-none">Nichts gefunden. Versuch ein anderes Wort, z. B. „Bruch“, „Wurzel“, „Prozent“, „Kreis“, „negativ“.</p>'; return; }
    hits.slice(0,7).forEach(function(x){
      var k=x.k, seq = x.via ? x.via+" "+k.id : k.id, what = x.via==="SHIFT" ? k.shift.what : x.via==="ALPHA" ? k.alpha.what : (function(t){ t=t.replace(/<[^>]+>/g,""); if (t.length<=95) return t; t=t.slice(0,92); return t.slice(0, Math.max(40, t.lastIndexOf(" ")))+" …"; })(k.what||"");
      var b = h("button","sr-item"); b.type="button";
      b.innerHTML = TR.chips(seq,m)+' <b>'+(x.via? TR.labHTML(x.via==="SHIFT"?k.shift.lab:k.alpha.lab) : TR.esc(k.name))+'</b><small>'+what.replace(/<[^>]+>/g,"")+'</small>';
      b.addEventListener("click", function(){ showInfo(k.id, true); calc.play(seq, {onDone:function(){ calc.select(k.id); }}); });
      res.appendChild(b);
    });
    gh.forEach(function(g){ var a=h("a","sr-item"); a.href="anleitungen.html#"+m+"/"+g.id; a.innerHTML='<span class="kc gap">👣</span><b>Anleitung: '+TR.esc(g.title)+'</b><small>Schritt für Schritt</small>'; res.appendChild(a); });
  };
  input.addEventListener("input", doSearch);
  $("#impbtn").addEventListener("click", function(){ var on = this.getAttribute("aria-pressed")!=="true"; this.setAttribute("aria-pressed", on?"true":"false"); calc.el.classList.toggle("imp", on); });
  document.addEventListener("tr-model", build);
  build();
}

/* ================= Anleitungen ================= */
if (page==="anleitungen"){
  var TOP = {grundlagen:"Grundlagen", zahlen:"Zahlen & Brüche", terme:"Terme & Gleichungen", prozent:"Prozente", potenzen:"Potenzen & Wurzeln", geometrie:"Geometrie", statistik:"Statistik"};
  var gm, gl=$("#guidelist"), main=$("#guidemain"), gcalc=null, gi=0, gsteps=[], auto=false, autoT=null, curG=null;
  var getG = function(){ var p=(location.hash||"").replace("#","").split("/"); var g = TR.guides.filter(function(x){ return x.id===p[1]; })[0]; return g || TR.guides[0]; };
  var renderList = function(){
    gm = TR.getModel(); gl.innerHTML="";
    Object.keys(TOP).forEach(function(t){
      var gs = TR.guides.filter(function(g){ return g.topic===t; }); if(!gs.length) return;
      gl.appendChild(h("h3",null,TOP[t]));
      gs.forEach(function(g){
        var b=h("button","gl-item"); b.type="button"; b.dataset.id=g.id;
        b.innerHTML='<span class="gi">'+TR.esc(g.icon)+'</span><span>'+TR.esc(g.title)+'</span>'+(g[gm].na?'<span class="na">anders</span>':'');
        b.addEventListener("click", function(){ openGuide(g.id, true); });
        gl.appendChild(b);
      });
    });
  };
  var lcdAt = function(i){
    var st = gm==="ms" ? {o:"0.", ind:"D"} : {i:"", o:"", ind:"D"};
    for (var j=0;j<=i;j++){ var s=gsteps[j]; if (s.off) st={off:1}; else if (s.menu||s.table||s.o!=null||s.i!=null) st={i:s.i, o:s.o, ind:(s.ind!=null?s.ind:(st.ind||"D")), menu:s.menu, table:s.table}; }
    return st;
  };
  var stopAuto = function(){ auto=false; clearTimeout(autoT); var b=$("#autobtn"); if(b){ b.innerHTML="▶▶ Automatisch abspielen"; b.setAttribute("aria-pressed","false"); } };
  var go = function(i, animate){
    if (!gsteps.length) return;
    gi = Math.max(0, Math.min(gsteps.length-1, i));
    var s = gsteps[gi];
    $("#stepno").textContent = "Schritt "+(gi+1)+" von "+gsteps.length;
    $("#steptext").innerHTML = s.t;
    $("#stepkeys").innerHTML = TR.chips(s.k, gm);
    main.querySelectorAll(".progress button").forEach(function(b,j){ b.className = j<gi?"done":(j===gi?"cur":""); });
    main.querySelectorAll(".steps-ol li").forEach(function(li,j){ li.classList.toggle("cur", j===gi); });
    $("#prevbtn").disabled = gi===0; $("#nextbtn").disabled = gi===gsteps.length-1;
    gcalc.stop();
    if (animate===false){ gcalc.setLCD(lcdAt(gi)); return; }
    gcalc.setLCD(lcdAt(gi-1));
    gcalc.play(s.k, {step: document.documentElement.classList.contains("beamer")?800:650, onDone: function(){
      gcalc.setLCD(lcdAt(gi));
      if (auto){ if (gi<gsteps.length-1) autoT=setTimeout(function(){ go(gi+1); }, 2400); else stopAuto(); }
    }});
  };
  var openGuide = function(id, user){
    stopAuto();
    var g = TR.guides.filter(function(x){ return x.id===id; })[0] || TR.guides[0]; curG=g;
    try { history.replaceState(null,"","#"+gm+"/"+g.id); } catch(e){}
    gl.querySelectorAll(".gl-item").forEach(function(b){ b.setAttribute("aria-current", b.dataset.id===g.id?"true":"false"); });
    var d = g[gm]; gsteps = d.steps || [];
    var other = gm==="ms"?"dex":"ms";
    var html = '<div class="gm-card"><div class="gm-head"><h2>'+TR.esc(g.icon)+' '+TR.esc(g.title)+'</h2><span class="badge">'+TR.esc(g.kl)+'</span></div>'+
      '<p class="gm-intro">'+g.intro+'</p>'+(d.na?'<div class="na-box">⚠️ '+d.na+'</div>':'')+
      '<div class="player"><div id="gcalc"></div><div>'+
      '<div class="step-box"><div class="step-no" id="stepno"></div><p class="step-text" id="steptext"></p><div class="step-keys" id="stepkeys"></div></div>'+
      '<div class="ctrl"><button type="button" class="btn ghost" id="prevbtn">◀ Zurück</button><button type="button" class="btn" id="nextbtn">Weiter ▶</button></div>'+
      '<div class="ctrl"><button type="button" class="btn ghost" id="autobtn" aria-pressed="false">▶▶ Automatisch abspielen</button><button type="button" class="btn ghost" id="againbtn">↻ Schritt noch einmal</button></div>'+
      '<div class="progress" aria-hidden="true">'+gsteps.map(function(_,j){ return '<button type="button" tabindex="-1" data-j="'+j+'"></button>'; }).join("")+'</div>'+
      '<ol class="steps-ol">'+gsteps.map(function(s){ return '<li>'+TR.chips(s.k,gm)+' <span>'+s.t.replace(/<[^>]+>/g,"")+'</span></li>'; }).join("")+'</ol>'+
      (d.note?'<p class="note">'+d.note+'</p>':'')+(g.tip?'<p class="tip">'+g.tip+'</p>':'')+
      '</div></div>'+
      '<div class="compare"><h3>Vergleich: So geht es auf beiden Rechnern</h3><div class="cmp-wrap"><table><thead><tr><th>fx-82MS</th><th>fx-87DE X</th></tr></thead><tbody><tr><td>'+
        cmpCol(g.ms,"ms")+'</td><td>'+cmpCol(g.dex,"dex")+'</td></tr></tbody></table></div>'+
      '<p class="small">Tipp: Oben rechts kannst du den Rechner wechseln.</p></div></div>';
    main.innerHTML = html;
    gcalc = TR.Calc($("#gcalc"), gm, {onKey:function(){}});
    $("#prevbtn").onclick=function(){ stopAuto(); go(gi-1); };
    $("#nextbtn").onclick=function(){ stopAuto(); go(gi+1); };
    $("#againbtn").onclick=function(){ stopAuto(); go(gi); };
    $("#autobtn").onclick=function(){ if (auto){ stopAuto(); return; } auto=true; this.innerHTML="❚❚ Anhalten"; this.setAttribute("aria-pressed","true"); if (gi>=gsteps.length-1) go(0); else go(gi+1); };
    main.querySelectorAll(".progress button").forEach(function(b){ b.onclick=function(){ stopAuto(); go(+b.dataset.j); }; });
    main.querySelectorAll(".steps-ol li").forEach(function(li,j){ li.onclick=function(){ stopAuto(); go(j); }; });
    go(0, !!user);
    if (user && window.innerWidth<=1000) main.scrollIntoView({behavior:"smooth", block:"start"});
  };
  var cmpCol = function(d, m){
    var s = (d.na?'<p><b>Nicht direkt möglich.</b></p>':'') + '<ol style="padding-left:1.2rem;margin:0">'+(d.steps||[]).map(function(st){ return '<li style="margin:.25rem 0">'+TR.chips(st.k,m)+'</li>'; }).join("")+'</ol>';
    return s;
  };
  document.addEventListener("keydown", function(e){ if (/INPUT|TEXTAREA/.test(e.target.tagName)) return; if (e.key==="ArrowRight"){ stopAuto(); go(gi+1);} if (e.key==="ArrowLeft"){ stopAuto(); go(gi-1);} });
  document.addEventListener("tr-model", function(){ renderList(); openGuide(curG?curG.id:getG().id); });
  renderList(); openGuide(getG().id);
}

/* ================= Fehler ================= */
if (page==="fehler"){
  var renderF = function(){
    var m = TR.getModel(), box=$("#fehlerlist"); box.innerHTML="";
    TR.fehler.forEach(function(f){
      var w=f.wrong[m], r=f.right[m], card=h("article","f-card");
      card.id = f.id;
      var noProb = w.ok;
      card.innerHTML = '<span class="kl">'+TR.esc(f.kl)+'</span><h2>'+TR.esc(f.title)+'</h2><p>'+f.problem+'</p>'+
        '<div class="f-cols"><div class="f-col '+(noProb?"good":"bad")+'"><h3>'+(noProb?"✔ Beim "+modelName(m)+" kein Problem":"✗ So passiert der Fehler")+'</h3>'+(w.s?TR.chips(w.s,m):'<i>Tabellen-Modus aktiv</i>')+'<div class="slot1"></div></div>'+
        '<div class="f-col good"><h3>✔ So ist es richtig</h3>'+(r.s?TR.chips(r.s,m):'')+'<div class="slot2"></div></div></div>'+
        '<p class="fix">'+f.fix+'</p>';
      var st1 = {i:w.i, o:w.o, ind:w.ind||"D"}, st2={i:r.i, o:r.o, ind:r.ind||"D"};
      card.querySelector(".slot1").appendChild(TR.lcdBox(m, st1));
      card.querySelector(".slot2").appendChild(TR.lcdBox(m, st2));
      box.appendChild(card);
    });
  };
  document.addEventListener("tr-model", renderF); renderF();
}

/* ================= Quiz ================= */
if (page==="quiz"){
  var qm, mode="keys", list=[], qi=0, res={}, pressed=[], tries=0, qcalc=null, qbox=$("#quiz");
  var normSeq = function(arr){
    var a = arr.slice(); while (a.length && (a[0]==="AC"||a[0]==="ON")) a.shift();
    var out=[]; for (var i=0;i<a.length;i++){ if ((a[i]==="RP"||a[i]==="RIGHT") && a.slice(i).every(function(x){ return x==="RP"||x==="RIGHT"||x==="EQ"; }) && a.indexOf("EQ",i)>=0) continue; out.push(a[i]); }
    return out.join(" ");
  };
  var load = function(){
    qm = TR.getModel(); list = TR.quiz[qm].filter(function(q){ return q.typ===mode; });
    var saved = null; try { saved = JSON.parse(TR.store.get("tr-quiz-"+qm+"-"+mode)||"null"); } catch(e){}
    res = saved || {}; qi = 0;
    for (var i=0;i<list.length;i++){ if (!res[i]){ qi=i; break; } }
    document.querySelectorAll(".quiz-tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.qmode===mode?"true":"false"); });
    render();
  };
  var save = function(){ TR.store.set("tr-quiz-"+qm+"-"+mode, JSON.stringify(res)); };
  var score = function(){ return Object.keys(res).filter(function(k){ return res[k]==="ok"; }).length; };
  var top = function(){
    return '<div class="q-top"><b>Aufgabe '+(qi+1)+' von '+list.length+' · '+modelName(qm)+'</b><span class="q-score">⭐ '+score()+' richtig</span></div>'+
      '<div class="q-dots">'+list.map(function(_,j){ return '<button type="button" data-j="'+j+'" class="'+(j===qi?"cur ":"")+(res[j]||"")+'" aria-label="Aufgabe '+(j+1)+'">'+(j+1)+'</button>'; }).join("")+'</div>';
  };
  var render = function(){
    pressed=[]; tries=0;
    if (qi>=list.length){ return endScreen(); }
    var q = list[qi];
    qbox.className = "quiz "+(mode==="mc"?"mc":"");
    if (mode==="keys"){
      qbox.innerHTML = '<div id="qcalc"></div><div class="q-card">'+top()+'<p class="q-text">'+q.q+'</p><p class="small">Tippe die Tasten auf dem Bild in der richtigen Reihenfolge (auch SHIFT!). Dann „Prüfen“.</p>'+
        '<div class="pressed" id="pressed" aria-live="polite"></div>'+
        '<div class="ctrl"><button type="button" class="btn ghost" id="undo">⌫ Letzte weg</button><button type="button" class="btn ghost" id="clr">✖ Alles weg</button><button type="button" class="btn ok" id="check">✔ Prüfen</button></div>'+
        '<div id="fb"></div><div class="ctrl"><button type="button" class="btn ghost" id="sol" hidden>💡 Lösung zeigen</button><button type="button" class="btn" id="next">Weiter ▶</button></div></div>';
      qcalc = TR.Calc($("#qcalc"), qm, {onKey: function(id){ pressed.push(id); showPressed(); }});
      $("#undo").onclick=function(){ pressed.pop(); showPressed(); };
      $("#clr").onclick=function(){ pressed=[]; showPressed(); };
      $("#check").onclick=check;
      $("#sol").onclick=function(){ var a=q.acc[0]; qcalc.play(a,{onDone:function(){ if(q.o!=null) qcalc.setLCD({i:"",o:q.o,ind:"D", off: a==="SHIFT AC"}); }}); $("#fb").innerHTML='<div class="fb bad">So geht es: '+TR.chips(a,qm)+(q.acc.length>1?'<br><small>Auch richtig: '+q.acc.slice(1).map(function(x){return TR.chips(x,qm);}).join(" oder ")+'</small>':'')+'</div>'; };
    } else {
      qbox.innerHTML = '<div class="q-card">'+top()+'<p class="q-text">'+q.q+'</p><div class="mc-opts">'+q.opts.map(function(o,j){ return '<button type="button" class="mc-opt" data-j="'+j+'"><span class="let">'+"ABCD"[j]+'</span><span class="slot"></span></button>'; }).join("")+'</div><div id="fb"></div><div class="ctrl"><button type="button" class="btn" id="next">Weiter ▶</button></div></div>';
      TR.fillSeqs(qbox, qm);
      qbox.querySelectorAll(".mc-opt").forEach(function(b){
        var j=+b.dataset.j, o=q.opts[j];
        b.querySelector(".slot").appendChild(TR.lcdBox(qm, {i:"", o:o, ind: /<b>R<\/b>/.test(q.q)?"R":"D"}));
        b.setAttribute("aria-label","Antwort "+"ABCD"[j]+": "+TR.mdText(o));
        b.onclick=function(){
          if (res[qi] && qbox.querySelector(".mc-opt.ok")) return;
          var ok = j===q.a; b.classList.add(ok?"ok":"bad");
          if (ok || tries>=1){ qbox.querySelectorAll(".mc-opt")[q.a].classList.add("ok"); }
          if (!res[qi] || res[qi]!=="ok") res[qi] = ok ? (tries===0?"ok":"bad") : (tries>=1?"bad":res[qi]);
          if (!ok && tries===0){ $("#fb").innerHTML='<div class="fb bad">Leider nicht. Versuch es noch einmal!</div>'; tries++; save(); return; }
          $("#fb").innerHTML='<div class="fb '+(ok?"ok":"bad")+'">'+(ok?"🎉 Richtig! ":"Die richtige Antwort ist grün markiert. ")+q.why+'</div>';
          save(); updDots();
        };
      });
    }
    $("#next").onclick=function(){ qi++; render(); };
    qbox.querySelectorAll(".q-dots button").forEach(function(b){ b.onclick=function(){ qi=+b.dataset.j; render(); }; });
  };
  var updDots = function(){ qbox.querySelectorAll(".q-dots button").forEach(function(b,j){ b.className=(j===qi?"cur ":"")+(res[j]||""); }); var s=qbox.querySelector(".q-score"); if(s) s.textContent="⭐ "+score()+" richtig"; };
  var showPressed = function(){ var p=$("#pressed"); p.innerHTML = pressed.length? TR.chips(pressed.join(" "), qm) : ""; };
  var check = function(){
    var q=list[qi]; if (!pressed.length){ $("#fb").innerHTML='<div class="fb bad">Du hast noch keine Taste gedrückt.</div>'; return; }
    var mine = normSeq(pressed), ok = q.acc.some(function(a){ return normSeq(TR.tokens(a,qm))===mine; });
    if (ok){
      if (res[qi]!=="bad") res[qi]="ok";
      var st = q.o!=null && q.o!=="" ? {i:"", o:q.o, ind:"D"} : {off:1};
      $("#fb").innerHTML='<div class="fb ok">🎉 Richtig! Der Rechner zeigt:</div>'; $("#fb .fb").appendChild(TR.lcdBox(qm, st)); qcalc.setLCD(st);
    } else {
      tries++; if (tries>=2) res[qi]="bad";
      $("#fb").innerHTML='<div class="fb bad">Noch nicht ganz. 💡 '+q.hint+'</div>'; $("#sol").hidden = false;
    }
    save(); updDots();
  };
  var endScreen = function(){
    qbox.className="quiz mc";
    var s=score(); qbox.innerHTML='<div class="q-card q-end"><div class="big">'+(s>=list.length*0.8?"🏆":s>=list.length*0.5?"👍":"💪")+'</div><h2>Geschafft!</h2><p class="q-text">'+s+' von '+list.length+' Aufgaben beim ersten Versuch richtig.</p><div class="ctrl" style="justify-content:center"><button type="button" class="btn" id="restart">↻ Noch einmal</button><a class="btn ghost" href="fehler.html">Typische Fehler ansehen</a></div></div>';
    $("#restart").onclick=function(){ res={}; save(); qi=0; render(); };
  };
  document.querySelectorAll(".quiz-tabs button").forEach(function(b){ b.onclick=function(){ mode=b.dataset.qmode; load(); }; });
  document.addEventListener("tr-model", load);
  load();
}

/* ================= Spickzettel ================= */
if (page==="spick"){
  var m = $(".sheet").getAttribute("data-model"); TR.mini();
  $("#spickrows").innerHTML = TR.spick[m].map(function(r){ return '<tr><td>'+TR.esc(r[0])+'</td><td>'+TR.mixedChips(r[1], m)+'</td><td>'+TR.md(r[2])+'</td></tr>'; }).join("");
  var side = m==="ms" ? [
    ["Anzeige lesen","Der <b>Punkt</b> ist das Komma: 2.5 = 2,5. Ganze Zahlen enden mit Punkt: 36. = 36. <b>13⌟15</b> = 13/15; <b>2⌟3⌟4</b> = 2 ¾."],
    ["Oben im Display","<b>D</b> = Grad (richtig). R/G = falsch für sin/cos/tan. <b>S</b> = SHIFT aktiv, <b>A</b> = ALPHA aktiv, <b>SD</b> = Statistik (zurück mit MODE 1), <b>FIX</b> = gerundet."],
    ["Merke","(−) = Vorzeichen, − = minus. Nach √ Klammer öffnen: √(6²+8²). Bruch mit Summe im Nenner: 3÷(2+4)."],
    ["Fehlermeldung","Math ERROR / Syntax ERROR: <b>AC</b> oder ◀ zur Fehlerstelle."],
    ["Kann er nicht","Gleichungen lösen, Wertetabellen, Median."]
  ] : [
    ["Anzeige lesen","Ergebnisse oft <b>exakt</b>: 17/4, 2√2, 16π. <b>S⇔D</b> → Dezimalzahl, bei Perioden: 1× 0,‾3, 2× 0,3333333333."],
    ["Vorlagen verlassen","Nach Bruch, Hochzahl, Wurzel: <b>▶</b> drücken, sonst rechnest du darin weiter."],
    ["Oben im Display","<b>D</b> = Grad (richtig). <b>S</b> = SHIFT, <b>A</b> = ALPHA aktiv, <b>FIX</b> = gerundet."],
    ["Merke","(−) = Vorzeichen, − = minus. sin( mit ) schließen. %: SHIFT Ans, dann =."],
    ["Fehlermeldung","Mathem. Fehler / Syntaxfehler: <b>AC</b> oder ◀ ▶ zur Fehlerstelle."],
    ["Kann er nicht","Gleichungen lösen (kein SOLVE). Dafür: CALC, Wertetabelle, Berechn. prüfen."]
  ];
  $("#spickside").innerHTML = side.map(function(b){ return '<div class="box"><h3>'+b[0]+'</h3><p>'+b[1]+'</p></div>'; }).join("");
}

/* Lehrkräfte-Seite: Prüfstatistik */
if (page==="lehrer"){
  var v = TR.verify || {}, el2 = $("#verifystats");
  var nk = function(m){ var ks=TR.models[m].keys; return ks.length+" Tasten, alle mit Erklärung; "+ks.filter(function(k){return k.shift;}).length+" SHIFT-, "+ks.filter(function(k){return k.alpha;}).length+" ALPHA-Funktionen erklärt; "+ks.reduce(function(a,k){return a+(k.ex||[]).length;},0)+" Tasten-Beispiele"; };
  if (el2) el2.innerHTML = "<li>fx-82MS: "+nk("ms")+"</li><li>fx-87DE X: "+nk("dex")+"</li><li>Anleitungen: "+TR.guides.length+" · Typische Fehler: "+TR.fehler.length+" · Quiz: "+TR.quiz.ms.length+" (fx-82MS) + "+TR.quiz.dex.length+" (fx-87DE X) Aufgaben</li>"+
    "<li>Automatische Prüfung (Python/sympy): "+(v.checked_v||0)+" Ergebnisse nachgerechnet, davon "+(v.checked_fmt||0)+" mit exaktem Anzeigeformat verglichen; "+(v.sim_ok||0)+" Tastenfolgen mit einem Rechner-Simulator nachvollzogen ("+(v.sim_skipped||0)+" Menü-/Modus-Folgen nur manuell geprüft); Fehler: "+(v.errors||0)+"</li>";
}
})();
