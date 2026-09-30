/* Übungsbereich: alle Generatoren, Niveau-Filter, gemischte Runde, Statistik */
(function(){
const TOPICS = [
  {t:"Wiederholung", title:"Wiederholung: Maßstab", lp:true},
  {t:"Modul 1", title:"Modul 1: Zentrische Streckung", lp:true},
  {t:"Modul 2", title:"Modul 2: Ähnliche Dreiecke", lp:true},
  {t:"Modul 3", title:"Modul 3: Strahlensätze (Werkzeug)", lp:false},
  {t:"Modul 4", title:"Modul 4: Fläche und Volumen (Erweiterung)", lp:false},
  {t:"Modul 5", title:"Modul 5: Anwendungen", lp:true}
];
const ORD = {muss:0, soll:1, kann:2}, LVNAME = {muss:"● MUSS", soll:"◆ SOLL", kann:"★ KANN"};
let level = "kann";
function sections(){
  const box = document.getElementById("genSections"); box.innerHTML = "";
  TOPICS.forEach(tp=>{
    const gens = GEN.list.filter(g=>g.topic===tp.t && ORD[g.level]<=ORD[level]);
    if(!gens.length) return;
    const sec = document.createElement("section"); sec.className="section";
    sec.innerHTML = '<div class="section-title"><h2>'+tp.title+'</h2>'+(tp.lp?'<span class="tag lp">Lehrplan</span>':'<span class="tag tool">Werkzeug / Erweiterung</span>')+'</div><div class="grid g2"></div>';
    const grid = sec.querySelector(".grid");
    gens.forEach(g=>{
      const card = document.createElement("div"); card.className="tcard"; card.id = g.id;
      card.innerHTML = '<h3>'+(g.icon||"🎲")+' '+g.title+' '+App.lvl(g.level)+'</h3><div class="gw"></div>';
      grid.appendChild(card);
      GEN.widget(card.querySelector(".gw"), g.id, {level: ORD[level]>=ORD[g.level]? level : g.level});
    });
    box.appendChild(sec);
  });
  App.math(box);
}
function stats(){
  const s = App.store.get(), t = document.getElementById("statTable");
  let h = '<thead><tr><th>Generator</th><th>Niveau</th><th>richtig</th><th>aktuelle Serie</th></tr></thead><tbody>';
  let tot = 0;
  GEN.list.forEach(g=>{ const st = s.gen[g.id]||{right:0,streak:0}; tot += st.right; h += '<tr><td><a href="#'+g.id+'">'+g.title+'</a></td><td>'+App.lvl(g.level)+'</td><td>'+st.right+'</td><td>'+(st.streak>=5?'🔥 ':'')+st.streak+'</td></tr>'; });
  const mx = s.misc.mixBest||0;
  h += '<tr><td><b>Summe</b></td><td></td><td><b>'+tot+'</b></td><td>Beste Mix-Runde: '+mx+'/10</td></tr></tbody>';
  t.innerHTML = h;
}
// Gemischte Runde
let mix = null;
function mixTask(){
  const holder = document.getElementById("mixHolder"); holder.innerHTML = "";
  const pool = GEN.byLevel(level);
  const g = App.pick(pool);
  const t = g.make(ORD[level]>=ORD[g.level]? level : g.level);
  t.title = g.title; t.num = "Aufgabe "+(mix.i+1)+"/10"; t.level = t.level||g.level;
  let first = true;
  const el = App.renderTask(t, {container:holder, nocount:true, fresh:true, onSolved:()=>{ if(mix.done[mix.i]) return; mix.done[mix.i]=true; if(first) mix.right++; upd(); document.getElementById("mixNext").style.display=""; }});
  el.addEventListener("click", ()=>setTimeout(()=>{ if(el.querySelector(".feedback.bad")) first=false; if(el.querySelector(".solution")) { first=false; document.getElementById("mixNext").style.display=""; } },0));
  App.math(holder);
  document.getElementById("mixNext").style.display="none";
}
function upd(){
  document.getElementById("mixScore").textContent = mix? ("✓ "+mix.right+" im ersten Versuch · Aufgabe "+Math.min(mix.i+1,10)+"/10") : "";
  document.getElementById("mixBar").style.width = mix? (mix.i/10*100)+"%" : "0";
}
function endMix(){
  const holder = document.getElementById("mixHolder");
  const s = App.store.get(); s.misc.mixBest = Math.max(s.misc.mixBest||0, mix.right); App.store.save();
  holder.innerHTML = '<div class="feedback show '+(mix.right>=8?'ok':(mix.right>=5?'info':'bad'))+'"><b>Runde beendet: '+mix.right+' von 10 im ersten Versuch richtig.</b> '+(mix.right>=8?'Hervorragend!':(mix.right>=5?'Gut – übe gezielt die Themen, bei denen du Tipps gebraucht hast.':'Schau dir die Musterbeispiele in den Modulen noch einmal an und versuche es erneut.'))+'</div>';
  document.getElementById("mixBar").style.width = "100%";
  document.getElementById("mixNext").style.display="none"; stats();
}
window.PAGE_INIT = function(){
  const chips = document.getElementById("lvChips");
  chips.innerHTML = ["muss","soll","kann"].map(l=>'<button class="chip'+(l===level?' on':'')+'" data-l="'+l+'">'+LVNAME[l]+'</button>').join("");
  chips.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{ level=b.dataset.l; chips.querySelectorAll(".chip").forEach(x=>x.classList.toggle("on",x===b)); sections(); });
  document.getElementById("mixStart").onclick = ()=>{ mix = {i:0, right:0, done:{}}; upd(); mixTask(); };
  document.getElementById("mixNext").onclick = ()=>{ mix.i++; upd(); if(mix.i>=10) endMix(); else mixTask(); };
  sections(); stats();
  if(location.hash){ const el = document.getElementById(location.hash.slice(1)); if(el) setTimeout(()=>el.scrollIntoView(),50); }
  document.addEventListener("click", ()=>setTimeout(stats, 50));
};
})();
