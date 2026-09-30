/* Selbsteinschätzung A–E (++ / + / ○) und Test aus den Generatoren */
(function(){
const AREAS = [
 {k:"A", name:"Begriffe", items:[
  {id:"A1", t:"Ich kann Zentrum $Z$, Originalpunkt $P$, Bildpunkt $P'$ und Streckungsfaktor $k$ erklären.", l:"modul1-zentrische-streckung.html#begriffe"},
  {id:"A2", t:"Ich kann erklären, was „zueinander ähnlich“ ($\\sim$) bedeutet.", l:"modul0-wiederholung.html"},
  {id:"A3", t:"Ich weiß: Streckungsfaktor = Ähnlichkeitsfaktor ($k = \\text{Bild} : \\text{Urbild}$, Richtung nicht mischen).", l:"modul1-zentrische-streckung.html#eigenschaften"}]},
 {k:"B", name:"Zeichnen", items:[
  {id:"B1", t:"Ich kann ein Dreieck mit $k = 2$ auf Karopapier zentrisch strecken.", l:"modul1-zentrische-streckung.html#konstruktion"},
  {id:"B2", t:"Ich kann auch mit $k = \\tfrac12$ und $k = \\tfrac32$ strecken.", l:"modul1-zentrische-streckung.html#bauen"},
  {id:"B3", t:"Ich kann ein <b>Viereck</b> zentrisch strecken.", l:"modul1-zentrische-streckung.html#viereck"},
  {id:"B4", t:"KANN: Ich finde $Z$ und $k$, wenn Original und Bild gegeben sind.", l:"modul1-zentrische-streckung.html#zentrum"}]},
 {k:"C", name:"Eigenschaften", items:[
  {id:"C1", t:"Ich weiß: Winkel bleiben gleich, jede Bildstrecke ist parallel zur Originalstrecke.", l:"modul1-zentrische-streckung.html#eigenschaften"},
  {id:"C2", t:"Ich kann mit dem Hauptähnlichkeitssatz (ww) begründen – und berechne dafür auch den dritten Winkel.", l:"modul2-aehnliche-dreiecke.html#ww"},
  {id:"C3", t:"Ich finde entsprechende Seiten sicher (gegenüber gleicher Winkel).", l:"modul2-aehnliche-dreiecke.html#entsprechend"}]},
 {k:"D", name:"Berechnen", items:[
  {id:"D1", t:"Ich berechne Bildlängen mit $\\overline{ZP'} = k \\cdot \\overline{ZP}$.", l:"modul1-zentrische-streckung.html#berechnen"},
  {id:"D2", t:"Ich bestimme $k$ und berechne fehlende Seiten ähnlicher Dreiecke.", l:"modul2-aehnliche-dreiecke.html#berechnen"},
  {id:"D3", t:"Ich rechne sicher mit Maßstäben (Einheiten umrechnen!).", l:"training.html#massstab"}]},
 {k:"E", name:"Anwendung & Erweiterung", items:[
  {id:"E1", t:"Ich löse Sachaufgaben (Schatten, Försterdreieck, Modell) mit ähnlichen Dreiecken.", l:"modul5-anwendungen.html"},
  {id:"E2", t:"Werkzeug: Ich nutze die Strahlensätze (V- und X-Figur) – oder weiche auf ähnliche Dreiecke aus.", l:"modul3-strahlensaetze.html"},
  {id:"E3", t:"Erweiterung: Ich weiß, dass Flächen mit $k^2$ und Volumen mit $k^3$ wachsen.", l:"modul4-flaeche-volumen.html"},
  {id:"E4", t:"KANN: Ich kenne die Ähnlichkeitssätze sss, sws und SsW.", l:"modul2-aehnliche-dreiecke.html#saetze"}]}
];
const MARKS = [["pp","++"],["p","+"],["o","○"]];
function reflTable(){
  const s = App.store.get(), box = document.getElementById("reflTable");
  let h = '<table class="nice refl"><thead><tr><th>Bereich</th><th>Ich kann …</th><th>++</th><th>+</th><th>○</th><th class="noprint">Üben</th></tr></thead><tbody>';
  AREAS.forEach(a=>a.items.forEach((it,i)=>{
    h += '<tr>'+(i===0?'<td rowspan="'+a.items.length+'" class="area"><b>'+a.k+'</b><br>'+a.name+'</td>':'')+'<td>'+it.t+'</td>';
    MARKS.forEach(([v,l])=>{ h += '<td class="rc"><label class="refl-opt"><input type="radio" name="r_'+it.id+'" value="'+v+'"'+(s.refl[it.id]===v?' checked':'')+' aria-label="'+it.id+' '+l+'"><span>'+l+'</span></label></td>'; });
    h += '<td class="noprint"><a href="'+it.l+'">→</a></td></tr>';
  }));
  box.innerHTML = h+'</tbody></table>';
  box.querySelectorAll("input[type=radio]").forEach(r=>r.addEventListener("change", ()=>{ const s=App.store.get(); s.refl[r.name.slice(2)] = r.value; App.store.save(); evaluate(); }));
  App.math(box);
}
// Test: je Aufgabe ein Generator + Kompetenzbereich
const PLAN = [["massstab","D","muss"],["streckung","D","muss"],["streckung","D","soll"],["ww","C","muss"],["seiten","D","muss"],["seiten","D","soll"],["schatten","E","soll"],["foerster","E","soll"],["sts1","E","soll"],["flaeche","E","kann"]];
let T = null;
function show(){
  const holder = document.getElementById("testHolder"); holder.innerHTML = "";
  const [gid, area, lv] = PLAN[T.i]; const g = GEN[gid];
  const t = g.make(lv); t.title = g.title+" ("+area+")"; t.num = "Aufgabe "+(T.i+1)+"/10"; t.level = lv;
  let clean = true;
  const el = App.renderTask(t, {container:holder, nocount:true, fresh:true, onSolved:()=>{ if(T.res[T.i]!==undefined) return; T.res[T.i] = clean; upd(); document.getElementById("testNext").style.display=""; }});
  el.addEventListener("click", e=>setTimeout(()=>{
    if(el.querySelector(".feedback.bad") || el.querySelector(".hint") || el.querySelector(".solution")) clean = false;
    if(el.querySelector(".solution") && T.res[T.i]===undefined){ T.res[T.i] = false; upd(); document.getElementById("testNext").style.display=""; }
  },0));
  App.math(holder); document.getElementById("testNext").style.display="none";
}
function upd(){
  const n = T.res.filter(x=>x).length;
  document.getElementById("testScore").textContent = "✓ "+n+" sicher gelöst · Aufgabe "+Math.min(T.i+1,10)+"/10";
  document.getElementById("testBar").style.width = (T.i/10*100)+"%";
}
function finish(){
  const byArea = {};
  PLAN.forEach(([g,a],i)=>{ byArea[a] = byArea[a]||{r:0,n:0}; byArea[a].n++; if(T.res[i]) byArea[a].r++; });
  const s = App.store.get();
  s.misc.test = {date: new Date().toLocaleDateString("de-DE"), ts: Date.now(), right: T.res.filter(x=>x).length, byArea, res: T.res.map(x=>!!x), plan: PLAN.map(p=>p[0]+"/"+p[2])};
  s.misc.tests = (Array.isArray(s.misc.tests)? s.misc.tests : []).concat([s.misc.test]).slice(-30);   // Verlauf für die Lehrkraft
  App.store.save();
  document.getElementById("testHolder").innerHTML = '<div class="feedback show ok"><b>Test beendet.</b> Deine Auswertung steht unten.</div>';
  document.getElementById("testBar").style.width = "100%"; document.getElementById("testNext").style.display="none";
  evaluate(); document.getElementById("auswertung").scrollIntoView({behavior:"smooth"});
}
function evaluate(){
  const s = App.store.get(), box = document.getElementById("evalBox");
  const test = s.misc.test;
  let h = '<div class="grid g5 eval-grid">';
  AREAS.forEach(a=>{
    const marks = a.items.map(it=>s.refl[it.id]).filter(Boolean);
    const pp = marks.filter(m=>m==="pp").length, o = marks.filter(m=>m==="o").length;
    const tr = test && test.byArea[a.k];
    h += '<div class="card eval"><h3>'+a.k+' · '+a.name+'</h3><p class="small">Selbsteinschätzung: '+(marks.length? pp+'× ++, '+(marks.length-pp-o)+'× +, '+o+'× ○' : '–')+'</p>'
       + (tr? '<p class="small">Test: '+tr.r+' von '+tr.n+' sicher</p>' : '')+'</div>';
  });
  h += '</div>';
  const todo = [];
  AREAS.forEach(a=>a.items.forEach(it=>{ if(s.refl[it.id]==="o") todo.push('<li><a href="'+it.l+'">'+it.t+'</a></li>'); }));
  if(test) h += '<p><b>Letzter Test ('+test.date+'):</b> '+test.right+' von 10 Aufgaben sicher gelöst. '+(test.right>=8?'Sehr gut – probiere die ★★★-Aufgaben im <a href="pruefung.html">Prüfungsteil</a>!':(test.right>=5?'Gut! Übe gezielt im <a href="training.html">Training</a>.':'Wiederhole die Musterbeispiele in den Modulen und übe im <a href="training.html">Training</a>.'))+'</p>';
  if(todo.length) h += '<h4>Das solltest du noch üben (○):</h4><ul>'+todo.join("")+'</ul>';
  box.innerHTML = h; App.math(box);
}
window.PAGE_INIT = function(){
  reflTable(); evaluate();
  document.getElementById("testStart").onclick = ()=>{ T = {i:0, res:[]}; upd(); show(); };
  document.getElementById("testNext").onclick = ()=>{ T.i++; if(T.i>=10) finish(); else { upd(); show(); } };
};
})();
