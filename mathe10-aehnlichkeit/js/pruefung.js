/* Prüfungsteil – rendert window.PRUEFUNG_DATA (erzeugt von tools/pruefung/json2js.py) */
(function(){
const D = window.PRUEFUNG_DATA || [], M = window.PRUEFUNG_META || {themen:[], tipps_thema:{}};
const LVL = {1:"muss", 2:"soll", 3:"kann"}, STUFE = {1:"★ leicht", 2:"★★ mittel", 3:"★★★ schwer"};
const LANDNAME = {LSA:"Sachsen-Anhalt", BB:"Brandenburg", SH:"Schleswig-Holstein"};
const esc = s => String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const state = {thema:"alle", stufe:"alle", land:"alle", sort:"thema"};

function kurzPruefung(e){
  if(/Hauptschul|BLF|qual/i.test(e.pruefung)) return "BLF (qual. HSA)";
  if(e.land==="BB") return "P10";
  if(e.land==="SH") return /Realschul/.test(e.pruefung)? "RSA" : "MSA";
  return "RSA";
}
function quoteClass(v){ return v==null? "" : v<30? "q-low" : v<55? "q-mid" : "q-high"; }

function chipGroup(id, items, key){
  const g = document.getElementById(id);
  g.innerHTML = items.map(([v,l])=>'<button class="chip'+(state[key]===v?' on':'')+'" data-v="'+v+'">'+l+'</button>').join("");
  g.querySelectorAll(".chip").forEach(b=>b.addEventListener("click", ()=>{ state[key]=b.dataset.v; g.querySelectorAll(".chip").forEach(x=>x.classList.toggle("on", x===b)); render(); }));
}

function card(e){
  const el = document.createElement("article");
  el.className = "exam land-"+e.land; el.id = e.id;
  const noTR = /ohne Taschenrechner/.test(e.teil);
  let h = '<div class="src">'
    + '<span class="tag land">'+e.land+'</span>'
    + '<span class="tag">'+kurzPruefung(e)+' '+e.jahr+'</span>'
    + '<span class="tag light">'+esc(e.teil.replace(/\s*\(ohne Taschenrechner\)/,""))+' · '+esc(e.aufgabe)+'</span>'
    + (e.be? '<span class="tag light">'+esc(/BE/.test(String(e.be))? e.be : e.be+" BE")+'</span>' : '')
    + '<span class="tag stufe s'+e.stufe+'">'+STUFE[e.stufe]+'</span>'
    + (noTR? '<span class="tag light">🚫 ohne Taschenrechner</span>' : '')
    + (e.quote? '<span class="tag quote '+quoteClass(e.quote_wert)+'" title="Erfüllungsquote laut Auswertungsbericht">📊 '+e.jahr+': '+esc(e.quote)+'</span>' : '')
    + '</div>';
  h += '<h3 class="exam-title">'+esc(e.titel)+'</h3>';
  if(e.fokus) h += '<p class="muted small">Schwerpunkt Ähnlichkeit: '+esc(e.fokus)+'</p>';
  h += '<div class="orig"><div class="orig-head">📄 Originaltext'+(e.land==="SH"? ' (unverändert, CC BY-ND 4.0)' : '')+'</div><div class="orig-text"></div>'+(e.tabelle? '<div class="orig-table">'+e.tabelle+'</div>' : '')+'</div>';
  if(e.figur) h += '<figure class="exam-fig">'+e.figur+'<figcaption>Eigene Nachzeichnung nach den Angaben im Aufgabentext'+(e.figur_hinweis? ' – '+esc(e.figur_hinweis) : '')+'</figcaption></figure>';
  else if(e.figur_hinweis) h += '<p class="fig-note">🖼 '+esc(e.figur_hinweis)+' <a href="'+e.quelle_url+'" target="_blank" rel="noopener">Original-PDF öffnen</a>'
      + (e.abb_worte? '<br><b>Abbildung in Worten (eigene Beschreibung):</b> '+esc(e.abb_worte) : '')+'</p>';
  if(e.hinweis_eigen) h += '<div class="exam-tip small"><b>Unser Hinweis:</b> '+e.hinweis_eigen+'</div>';
  h += '<div class="exam-tasks"></div>';
  if(e.gruppe) h += '<div class="box diskutieren small-box"><span class="instr diskutieren">Diskutieren</span><p style="margin:0"><b>Gruppenarbeit:</b> '+esc(e.gruppe)+'</p></div>';
  if(e.pruefungstipp) h += '<div class="exam-tip"><b>🎯 Prüfungstipp:</b> '+esc(e.pruefungstipp)+'</div>';
  h += '<div class="exam-foot small">🔗 <a href="'+e.quelle_url+'" target="_blank" rel="noopener">Original-PDF'+(e.seite? ' (S. '+e.seite+')' : '')+'</a>'
    + (e.auswertung_url? ' · <a href="'+e.auswertung_url+'" target="_blank" rel="noopener">Auswertungsbericht</a>' : '')
    + (e.loesung_url? ' · <a href="'+e.loesung_url+'" target="_blank" rel="noopener">offizielle Korrekturanweisung</a>' : '')
    + '<br><span class="muted">'+esc(e.lizenz)+'</span></div>';
  el.innerHTML = h;
  el.querySelector(".orig-text").textContent = e.text;   // Wortlaut unverändert (kein HTML)
  App.math(el.querySelector(".exam-fig") || document.createElement("div"));
  if(e.hinweis_eigen) App.math(el.querySelector(".exam-tip"));
  // Lösungsweg zusammensetzen
  let sol;
  if(e.land==="SH"){
    sol = '<div class="sol-tag off">Lösung laut offizieller Korrekturanweisung (Zusammenfassung)</div><p>'+esc(e.loesung_offiziell)+'</p>'
        + (e.loesung_url? '<p class="small">Wortlaut: <a href="'+e.loesung_url+'" target="_blank" rel="noopener">Korrekturanweisung (PDF)</a></p>' : '');
  } else {
    sol = '<div class="sol-tag">Eigene Lösung – Sachsen-Anhalt veröffentlicht keine Musterlösungen</div>'.replace("Sachsen-Anhalt", e.land==="BB"? "Brandenburg" : "Sachsen-Anhalt")
        + '<div>'+e.loesung+'</div>' + (e.loesung_figur? '<figure class="exam-fig sol">'+e.loesung_figur+'</figure>' : '');
  }
  const box = el.querySelector(".exam-tasks");
  const checks = e.checks.length? e.checks : [{type:"open"}];
  checks.forEach((c, k)=>{
    const last = k===checks.length-1;
    const t = Object.assign({}, c, {
      id: "p-"+e.id+(k? "-"+k : ""), level: LVL[e.stufe], num: checks.length>1? "Teil "+(k+1) : "Deine Lösung",
      q: c.q? c.q : (c.type==="open"? "Bearbeite die Aufgabe im Heft. Dann vergleiche mit dem Lösungsweg." : c.type==="mc"? "Wähle die richtige Antwort:" : "Trage dein Ergebnis ein:"),
      hints: k===0? e.tipps : [], solution: last? sol : undefined
    });
    if(c.type==="num"){ t.fields = c.fields.map(f=>Object.assign({}, f)); }
    if(c.type==="mc" && c.wrongWhy){ const w={}; for(const i in c.wrongWhy) w[+i]=c.wrongWhy[i]; t.wrongWhy=w; }
    App.renderTask(t, {container: box});
  });
  // Lösungsweg auch bei num/mc ohne eigene Schaltfläche für den letzten Teil – renderTask kümmert sich darum
  return el;
}

function sorted(list){
  const ord = {}; M.themen.forEach((t,i)=>ord[t.key]=i);
  const L = {LSA:0, BB:1, SH:2};
  const a = list.slice();
  if(state.sort==="jahr") a.sort((x,y)=> y.jahr-x.jahr || L[x.land]-L[y.land]);
  else if(state.sort==="quote") a.sort((x,y)=> (x.quote_wert==null?999:x.quote_wert)-(y.quote_wert==null?999:y.quote_wert) || y.stufe-x.stufe);
  else a.sort((x,y)=> ord[x.thema]-ord[y.thema] || x.stufe-y.stufe || L[x.land]-L[y.land] || x.jahr-y.jahr);
  return a;
}

function render(){
  const list = sorted(D.filter(e=> (state.thema==="alle"||e.thema===state.thema) && (state.stufe==="alle"||String(e.stufe)===state.stufe) && (state.land==="alle"||e.land===state.land)));
  const box = document.getElementById("examList"); box.innerHTML = "";
  const s = App.store.get();
  const solved = D.filter(e=> s.task && s.task["p-"+e.id]).length;
  document.getElementById("fInfo").textContent = list.length+" von "+D.length+" Aufgaben angezeigt · "+solved+" gelöst";
  if(!list.length){ box.innerHTML = '<p class="section muted">Keine Aufgabe passt zu diesem Filter.</p>'; return; }
  let cur = null, sec = null;
  list.forEach(e=>{
    const key = state.sort==="thema"? e.thema : "_";
    if(key!==cur){
      cur = key; sec = document.createElement("section"); sec.className = "section";
      if(state.sort==="thema"){
        const th = M.themen.find(t=>t.key===e.thema) || {name:e.thema, icon:""};
        sec.innerHTML = '<div class="section-title"><span class="num-badge">'+th.icon+'</span><h2>'+esc(th.name)+'</h2></div>'
          + (M.tipps_thema[e.thema]? '<div class="exam-tip"><b>Merke:</b> '+esc(M.tipps_thema[e.thema])+'</div>' : '');
      }
      box.appendChild(sec);
    }
    sec.appendChild(card(e));
  });
  App.math(box);
}

window.PAGE_INIT = function(){
  const counts = k => D.filter(e=>e.thema===k).length;
  chipGroup("fThema", [["alle","Alle Themen"]].concat(M.themen.map(t=>[t.key, t.icon+" "+t.name+" ("+counts(t.key)+")"])), "thema");
  chipGroup("fStufe", [["alle","Alle Stufen"],["1","★ leicht"],["2","★★ mittel"],["3","★★★ schwer"]], "stufe");
  chipGroup("fLand", [["alle","Alle Länder"],["LSA","Sachsen-Anhalt"],["BB","Brandenburg"],["SH","Schleswig-Holstein"]], "land");
  document.getElementById("fSort").addEventListener("change", e=>{ state.sort = e.target.value; render(); });
  const sk = M.ausgelassen||{}; const ks = Object.keys(sk);
  if(ks.length) document.getElementById("skipInfo").textContent = "Nicht aufgenommen: "+ks.map(k=>k+" ("+sk[k]+")").join("; ")+".";
  // Direktlink #id → Filter zurücksetzen und hinscrollen
  render();
  if(location.hash && document.getElementById(location.hash.slice(1))){
    const tgt = document.getElementById(location.hash.slice(1));
    [0, 250, 700].forEach(ms => setTimeout(() => tgt.scrollIntoView(), ms)); /* nach KaTeX-/Bild-Layout erneut */
  }
};
})();
