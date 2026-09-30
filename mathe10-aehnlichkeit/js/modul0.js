window.TASKS_M0 = [
 {id:"m0-1", level:"muss", q:"Ein Grundriss ist im Maßstab $1 : 50$ gezeichnet. Eine Wand ist in der Zeichnung $8\\,\\text{cm}$ lang. Wie lang ist sie in Wirklichkeit (in Meter)?",
  fields:[{label:"Wandlänge:", ans:4, unit:"m", wrong:[{v:400,msg:"400 cm ist richtig gerechnet – aber gefragt ist in Meter!"},{v:0.16,msg:"Andersherum: Bei 1 : 50 ist die Wirklichkeit 50-mal so groß."}]}],
  hints:["1 cm in der Zeichnung entspricht 50 cm in Wirklichkeit.","$8 \\cdot 50\\,\\text{cm} = \\ldots\\,\\text{cm}$, dann in m umrechnen (: 100)."],
  solution:"$8\\,\\text{cm} \\cdot 50 = 400\\,\\text{cm} = 4\\,\\text{m}$"},
 {id:"m0-2", level:"muss", q:"Auf einer Wanderkarte im Maßstab $1 : 25\\,000$ ist ein Weg $6\\,\\text{cm}$ lang. Wie lang ist der Weg in Wirklichkeit (in km)?",
  fields:[{label:"Weglänge:", ans:1.5, unit:"km", wrong:[{v:150000,msg:"150 000 cm – richtig, aber in km umrechnen!"},{v:1500,msg:"1500 m – richtig, aber gefragt ist km."}]}],
  hints:["$6 \\cdot 25\\,000 = 150\\,000$ (cm).","$1\\,\\text{km} = 1000\\,\\text{m} = 100\\,000\\,\\text{cm}$"],
  solution:"$6\\,\\text{cm} \\cdot 25\\,000 = 150\\,000\\,\\text{cm} = 1500\\,\\text{m} = 1{,}5\\,\\text{km}$"},
 {id:"m0-3", level:"muss", q:"Ein Käfer ist im Biologiebuch im Maßstab $5 : 1$ abgebildet. Auf dem Bild ist er $2{,}0\\,\\text{cm}$ lang. Wie lang ist der Käfer in Wirklichkeit?",
  fields:[{label:"Länge:", ans:0.4, unit:"cm", wrong:[{v:10,msg:"Bei 5 : 1 ist das Bild größer als die Wirklichkeit – also teilen, nicht malnehmen."}]}],
  hints:["$5 : 1$ ist eine Vergrößerung: das Bild ist 5-mal so groß wie der echte Käfer.","$2{,}0\\,\\text{cm} : 5$"],
  solution:"$2{,}0\\,\\text{cm} : 5 = 0{,}4\\,\\text{cm}$"},
 {id:"m0-4", level:"muss", q:"Gib das Streckenverhältnis $a : b$ vollständig gekürzt an: $a = 8\\,\\text{cm}$, $b = 12\\,\\text{cm}$.",
  fields:[{label:"$a : b =$", ans:[2,3], ratio:true}],
  hints:["Suche den größten gemeinsamen Teiler von 8 und 12."],
  solution:"$8 : 12 = 2 : 3$ (beide Zahlen durch 4 geteilt)"},
 {id:"m0-5", level:"muss", q:"Ein Modell ist $2{,}0\\,\\text{cm}$ groß, das echte Objekt $0{,}4\\,\\text{cm}$. Gib den Maßstab an.",
  fields:[{label:"Maßstab:", ans:[5,1], ratio:true}],
  hints:["Maßstab = Zeichnung : Wirklichkeit = $2{,}0 : 0{,}4$","So umformen, dass rechts eine 1 steht (beide Seiten durch 0,4 teilen)."],
  solution:"$2{,}0\\,\\text{cm} : 0{,}4\\,\\text{cm} = 5 : 1$ (Vergrößerung)"},
 {id:"m0-6", level:"muss", type:"mc", q:"Ein Rechteck ist $8\\,\\text{cm} \\times 12\\,\\text{cm}$, ein anderes $5\\,\\text{cm} \\times 7{,}5\\,\\text{cm}$. Sind sie ähnlich?",
  choices:["Ja, denn $8 : 12 = 5 : 7{,}5 = 2 : 3$","Nein, denn $12 - 8 \\neq 7{,}5 - 5$","Nein, Rechtecke sind nie ähnlich"], correct:0,
  why:"Die Seitenverhältnisse stimmen überein, alle Winkel sind 90°.", wrongWhy:{1:"Bei Ähnlichkeit zählen Verhältnisse (teilen), nicht Differenzen.",2:"Doch – wenn die Seitenverhältnisse gleich sind."},
  hints:["Berechne für beide Rechtecke kurze Seite : lange Seite."], solution:"$8:12 = \\frac{2}{3}$ und $5:7{,}5=\\frac{2}{3}$ → ähnlich."},
 {id:"m0-7", level:"muss", type:"mc", q:"Rechteck 1: $10\\,\\text{cm} \\times 24\\,\\text{cm}$. Rechteck 2: $15\\,\\text{cm} \\times 40\\,\\text{cm}$. Ähnlich?",
  choices:["Ja, denn $10 : 15 = 2 : 3$","Nein, denn $10 : 15 = 2 : 3$, aber $24 : 40 = 3 : 5$"], correct:1,
  why:"Alle entsprechenden Seiten müssen im selben Verhältnis stehen – nicht nur ein Paar.", wrongWhy:{0:"Ein Seitenpaar reicht nicht. Prüfe auch die anderen Seiten!"},
  hints:["Vergleiche auch die langen Seiten miteinander."], solution:"$10:15 = 2:3$, aber $24:40 = 3:5$ → verschiedene Faktoren → nicht ähnlich."},
 {id:"m0-8", level:"muss", type:"mc", q:"Dreieck 1 hat die Winkel $42^\\circ$ und $68^\\circ$. Dreieck 2 hat die Winkel $70^\\circ$ und $42^\\circ$. Sind die Dreiecke ähnlich?",
  choices:["Nein, denn $68^\\circ \\neq 70^\\circ$","Ja, denn der dritte Winkel in Dreieck 1 ist $70^\\circ$ (ww erfüllt)","Das kann man ohne Seitenlängen nicht entscheiden"], correct:1,
  why:"$180^\\circ - 42^\\circ - 68^\\circ = 70^\\circ$. Beide Dreiecke haben $42^\\circ$ und $70^\\circ$.", wrongWhy:{0:"Typischer Fehler! Berechne erst den dritten Winkel.",2:"Doch: Nach dem Hauptähnlichkeitssatz reichen zwei Winkel."},
  hints:["Berechne in beiden Dreiecken den dritten Winkel."], solution:"Dreieck 1: $42^\\circ, 68^\\circ, 70^\\circ$. Dreieck 2: $70^\\circ, 42^\\circ, 68^\\circ$. Gleiche Winkel → ähnlich (ww)."},
 {id:"m0-9", level:"muss", type:"mc", q:"Dreieck 1: $40^\\circ, 80^\\circ, 60^\\circ$. Dreieck 2: $40^\\circ, 70^\\circ, 70^\\circ$. Ähnlich?",
  choices:["Ja, beide haben einen $40^\\circ$-Winkel","Nein, nur ein Winkel stimmt überein"], correct:1,
  why:"Für ww braucht man zwei übereinstimmende Winkel.", wrongWhy:{0:"Ein gleicher Winkel reicht nicht – ww braucht zwei."},
  solution:"Nur $40^\\circ$ stimmt überein, $80^\\circ, 60^\\circ$ vs. $70^\\circ, 70^\\circ$ → nicht ähnlich."},
 {id:"m0-10", level:"muss", q:"$\\triangle ABC \\sim \\triangle A'B'C'$ mit $AB = 4\\,\\text{cm}$ und $A'B' = 6\\,\\text{cm}$. Berechne den Ähnlichkeitsfaktor $k$.",
  fields:[{label:"$k =$", ans:1.5, wrong:[{v:2/3,msg:"Richtung gemischt! k = Bild : Urbild = A'B' : AB."},{v:2,msg:"k ist ein Quotient (teilen), keine Differenz."}]}],
  hints:["$k = \\dfrac{\\text{Bild}}{\\text{Urbild}} = \\dfrac{A'B'}{AB}$"],
  solution:"$k = \\dfrac{A'B'}{AB} = \\dfrac{6\\,\\text{cm}}{4\\,\\text{cm}} = 1{,}5$"},
 {id:"m0-11", level:"muss", q:"Im selben Dreieck wie eben ($k = 1{,}5$) ist $BC = 5\\,\\text{cm}$. Berechne $B'C'$.",
  fields:[{label:"$B'C' =$", ans:7.5, unit:"cm", wrong:[{v:10/3,msg:"Du hast geteilt. Bild = k · Urbild."}]}],
  hints:["Bild = $k \\cdot$ Urbild"], solution:"$B'C' = k \\cdot BC = 1{,}5 \\cdot 5\\,\\text{cm} = 7{,}5\\,\\text{cm}$"},
 {id:"m0-12", level:"soll", q:"$\\triangle ABC \\sim \\triangle A'B'C'$. Es ist $AB = 12\\,\\text{cm}$ und $A'B' = 3\\,\\text{cm}$. Berechne $k$ (Bild durch Urbild).",
  fields:[{label:"$k =$", ans:0.25, wrong:[{v:4,msg:"Richtung nicht mischen! Bild (A'B') durch Urbild (AB)."}]}],
  hints:["Das Bild ist kleiner – also muss $0 < k < 1$ herauskommen."], solution:"$k = \\dfrac{3\\,\\text{cm}}{12\\,\\text{cm}} = 0{,}25$ (Verkleinerung)"},
 {id:"m0-13", level:"soll", q:"Mit $k = 0{,}25$ ist $B'C' = 2{,}5\\,\\text{cm}$. Wie lang ist die Originalseite $BC$?",
  fields:[{label:"$BC =$", ans:10, unit:"cm", wrong:[{v:0.625,msg:"Urbild = Bild : k – du hast multipliziert."}]}],
  hints:["Umstellen: Bild = $k \\cdot$ Urbild $\\Rightarrow$ Urbild = Bild : $k$"], solution:"$BC = B'C' : k = 2{,}5\\,\\text{cm} : 0{,}25 = 10\\,\\text{cm}$"},
 {id:"m0-14", level:"muss", type:"mc", q:"Ein Dreieck wird an einer Geraden gespiegelt. Was gilt für Original und Spiegelbild?",
  choices:["Sie sind ähnlich, aber nicht kongruent","Sie sind ähnlich und kongruent, $k = 1$","Sie sind weder ähnlich noch kongruent"], correct:1,
  why:"Spiegeln ändert weder Winkel noch Längen.", solution:"Gleiche Winkel, gleiche Längen → ähnlich mit $k=1$, also auch kongruent."}
];
window.PAGE_INIT = function(){
  App.renderTasks("#tasks", window.TASKS_M0);
  // Rechteck-Applet
  const b = new Geo.Board("#rectStage", {xmin:-0.5, xmax:14.5, ymin:-0.5, ymax:10.5, grid:1, scale:40, label:"Rechtecke vergleichen"});
  const O = {x:0,y:0};
  
  const E = b.point(8,6,{name:"", color:"#e8590c", snap:0.5, constrain:q=>({x:Math.max(0.5,q.x), y:Math.max(0.5,q.y)})});
  b.polygon(()=>[O,{x:E.x,y:0},E,{x:0,y:E.y}], {fillFn:()=>Math.abs(E.x/4-E.y/6)<1e-9?"rgba(43,138,62,.18)":"rgba(232,89,12,.07)", stroke:"#e8590c", width:3});
  b.polygon([{x:0,y:0},{x:4,y:0},{x:4,y:6},{x:0,y:6}], {fill:"rgba(28,126,214,.15)", stroke:"#1c7ed6", width:3, top:true});
  b.line(O, {x:4,y:6}, {color:"#1c7ed6", width:1.5, dash:"6 6"});
  b.update();
  const upd = ()=>{
    const w=E.x, h=E.y;
    document.getElementById("rw").textContent = App.fmt(w); document.getElementById("rh").textContent = App.fmt(h);
    document.getElementById("rkw").textContent = App.fmt(w/4,3); document.getElementById("rkh").textContent = App.fmt(h/6,3);
    const m = document.getElementById("rectMsg");
    if(Math.abs(w/4-h/6)<1e-9){ m.className="feedback show ok"; m.innerHTML = "✓ Ähnlich! Beide Seiten mit demselben Faktor k = "+App.fmt(w/4,3)+" – die Ecke liegt auf der Diagonalen."; }
    else { m.className="feedback show bad"; m.innerHTML = "Nicht ähnlich: Breite × "+App.fmt(w/4,3)+", Höhe × "+App.fmt(h/6,3)+" – verschiedene Faktoren."; }
  };
  b.onUpdate(upd); upd();
};
