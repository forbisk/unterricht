window.PAGE_INIT = function(){
  const list = document.getElementById("pathList");
  const mods = App.PAGES.filter(p=>/^m\d$/.test(p.id));
  list.innerHTML = mods.map(p=>'<a class="path-item" href="'+p.href+'"><div class="ico" style="background:'+p.color+'">'+p.icon+'</div><div><h3>Modul '+p.icon+': '+p.title+' <span class="tag '+(p.kind==="recap"?"recap":"new")+'">'+(p.kind==="recap"?"Wiederholung":"Neu")+'</span>'+(p.lp==="werkzeug"?' <span class="tag tool" title="Nicht wörtlich im Lehrplan – wird aber in Prüfungsaufgaben gebraucht">Werkzeug / Erweiterung</span>':(p.lp? ' <span class="tag lp">Lehrplan</span>':''))+'</h3><p>'+p.sub+'</p></div><div class="ring" data-progress-of="'+p.id+'"><span>0%</span></div></a>').join("");
  const tools = App.PAGES.filter(p=>["gruppe","training","pruefung","selbsttest","merk"].indexOf(p.id)>=0);
  document.getElementById("toolCards").innerHTML = tools.map(p=>'<a class="path-item" style="grid-template-columns:52px 1fr" href="'+p.href+'"><div class="ico" style="background:'+p.color+';width:52px;height:52px;font-size:1.3rem">'+p.icon+'</div><div><h3 style="font-size:1.05rem">'+p.title+'</h3><p class="small">'+p.sub+'</p></div></a>').join("");
  const s = App.store.get();
  const tp = App.totalProgress();
  document.getElementById("totalPct").textContent = tp+" %";
  document.getElementById("taskCount").textContent = Object.keys(s.task).filter(k=>s.task[k]).length;
  let g=0; for(const k in s.gen) g += (s.gen[k].right||0);
  document.getElementById("genCount").textContent = g;
  // nächstes Modul vorschlagen
  const next = mods.find(p=>App.moduleProgress(p.id)<80);
  if(tp>0){
    document.getElementById("totalInfo").textContent = next? "Weiter mit Modul "+next.icon+": "+next.title : "Alle Module fast fertig – mach den Selbsttest!";
    const b = document.getElementById("continueBtn");
    b.textContent = "▶ Weiterlernen"; b.href = next? next.href : "selbsttest.html";
  }
  // zuletzt besuchte Seite (auch nach dem Laden einer Fortschrittsdatei)
  const cont = App.progress && App.progress.continueHref();
  if(cont){
    const b = document.getElementById("continueBtn");
    b.textContent = "▶ Weiter, wo du aufgehört hast"; b.href = cont; b.title = App.progress.pageTitle(s.last.page);
  }
  const box = document.getElementById("codeBox");
  document.getElementById("exportBtn").onclick = ()=>{ box.style.display="block"; box.value = App.store.exportText(); box.select(); try{ document.execCommand("copy"); App.toast("Code kopiert"); }catch(e){} };
  document.getElementById("importBtn").onclick = ()=>{
    if(box.style.display!=="block"){ box.style.display="block"; box.value=""; box.placeholder="Code hier einfügen und nochmal auf „Code einfügen“ klicken"; box.focus(); return; }
    try{ App.store.importText(box.value); App.toast("Fortschritt übernommen"); setTimeout(()=>location.reload(),600);}catch(e){ App.toast("Code ungültig"); }
  };
  document.getElementById("resetBtn").onclick = ()=>{ if(confirm("Wirklich den gesamten Fortschritt auf diesem Gerät löschen?")){ App.store.reset(); location.reload(); } };
};
