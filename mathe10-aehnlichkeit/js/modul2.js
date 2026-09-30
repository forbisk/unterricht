/* Modul 2 – Ähnliche Dreiecke */
(function(){
const F = App.fmt, ORIG="#1c7ed6", IMG="#e8590c", GRN="#2b8a3e", VIO="#7048e8";

function nestedFig(){
  return Geo.Fig({pts:{A:[0,0],B:[7.5,0],C:[5.2,4.6],D:[3,0],E:[2.08,1.84]},
    polys:[{p:"ABC",fill:"rgba(232,89,12,.08)",stroke:IMG},{p:"ADE",fill:"rgba(28,126,214,.16)",stroke:ORIG}],
    segs:[{p:"DE",color:ORIG,width:3.5,arrows:1,label:"2,4 cm",side:-1,lcolor:ORIG},{p:"BC",color:IMG,width:3.5,arrows:1,label:"?",lcolor:IMG},{p:"AD",color:"none",width:.001,label:"3 cm",side:1,off:18,lcolor:ORIG}],
    angles:[{p:"DAE",color:GRN,r:24},{p:"EDA",color:VIO,r:18},{p:"CBA",color:VIO,r:18}],
    extra:[(X,Y)=>'<text x="'+((X(0)+X(7.5))/2)+'" y="'+(Y(0)+38)+'" font-size="14" font-weight="700" fill="'+IMG+'" text-anchor="middle">AB = 7,5 cm</text>'],
    colors:{A:"#212529",B:IMG,C:IMG,D:ORIG,E:ORIG}, width:380, pad:44});
}
function turnedFig(){
  // ABC: A(0,0) B(6,0) C(2,3.5); EFD = gedreht und vergrößert
  const base = {A:[0,0],B:[6,0],C:[2,3.5]};
  const t = GEN.transform(base, 125, false, 14.5, 1.2, 1.3);
  return Geo.Fig({pts:{A:base.A,B:base.B,C:base.C,E:t.A,F:t.B,D:t.C},
    polys:[{p:"ABC",fill:"rgba(28,126,214,.12)",stroke:ORIG},{p:"EFD",fill:"rgba(232,89,12,.12)",stroke:IMG}],
    angles:[{p:"BAC",color:GRN,r:22},{p:"FED",color:GRN,r:22},{p:"CBA",color:VIO,r:18,double:true},{p:"DFE",color:VIO,r:18,double:true}],
    colors:{A:ORIG,B:ORIG,C:ORIG,D:IMG,E:IMG,F:IMG}, width:460, pad:30});
}
function figSatz(kind){
  const tri = {A:[0,0],B:[4,0],C:[1.3,2.6]};
  const t2 = GEN.transform(tri, 0, false, 5.2, 0, 1.5);
  const pts = {A:tri.A,B:tri.B,C:tri.C,D:t2.A,E:t2.B,F:t2.C};
  const segs = [], angles = [];
  if(kind==="sss"){ ["AB","BC","CA"].forEach(s=>segs.push({p:s,color:ORIG,width:4})); ["DE","EF","FD"].forEach(s=>segs.push({p:s,color:IMG,width:4})); }
  if(kind==="sws"){ ["AB","CA"].forEach(s=>segs.push({p:s,color:ORIG,width:4})); ["DE","FD"].forEach(s=>segs.push({p:s,color:IMG,width:4})); angles.push({p:"BAC",color:GRN,r:18},{p:"EDF",color:GRN,r:22}); }
  if(kind==="ssw"){ ["AB","BC"].forEach(s=>segs.push({p:s,color:ORIG,width:4})); ["DE","EF"].forEach(s=>segs.push({p:s,color:IMG,width:4})); angles.push({p:"BCA",color:GRN,r:16},{p:"EFD",color:GRN,r:20}); }
  return Geo.Fig({pts, polys:[{p:"ABC",fill:"rgba(28,126,214,.08)",stroke:"#adb5bd",width:1.5},{p:"DEF",fill:"rgba(232,89,12,.08)",stroke:"#adb5bd",width:1.5}], segs, angles, nodots:true, hide:["A","B","C","D","E","F"], width:300, pad:14});
}

window.TASKS_M2 = [
 {id:"m2-1", level:"muss", type:"mc", q:"$\\triangle ABC$: $\\alpha = 35^\\circ$, $\\beta = 75^\\circ$. &nbsp; $\\triangle DEF$: $\\delta = 75^\\circ$, $\\varepsilon = 70^\\circ$. Sind die Dreiecke ähnlich?",
  choices:["Ja – denn $\\gamma = 70^\\circ$, also stimmen $75^\\circ$ und $70^\\circ$ überein (ww).","Nein – $35^\\circ$ kommt in $DEF$ nicht vor."], correct:0,
  hints:["Berechne $\\gamma$ und $\\varphi$."], solution:"$\\gamma = 180^\\circ-35^\\circ-75^\\circ = 70^\\circ$; $\\varphi = 180^\\circ-75^\\circ-70^\\circ = 35^\\circ$. Beide Dreiecke: $35^\\circ, 70^\\circ, 75^\\circ$ → ähnlich."},
 {id:"m2-2", level:"muss", q:"Ein Dreieck hat die Winkel $\\alpha = 48^\\circ$ und $\\beta = 67^\\circ$. Wie groß muss $\\gamma$ in einem ähnlichen Dreieck sein?",
  fields:[{label:"$\\gamma =$", ans:65, unit:"°"}], hints:["Winkelsumme $180^\\circ$."], solution:"$\\gamma = 180^\\circ - 48^\\circ - 67^\\circ = 65^\\circ$ – in beiden Dreiecken, da Winkel bei Ähnlichkeit gleich bleiben."},
 {id:"m2-3", level:"muss", q:"$\\triangle ABC \\sim \\triangle DEF$ mit $\\overline{AB} = 4\\,\\text{cm}$, $\\overline{DE} = 10\\,\\text{cm}$ und $\\overline{BC} = 3\\,\\text{cm}$. Berechne $k$ und $\\overline{EF}$.",
  fields:[{label:"$k =$", ans:2.5, wrong:[{v:0.4,msg:"Richtung: Bild (DEF) durch Urbild (ABC)."}]},{label:"$\\overline{EF} =$", ans:7.5, unit:"cm"}],
  hints:["$\\overline{DE}$ entspricht $\\overline{AB}$, $\\overline{EF}$ entspricht $\\overline{BC}$.","$k = 10 : 4$"], solution:"$k = \\dfrac{10\\,\\text{cm}}{4\\,\\text{cm}} = 2{,}5$; &nbsp; $\\overline{EF} = 2{,}5 \\cdot 3\\,\\text{cm} = 7{,}5\\,\\text{cm}$"},
 {id:"m2-4", level:"muss", type:"mc", q:"Es gilt $\\triangle ABC \\sim \\triangle FDE$. Welche Seite entspricht $\\overline{AC}$?",
  choices:["$\\overline{DE}$","$\\overline{FE}$","$\\overline{FD}$"], correct:1,
  why:"$A \\leftrightarrow F$ und $C \\leftrightarrow E$, also $\\overline{AC} \\leftrightarrow \\overline{FE}$.", hints:["Schreibe die Ecken untereinander: A B C / F D E."]},
 {id:"m2-5", level:"soll", q:"Im Dreieck $ABC$ liegt $D$ auf $\\overline{AB}$ und $E$ auf $\\overline{AC}$ mit $DE \\parallel BC$. Es ist $\\overline{AD} = 4\\,\\text{cm}$, $\\overline{AB} = 10\\,\\text{cm}$ und $\\overline{BC} = 7\\,\\text{cm}$. Berechne $\\overline{DE}$.",
  fields:[{label:"$\\overline{DE} =$", ans:2.8, unit:"cm", wrong:[{v:17.5,msg:"Das kleine Dreieck ADE hat die kürzere Seite – k = AD : AB < 1."}]}],
  hints:["$\\triangle ADE \\sim \\triangle ABC$ (gemeinsamer Winkel bei $A$, Stufenwinkel).","$k = \\overline{AD} : \\overline{AB} = 0{,}4$"], solution:"$k = \\dfrac{4}{10} = 0{,}4$; &nbsp; $\\overline{DE} = 0{,}4 \\cdot 7\\,\\text{cm} = 2{,}8\\,\\text{cm}$"},
 {id:"m2-6", level:"soll", type:"mc", q:"Zwei rechtwinklige Dreiecke: Das erste hat einen $35^\\circ$-Winkel, das zweite einen $55^\\circ$-Winkel. Entscheiden Sie, ob die Dreiecke ähnlich sind.",
  choices:["Ja: Im ersten Dreieck ist der dritte Winkel $180^\\circ-90^\\circ-35^\\circ = 55^\\circ$. Beide haben $90^\\circ$ und $55^\\circ$ (ww).","Nein: $35^\\circ \\neq 55^\\circ$."], correct:0,
  hints:["Vergiss den rechten Winkel nicht – der ist schon ein gemeinsamer Winkel!"]},
 {id:"m2-7", level:"kann", type:"mc", q:"Dreieck 1: $4\\,\\text{cm}$, $6\\,\\text{cm}$, $8\\,\\text{cm}$. Dreieck 2: $12\\,\\text{cm}$, $6\\,\\text{cm}$, $9\\,\\text{cm}$. Ähnlich?",
  choices:["Ja, sss mit $k = 1{,}5$","Nein, $6$ kommt in beiden vor, also $k = 1$ – aber die anderen Seiten sind verschieden"], correct:0,
  hints:["Sortieren: 6, 9, 12 gehört zu 4, 6, 8."], solution:"$6:4 = 9:6 = 12:8 = 1{,}5$ → ähnlich (sss)."},
 {id:"m2-8", level:"kann", type:"mc", q:"$\\triangle ABC$: $\\overline{AB} = 5\\,\\text{cm}$, $\\overline{AC} = 4\\,\\text{cm}$, $\\alpha = 50^\\circ$. <br>$\\triangle DEF$: $\\overline{DE} = 7{,}5\\,\\text{cm}$, $\\overline{DF} = 6\\,\\text{cm}$, $\\delta = 50^\\circ$. Ähnlich?",
  choices:["Ja, sws: $7{,}5:5 = 6:4 = 1{,}5$ und der eingeschlossene Winkel ist jeweils $50^\\circ$","Nein, man braucht alle drei Seiten"], correct:0},
 {id:"m2-9", level:"soll", q:"Ein Foto im Format $10\\,\\text{cm} \\times 15\\,\\text{cm}$ soll ähnlich vergrößert werden. Die kurze Seite soll $20\\,\\text{cm}$ lang werden. Wie lang wird die lange Seite?",
  fields:[{label:"lange Seite:", ans:30, unit:"cm", wrong:[{v:25,msg:"Nicht +10 cm! Bei Ähnlichkeit wird multipliziert (k = 2)."}]}],
  hints:["$k = 20 : 10$"], solution:"$k = 2$; &nbsp; $2 \\cdot 15\\,\\text{cm} = 30\\,\\text{cm}$"},
 {id:"m2-10", level:"soll", q:"$\\triangle ABC \\sim \\triangle A'B'C'$ mit $\\overline{AB} = 6\\,\\text{cm}$, $\\overline{A'B'} = 4\\,\\text{cm}$ und $\\overline{B'C'} = 5\\,\\text{cm}$. Berechne $\\overline{BC}$.",
  fields:[{label:"$\\overline{BC} =$", ans:7.5, unit:"cm", wrong:[{v:10/3,msg:"Richtung gemischt: BC ist das Urbild, also Urbild = Bild : k."}]}],
  hints:["$k = \\dfrac{\\overline{A'B'}}{\\overline{AB}} = \\dfrac{4}{6} = \\dfrac23$","$\\overline{BC} = \\overline{B'C'} : k$"], solution:"$k = \\frac{4}{6} = \\frac{2}{3}$; &nbsp; $\\overline{BC} = 5\\,\\text{cm} : \\frac23 = 7{,}5\\,\\text{cm}$"},
 {id:"m2-11", level:"kann", q:"Ein Dreieck hat die Seiten $5\\,\\text{cm}$, $7\\,\\text{cm}$ und $9\\,\\text{cm}$. Ein ähnliches Dreieck hat den Umfang $42\\,\\text{cm}$. Wie lang ist dessen längste Seite?",
  fields:[{label:"längste Seite:", ans:18, unit:"cm"}], hints:["Umfang des ersten Dreiecks: $21\\,\\text{cm}$. Der Umfang wächst auch mit $k$.","$k = 42 : 21$"], solution:"$u = 21\\,\\text{cm}$, $k = 42:21 = 2$, längste Seite $= 2 \\cdot 9\\,\\text{cm} = 18\\,\\text{cm}$"},
 {id:"m2-12", level:"kann", type:"mc", q:"$\\triangle ABC$: $\\overline{AB} = 6\\,\\text{cm}$, $\\overline{BC} = 4\\,\\text{cm}$, $\\gamma = 80^\\circ$ (gegenüber $\\overline{AB}$). <br>$\\triangle DEF$: $\\overline{DE} = 9\\,\\text{cm}$, $\\overline{EF} = 6\\,\\text{cm}$, $\\varphi = 80^\\circ$ (gegenüber $\\overline{DE}$). Ähnlich?",
  choices:["Ja, SsW: Verhältnisse $9:6 = 6:4 = 1{,}5$, und der Winkel liegt jeweils der längeren Seite gegenüber","Nein, der Winkel ist nicht eingeschlossen – man kann nichts sagen"], correct:0},
 {id:"m2-13", level:"kann", type:"open", q:"<b>Begründen Sie:</b> Jedes gleichseitige Dreieck ist zu jedem anderen gleichseitigen Dreieck ähnlich.",
  solution:"In jedem gleichseitigen Dreieck sind alle Winkel $60^\\circ$ (weil $180^\\circ : 3 = 60^\\circ$). Zwei gleichseitige Dreiecke stimmen also in (mindestens) zwei Winkeln überein → nach dem Hauptähnlichkeitssatz (ww) sind sie ähnlich. <br><i>Alternativ:</i> Alle Seitenverhältnisse sind gleich (sss)."},
 {id:"m2-14", level:"kann", type:"open", q:"<b>Beurteilen Sie</b> die Aussage: „Zwei gleichschenklige Dreiecke sind immer ähnlich.“",
  solution:"Die Aussage ist <b>falsch</b>. Gegenbeispiel: Ein gleichschenkliges Dreieck mit den Winkeln $70^\\circ, 70^\\circ, 40^\\circ$ und eines mit $50^\\circ, 50^\\circ, 80^\\circ$ stimmen in keinem Winkel überein → nicht ähnlich. (Richtig wäre: Gleichschenklige Dreiecke mit gleichem Winkel an der Spitze sind ähnlich.)"}
];

function initMove(){
  const b = new Geo.Board("#moveStage", {xmin:-0.5, xmax:16.5, ymin:-0.5, ymax:10.5, grid:1, scale:40, label:"Ähnlichkeitsabbildung"});
  const A0={x:1,y:1}, B0={x:5,y:1}, C0={x:2,y:4};
  const D={x:11,y:3}, th=70*Math.PI/180, k=1.5;
  let t=0, mirror=false;
  const rot=(p,a)=>({x:p.x*Math.cos(a)-p.y*Math.sin(a), y:p.x*Math.sin(a)+p.y*Math.cos(a)});
  function M(p, tt){
    let v = Geo.sub(p, A0);
    if(tt<=1) return Geo.add(p, Geo.mul(Geo.sub(D,A0), tt));
    const s2 = Math.min(1, tt-1), s3 = Math.max(0, Math.min(1, tt-2));
    if(mirror){ v = {x:v.x, y:v.y*(1-2*Math.min(1,s2*1.0))}; }
    v = rot(v, th*s2);
    v = Geo.mul(v, 1+(k-1)*s3);
    return Geo.add(D, v);
  }
  const target = p=>M(p,3);
  b.polygon([A0,B0,C0], {fill:"rgba(28,126,214,.14)", stroke:ORIG, width:3});
  b.polygon(()=>[target(A0),target(B0),target(C0)], {fill:"rgba(232,89,12,.10)", stroke:IMG, width:3, dash:"8 6"});
  b.polygon(()=>[M(A0,t),M(B0,t),M(C0,t)], {fill:"rgba(112,72,232,.18)", stroke:VIO, width:3, top:true});
  ["A","B","C"].forEach((n,i)=>{ const P0=[A0,B0,C0][i]; b.point(0,0,{name:n, color:ORIG, drag:false, pos:()=>P0}); b.point(0,0,{name:["D","E","F"][i], color:IMG, drag:false, pos:()=>target(P0), labelOff:{x:8,y:-12}}); });
  const txt = document.getElementById("moveText"), sl = document.getElementById("moveT");
  function upd(){ b.update();
    txt.innerHTML = t<0.02? "Start: <b class='c-orig'>△ABC</b> und das ähnliche <b class='c-img'>△DEF</b> (gestrichelt)." : t<=1? "① <b>Verschieben</b>: A wandert nach D. Form und Größe bleiben gleich." : t<=2? "② <b>Drehen</b>"+(mirror?" und <b>Spiegeln</b>":"")+" um D, bis die Seiten in die richtige Richtung zeigen." : "③ <b>Zentrische Streckung</b> mit Zentrum D und k = 1,5 – jetzt passt es genau!";
  }
  sl.addEventListener("input", ()=>{ t=parseFloat(sl.value); upd(); });
  let anim=null;
  document.getElementById("movePlay").onclick=()=>{ if(anim) return; if(t>=3) t=0; const t0=performance.now()-t*1500; anim=requestAnimationFrame(function f(now){ t=Math.min(3,(now-t0)/1500); sl.value=t; upd(); if(t<3) anim=requestAnimationFrame(f); else anim=null; }); };
  document.getElementById("moveReset").onclick=()=>{ if(anim){cancelAnimationFrame(anim); anim=null;} t=0; sl.value=0; upd(); };
  document.getElementById("mirror").onchange=e=>{ mirror=e.target.checked; upd(); };
  upd();
}

window.PAGE_INIT = function(){
  document.getElementById("figNested").innerHTML = nestedFig();
  document.getElementById("figTurned").innerHTML = turnedFig();
  document.getElementById("figSSS").innerHTML = figSatz("sss");
  document.getElementById("figSWS").innerHTML = figSatz("sws");
  document.getElementById("figSSW").innerHTML = figSatz("ssw");
  initMove();
  GEN.widget("#genWW", "ww");
  let seitenLv = "muss";
  const box = document.getElementById("genSeiten");
  GEN.widget(box, "seiten", {level:"muss"});
  document.querySelectorAll("#seitenLv [data-lv]").forEach(bt=>bt.onclick=()=>{ seitenLv=bt.dataset.lv; document.querySelectorAll("#seitenLv [data-lv]").forEach(x=>x.classList.add("ghost")); bt.classList.remove("ghost"); box.innerHTML=""; GEN.widget(box,"seiten",{level:seitenLv}); });
  GEN.widget("#genSaetze", "saetze");
  App.renderTasks("#corrTasks", [
    {id:"m2-c1", level:"muss", type:"mc", q:"Welche Seite im orangen Dreieck entspricht $\\overline{AB}$?", choices:["$\\overline{EF}$","$\\overline{FD}$","$\\overline{DE}$"], correct:0, why:"$A \\leftrightarrow E$, $B \\leftrightarrow F$."},
    {id:"m2-c2", level:"muss", type:"mc", q:"Und welche entspricht $\\overline{BC}$?", choices:["$\\overline{DE}$","$\\overline{FD}$","$\\overline{EF}$"], correct:1, why:"$B \\leftrightarrow F$, $C \\leftrightarrow D$."}
  ], "Frage ");
  App.renderTasks("#tasks", window.TASKS_M2);
};
})();
