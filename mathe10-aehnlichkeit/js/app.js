/* Gemeinsame Funktionen der Lernseite "Ähnlichkeit – Klasse 10"
   läuft offline unter file:// (kein Server, kein fetch) */
(function(){
"use strict";
const App = window.App = {};
App.VERSION = "1.1.0";

/* ---------------- Seitenverzeichnis ---------------- */
App.PAGES = [
  {id:"start", href:"index.html", nav:"Start", hideNav:true},
  {id:"m0", href:"modul0-wiederholung.html", nav:"0 Wdh.", title:"Wiederholung", sub:"Maßstab, Streckenverhältnis, ähnliche Figuren, ww, k", color:"#1098ad", icon:"0", kind:"recap", lp:"lehrplan"},
  {id:"m1", href:"modul1-zentrische-streckung.html", nav:"1 Streckung", title:"Zentrische Streckung", sub:"Z, P, P', Streckungsfaktor k – Dreiecke und Vierecke konstruieren und berechnen", color:"#e8590c", icon:"1", kind:"new", lp:"lehrplan"},
  {id:"m2", href:"modul2-aehnliche-dreiecke.html", nav:"2 Dreiecke", title:"Ähnliche Dreiecke", sub:"Hauptähnlichkeitssatz ww, fehlende Seiten berechnen (kurz als KANN: sss · sws · SsW)", color:"#2f9e44", icon:"2", kind:"new", lp:"lehrplan"},
  {id:"m3", href:"modul3-strahlensaetze.html", nav:"3 Strahlensätze", title:"Strahlensätze", sub:"V- und X-Figur – eine Abkürzung für ähnliche Dreiecke", color:"#5f3dc4", icon:"3", kind:"new", lp:"werkzeug"},
  {id:"m4", href:"modul4-flaeche-volumen.html", nav:"4 Flächen", title:"Fläche und Volumen", sub:"Warum Flächen mit k² und Volumen mit k³ wachsen", color:"#c2255c", icon:"4", kind:"new", lp:"werkzeug"},
  {id:"m5", href:"modul5-anwendungen.html", nav:"5 Anwendungen", title:"Anwendungen", sub:"Schatten, Försterdreieck, Karten, Modelle, Beamer, Dächer", color:"#e67700", icon:"5", kind:"new", lp:"lehrplan"},
  {id:"gruppe", href:"gruppenarbeit.html", nav:"Gruppen", title:"Gruppenarbeit", sub:"Stationen, Rollen, Gruppenpuzzle – druckbar", color:"#0c8599", icon:"👥"},
  {id:"training", href:"training.html", nav:"Training", title:"Übungsbereich", sub:"Aufgabengeneratoren: unbegrenzt üben mit Tipps", color:"#364fc7", icon:"∞"},
  {id:"pruefung", href:"pruefung.html", nav:"Prüfung", title:"Prüfungsaufgaben", sub:"Echte Aufgaben aus den Abschlussprüfungen 2016–2026", color:"#343a40", icon:"🎓"},
  {id:"selbsttest", href:"selbsttest.html", nav:"Selbsttest", title:"Selbsttest & Checkliste", sub:"++ / + / ○ – Wo stehe ich?", color:"#7048e8", icon:"✓"},
  {id:"merk", href:"merksaetze.html", nav:"Merksätze", title:"Merksätze", sub:"Alle Merksätze auf einen Blick – zum Ausdrucken", color:"#d6336c", icon:"M"}
];

/* ---------------- Speicher (localStorage) ----------------
   Schlüssel "aehnlichkeit10-v1" = ein JSON-Objekt:
   sec{abschnittId:true} task{aufgabenId:1} att{aufgabenId:{w,h,l,s,ok1,t}} refl{A1:"pp"|"p"|"o"}
   gen{generatorId:{right,streak,best,wrong,clean}} meta{modul:{total,items,visited}}
   misc{build,mixBest,test,tests[],lastChange} time{total,pages{}} last{page,href,titel,abschnitt,ts}
   Weitere Schlüssel: "aehnlichkeit10-profil" (Name/Klasse), "aehnlichkeit10-ui" (nur Erinnerungs-Status) */
const KEY = "aehnlichkeit10-v1";
App.KEY = KEY;
let mem = null;
function defaults(o){
  ["sec","task","refl","gen","meta","misc","att"].forEach(k=>{ if(!o[k] || typeof o[k]!=="object" || Array.isArray(o[k])) o[k] = {}; });
  return o;
}
function load(){
  if(mem) return mem;
  try{ mem = JSON.parse(localStorage.getItem(KEY)) || {}; }catch(e){ mem = {}; }
  if(typeof mem!=="object" || Array.isArray(mem)) mem = {};
  return defaults(mem);
}
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(mem||load())); }catch(e){} }
App.store = {
  get(){ return load(); },
  /* quiet=true: technische Speicherung (Lernzeit, zuletzt besucht) – zählt nicht als "Arbeit" */
  save(quiet){ const s = load(); if(!quiet){ s.misc.lastChange = Date.now(); } save(); if(!quiet && App.onChange) try{ App.onChange(); }catch(e){} updateMiniProgress(); },
  reset(){ mem = {}; try{ localStorage.removeItem(KEY);}catch(e){} load(); save(); },
  reload(){ mem = null; return load(); },
  exportText(){ return JSON.stringify(load()); },
  importText(t){ const o = JSON.parse(t); if(!o || typeof o!=="object" || Array.isArray(o)) throw new Error("ungültig"); mem = defaults(o); save(); mem=null; load(); }
};
/* Änderungen aus einem anderen Tab übernehmen (gleiches Objekt behalten, damit gehaltene Referenzen gültig bleiben) */
if(window.addEventListener) window.addEventListener("storage", e=>{
  if(e.key!==KEY || !mem) return;
  let n; try{ n = JSON.parse(e.newValue) || {}; }catch(x){ n = {}; }
  Object.keys(mem).forEach(k=>delete mem[k]); Object.assign(mem, n); defaults(mem);
  try{ updateMiniProgress(); }catch(x){}
});
App.storageWorks = (function(){ try{ localStorage.setItem("__t","1"); localStorage.removeItem("__t"); return true;}catch(e){return false;} })();

/* ---------------- Zahlen ---------------- */
App.fmt = function(x, d){
  if(d===undefined) d = 2;
  if(!isFinite(x)) return "–";
  let s = (Math.round(x*Math.pow(10,d))/Math.pow(10,d)).toFixed(d);
  if(s.indexOf(".")>=0) s = s.replace(/0+$/,"").replace(/\.$/,"");
  if(s==="-0") s="0";
  s = s.replace(".", ",");
  // Tausenderpunkte ab 5 Stellen (Prüfungsschreibweise mit Leerzeichen)
  const parts = s.split(",");
  if(parts[0].replace("-","").length>4) parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f");
  return parts.join(",");
};
App.fmtFix = function(x,d){ return (Math.round(x*Math.pow(10,d))/Math.pow(10,d)).toFixed(d).replace(".",","); };
/* Eingabe tolerant auswerten: "4,5" "4.5" "4,5 cm" "3/2" "1 1/2" "12 000" "1:50"(→0,02 nur falls erlaubt) */
App.parseNum = function(str){
  if(str===undefined||str===null) return NaN;
  let s = String(str).trim().toLowerCase();
  if(!s) return NaN;
  s = s.replace(/[\u2212\u2013]/g,"-").replace(/[\u202f\u00a0]/g," ");
  s = s.replace(/(cm²|cm³|m²|m³|dm²|dm³|mm²|mm³|km²|cm2|cm3|m2|m3|km|dm|cm|mm|m|°|grad|ml|l|€|euro|kästchen|einheiten|le|fe|ve)\s*$/,"").trim();
  s = s.replace(/^[a-zäöü'′]+\s*=\s*/,"");         // "x = 4,5"
  s = s.replace(/(\d)\s+(?=\d{3}(\D|$))/g,"$1");   // 12 000 -> 12000
  // gemischte Zahl "1 1/2"
  let m = s.match(/^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if(m) return (parseInt(m[1])<0?-1:1)*(Math.abs(parseInt(m[1])) + parseInt(m[2])/parseInt(m[3]));
  // Bruch "3/2" oder "3,5/7"
  m = s.match(/^(-?[\d.,]+)\s*\/\s*([\d.,]+)$/);
  if(m) return App.parseNum(m[1])/App.parseNum(m[2]);
  if(s.indexOf(",")>=0 && s.indexOf(".")>=0) s = s.replace(/\./g,"");  // 1.234,5
  s = s.replace(",",".");
  if(!/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return NaN;
  return parseFloat(s);
};
/* Verhältnis "1:50", "5 : 1" -> [a,b] */
App.parseRatio = function(str){
  const m = String(str).replace(/\s/g,"").match(/^([\d.,]+):([\d.,]+)$/);
  if(!m) return null;
  return [App.parseNum(m[1]), App.parseNum(m[2])];
};
App.near = function(v, ans, tol){
  if(!isFinite(v)) return false;
  if(tol===undefined) tol = Math.max(0.011, Math.abs(ans)*0.005);
  return Math.abs(v-ans) <= tol + 1e-9;
};

/* ---------------- Zufall ---------------- */
App.rnd = (a,b)=> a + Math.floor(Math.random()*(b-a+1));
App.pick = arr => arr[Math.floor(Math.random()*arr.length)];
App.shuffle = arr => { const a = arr.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; };

/* ---------------- KaTeX ---------------- */
App.math = function(el){
  if(!window.renderMathInElement || !el) return;
  try{
    renderMathInElement(el, {delimiters:[
      {left:"$$", right:"$$", display:true},
      {left:"\\[", right:"\\]", display:true},
      {left:"$", right:"$", display:false},
      {left:"\\(", right:"\\)", display:false}],
      throwOnError:false, preProcess:function(m){return m.replace(/\u202f/g,"\\,");}, ignoredTags:["script","noscript","style","textarea","pre","code","input"]});
  }catch(e){ console.warn(e); }
};
App.tex = function(t, display){ try{ return katex.renderToString(String(t).replace(/\u202f/g,"\\,"),{throwOnError:false, displayMode:!!display}); }catch(e){ return t; } };

/* ---------------- Toast ---------------- */
let toastEl, toastT;
App.toast = function(msg){
  if(!toastEl){ toastEl = document.createElement("div"); toastEl.className="toast"; toastEl.setAttribute("role","status"); document.body.appendChild(toastEl); }
  toastEl.textContent = msg; toastEl.classList.add("show");
  clearTimeout(toastT); toastT = setTimeout(()=>toastEl.classList.remove("show"), 2200);
};

/* ---------------- Header / Footer ---------------- */
const LOGO = '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" fill="#3b5bdb"/><polygon points="8,31 18,31 11,23" fill="#a5d8ff"/><polygon points="8,31 33,31 15.5,11" fill="none" stroke="#fff" stroke-width="2.4" stroke-linejoin="round"/><circle cx="8" cy="31" r="2.6" fill="#ffd43b"/></svg>';
function buildHeader(){
  const cur = document.body.dataset.page;
  const h = document.createElement("header");
  h.className = "site-header";
  h.innerHTML = '<a class="skip-link" href="#main">Zum Inhalt</a><div class="bar"><a class="brand" href="index.html">'+LOGO+'<span>Ähnlichkeit<small>Mathe · Klasse 10</small></span></a>'+
    '<button class="nav-toggle" aria-label="Menü öffnen" aria-expanded="false">☰</button><nav class="nav" aria-label="Hauptnavigation">'+
    App.PAGES.map(p=>'<a href="'+p.href+'" class="'+(p.id===cur?'active':'')+(p.hideNav?' home-link':'')+'"'+(p.id===cur?' aria-current="page"':'')+'>'+p.nav+'</a>').join("")+
    '</nav></div><div class="progress-mini" title="Gesamtfortschritt"><div></div></div>';
  document.body.insertBefore(h, document.body.firstChild);
  const t = h.querySelector(".nav-toggle"), n = h.querySelector(".nav");
  t.addEventListener("click", ()=>{ n.classList.toggle("open"); t.setAttribute("aria-expanded", n.classList.contains("open")); });
  const f = document.createElement("footer");
  f.className = "site-footer";
  f.innerHTML = '<div class="in"><span>Lernseite <b>Ähnlichkeit</b> · Mathematik Klasse 10 · Theodor Fontane Gemeinschaftsschule · Lehrer P. Kurlavičius</span><span>Funktioniert offline · Fortschritt wird nur auf diesem Gerät gespeichert</span></div>';
  document.body.appendChild(f);
}

/* ---------------- Fortschritt ---------------- */
App.moduleItems = function(mid){
  const cat = window.PROGRESS_CATALOG, s = load();
  if(cat && cat.modules && cat.modules[mid]) return cat.modules[mid].items.map(i=>i.id);
  const meta = s.meta[mid];
  return meta && meta.items ? meta.items : [];
};
App.moduleProgress = function(mid){
  const s = load();
  const items = App.moduleItems(mid);
  if(!items.length) return 0;
  let done = 0;
  items.forEach(k=>{ if(s.sec[k]||s.task[k]) done++; });
  return Math.round(100*done/items.length);
};
App.totalProgress = function(){
  const mods = ["m0","m1","m2","m3","m4","m5"];
  return Math.round(mods.reduce((a,m)=>a+App.moduleProgress(m),0)/mods.length);
};
function updateMiniProgress(){
  const bar = document.querySelector(".progress-mini>div");
  if(bar) bar.style.width = App.totalProgress()+"%";
  document.querySelectorAll("[data-progress-of]").forEach(el=>{
    const p = App.moduleProgress(el.dataset.progressOf);
    el.style.setProperty("--p", p);
    const sp = el.querySelector("span"); if(sp) sp.textContent = p+"%";
  });
}
App.updateProgress = updateMiniProgress;
function registerPageItems(){
  const mid = document.body.dataset.module;
  if(!mid) return;
  const items = [];
  document.querySelectorAll("[data-sec]").forEach(el=>items.push(el.dataset.sec));
  document.querySelectorAll(".task[data-id]").forEach(el=>{ if(el.dataset.count!=="no") items.push(el.dataset.id); });
  const s = load();
  s.meta[mid] = {total: items.length, items: items, visited: Date.now()};
  save(); updateMiniProgress();
}
App.registerPageItems = registerPageItems;

function initCheckoffs(){
  document.querySelectorAll(".checkoff[data-sec]").forEach(el=>{
    const id = el.dataset.sec;
    const btn = document.createElement("button");
    btn.className = "btn ghost";
    const label = el.dataset.label || "Diesen Abschnitt habe ich bearbeitet";
    const set = ()=>{ const d = !!load().sec[id]; btn.classList.toggle("done", d); btn.classList.toggle("ghost", !d); btn.innerHTML = d ? "✓ Erledigt" : "☐ "+label; };
    btn.addEventListener("click", ()=>{ const s = load(); s.sec[id] = !s.sec[id]; App.store.save(); set(); if(s.sec[id]) App.toast("Super, Abschnitt abgehakt! ✓"); });
    set();
    el.insertBefore(btn, el.firstChild);
  });
}

/* ---------------- Aufgaben-Renderer ----------------
 task = {id, level:'muss'|'soll'|'kann', instr:'schriftlich'|..., title, q:html, fig:svg|fn,
         type:'num'|'mc'|'open', fields:[{label, ans, unit, tol, ratio:true}], choices:[html], correct:i|[i],
         hints:[html], solution:html, wrongHint:{value:html} }                           */
const INSTR_LABEL = {abschreiben:"Abschreiben", beispiel:"Beispiel ins Heft", lesen:"Nur lesen", diskutieren:"Diskutieren", schriftlich:"Schriftlich"};
App.instr = (k)=> '<span class="instr '+k+'">'+INSTR_LABEL[k]+'</span>';
App.lvl = (k)=> '<span class="lvl '+k+'">'+k.toUpperCase()+'</span>';

App.renderTask = function(t, opts){
  opts = opts||{};
  const el = document.createElement("div");
  el.className = "task "+(t.level||"muss");
  if(t.id) el.dataset.id = t.id;
  if(opts.nocount) el.dataset.count = "no";
  const s = load();
  let html = '<div class="task-head">'+(t.num?'<span class="tnum">'+t.num+'</span>':'')+App.lvl(t.level||"muss")+(t.instr?App.instr(t.instr):"")+(t.title?'<b>'+t.title+'</b>':'')+'<span class="done-mark">✓ gelöst</span></div>';
  html += '<div class="q">'+t.q+'</div>';
  const fig = typeof t.fig==="function" ? t.fig() : t.fig;
  if(fig) html += '<div class="fig">'+fig+'</div>';
  if(t.type==="mc"){
    html += '<div class="mc">'+t.choices.map((c,i)=>'<button class="btn" data-i="'+i+'">'+c+'</button>').join("")+'</div>';
  } else if(t.type==="open"){
    html += '<div class="btn-row"><button class="btn ghost reveal-sol">Lösung zeigen &amp; selbst prüfen</button></div>';
  } else {
    (t.fields||[]).forEach((f,i)=>{
      html += '<div class="answer-row"><span class="lbl">'+(f.label||"Antwort:")+'</span><input class="ans" type="text" inputmode="decimal" autocomplete="off" data-f="'+i+'" aria-label="'+(f.aria||"Antwort")+'"><span class="unit">'+(f.unit||"")+'</span></div>';
    });
    html += '<div class="btn-row"><button class="btn check">Prüfen</button></div>';
  }
  html += '<div class="feedback"></div><div class="btn-row hint-row"></div><div class="hints"></div>';
  el.innerHTML = html;
  const fb = el.querySelector(".feedback"), hintsBox = el.querySelector(".hints"), hintRow = el.querySelector(".hint-row");
  let hintIdx = 0, wrong = 0;
  const hints = (t.hints||[]).slice();
  /* Versuche merken (für die Auswertung durch die Lehrkraft): w = Fehlversuche, h = Tipps, l = Lösung angesehen, s = gelöst am, ok1 = beim 1. Versuch richtig */
  const track = !!t.id && !opts.nocount && !opts.fresh;
  function att(fn){ if(!track) return; const s = load(); const a = s.att[t.id] = s.att[t.id] || {w:0,h:0,l:0}; fn(a); a.t = Date.now(); App.store.save(); }
  const hbtn = document.createElement("button"); hbtn.className = "btn small warn";
  const sbtn = document.createElement("button"); sbtn.className = "btn small dark"; sbtn.textContent = "Lösungsweg";
  function setH(){ if(hintIdx<hints.length){ hbtn.textContent = "💡 Tipp "+(hintIdx+1); hbtn.style.display=""; } else hbtn.style.display="none"; }
  hbtn.addEventListener("click", ()=>{ const d = document.createElement("div"); d.className="hint"; d.innerHTML = "<b>Tipp "+(hintIdx+1)+":</b> "+hints[hintIdx]; hintsBox.appendChild(d); App.math(d); hintIdx++; setH(); att(a=>{ a.h = Math.max(a.h||0, hintIdx); }); });
  sbtn.addEventListener("click", ()=>{ if(el.querySelector(".solution")) return; const d = document.createElement("div"); d.className="solution"; d.innerHTML = "<h5>Lösungsweg</h5>"+(t.solution||""); hintsBox.appendChild(d); App.math(d); sbtn.disabled = true; if(t.type!=="open") att(a=>{ a.l = 1; }); if(t.type==="open") addSelfCheck(); });
  if(hints.length) hintRow.appendChild(hbtn);
  if(t.solution && t.type!=="open") hintRow.appendChild(sbtn);
  setH();
  function show(kind, msg){ fb.className = "feedback show "+kind; fb.innerHTML = msg; App.math(fb); }
  function solved(){
    el.classList.add("solved");
    if(t.id){ const s = load(); if(!s.task[t.id]){ s.task[t.id]=1; if(track) att(a=>{ a.s = Date.now(); a.ok1 = (!a.w && (t.type==="open" || !a.l)) ? 1 : 0; }); else App.store.save(); } }
    if(opts.onSolved) opts.onSolved(t);
  }
  function addSelfCheck(){
    const r = document.createElement("div"); r.className="btn-row";
    r.innerHTML = '<button class="btn ok small">Ich hatte es richtig ✓</button><button class="btn ghost small">Noch nicht – ich übe weiter</button>';
    r.children[0].onclick = ()=>{ solved(); show("ok","Stark! Als gelöst markiert."); r.remove(); };
    r.children[1].onclick = ()=>{ att(a=>{ a.w = (a.w||0)+1; }); show("info","Kein Problem: Lies den Lösungsweg genau und versuche es in ein paar Minuten noch einmal ohne Hilfe."); r.remove(); };
    hintsBox.appendChild(r);
  }
  if(t.type==="mc"){
    const corr = Array.isArray(t.correct)?t.correct:[t.correct];
    el.querySelectorAll(".mc button").forEach(b=>b.addEventListener("click", ()=>{
      const i = +b.dataset.i;
      if(corr.indexOf(i)>=0){ b.classList.add("right"); show("ok", "✓ Richtig! "+(t.why||"")); solved(); }
      else { b.classList.add("wrong"); wrong++; att(a=>{ a.w = (a.w||0)+1; }); show("bad", "✗ Leider nicht. "+((t.wrongWhy&&t.wrongWhy[i])||"Überlege noch einmal.")+(hints.length&&wrong>=1?" Nutze einen Tipp.":"")); }
    }));
  } else if(t.type==="open"){
    el.querySelector(".reveal-sol").addEventListener("click", function(){ this.remove(); sbtn.click(); });
  } else {
    const inputs = el.querySelectorAll("input.ans");
    const check = ()=>{
      let allOk = true, anyEmpty = false, specific = "";
      inputs.forEach(inp=>{
        const f = t.fields[+inp.dataset.f];
        const raw = inp.value;
        if(!raw.trim()){ anyEmpty = true; inp.classList.remove("right","wrong"); allOk=false; return; }
        let ok;
        if(f.ratio){
          const r = App.parseRatio(raw);
          ok = r && Math.abs(r[0]/r[1] - f.ans[0]/f.ans[1]) < 1e-6*Math.max(1,f.ans[0]/f.ans[1]) ;
          if(!ok && r===null) specific = "Schreibe das Verhältnis in der Form a : b (z. B. 1 : 50).";
        } else {
          const v = App.parseNum(raw);
          if(isNaN(v)) specific = "Ich kann „"+raw.replace(/</g,"&lt;")+"“ nicht als Zahl lesen. Schreibe z. B. 4,5 oder 3/2.";
          ok = App.near(v, f.ans, f.tol);
          if(!ok && f.wrong){ for(const w of f.wrong){ if(App.near(v, w.v, w.tol)) { specific = w.msg; break; } } }
        }
        inp.classList.toggle("right", !!ok); inp.classList.toggle("wrong", !ok);
        if(!ok) allOk = false;
      });
      if(anyEmpty && !specific){ show("info","Bitte fülle alle Felder aus."); return; }
      if(allOk){ show("ok", "✓ Richtig! "+(t.why||"")); solved(); }
      else { wrong++; att(a=>{ a.w = (a.w||0)+1; }); show("bad", "✗ Noch nicht richtig. "+(specific || (wrong>=2 && hints.length? "Schau dir einen Tipp an.":"Prüfe deine Rechnung noch einmal."))); }
    };
    el.querySelector(".check").addEventListener("click", check);
    inputs.forEach(i=>i.addEventListener("keydown", e=>{ if(e.key==="Enter") check(); }));
  }
  if(t.id && s.task[t.id] && !opts.fresh) el.classList.add("solved");
  if(opts.container) opts.container.appendChild(el);
  App.math(el);
  if(t.after) t.after(el);
  return el;
};
App.renderTasks = function(containerSel, tasks, prefix){
  const c = typeof containerSel==="string"? document.querySelector(containerSel) : containerSel;
  if(!c) return;
  tasks.forEach((t,i)=>{ if(!t.num) t.num = (prefix||"Aufgabe ")+(i+1); App.renderTask(t,{container:c}); });
};

/* Schrittweise aufdeckbare Beispiele: <ol class="step-list" data-reveal> */
function initReveals(){
  document.querySelectorAll("ol[data-reveal]").forEach(ol=>{
    const items = Array.from(ol.children);
    items.forEach((li,i)=>{ li.classList.add("reveal-step"); if(i===0) li.classList.add("on"); });
    const row = document.createElement("div"); row.className = "btn-row";
    const next = document.createElement("button"); next.className="btn small"; next.textContent = "Nächster Schritt ▸";
    const all = document.createElement("button"); all.className="btn small ghost"; all.textContent = "Alle Schritte zeigen";
    let n = 1;
    const upd = ()=>{ items.forEach((li,i)=>li.classList.toggle("on", i<n)); next.disabled = n>=items.length; all.disabled = n>=items.length; };
    next.onclick = ()=>{ n++; upd(); };
    all.onclick = ()=>{ n = items.length; upd(); };
    row.appendChild(next); row.appendChild(all);
    ol.parentNode.insertBefore(row, ol.nextSibling);
    upd();
  });
}

/* ---------------- Start ---------------- */
document.addEventListener("DOMContentLoaded", ()=>{
  buildHeader();
  if(window.PAGE_INIT) try{ window.PAGE_INIT(); }catch(e){ console.error(e); }
  initCheckoffs();
  initReveals();
  App.math(document.querySelector("main"));
  registerPageItems();
  updateMiniProgress();
  if(!App.storageWorks){ const w = document.createElement("div"); w.className="feedback show info"; w.style.margin="1rem"; w.textContent = "Hinweis: Dieser Browser erlaubt hier kein Speichern. Die Seite funktioniert, aber der Fortschritt wird nicht gemerkt."; document.querySelector("main").prepend(w); }
});
})();
