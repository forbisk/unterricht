/* Modul 1 – Zentrische Streckung */
(function(){
const F = App.fmt;
const CM = 0.5; // 1 Kästchen = 0,5 cm
const ORIG="#1c7ed6", IMG="#e8590c", ZC="#c2255c";

window.TASKS_M1 = [
 {id:"m1-1", level:"muss", q:"Zentrische Streckung mit $k = 2$. Es ist $\\overline{ZP} = 3\\,\\text{cm}$. Berechne $\\overline{ZP'}$.",
  fields:[{label:"$\\overline{ZP'} =$", ans:6, unit:"cm", wrong:[{v:1.5,msg:"Bei k > 1 wird das Bild größer – multiplizieren, nicht teilen."},{v:5,msg:"k ist ein Faktor: mal 2, nicht plus 2."}]}],
  hints:["$\\overline{ZP'} = k \\cdot \\overline{ZP}$"], solution:"$\\overline{ZP'} = 2 \\cdot 3\\,\\text{cm} = 6\\,\\text{cm}$"},
 {id:"m1-2", level:"muss", q:"Zentrische Streckung mit $k = 0{,}4$. Es ist $\\overline{ZP} = 5\\,\\text{cm}$. Berechne $\\overline{ZP'}$.",
  fields:[{label:"$\\overline{ZP'} =$", ans:2, unit:"cm", wrong:[{v:12.5,msg:"Nicht teilen: Bild = k · Urbild."}]}],
  hints:["Auch bei $k<1$ gilt: $\\overline{ZP'} = k \\cdot \\overline{ZP}$.","$0{,}4 \\cdot 5 = ?$"], solution:"$\\overline{ZP'} = 0{,}4 \\cdot 5\\,\\text{cm} = 2\\,\\text{cm}$ (Verkleinerung)"},
 {id:"m1-3", level:"muss", q:"Es ist $\\overline{ZP} = 4\\,\\text{cm}$ und $\\overline{ZP'} = 10\\,\\text{cm}$. Berechne den Streckungsfaktor $k$.",
  fields:[{label:"$k =$", ans:2.5, wrong:[{v:0.4,msg:"Richtung gemischt! k = ZP' : ZP (Bild durch Urbild)."},{v:6,msg:"k ist ein Quotient, keine Differenz."}]}],
  hints:["$k = \\dfrac{\\overline{ZP'}}{\\overline{ZP}}$"], solution:"$k = \\dfrac{10\\,\\text{cm}}{4\\,\\text{cm}} = 2{,}5$"},
 {id:"m1-4", level:"muss", type:"mc", q:"Eine Figur wird mit $k = 0{,}75$ zentrisch gestreckt. Was gilt für das Bild?",
  choices:["Es ist größer als das Original.","Es ist kleiner als das Original.","Es ist genauso groß.","Es ist verzerrt (andere Form)."], correct:1,
  why:"$0 < k < 1$ bedeutet Verkleinerung – die Form bleibt gleich.", wrongWhy:{0:"Größer wird es nur bei k > 1.",2:"Gleich groß nur bei k = 1.",3:"Zentrische Streckung verzerrt nie – Bild und Original sind ähnlich."}},
 {id:"m1-5", level:"muss", type:"mc", q:"Wo liegt der Bildpunkt $P'$ bei $k = \\frac12$?",
  choices:["Auf dem Strahl $ZP$ hinter $P$ (weiter weg von $Z$)","Genau in der Mitte zwischen $Z$ und $P$","Auf der anderen Seite von $Z$","Auf $P$"], correct:1,
  why:"$\\overline{ZP'} = \\frac12 \\cdot \\overline{ZP}$ – also die halbe Strecke von $Z$ aus.", wrongWhy:{0:"Das wäre bei k > 1.",2:"Das passiert nur bei negativem k – das gibt es bei uns nicht (k > 0).",3:"Das wäre k = 1."}},
 {id:"m1-6", level:"muss", q:"Ein Dreieck wird mit $k = 1{,}5$ gestreckt. Die Seite $\\overline{AB}$ ist $3{,}2\\,\\text{cm}$ lang. Wie lang ist $\\overline{A'B'}$?",
  fields:[{label:"$\\overline{A'B'} =$", ans:4.8, unit:"cm"}],
  hints:["Eigenschaft M2: Längen werden mit $k$ multipliziert – auch Dreiecksseiten."], solution:"$\\overline{A'B'} = 1{,}5 \\cdot 3{,}2\\,\\text{cm} = 4{,}8\\,\\text{cm}$"},
 {id:"m1-7", level:"soll", q:"Nach einer Streckung mit $k = \\frac32$ ist die Bildseite $\\overline{A'B'} = 9\\,\\text{cm}$ lang. Wie lang war die Originalseite $\\overline{AB}$?",
  fields:[{label:"$\\overline{AB} =$", ans:6, unit:"cm", wrong:[{v:13.5,msg:"Das Urbild ist kleiner (k > 1). Urbild = Bild : k."}]}],
  hints:["$\\overline{A'B'} = k \\cdot \\overline{AB}$ – nach $\\overline{AB}$ umstellen.","$9 : \\frac32 = 9 \\cdot \\frac23$"], solution:"$\\overline{AB} = 9\\,\\text{cm} : \\frac32 = 9\\,\\text{cm} \\cdot \\frac23 = 6\\,\\text{cm}$"},
 {id:"m1-8", level:"soll", q:"Es ist $\\overline{ZA} = 2{,}5\\,\\text{cm}$ und $\\overline{ZA'} = 6\\,\\text{cm}$. Außerdem ist $\\overline{ZB} = 3\\,\\text{cm}$. Berechne $k$ und $\\overline{ZB'}$.",
  fields:[{label:"$k =$", ans:2.4},{label:"$\\overline{ZB'} =$", ans:7.2, unit:"cm"}],
  hints:["Zuerst $k$ aus $A$ und $A'$ bestimmen.","Dann $\\overline{ZB'} = k \\cdot \\overline{ZB}$."], solution:"$k = 6 : 2{,}5 = 2{,}4$; &nbsp; $\\overline{ZB'} = 2{,}4 \\cdot 3\\,\\text{cm} = 7{,}2\\,\\text{cm}$"},
 {id:"m1-9", level:"soll", q:"Im Dreieck $ABC$ ist $\\alpha = 47^\\circ$. Es wird mit $k = 2{,}5$ gestreckt. Wie groß ist $\\alpha'$?",
  fields:[{label:"$\\alpha' =$", ans:47, unit:"°", wrong:[{v:117.5,msg:"Winkel werden NICHT mit k multipliziert – die zentrische Streckung ist winkeltreu."}]}],
  hints:["Schau in M2: Was passiert mit Winkeln?"], solution:"Winkel bleiben gleich: $\\alpha' = \\alpha = 47^\\circ$."},
 {id:"m1-10", level:"soll", q:"Es ist $\\overline{ZP} = 4\\,\\text{cm}$ und $k = 2{,}5$. Wie lang ist die Strecke $\\overline{PP'}$?",
  fig: ()=>Geo.Fig({pts:{Z:[0,0],P:[4,1.2],P_:[10,3]}, segs:[{p:"ZP",color:"#1c7ed6",label:"4 cm",side:-1},{p:"PP_",color:"#e8590c",label:"?",side:-1}], colors:{Z:"#c2255c",P:"#1c7ed6",P_:"#e8590c"}, width:380, pad:30}),
  fields:[{label:"$\\overline{PP'} =$", ans:6, unit:"cm", wrong:[{v:10,msg:"10 cm ist ZP' – gesucht ist aber PP' (von P bis P')."}]}],
  hints:["Berechne zuerst $\\overline{ZP'}$.","$\\overline{PP'} = \\overline{ZP'} - \\overline{ZP}$"], solution:"$\\overline{ZP'} = 2{,}5 \\cdot 4\\,\\text{cm} = 10\\,\\text{cm}$; &nbsp; $\\overline{PP'} = 10\\,\\text{cm} - 4\\,\\text{cm} = 6\\,\\text{cm}$"},
 {id:"m1-11", level:"soll", type:"mc", q:"Bei einer zentrischen Streckung mit $k = 3$ wird die Strecke $\\overline{AB}$ auf $\\overline{A'B'}$ abgebildet. Welche Aussage ist <b>immer</b> wahr?",
  choices:["$A'B' \\parallel AB$ und $\\overline{A'B'} = 3 \\cdot \\overline{AB}$","$A'B'$ steht senkrecht auf $AB$","$\\overline{A'B'} = \\overline{AB} + 3$","$A'B'$ geht durch $Z$"], correct:0,
  why:"Bildstrecken sind parallel und $k$-mal so lang (M2)."},
 {id:"m1-12", level:"kann", q:"Bei einer zentrischen Streckung mit $k&gt;1$ gilt $\\overline{ZP'} = 7{,}5\\,\\text{cm}$ und $\\overline{PP'} = 4{,}5\\,\\text{cm}$. Berechne $\\overline{ZP}$ und $k$.",
  fields:[{label:"$\\overline{ZP} =$", ans:3, unit:"cm"},{label:"$k =$", ans:2.5}],
  hints:["Skizze: $Z$ — $P$ — $P'$. Die Strecke $\\overline{ZP'}$ setzt sich aus $\\overline{ZP}$ und $\\overline{PP'}$ zusammen.","$\\overline{ZP} = 7{,}5 - 4{,}5$"], solution:"$\\overline{ZP} = 7{,}5\\,\\text{cm} - 4{,}5\\,\\text{cm} = 3\\,\\text{cm}$; &nbsp; $k = 7{,}5 : 3 = 2{,}5$"},
 {id:"m1-13", level:"kann", q:"Ein Dreieck wurde mit $k = 4$ gestreckt. Mit welchem Faktor muss man das Bild (gleiches Zentrum) strecken, um wieder das Original zu erhalten?",
  fields:[{label:"Faktor:", ans:0.25, wrong:[{v:-4,msg:"Negative Faktoren gibt es bei uns nicht. Denk an M4 (Umkehrung)."}]}],
  hints:["M4: Umkehrung mit $\\frac{1}{k}$."], solution:"$\\frac{1}{4} = 0{,}25$"},
 {id:"m1-14", level:"kann", q:"Ein Dreieck hat den Umfang $u = 12\\,\\text{cm}$. Es wird mit $k = 1{,}5$ gestreckt. Berechne den Umfang $u'$ des Bilddreiecks.",
  fields:[{label:"$u' =$", ans:18, unit:"cm"}],
  hints:["Jede Seite wird mit $1{,}5$ multipliziert – also auch die Summe der Seiten."], solution:"$u' = k \\cdot u = 1{,}5 \\cdot 12\\,\\text{cm} = 18\\,\\text{cm}$"},
 {id:"m1-15", level:"kann", q:"<b>Logo-Aufgabe:</b> Ein Schullogo ist auf dem Briefpapier $4\\,\\text{cm}$ breit. Für ein Banner soll es $1{,}2\\,\\text{m}$ breit werden (ähnlich vergrößert). Mit welchem Faktor $k$ wird vergrößert? Wie hoch wird das Banner-Logo, wenn es auf dem Briefpapier $2{,}5\\,\\text{cm}$ hoch ist?",
  fields:[{label:"$k =$", ans:30, wrong:[{v:0.3,msg:"Einheiten! Rechne 1,2 m in cm um."}]},{label:"Höhe:", ans:75, unit:"cm"}],
  hints:["Gleiche Einheiten: $1{,}2\\,\\text{m} = 120\\,\\text{cm}$.","$k = 120 : 4$; Höhe $= k \\cdot 2{,}5\\,\\text{cm}$"], solution:"$k = 120\\,\\text{cm} : 4\\,\\text{cm} = 30$; &nbsp; Höhe $= 30 \\cdot 2{,}5\\,\\text{cm} = 75\\,\\text{cm}$"},
 {id:"m1-16", level:"muss", title:"Viereck", q:"Ein Rechteck mit den Seiten $4\\,\\text{cm}$ und $2{,}5\\,\\text{cm}$ wird zentrisch mit $k = 1{,}6$ gestreckt. Berechne die Seitenlängen des Bildrechtecks.",
  fields:[{label:"lange Seite:", ans:6.4, unit:"cm", wrong:[{v:5.6,msg:"k ist ein Faktor: 4 · 1,6 – nicht 4 + 1,6."}]},{label:"kurze Seite:", ans:4, unit:"cm"}],
  hints:["Jede Seite wird mit $k$ multipliziert.","$4 \\cdot 1{,}6$ und $2{,}5 \\cdot 1{,}6$"], solution:"$4\\,\\text{cm} \\cdot 1{,}6 = 6{,}4\\,\\text{cm}$ und $2{,}5\\,\\text{cm} \\cdot 1{,}6 = 4\\,\\text{cm}$. Das Bild ist wieder ein Rechteck (Winkel bleiben $90^\\circ$)."},
 {id:"m1-17", level:"soll", title:"Viereck", q:"Ein Viereck $ABCD$ hat die Seiten $\\overline{AB} = 5\\,\\text{cm}$, $\\overline{BC} = 3\\,\\text{cm}$, $\\overline{CD} = 4\\,\\text{cm}$ und $\\overline{DA} = 3{,}5\\,\\text{cm}$. Es wird mit $k = 0{,}6$ zentrisch gestreckt. Berechne den Umfang des Bildvierecks.",
  fields:[{label:"$u' =$", ans:9.3, unit:"cm", wrong:[{v:15.5,msg:"Das ist der Umfang des Originals – noch mit k multiplizieren."}]}],
  hints:["Umfang des Originals: $5 + 3 + 4 + 3{,}5$","Der Umfang ist eine Länge: $u' = k \\cdot u$"], solution:"$u = 15{,}5\\,\\text{cm}$, $u' = 0{,}6 \\cdot 15{,}5\\,\\text{cm} = 9{,}3\\,\\text{cm}$"},
 {id:"m1-18", level:"soll", title:"Viereck", q:"Ein Quadrat $ABCD$ mit $3\\,\\text{cm}$ Seitenlänge wird zentrisch gestreckt. Das Bildquadrat hat $7{,}5\\,\\text{cm}$ Seitenlänge. Es ist $\\overline{ZA} = 2\\,\\text{cm}$. Berechne $k$ und $\\overline{ZA'}$.",
  fields:[{label:"$k =$", ans:2.5},{label:"$\\overline{ZA'} =$", ans:5, unit:"cm"}],
  hints:["$k = \\dfrac{\\text{Bild}}{\\text{Urbild}} = \\dfrac{7{,}5}{3}$","$\\overline{ZA'} = k \\cdot \\overline{ZA}$"], solution:"$k = 7{,}5 : 3 = 2{,}5$; $\\overline{ZA'} = 2{,}5 \\cdot 2\\,\\text{cm} = 5\\,\\text{cm}$"},
 {id:"m1-19", level:"soll", title:"Viereck", q:"Das Trapez $ABCD$ ($AB \\parallel CD$) wird am Zentrum $Z$ gestreckt. Es ist $\\overline{ZA} = 4\\,\\text{cm}$, $\\overline{ZA'} = 6\\,\\text{cm}$ und $\\overline{CD} = 3\\,\\text{cm}$. Berechne $\\overline{C'D'}$.",
  fields:[{label:"$\\overline{C'D'} =$", ans:4.5, unit:"cm", wrong:[{v:5,msg:"Nicht +2 rechnen: erst k = 6 : 4 bestimmen."}]}],
  hints:["Erst $k$ bestimmen: $k = \\dfrac{\\overline{ZA'}}{\\overline{ZA}}$","$\\overline{C'D'} = k \\cdot \\overline{CD}$"], solution:"$k = 6 : 4 = 1{,}5$; $\\overline{C'D'} = 1{,}5 \\cdot 3\\,\\text{cm} = 4{,}5\\,\\text{cm}$. Auch das Bild ist ein Trapez, denn Parallelen bleiben parallel."},
 {id:"m1-20", level:"kann", title:"Viereck", type:"mc", q:"Ein Viereck wird zentrisch gestreckt ($k > 0$). Welche Aussage ist <b>falsch</b>?",
  choices:["Das Bild eines Parallelogramms ist wieder ein Parallelogramm.","Durch eine zentrische Streckung kann aus einem Rechteck (4 cm × 2 cm) ein Quadrat werden.","Die Innenwinkel des Bildvierecks sind genauso groß wie die des Originals.","Jede Bildseite ist parallel zur entsprechenden Originalseite."], correct:1,
  why:"Alle Seiten werden mit demselben $k$ gestreckt: Das Seitenverhältnis $2 : 1$ bleibt – aus einem Rechteck 4 × 2 wird nie ein Quadrat.", wrongWhy:{0:"Das stimmt: Parallelen bleiben parallel.",2:"Das stimmt: Die zentrische Streckung ist winkeltreu.",3:"Das stimmt: Bildstrecke ∥ Originalstrecke."}},
];

const LAB_TASKS = window.TASKS_M1LAB = [
 {id:"m1-d1", level:"muss", type:"mc", q:"<b>Zu D1:</b> Bei $k = 2$ liegt $A'$ …", choices:["zwischen $Z$ und $A$","auf dem Strahl hinter $A$, doppelt so weit von $Z$ entfernt wie $A$","auf $A$"], correct:1},
 {id:"m1-d2", level:"muss", type:"mc", q:"<b>Zu D2:</b> Was steht in der Spalte „Bild : Original“?", choices:["Immer derselbe Wert, nämlich $k$ – für Strahlen und für Seiten","Nur bei den Strahlen $k$, bei den Seiten etwas anderes","Jedes Mal ein anderer Wert"], correct:0},
 {id:"m1-d3", level:"muss", type:"mc", q:"<b>Zu D3:</b> Wenn man $k$ verändert, dann …", choices:["werden die Winkel mit $k$ multipliziert","bleiben die Winkel gleich","werden die Winkel kleiner"], correct:1},
 {id:"m1-d4", level:"soll", type:"mc", q:"<b>Zu D4:</b> Die Bildstrecke $\\overline{A'B'}$ ist zur Originalstrecke $\\overline{AB}$ …", choices:["immer parallel","nur parallel, wenn $Z$ außerhalb liegt","senkrecht"], correct:0}
];

function figM1(){
  return Geo.Fig({pts:{Z:[0,0],P:[3,1.4],P_:[6,2.8]}, rays:[{from:"Z",through:"P_",ext:1.12,dash:"6 5"}],
    segs:[{p:"ZP",color:ORIG,label:"ZP = 3 cm",side:1,off:20,width:4},{p:"PP_",color:IMG,label:"",width:4}],
    extra:[(X,Y)=>'<text x="'+(X(3)-30)+'" y="'+(Y(1.4)-40)+'" fill="'+IMG+'" font-size="15" font-weight="700" text-anchor="middle">ZP\' = 2 · 3 cm = 6 cm</text>'+
      '<path d="M'+X(0)+','+(Y(0)-14)+' L'+X(6)+','+(Y(2.8)-14)+'" stroke="'+IMG+'" stroke-width="2" fill="none" marker-end="url(#ah)" marker-start="url(#ah2)"/>'+
      '<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="'+IMG+'"/></marker><marker id="ah2" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M10,0 L0,5 L10,10 z" fill="'+IMG+'"/></marker></defs>'],
    colors:{Z:ZC,P:ORIG,P_:IMG}, width:400, pad:34, aria:"Z, P und P' auf einer Geraden"});
}

/* ---------------- Streckungslabor ---------------- */
function initLab(){
  const b = new Geo.Board("#labStage", {xmin:-0.5, xmax:16.5, ymin:-0.5, ymax:11.5, grid:1, major:2, scale:42, label:"Streckungslabor"});
  let k = 2;
  const snapOn = ()=> document.getElementById("optSnap").checked ? 1 : 0;
  const Z = b.point(1,1,{name:"Z", color:ZC, r:8});
  const A = b.point(3,2,{name:"A", color:ORIG, labelOff:{x:-18,y:14}}), B = b.point(7,2,{name:"B", color:ORIG, labelOff:{x:8,y:16}}), C = b.point(4,5,{name:"C", color:ORIG, labelOff:{x:-6,y:-14}});
  const quad = ()=> document.getElementById("optQuad").checked;
  const D = b.point(2,4,{name:"D", color:ORIG, labelOff:{x:-16,y:-10}, visible:quad});
  // Viereck: A, B, C, D in dieser Reihenfolge (C wird dann nach rechts oben gelegt)
  [Z,A,B,C,D].forEach(P=>{ Object.defineProperty(P.opt, "snap", {get:snapOn}); });
  const S = P=>()=>Geo.stretch(Z,P,k);
  const rays = ()=>document.getElementById("optRays").checked;
  const angs = ()=>document.getElementById("optAngles").checked;
  const lbls = ()=>document.getElementById("optLabels").checked;
  const poly = ()=> quad()? [A,B,C,D] : [A,B,C];
  [A,B,C,D].forEach(P=>{ b.ray(Z, ()=> k>=1? S(P)() : P, {color:"#adb5bd", width:1.8, dash:"7 6", visible:()=>rays() && (P!==D || quad())}); });
  b.polygon(()=>poly(), {fill:"rgba(28,126,214,.16)", stroke:ORIG, width:3});
  b.polygon(()=>poly().map(P=>S(P)()), {fill:"rgba(232,89,12,.14)", stroke:IMG, width:3});
  const prev = P=>()=>{ const q=poly(); return q[(q.indexOf(P)+q.length-1)%q.length]; };
  const next = P=>()=>{ const q=poly(); return q[(q.indexOf(P)+1)%q.length]; };
  b.angle(next(A), ()=>A, prev(A), {color:ORIG, fill:"rgba(28,126,214,.18)", r:0.8, visible:angs});
  b.angle(()=>S(next(A)())(), S(A), ()=>S(prev(A)())(), {color:IMG, fill:"rgba(232,89,12,.18)", r:0.8, visible:angs});
  b.angle(next(B), ()=>B, prev(B), {color:ORIG, fill:"rgba(28,126,214,.18)", r:0.7, visible:angs});
  b.angle(()=>S(next(B)())(), S(B), ()=>S(prev(B)())(), {color:IMG, fill:"rgba(232,89,12,.18)", r:0.7, visible:angs});
  const V=P=>typeof P==="function"?P():P;
  const cen = ()=>{ const q=poly(); return {x:q.reduce((a,p)=>a+p.x,0)/q.length, y:q.reduce((a,p)=>a+p.y,0)/q.length}; };
  const mid=(P,Q,img)=>()=>{ let p=V(P), q=V(Q), r=cen(); if(img){ p=Geo.stretch(Z,p,k); q=Geo.stretch(Z,q,k); r=Geo.stretch(Z,r,k); } const m={x:(p.x+q.x)/2, y:(p.y+q.y)/2}; const L=Geo.dist(p,q)||1; let n={x:-(q.y-p.y)/L, y:(q.x-p.x)/L}; if((r.x-m.x)*n.x+(r.y-m.y)*n.y>0) n={x:-n.x,y:-n.y}; return {x:m.x+n.x*0.42, y:m.y+n.y*0.42}; };
  const len=(P,Q,img)=>()=>{ const p=V(P), q=V(Q); return F(Geo.dist(p,q)*CM*(img?k:1),2)+" cm"; };
  const sides = [[A,B,()=>true],[B,C,()=>true],[C,A,()=>!quad()],[C,D,quad],[D,A,quad]];
  sides.forEach(([P,Q,on])=>{
    b.text(mid(P,Q,false), len(P,Q,false), {color:ORIG, size:12.5, visible:()=>lbls()&&on()});
    b.text(mid(P,Q,true), len(P,Q,true), {color:IMG, size:12.5, visible:()=>lbls()&&on()});
  });
  b.point(0,0,{name:"A'", color:IMG, drag:false, pos:S(A)});
  b.point(0,0,{name:"B'", color:IMG, drag:false, pos:S(B)});
  b.point(0,0,{name:"C'", color:IMG, drag:false, pos:S(C), labelOff:{x:-8,y:-14}});
  b.point(0,0,{name:"D'", color:IMG, drag:false, pos:S(D), labelOff:{x:-16,y:-10}, visible:quad});
  const tbl = document.getElementById("labTable"), info = document.getElementById("labInfo");
  function refresh(){
    document.getElementById("kOut").textContent = "k = "+F(k,2);
    const rows = quad()? [["ZA","ZA'",Z,A,Z,S(A)()],["ZD","ZD'",Z,D,Z,S(D)()],["AB","A'B'",A,B,S(A)(),S(B)()],["BC","B'C'",B,C,S(B)(),S(C)()],["CD","C'D'",C,D,S(C)(),S(D)()],["DA","D'A'",D,A,S(D)(),S(A)()]]
      : [["ZA","ZA'",Z,A,Z,S(A)()],["ZB","ZB'",Z,B,Z,S(B)()],["ZC","ZC'",Z,C,Z,S(C)()],["AB","A'B'",A,B,S(A)(),S(B)()],["BC","B'C'",B,C,S(B)(),S(C)()],["CA","C'A'",C,A,S(C)(),S(A)()]];
    let h = '<thead><tr><th>Strecke</th><th class="c-orig">Original</th><th class="c-img">Bild</th><th>Bild : Orig.</th></tr></thead><tbody>';
    rows.forEach(r=>{ const o=Geo.dist(r[2],r[3])*CM, i=Geo.dist(r[4],r[5])*CM; h += '<tr><td>'+r[0]+' → '+r[1]+'</td><td class="c-orig">'+F(o,2)+' cm</td><td class="c-img">'+F(i,2)+' cm</td><td><b>'+(o>1e-9?F(i/o,2):"–")+'</b></td></tr>'; });
    const al = Geo.angle(next(A)(),A,prev(A)()), be = Geo.angle(next(B)(),B,prev(B)());
    h += '<tr><td>α → α\'</td><td class="c-orig">'+F(al,1)+'°</td><td class="c-img">'+F(al,1)+'°</td><td>gleich</td></tr>';
    h += '<tr><td>β → β\'</td><td class="c-orig">'+F(be,1)+'°</td><td class="c-img">'+F(be,1)+'°</td><td>gleich</td></tr></tbody>';
    tbl.innerHTML = h;
    let pos = k>1.0001 ? "Vergrößerung: A' liegt <b>hinter</b> A (weiter weg von Z)." : (k<0.9999 ? "Verkleinerung: A' liegt <b>zwischen</b> Z und A." : "k = 1: Bild und Original liegen aufeinander.");
    info.innerHTML = pos + "<br><span class='c-par'>✓ "+(quad()? "A'B' ∥ AB, B'C' ∥ BC, C'D' ∥ CD, D'A' ∥ DA" : "A'B' ∥ AB, B'C' ∥ BC, C'A' ∥ CA")+"</span>"
      + (quad()? "<br><span class='muted'>Viereck: Auch hier werden alle Seiten mit k gestreckt, alle Winkel bleiben gleich.</span>" : "");
  }
  const sl = document.getElementById("kSlider");
  sl.addEventListener("input", ()=>{ k = parseFloat(sl.value); b.update(); });
  const pr = document.getElementById("kPresets");
  [["⅓",1/3],["½",0.5],["¾",0.75],["1",1],["3/2",1.5],["2",2],["3",3]].forEach(([t,v])=>{
    const bt = document.createElement("button"); bt.className="btn small ghost"; bt.textContent = "k = "+t;
    bt.onclick = ()=>{ k=v; sl.value=v; b.update(); }; pr.appendChild(bt);
  });
  ["optRays","optAngles","optLabels","optQuad"].forEach(id=>document.getElementById(id).addEventListener("change", ()=>b.update()));
  b.onUpdate(refresh);
  b.update();
}

/* ---------------- Konstruktion Schritt für Schritt ---------------- */
const CONS = {
  "2":  {k:2,   Z:[1,1], A:[3,2], B:[6,2], C:[4,5], txt:"2"},
  "0.5":{k:0.5, Z:[1,1], A:[7,3], B:[13,3], C:[9,9], txt:"½"},
  "1.5":{k:1.5, Z:[1,1], A:[3,3], B:[7,3], C:[5,7], txt:"3/2"}
};
function words(dx,dy){
  const p=[];
  if(dx) p.push(F(Math.abs(dx))+" nach "+(dx>0?"rechts":"links"));
  if(dy) p.push(F(Math.abs(dy))+" "+(dy>0?"hoch":"runter"));
  return p.join(", ")||"0";
}
function initCons(){
  const b = new Geo.Board("#consStage", {xmin:-0.5, xmax:14.5, ymin:-0.5, ymax:10.5, grid:1, major:2, scale:42, label:"Konstruktion"});
  let cfg = CONS["2"], step = 0, timer=null;
  const P = n=>({x:cfg[n][0], y:cfg[n][1]});
  const Sx = n=>Geo.stretch(P("Z"),P(n),cfg.k);
  const names = ["A","B","C"];
  // Schritte: 0 Start, 1 Strahl A, 2 zählen A, 3 A', 4 B komplett, 5 C komplett, 6 verbinden, 7 Kontrolle
  const vis = {
    ray: n=>()=> step >= ({A:1,B:4,C:5})[n],
    cnt: n=>()=> (n==="A" && (step===2||step===3)) || (n==="B" && step===4) || (n==="C" && step===5),
    img: n=>()=> step >= ({A:3,B:4,C:5})[n],
    imgCnt: n=>()=> (n==="A" && step===3) || (n==="B" && step===4) || (n==="C" && step===5)
  };
  names.forEach(n=>{
    b.ray(()=>P("Z"), ()=> cfg.k>1? Sx(n) : P(n), {color:"#adb5bd", width:2, dash:"7 6", visible:vis.ray(n)});
    // Zählhilfe Original (blau) und Bild (orange)
    b.segment(()=>P("Z"), ()=>({x:P(n).x, y:P("Z").y}), {color:ORIG, width:4, visible:vis.cnt(n), top:true});
    b.segment(()=>({x:P(n).x, y:P("Z").y}), ()=>P(n), {color:ORIG, width:4, visible:vis.cnt(n), top:true});
    b.segment(()=>P("Z"), ()=>({x:Sx(n).x, y:P("Z").y}), {color:IMG, width:2.5, dash:"4 4", visible:vis.imgCnt(n), top:true});
    b.segment(()=>({x:Sx(n).x, y:P("Z").y}), ()=>Sx(n), {color:IMG, width:2.5, dash:"4 4", visible:vis.imgCnt(n), top:true});
  });
  b.polygon(()=>names.map(P), {fill:"rgba(28,126,214,.16)", stroke:ORIG, width:3});
  b.polygon(()=>names.map(Sx), {fill:"rgba(232,89,12,.16)", stroke:IMG, width:3, visible:()=>step>=6});
  b.point(0,0,{name:"Z", color:ZC, drag:false, r:8, pos:()=>P("Z")});
  names.forEach(n=>{
    b.point(0,0,{name:n, color:ORIG, drag:false, pos:()=>P(n)});
    b.point(0,0,{name:n+"'", color:IMG, drag:false, pos:()=>Sx(n), visible:vis.img(n)});
  });
  const TOTAL = 8;
  const dots = document.getElementById("consDots"), txt = document.getElementById("consText");
  dots.innerHTML = Array.from({length:TOTAL},()=>'<span class="dot"></span>').join("");
  function text(){
    const Z=P("Z"), d = n=>[P(n).x-Z.x, P(n).y-Z.y], kt = cfg.txt;
    const cnt = n=>{ const [dx,dy]=d(n); return "Zähle von Z bis "+n+": <b>"+words(dx,dy)+"</b>. Mal k = "+kt+": <b style='color:"+IMG+"'>"+words(dx*cfg.k,dy*cfg.k)+"</b> → "+n+"'."; };
    return [
      "Gegeben: Zentrum <b class='c-z'>Z</b>, Dreieck <b class='c-orig'>ABC</b>, Streckungsfaktor <b>k = "+kt+"</b>. Gesucht: Bilddreieck <b class='c-img'>A'B'C'</b>.",
      "Schritt 1: Zeichne einen Strahl von Z durch A (über A hinaus, falls k > 1).",
      "Schritt 2: Zähle von Z bis A: <b>"+words(d("A")[0],d("A")[1])+"</b>.",
      "Schritt 3: Multipliziere beide Zahlen mit k = "+kt+": <b style='color:"+IMG+"'>"+words(d("A")[0]*cfg.k,d("A")[1]*cfg.k)+"</b> – von Z aus. Dort ist A'. Es liegt auf dem Strahl!",
      "Schritt 4: "+cnt("B"),
      "Schritt 5: "+cnt("C"),
      "Schritt 6: Verbinde A', B' und C' zum Bilddreieck.",
      "Schritt 7 – Kontrolle: A'B' ∥ AB, B'C' ∥ BC, C'A' ∥ CA? Jede Bildseite ist "+kt+"-mal so lang. ✓"
    ][step];
  }
  function upd(){ b.update(); txt.innerHTML = text(); Array.from(dots.children).forEach((d,i)=>d.classList.toggle("on", i<=step)); document.getElementById("consPrev").disabled = step===0; document.getElementById("consNext").disabled = step===TOTAL-1; }
  document.getElementById("consNext").onclick = ()=>{ if(step<TOTAL-1){ step++; upd(); } };
  document.getElementById("consPrev").onclick = ()=>{ if(step>0){ step--; upd(); } };
  const play = document.getElementById("consPlay");
  play.onclick = ()=>{
    if(timer){ clearInterval(timer); timer=null; play.textContent="▶ Abspielen"; return; }
    if(step>=TOTAL-1) step=0; upd(); play.textContent="⏸ Pause";
    timer = setInterval(()=>{ if(step<TOTAL-1){ step++; upd(); } else { clearInterval(timer); timer=null; play.textContent="▶ Abspielen"; } }, 2200);
  };
  const kb = document.getElementById("consK");
  Object.keys(CONS).forEach(key=>{
    const bt = document.createElement("button"); bt.className = "btn small "+(key==="2"?"":"ghost"); bt.textContent = "k = "+CONS[key].txt;
    bt.onclick = ()=>{ cfg = CONS[key]; step = 0; kb.querySelectorAll("button").forEach(x=>x.classList.add("ghost")); bt.classList.remove("ghost"); upd(); };
    kb.appendChild(bt);
  });
  upd();
}

/* ---------------- Selbst konstruieren (Generator) ---------------- */
function inTri(p,a,b,c){
  const s1=Geo.cross(Geo.sub(b,a),Geo.sub(p,a)), s2=Geo.cross(Geo.sub(c,b),Geo.sub(p,b)), s3=Geo.cross(Geo.sub(a,c),Geo.sub(p,c));
  return (s1>0&&s2>0&&s3>0)||(s1<0&&s2<0&&s3<0);
}
const M1GEN = window.M1GEN = {};
function inConvex(p, P){ let sg=0; for(let i=0;i<P.length;i++){ const c=Geo.cross(Geo.sub(P[(i+1)%P.length],P[i]),Geo.sub(p,P[i])); if(Math.abs(c)<1e-9) return false; const s=Math.sign(c); if(!sg) sg=s; else if(s!==sg) return false; } return true; }
function convexOK(P){ let sg=0; for(let i=0;i<P.length;i++){ const c=Geo.cross(Geo.sub(P[(i+1)%P.length],P[i]),Geo.sub(P[(i+2)%P.length],P[(i+1)%P.length])); const u=Geo.sub(P[(i+1)%P.length],P[i]), v=Geo.sub(P[(i+2)%P.length],P[(i+1)%P.length]); if(Math.abs(c)<2 || Math.abs(c)/(Math.hypot(u.x,u.y)*Math.hypot(v.x,v.y))<0.45) return false; const s=Math.sign(c); if(!sg) sg=s; else if(s!==sg) return false; } return true; }
M1GEN.buildTask = function(level, W, H, n){
  n = n||3;
  const k = level==="muss"?2:(level==="soll"?0.5:1.5);
  const step = k===2?1:2; // Offsets müssen durch 2 teilbar sein bei ½ und 3/2
  const R = level==='muss'?5:(level==='soll'?6:3);
  for(let tries=0; tries<40000; tries++){
    const Z = {x:App.rnd(0,W), y:App.rnd(0,H)};
    let offs = Array.from({length:n}, ()=>({x:App.rnd(-R,R)*step, y:App.rnd(-R,R)*step}));
    if(n===4){ const c={x:offs.reduce((a,o)=>a+o.x,0)/4, y:offs.reduce((a,o)=>a+o.y,0)/4}; offs.sort((a,b)=>Math.atan2(a.y-c.y,a.x-c.x)-Math.atan2(b.y-c.y,b.x-c.x)); if(!convexOK(offs)) continue; }
    const O = offs.map(o=>Geo.add(Z,o)), I = offs.map(o=>Geo.add(Z,Geo.mul(o,k)));
    const inb = p=> p.x>=0&&p.x<=W&&p.y>=0&&p.y<=H;
    if(!O.every(inb)||!I.every(inb)) continue;
    if(offs.some(o=>o.x===0&&o.y===0)) continue;
    let area = 0; for(let i=0;i<n;i++){ const a=O[i], b2=O[(i+1)%n]; area += (a.x*b2.y-b2.x*a.y)/2; } area = Math.abs(area);
    let minSide = Infinity; for(let i=0;i<n;i++) minSide = Math.min(minSide, Geo.dist(O[i],O[(i+1)%n]));
    const areaI = area*k*k;
    if(level==="soll"){ if(area<16||minSide<4) continue; } else if(areaI<16 || area<3 || minSide<2) continue;
    const inside = n===3? inTri(Z,O[0],O[1],O[2]) : inConvex(Z,O);
    if(level==="kann" ? !inside : inside) continue;
    // keine Überdeckung von Punkten
    const all = O.concat(I, [Z]); let dup=false;
    for(let i=0;i<all.length;i++) for(let j=i+1;j<all.length;j++) if(Geo.dist(all[i],all[j])<0.5) dup=true;
    if(dup && level!=="kann") continue;
    return {k, Z, O, I};
  }
  return null;
};
function initBuild(){
  const W=16, H=11;
  const b = new Geo.Board("#buildStage", {xmin:-0.5, xmax:W+0.5, ymin:-0.5, ymax:H+0.5, grid:1, major:2, scale:40, label:"Bilddreieck konstruieren"});
  let T = null, level = "muss", hintLevel = 0, showSol = false, nP = 3;
  const on = i=> i<nP;
  const Zp = b.point(0,0,{name:"Z", color:ZC, drag:false, r:8, pos:()=>T.Z});
  const Os = [0,1,2,3].map(i=>b.point(0,0,{name:"ABCD"[i], color:ORIG, drag:false, pos:()=>T.O[i]||T.O[0], visible:()=>on(i)}));
  const Is = [0,1,2,3].map(i=>b.point(W-0.0, H-i*1.5, {name:"ABCD"[i]+"'", color:IMG, snap:1, r:9, visible:()=>on(i)}));
  const hintRays = ()=>hintLevel>=1||showSol;
  [0,1,2,3].forEach(i=>b.ray(()=>T.Z, ()=>{ const q = T.k>1?T.I[i]:T.O[i]; return q||T.O[0]; }, {color:"#adb5bd", width:1.8, dash:"7 6", visible:()=>hintRays()&&on(i)}));
  b.polygon(()=>T.O, {fill:"rgba(28,126,214,.16)", stroke:ORIG, width:3});
  b.polygon(()=>Is.slice(0,nP), {fill:"rgba(232,89,12,.10)", stroke:IMG, width:2.5, dash:"8 5"});
  b.polygon(()=>T.I, {fill:"rgba(43,138,62,.12)", stroke:"#2b8a3e", width:2.5, dash:"3 5", visible:()=>showSol});
  [0,1,2,3].forEach(i=>b.point(0,0,{name:"", color:"#2b8a3e", drag:false, r:5, pos:()=>T.I[i]||T.I[0], visible:()=>showSol&&on(i), layer:"text"}));
  const fb = document.getElementById("buildFb"), task = document.getElementById("buildTask");
  function score(){ const s=App.store.get(); const n=(s.misc.build||0); document.getElementById("buildScore").textContent = "Richtig konstruiert: "+n+(n>=3?" ✓ (Ziel erreicht)":" (Ziel: 3)"); }
  function newTask(){
    T = M1GEN.buildTask(level, W, H, nP); hintLevel=0; showSol=false;
    const park = [{x:W,y:H},{x:W,y:H-1},{x:W,y:H-2},{x:W,y:H-3}];
    Is.forEach((p,i)=>{ let q=park[i]; if(T.I.some(t=>Geo.dist(t,q)<0.1)) q={x:q.x-1,y:q.y}; p.x=Math.round(q.x); p.y=Math.round(q.y); });
    const kt = T.k===2?"2":(T.k===0.5?"\\tfrac12":"\\tfrac32");
    task.innerHTML = nP===3? "Strecke das Dreieck $ABC$ am Zentrum $Z$ mit dem Faktor $k = "+kt+"$. Ziehe $A'$, $B'$, $C'$ an die richtigen Gitterpunkte."
      : "Strecke das <b>Viereck</b> $ABCD$ am Zentrum $Z$ mit dem Faktor $k = "+kt+"$. Ziehe $A'$, $B'$, $C'$, $D'$ an die richtigen Gitterpunkte.";
    App.math(task); fb.className="feedback"; b.update(); score();
  }
  document.getElementById("buildNew").onclick = newTask;
  document.getElementById("buildCheck").onclick = ()=>{
    const res = Is.slice(0,nP).map((p,i)=>Geo.dist(p,T.I[i])<0.01);
    if(res.every(x=>x)){ fb.className="feedback show ok"; fb.innerHTML="✓ Perfekt konstruiert! Alle Bildpunkte stimmen. Klicke „Neue Aufgabe“ für die nächste."; const s=App.store.get(); s.misc.build=(s.misc.build||0)+1; App.store.save(); score(); }
    else {
      const i = res.indexOf(false), n="ABCD"[i], d=Geo.sub(T.O[i],T.Z);
      fb.className="feedback show bad";
      fb.innerHTML = "✗ "+res.map((r,j)=>"ABCD"[j]+"' "+(r?"✓":"✗")).join(" · ")+"<br>Tipp zu "+n+"': Von Z nach "+n+" sind es "+words(d.x,d.y)+". Mal k …";
    }
  };
  document.getElementById("buildHint").onclick = ()=>{
    hintLevel++; b.update();
    const d=Geo.sub(T.O[0],T.Z);
    fb.className="feedback show info";
    fb.innerHTML = hintLevel===1? "Die Strahlen von Z aus sind jetzt eingezeichnet. Jeder Bildpunkt liegt auf seinem Strahl." : "Von Z nach A: "+words(d.x,d.y)+". Mal k ergibt: "+words(d.x*T.k,d.y*T.k)+" → A'.";
  };
  document.getElementById("buildSol").onclick = ()=>{ showSol=true; b.update(); fb.className="feedback show info"; fb.innerHTML="Die grünen Punkte zeigen die richtige Lösung. Versuche danach eine neue Aufgabe ohne Hilfe."; };
  document.querySelectorAll("[data-lv]").forEach(bt=>bt.addEventListener("click", ()=>{ level = bt.dataset.lv; document.querySelectorAll("[data-lv]").forEach(x=>x.classList.add("ghost")); bt.classList.remove("ghost"); newTask(); }));
  document.querySelectorAll("[data-shape]").forEach(bt=>bt.addEventListener("click", ()=>{ nP = +bt.dataset.shape; document.querySelectorAll("[data-shape]").forEach(x=>x.classList.toggle("ghost", x!==bt)); document.getElementById("buildTitle").textContent = nP===3? "Konstruiere das Bilddreieck" : "Konstruiere das Bildviereck"; newTask(); }));
  b.onUpdate(()=>{});
  newTask();
}

/* ---------------- Zentrum finden ---------------- */
function initDetective(){
  const W=16, H=11;
  const b = new Geo.Board("#detStage", {xmin:-0.5, xmax:W+0.5, ymin:-0.5, ymax:H+0.5, grid:1, major:2, scale:40, label:"Zentrum finden"});
  let T=null, help=false, reveal=false;
  function gen(){
    for(let t=0;t<5000;t++){
      const k = App.pick([2,0.5,1.5,3,2.5]);
      const st = (k===0.5||k===1.5||k===2.5)?2:1;
      const Z={x:App.rnd(0,W),y:App.rnd(0,H)};
      const offs=[0,1,2].map(()=>({x:App.rnd(-5,5)*st,y:App.rnd(-5,5)*st}));
      const O=offs.map(o=>Geo.add(Z,o)), I=offs.map(o=>Geo.add(Z,Geo.mul(o,k)));
      const inb=p=>p.x>=0&&p.x<=W&&p.y>=0&&p.y<=H;
      if(!O.every(inb)||!I.every(inb)||offs.some(o=>o.x===0&&o.y===0)) continue;
      const small = k<1? I:O;
      const area=Math.abs(Geo.cross(Geo.sub(small[1],small[0]),Geo.sub(small[2],small[0])))/2;
      if(area<3) continue;
      if(inTri(Z,O[0],O[1],O[2])) continue;
      return {k,Z,O,I};
    }
  }
  const Zq = b.point(W/2, 0.0, {name:"Z?", color:ZC, snap:1, r:9});
  [0,1,2].forEach(i=>b.line(()=>T.O[i], ()=>T.I[i], {color:"#fab005", width:1.8, dash:"6 5", visible:()=>help}));
  b.polygon(()=>T.O, {fill:"rgba(28,126,214,.16)", stroke:ORIG, width:3});
  b.polygon(()=>T.I, {fill:"rgba(232,89,12,.16)", stroke:IMG, width:3});
  [0,1,2].forEach(i=>{ b.point(0,0,{name:"ABC"[i], color:ORIG, drag:false, pos:()=>T.O[i]}); b.point(0,0,{name:"ABC"[i]+"'", color:IMG, drag:false, pos:()=>T.I[i]}); });
  b.point(0,0,{name:"Z", color:"#2b8a3e", drag:false, r:6, pos:()=>T.Z, visible:()=>reveal, layer:"text"});
  const fb=document.getElementById("detFb"), kin=document.getElementById("detK");
  function nw(){ T=gen(); help=false; reveal=false; Zq.x=Math.round(W/2); Zq.y=0; if(Geo.dist(Zq,T.Z)<0.1) Zq.x+=3; kin.value=""; kin.className="ans"; fb.className="feedback"; b.update(); }
  document.getElementById("detNew").onclick=nw;
  document.getElementById("detHelp").onclick=()=>{ help=true; b.update(); };
  document.getElementById("detCheck").onclick=()=>{
    const zok = Geo.dist(Zq,T.Z)<0.01, kv=App.parseNum(kin.value), kok=App.near(kv,T.k,0.01);
    kin.className = "ans "+(kin.value? (kok?"right":"wrong"):"");
    if(zok&&kok){ fb.className="feedback show ok"; fb.innerHTML="✓ Super, Detektiv! Z und k = "+F(T.k)+" stimmen."; const s=App.store.get(); if(!s.task["m1-det"]){ s.task["m1-det"]=1; App.store.save(); } }
    else { fb.className="feedback show bad"; fb.innerHTML = (zok?"Z ✓":"Z ✗ – verbinde A mit A' und B mit B'. Wo schneiden sich die Linien?")+" · "+(kok?"k ✓":"k ✗ – zähle Kästchen von Z bis A und von Z bis A'. k = ZA' : ZA."+(App.near(kv,1/T.k,0.01)?" (Richtung gemischt?)":"")); if(!zok&&help){ reveal=true; b.update(); fb.innerHTML += "<br>Das grüne Pünktchen zeigt jetzt Z."; } }
  };
  nw();
}

window.PAGE_INIT = function(){
  document.getElementById("figM1").innerHTML = figM1();
  (function(){ // Beispiel 5: Viereck mit k = 2 (Koordinaten passend zu den Seitenlängen berechnet)
    const Z=[-1.2,0.5], P={A:[0,0],B:[2,0],C:[1.7395,1.4772],D:[0.7521,1.6353]}, pts={Z:Z};
    for(const n in P){ pts[n]=P[n]; pts[n+"_"]=[Z[0]+2*(P[n][0]-Z[0]), Z[1]+2*(P[n][1]-Z[1])]; }
    document.getElementById("figQuad").innerHTML = Geo.Fig({pts:pts,
      rays:["A","B","C","D"].map(n=>({from:"Z",through:n+"_",ext:1.08,dash:"6 5"})),
      polys:[{p:"ABCD",fill:"rgba(28,126,214,.16)",stroke:ORIG},{p:"A_B_C_D_",fill:"rgba(232,89,12,.10)",stroke:IMG}],
      colors:{Z:ZC,A:ORIG,B:ORIG,C:ORIG,D:ORIG,A_:IMG,B_:IMG,C_:IMG,D_:IMG}, width:400, pad:30, note:"k = 2", aria:"Viereck ABCD und Bildviereck"});
  })();
  initLab(); initCons(); initBuild(); initDetective();
  App.renderTasks("#labTasks", LAB_TASKS, "Check ");
  App.renderTasks("#tasks", window.TASKS_M1);
};
})();
