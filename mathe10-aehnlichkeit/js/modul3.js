/* Modul 3 – Strahlensätze */
(function(){
const F = App.fmt, ORIG="#1c7ed6", IMG="#e8590c", CM=0.5;
const fS = GEN.figStrahlen;

window.TASKS_M3 = [
 {id:"m3-1", level:"muss", q:"Es gilt $AB \\parallel A'B'$. Gegeben: $\\overline{SA} = 3\\,\\text{cm}$, $\\overline{AA'} = 2\\,\\text{cm}$, $\\overline{SB} = 4{,}5\\,\\text{cm}$. Berechne $x = \\overline{BB'}$.",
  fig:()=>fS({SA:"3 cm",AA_:"2 cm",SB:"4,5 cm",BB_:"x"},5/3,false),
  fields:[{label:"$x =$", ans:3, unit:"cm"}], hints:["Nur Stücke auf den Strahlen → 1. Strahlensatz.","$\\dfrac{x}{4{,}5} = \\dfrac{2}{3}$"],
  solution:"$\\dfrac{\\overline{BB'}}{\\overline{SB}} = \\dfrac{\\overline{AA'}}{\\overline{SA}}$ ⟹ $x = \\dfrac{2 \\cdot 4{,}5}{3}\\,\\text{cm} = 3\\,\\text{cm}$"},
 {id:"m3-2", level:"muss", q:"Es gilt $AB \\parallel A'B'$. Gegeben: $\\overline{SA} = 4\\,\\text{cm}$, $\\overline{SA'} = 10\\,\\text{cm}$, $\\overline{SB'} = 12{,}5\\,\\text{cm}$. Berechne $x = \\overline{SB}$.",
  fig:()=>fS({SA:"4 cm",SA_:"SA' = 10 cm",SB:"x",SB_:"SB' = 12,5 cm"},2.5,false),
  fields:[{label:"$x =$", ans:5, unit:"cm", wrong:[{v:31.25,msg:"Verhältnis verkehrt: SB ist kürzer als SB'."}]}], hints:["$\\dfrac{\\overline{SB}}{\\overline{SB'}} = \\dfrac{\\overline{SA}}{\\overline{SA'}}$"],
  solution:"$x = \\dfrac{4}{10} \\cdot 12{,}5\\,\\text{cm} = 5\\,\\text{cm}$"},
 {id:"m3-3", level:"muss", q:"Es gilt $AB \\parallel A'B'$. Gegeben: $\\overline{SA} = 5\\,\\text{cm}$, $\\overline{SA'} = 8\\,\\text{cm}$, $\\overline{AB} = 3\\,\\text{cm}$. Berechne $x = \\overline{A'B'}$.",
  fig:()=>fS({SA:"5 cm",SA_:"SA' = 8 cm",AB:"3 cm",A_B_:"x"},1.6,false),
  fields:[{label:"$x =$", ans:4.8, unit:"cm"}], hints:["Parallelenstück gesucht → 2. Strahlensatz.","$\\dfrac{x}{3} = \\dfrac{8}{5}$"],
  solution:"$\\dfrac{\\overline{A'B'}}{\\overline{AB}} = \\dfrac{\\overline{SA'}}{\\overline{SA}}$ ⟹ $x = \\dfrac{8 \\cdot 3}{5}\\,\\text{cm} = 4{,}8\\,\\text{cm}$"},
 {id:"m3-4", level:"muss", type:"mc", q:"Welche Gleichung ist in der V-Figur (mit $AB \\parallel A'B'$) <b>richtig</b>?",
  choices:["$\\dfrac{\\overline{A'B'}}{\\overline{AB}} = \\dfrac{\\overline{AA'}}{\\overline{SA}}$","$\\dfrac{\\overline{A'B'}}{\\overline{AB}} = \\dfrac{\\overline{SA'}}{\\overline{SA}}$","$\\dfrac{\\overline{AB}}{\\overline{A'B'}} = \\dfrac{\\overline{SA'}}{\\overline{SA}}$"], correct:1,
  wrongWhy:{0:"Das ist die klassische Falle: Beim 2. Strahlensatz nur Strecken ab S!",2:"Nicht gleich aufgebaut: links klein/groß, rechts groß/klein."}},
 {id:"m3-5", level:"soll", q:"Es gilt $AB \\parallel A'B'$. Gegeben: $\\overline{SA} = 4\\,\\text{cm}$, $\\overline{AA'} = 2\\,\\text{cm}$, $\\overline{AB} = 3\\,\\text{cm}$. Berechne $x = \\overline{A'B'}$.",
  fig:()=>fS({SA:"4 cm",AA_:"2 cm",AB:"3 cm",A_B_:"x"},1.5,false),
  fields:[{label:"$x =$", ans:4.5, unit:"cm", wrong:[{v:1.5,msg:"Falle! AA' darf im 2. Strahlensatz nicht verwendet werden. Rechne zuerst SA' aus."}]}],
  hints:["Zuerst $\\overline{SA'} = \\overline{SA} + \\overline{AA'}$ berechnen.","$\\dfrac{x}{3} = \\dfrac{6}{4}$"], solution:"$\\overline{SA'} = 6\\,\\text{cm}$; &nbsp; $x = \\dfrac{6 \\cdot 3}{4}\\,\\text{cm} = 4{,}5\\,\\text{cm}$"},
 {id:"m3-6", level:"soll", q:"X-Figur: $AB \\parallel A'B'$, $\\overline{SA} = 3\\,\\text{cm}$, $\\overline{SA'} = 4{,}5\\,\\text{cm}$, $\\overline{AB} = 4\\,\\text{cm}$. Berechne $x = \\overline{A'B'}$.",
  fig:()=>fS({SA:"3 cm",SA_:"4,5 cm",AB:"4 cm",A_B_:"x"},1.5,true),
  fields:[{label:"$x =$", ans:6, unit:"cm"}], hints:["In der X-Figur gilt der 2. Strahlensatz genauso."], solution:"$x = \\dfrac{4{,}5}{3} \\cdot 4\\,\\text{cm} = 6\\,\\text{cm}$"},
 {id:"m3-7", level:"soll", q:"X-Figur: $AB \\parallel A'B'$, $\\overline{SB} = 2{,}4\\,\\text{cm}$, $\\overline{SB'} = 3{,}6\\,\\text{cm}$, $\\overline{SA'} = 5{,}4\\,\\text{cm}$. Berechne $x = \\overline{SA}$.",
  fig:()=>fS({SA:"x",SA_:"5,4 cm",SB:"2,4 cm",SB_:"3,6 cm"},1.5,true),
  fields:[{label:"$x =$", ans:3.6, unit:"cm"}], hints:["$\\dfrac{\\overline{SA}}{\\overline{SA'}} = \\dfrac{\\overline{SB}}{\\overline{SB'}}$"], solution:"$x = \\dfrac{2{,}4}{3{,}6} \\cdot 5{,}4\\,\\text{cm} = 3{,}6\\,\\text{cm}$"},
 {id:"m3-8", level:"soll", q:"Es gilt $AB \\parallel A'B'$ (V-Figur). Gegeben: $\\overline{AB} = 3\\,\\text{cm}$, $\\overline{A'B'} = 7{,}5\\,\\text{cm}$, $\\overline{SA} = 2\\,\\text{cm}$. Berechne $\\overline{AA'}$.",
  fig:()=>fS({SA:"2 cm",AA_:"?",AB:"3 cm",A_B_:"7,5 cm"},2.5,false),
  fields:[{label:"$\\overline{AA'} =$", ans:3, unit:"cm", wrong:[{v:5,msg:"5 cm ist SA'. Gesucht ist AA' = SA' − SA."}]}],
  hints:["2. Strahlensatz: $\\dfrac{\\overline{SA'}}{\\overline{SA}} = \\dfrac{7{,}5}{3}$","Erst $\\overline{SA'}$, dann $\\overline{AA'} = \\overline{SA'} - \\overline{SA}$."], solution:"$\\overline{SA'} = \\dfrac{7{,}5}{3} \\cdot 2\\,\\text{cm} = 5\\,\\text{cm}$; &nbsp; $\\overline{AA'} = 5 - 2 = 3\\,\\text{cm}$"},
 {id:"m3-9", level:"soll", q:"Es gilt $AB \\parallel A'B'$. Gegeben: $\\overline{SA} = 2{,}5\\,\\text{cm}$, $\\overline{SB} = 3\\,\\text{cm}$, $\\overline{BB'} = 4{,}2\\,\\text{cm}$. Berechne $x = \\overline{AA'}$.",
  fig:()=>fS({SA:"2,5 cm",AA_:"x",SB:"3 cm",BB_:"4,2 cm"},2.4,false),
  fields:[{label:"$x =$", ans:3.5, unit:"cm"}], hints:["$\\dfrac{\\overline{AA'}}{\\overline{SA}} = \\dfrac{\\overline{BB'}}{\\overline{SB}}$"], solution:"$x = \\dfrac{4{,}2}{3} \\cdot 2{,}5\\,\\text{cm} = 3{,}5\\,\\text{cm}$"},
 {id:"m3-10", level:"kann", type:"mc", q:"In einer V-Figur ist $\\overline{SA} = 3\\,\\text{cm}$, $\\overline{AA'} = 1{,}5\\,\\text{cm}$, $\\overline{SB} = 4\\,\\text{cm}$ und $\\overline{BB'} = 2\\,\\text{cm}$. Sind $AB$ und $A'B'$ parallel?",
  choices:["Ja, denn $\\frac{1{,}5}{3} = \\frac{2}{4} = 0{,}5$ (Umkehrung des 1. Strahlensatzes)","Nein, denn $1{,}5 \\neq 2$","Das kann man nicht entscheiden"], correct:0},
 {id:"m3-11", level:"kann", q:"Es gilt $AB \\parallel A'B'$ (V-Figur). Gegeben: $\\overline{SA} = 4\\,\\text{cm}$, $\\overline{SA'} = 6\\,\\text{cm}$, $\\overline{AB} = 5\\,\\text{cm}$, $\\overline{SB'} = 7{,}5\\,\\text{cm}$. Berechne $\\overline{A'B'}$ und $\\overline{SB}$.",
  fig:()=>fS({SA:"4 cm",SA_:"SA' = 6 cm",AB:"5 cm",A_B_:"?",SB:"?",SB_:"SB' = 7,5 cm"},1.5,false),
  fields:[{label:"$\\overline{A'B'} =$", ans:7.5, unit:"cm"},{label:"$\\overline{SB} =$", ans:5, unit:"cm"}], hints:["$k = 6 : 4 = 1{,}5$"], solution:"$k = 1{,}5$; &nbsp; $\\overline{A'B'} = 1{,}5 \\cdot 5 = 7{,}5\\,\\text{cm}$; &nbsp; $\\overline{SB} = 7{,}5 : 1{,}5 = 5\\,\\text{cm}$"},
 {id:"m3-12", level:"kann", type:"open", q:"<b>Erklären Sie</b> an einem Zahlenbeispiel, warum der Ansatz $\\dfrac{\\overline{A'B'}}{\\overline{AB}} = \\dfrac{\\overline{AA'}}{\\overline{SA}}$ falsch ist.",
  solution:"Beispiel: $\\overline{SA} = 4$, $\\overline{AA'} = 2$, $\\overline{AB} = 3$. Richtig: $\\overline{SA'} = 6$, also $\\overline{A'B'} = \\frac64 \\cdot 3 = 4{,}5$. Der falsche Ansatz liefert $\\frac24 \\cdot 3 = 1{,}5$ – kürzer als $\\overline{AB}$, obwohl $A'B'$ weiter vom Scheitel entfernt ist. Ähnlich sind nur die Dreiecke $SAB$ und $SA'B'$; $\\overline{AA'}$ ist keine Seite eines dieser Dreiecke."}
];

function initLab(){
  const b = new Geo.Board("#stsStage", {xmin:-0.5, xmax:16.5, ymin:-0.5, ymax:11.5, grid:1, major:2, scale:40, label:"Strahlensatz-Labor"});
  let mode = "V", s = 2.2, tb = 4.2;
  const S = b.point(5,3,{name:"S", color:"#212529", r:8});
  const A = b.point(8.5,3,{name:"A", color:ORIG, labelOff:{x:4,y:22}});
  const R = b.point(10,8,{name:"R", color:"#868e96", r:6});
  const u2 = ()=>{ const d=Geo.sub(R,S), L=Math.hypot(d.x,d.y)||1; return {x:d.x/L,y:d.y/L}; };
  const B = b.point(0,0,{name:"B", color:ORIG, pos:()=>Geo.add(S,Geo.mul(u2(),tb)), labelOff:{x:-18,y:-10},
    constrain:q=>{ const t=(q.x-S.x)*u2().x+(q.y-S.y)*u2().y; tb=Math.max(0.8,t); return Geo.add(S,Geo.mul(u2(),tb)); }});
  const Ab = b.point(0,0,{name:"A'", color:IMG, pos:()=>Geo.stretch(S,A,s), labelOff:{x:4,y:22},
    constrain:q=>{ const d=Geo.sub(A,S), L2=d.x*d.x+d.y*d.y; let t=((q.x-S.x)*d.x+(q.y-S.y)*d.y)/L2; t = mode==="V"? Math.max(0.15,t) : Math.min(-0.15,t); s=t; return Geo.stretch(S,A,s); }});
  const Bb = ()=>Geo.stretch(S,B,s);
  // Linien
  b.line(S, A, {color:"#adb5bd", width:2});
  b.line(S, ()=>R, {color:"#adb5bd", width:2});
  b.polygon(()=>[S,Ab,Bb()], {fill:"rgba(232,89,12,.12)"});
  b.polygon(()=>[S,A,B], {fill:"rgba(28,126,214,.16)"});
  b.line(A, ()=>B, {color:"rgba(28,126,214,.35)", width:1.5, dash:"4 6"});
  b.line(Ab, Bb, {color:"rgba(232,89,12,.35)", width:1.5, dash:"4 6"});
  b.segment(A, ()=>B, {color:ORIG, width:5, top:true});
  b.segment(Ab, Bb, {color:IMG, width:5, top:true});
  b.point(0,0,{name:"B'", color:IMG, drag:false, pos:Bb, labelOff:{x:-20,y:-10}});
  // Punkte nach vorne holen
  [S,A,R,B,Ab].forEach(p=>b.gPts.appendChild(p.g));
  const tbl = document.getElementById("stsTable"), note = document.getElementById("stsNote");
  function refresh(){
    const d = (p,q)=>Geo.dist(p,q)*CM;
    const SA=d(S,A), SAb=d(S,Ab), SB=d(S,B), SBb=d(S,Bb()), AB=d(A,B), AbBb=d(Ab,Bb()), AAb=d(A,Ab), BBb=d(B,Bb());
    const k = SAb/SA;
    const row = (lbl, v, ok)=>'<tr><td>'+lbl+'</td><td><b>'+F(v,2)+'</b></td><td>'+(ok===true?'<span class="c-par">= k ✓</span>':(ok===false?'<span style="color:#c92a2a">≠ k ✗</span>':''))+'</td></tr>';
    let h = '<thead><tr><th>Strecke</th><th colspan="2">Länge</th></tr></thead><tbody>'+
      '<tr><td>SA / SA\'</td><td class="c-orig">'+F(SA)+' cm</td><td class="c-img">'+F(SAb)+' cm</td></tr>'+
      '<tr><td>SB / SB\'</td><td class="c-orig">'+F(SB)+' cm</td><td class="c-img">'+F(SBb)+' cm</td></tr>'+
      '<tr><td>AB / A\'B\'</td><td class="c-orig">'+F(AB)+' cm</td><td class="c-img">'+F(AbBb)+' cm</td></tr>'+
      '<tr><td>AA\' / BB\'</td><td>'+F(AAb)+' cm</td><td>'+F(BBb)+' cm</td></tr></tbody>';
    h += '<thead><tr><th>Verhältnis</th><th colspan="2">Wert</th></tr></thead><tbody>'+
      row("SA' : SA", k, true)+row("SB' : SB", SBb/SB, true)+row("A'B' : AB", AbBb/AB, true)+
      '<tr><td>AA\' : SA</td><td><b>'+F(AAb/SA,2)+'</b></td><td class="small">= BB\' : SB = '+F(BBb/SB,2)+' ✓</td></tr>'+
      '<tr><td>A\'B\' : AB <i>vs.</i> AA\' : SA</td><td colspan="2">'+F(AbBb/AB,2)+' vs. '+F(AAb/SA,2)+(Math.abs(AbBb/AB-AAb/SA)<0.005?' (zufällig gleich)':' <span style="color:#c92a2a">✗ verschieden!</span>')+'</td></tr></tbody>';
    tbl.innerHTML = h;
    note.innerHTML = mode==="V"? "V-Figur: k = SA' : SA = "+F(k)+". Alle Strecken ab S und die Parallelenstücke haben dasselbe Verhältnis k." : "X-Figur: S liegt zwischen den Parallelen. Wieder gilt: SA' : SA = SB' : SB = A'B' : AB = "+F(k)+".";
  }
  b.onUpdate(refresh);
  document.getElementById("modeV").onclick = ()=>{ mode="V"; s=Math.abs(s)<0.2?2:Math.abs(s); if(s<1.05) s=2; setBtn(); b.update(); };
  document.getElementById("modeX").onclick = ()=>{ mode="X"; s=-0.9; setBtn(); b.update(); };
  function setBtn(){ document.getElementById("modeV").classList.toggle("ghost", mode!=="V"); document.getElementById("modeX").classList.toggle("ghost", mode!=="X"); }
  b.update();
}

window.PAGE_INIT = function(){
  document.getElementById("figIntro").innerHTML = fS({SA:"SA",AA_:"AA'",SB:"SB",BB_:"BB'",AB:"AB",A_B_:"A'B'"},2,false,{width:420}).replace("Skizze nicht maßstäblich","");
  document.getElementById("fig1STS").innerHTML = fS({SA:"SA",SA_:"SA'",SB:"SB",SB_:"SB'"},2,false).replace("Skizze nicht maßstäblich","");
  document.getElementById("fig2STS").innerHTML = fS({SA:"SA",SA_:"SA'",AB:"AB",A_B_:"A'B'"},2,false).replace("Skizze nicht maßstäblich","");
  document.getElementById("figB1").innerHTML = fS({SA:"3 cm",SA_:"SA' = 7,5 cm",SB:"4 cm",SB_:"SB' = x"},2.5,false,{width:360});
  document.getElementById("figB2").innerHTML = fS({SA:"4 cm",AA_:"2 cm",SB:"5 cm",BB_:"x"},1.5,false,{width:360});
  document.getElementById("figB3").innerHTML = fS({SA:"5 cm",AA_:"3 cm",AB:"3 cm",A_B_:"x"},1.6,false,{width:360});
  document.getElementById("figX").innerHTML = fS({SA:"SA",SA_:"SA'",SB:"SB",SB_:"SB'",AB:"AB",A_B_:"A'B'"},1.4,true,{width:420}).replace("Skizze nicht maßstäblich","");
  initLab();
  GEN.widget("#genS1","sts1"); GEN.widget("#genS2","sts2"); GEN.widget("#genSX","stsx");
  App.renderTasks("#tasks", window.TASKS_M3);
};
})();
