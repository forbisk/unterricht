/* Modul 5 – Anwendungen */
(function(){
const F = App.fmt, NS="http://www.w3.org/2000/svg";
window.TASKS_M5 = [
 {id:"m5-1", level:"muss", q:"🗺 Auf einer Karte im Maßstab $1 : 50\\,000$ sind zwei Orte $7{,}4\\,\\text{cm}$ voneinander entfernt. Wie weit sind sie in Wirklichkeit voneinander entfernt (in km)?",
  fields:[{label:"Entfernung:", ans:3.7, unit:"km", wrong:[{v:370000,msg:"Das sind cm – noch in km umrechnen."},{v:3700,msg:"Das sind m – noch in km umrechnen."}]}],
  hints:["$7{,}4 \\cdot 50\\,000 = 370\\,000$ (cm)","$100\\,000\\,\\text{cm} = 1\\,\\text{km}$"], solution:"$7{,}4\\,\\text{cm} \\cdot 50\\,000 = 370\\,000\\,\\text{cm} = 3{,}7\\,\\text{km}$"},
 {id:"m5-2", level:"muss", q:"🚂 Modelleisenbahnen der Spur H0 haben den Maßstab $1 : 87$. Eine echte Lok ist $17{,}4\\,\\text{m}$ lang. Wie lang ist das Modell (in cm)?",
  fields:[{label:"Länge:", ans:20, unit:"cm"}], hints:["$17{,}4\\,\\text{m} = 1740\\,\\text{cm}$","$1740 : 87$"], solution:"$1740\\,\\text{cm} : 87 = 20\\,\\text{cm}$"},
 {id:"m5-3", level:"muss", q:"💡 Eine Laterne wirft einen $6\\,\\text{m}$ langen Schatten. Ein $1{,}2\\,\\text{m}$ hoher Pfosten wirft gleichzeitig einen $1{,}5\\,\\text{m}$ langen Schatten. Wie hoch ist die Laterne?",
  fields:[{label:"Höhe:", ans:4.8, unit:"m", wrong:[{v:7.5,msg:"Verhältnis verdreht: Höhe : Schatten = Höhe : Schatten."}]}],
  hints:["Skizze: zwei rechtwinklige Dreiecke mit parallelen Sonnenstrahlen.","$\\dfrac{h}{6} = \\dfrac{1{,}2}{1{,}5}$"], solution:"$h = \\dfrac{1{,}2 \\cdot 6}{1{,}5}\\,\\text{m} = 4{,}8\\,\\text{m}$"},
 {id:"m5-4", level:"soll", q:"📐 Ein Förster peilt mit einem gleichschenklig-rechtwinkligen Dreieck die Spitze einer Fichte an. Er steht $22{,}5\\,\\text{m}$ vom Stamm entfernt, seine Augen sind $1{,}7\\,\\text{m}$ über dem Boden. Wie hoch ist die Fichte?",
  fields:[{label:"Höhe:", ans:24.2, unit:"m", wrong:[{v:22.5,msg:"Fast – die Augenhöhe fehlt noch."}]}], hints:["Gleichschenklig: Höhe über Augenhöhe = Abstand.","$22{,}5 + 1{,}7$"], solution:"$22{,}5\\,\\text{m} + 1{,}7\\,\\text{m} = 24{,}2\\,\\text{m}$"},
 {id:"m5-5", level:"soll", q:"👍 Daumensprung: Armlänge $60\\,\\text{cm}$, Augenabstand $6\\,\\text{cm}$. Der Daumen springt am Ziel um $25\\,\\text{m}$. Wie weit ist das Ziel entfernt?",
  fields:[{label:"Entfernung:", ans:250, unit:"m"}], hints:["$\\dfrac{\\text{Entfernung}}{25\\,\\text{m}} = \\dfrac{60}{6}$"], solution:"$\\text{Entfernung} = 25\\,\\text{m} \\cdot 10 = 250\\,\\text{m}$"},
 {id:"m5-6", level:"soll", q:"📷 Eine Lochkamera ist $15\\,\\text{cm}$ tief. Eine $1{,}8\\,\\text{m}$ große Person steht $6\\,\\text{m}$ vor dem Loch. Wie groß ist ihr Bild auf der Rückwand (in cm)?",
  fig:()=>Geo.Fig({pts:{P:[-6,1.8],Q:[-6,0],L:[0,0.9],X:[1.5,1.125],Y:[1.5,0.675],K1:[0,0.2],K2:[1.5,0.2],K3:[1.5,1.6],K4:[0,1.6]}, polys:[{p:"K1K2K3K4",fill:"rgba(73,80,87,.08)",stroke:"#495057",width:2}], segs:[{p:"PQ",color:"#1c7ed6",width:5,label:"1,8 m",side:1},{p:"PY",color:"#fab005",width:1.5,dash:"5 4"},{p:"QX",color:"#fab005",width:1.5,dash:"5 4"},{p:"XY",color:"#e8590c",width:5,label:"x",side:-1,off:14},{p:"QL",color:"none",width:.001,label:"6 m",side:-1,off:40}], hide:["P","Q","X","Y","K1","K2","K3","K4"], labels:{L:{t:"Loch",dx:-22,dy:-12}}, width:440, pad:30, note:"nicht maßstäblich"}),
  fields:[{label:"Bildgröße:", ans:4.5, unit:"cm"}], hints:["X-Figur: Das Loch ist der Scheitel.","$\\dfrac{x}{180\\,\\text{cm}} = \\dfrac{15\\,\\text{cm}}{600\\,\\text{cm}}$ – gleiche Einheiten!"], solution:"$x = 180\\,\\text{cm} \\cdot \\dfrac{15}{600} = 4{,}5\\,\\text{cm}$ (auf dem Kopf stehend)"},
 {id:"m5-7", level:"soll", q:"🏠 Ein Dachgiebel ist ein gleichschenkliges Dreieck: $10\\,\\text{m}$ breit und $6\\,\\text{m}$ hoch. Wie hoch ist der Dachraum $2\\,\\text{m}$ von der Außenwand entfernt (waagerecht gemessen)?",
  fig:()=>Geo.Fig({pts:{A:[0,0],B:[10,0],C:[5,6],D:[2,0],E:[2,2.4],M:[5,0]}, polys:[{p:"ABC",fill:"rgba(232,89,12,.08)",stroke:"#e8590c"}], segs:[{p:"DE",color:"#1c7ed6",width:4,label:"h",side:1},{p:"CM",color:"#868e96",width:2,dash:"5 4",label:"6 m",side:1},{p:"AD",color:"none",width:.001,label:"2 m",side:-1},{p:"AB",color:"none",width:.001,label:"10 m",side:-1,off:36}], hide:["M","D","E"], angles:[{p:"CMA",right:true,color:"#868e96"},{p:"EDA",right:true,color:"#1c7ed6"}], width:400, pad:40}),
  fields:[{label:"$h =$", ans:2.4, unit:"m"}], hints:["Betrachte die linke Hälfte: rechtwinkliges Dreieck mit $5\\,\\text{m}$ Breite und $6\\,\\text{m}$ Höhe.","V-Figur mit Scheitel $A$: $\\dfrac{h}{6} = \\dfrac{2}{5}$"], solution:"$h = 6\\,\\text{m} \\cdot \\dfrac{2}{5} = 2{,}4\\,\\text{m}$"},
 {id:"m5-8", level:"soll", q:"📽 Ein Beamer erzeugt in $2{,}5\\,\\text{m}$ Abstand ein $1{,}2\\,\\text{m}$ breites Bild. Die Leinwand ist $2{,}16\\,\\text{m}$ breit. In welchem Abstand muss der Beamer stehen, damit das Bild genau die Leinwandbreite hat?",
  fields:[{label:"Abstand:", ans:4.5, unit:"m"}], hints:["zentrische Streckung mit Zentrum = Linse: $k = 2{,}16 : 1{,}2$","Abstand $= k \\cdot 2{,}5\\,\\text{m}$"], solution:"$k = 2{,}16 : 1{,}2 = 1{,}8$; Abstand $= 1{,}8 \\cdot 2{,}5\\,\\text{m} = 4{,}5\\,\\text{m}$"},
 {id:"m5-9", level:"soll", q:"🛹 Eine Rampe steigt auf $8\\,\\text{m}$ waagerechter Länge um $1{,}2\\,\\text{m}$ an. Wie hoch muss eine senkrechte Stütze sein, die $3\\,\\text{m}$ vom unteren Ende entfernt steht?",
  fields:[{label:"Stütze:", ans:0.45, unit:"m"}], hints:["V-Figur mit Scheitel am unteren Ende der Rampe.","$\\dfrac{h}{1{,}2} = \\dfrac{3}{8}$"], solution:"$h = 1{,}2\\,\\text{m} \\cdot \\dfrac{3}{8} = 0{,}45\\,\\text{m} = 45\\,\\text{cm}$"},
 {id:"m5-10", level:"kann", q:"🌊 Flussbreite: $\\overline{AS} = 36\\,\\text{m}$ entlang des Ufers, $\\overline{SC} = 9\\,\\text{m}$ weiter in derselben Richtung, $\\overline{CD} = 7{,}5\\,\\text{m}$ senkrecht vom Fluss weg (wie im Musterbeispiel). Wie breit ist der Fluss?",
  fields:[{label:"Breite:", ans:30, unit:"m"}], hints:["$\\dfrac{x}{7{,}5} = \\dfrac{36}{9}$"], solution:"$x = 7{,}5\\,\\text{m} \\cdot 4 = 30\\,\\text{m}$"},
 {id:"m5-11", level:"kann", q:"🌙 (Idee aus der Prüfung 2019 – nur 10 % gelöst!) Der Mond hat einen Durchmesser von ca. $3500\\,\\text{km}$ und ist $384\\,400\\,\\text{km}$ entfernt. Welchen Durchmesser müsste eine Münze haben, die man $70\\,\\text{cm}$ vor das Auge hält, damit sie den Mond gerade verdeckt? (in mm, auf eine Stelle nach dem Komma)",
  fields:[{label:"Durchmesser:", ans:6.4, unit:"mm", tol:0.06}], hints:["Das Auge ist das Zentrum einer zentrischen Streckung (Strahlensatz).","$\\dfrac{d}{700\\,\\text{mm}} = \\dfrac{3500}{384\\,400}$"], solution:"$d = 700\\,\\text{mm} \\cdot \\dfrac{3500}{384\\,400} \\approx 6{,}37\\,\\text{mm} \\approx 6{,}4\\,\\text{mm}$", noSol:true}
];

function sunApplet(){
  const st = document.getElementById("sunStage");
  const svg = document.createElementNS(NS,"svg"); svg.setAttribute("viewBox","0 0 700 420"); svg.setAttribute("role","img"); svg.setAttribute("aria-label","Schatten von Baum und Stab");
  st.appendChild(svg);
  let ang=40, H=9; const hs=1.5;
  function draw(){
    const s = 22, gy = 370, xt = 440, xs = 150;
    const t = Math.tan(ang*Math.PI/180), S = H/t, ss = hs/t;
    const sc = Math.min(s, 400/Math.max(S,1), 300/H);
    let h = '<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d0ebff"/><stop offset="1" stop-color="#f8f9fa"/></linearGradient></defs><rect width="700" height="420" fill="url(#sky)"/><rect y="'+gy+'" width="700" height="50" fill="#d8f5a2"/>';
    // Sonne
    const ux = Math.cos(ang*Math.PI/180), uy = Math.sin(ang*Math.PI/180);
    // Baum
    const tx = xt, top = gy - H*sc;
    const shEnd = tx - S*sc;
    h += '<polygon points="'+tx+','+gy+' '+shEnd+','+gy+' '+tx+','+top+'" fill="rgba(43,138,62,.12)"/>';
    h += '<line x1="'+tx+'" y1="'+gy+'" x2="'+shEnd+'" y2="'+gy+'" stroke="#495057" stroke-width="8" stroke-linecap="round"/>';
    h += '<rect x="'+(tx-5)+'" y="'+top+'" width="10" height="'+(H*sc)+'" fill="#8d6e63"/><circle cx="'+tx+'" cy="'+(top+8)+'" r="'+(Math.max(18,H*sc*0.22))+'" fill="#51cf66" opacity=".85"/>';
    { const L = (gy-30)/uy; const sx = shEnd+ux*L, sy = gy-uy*L; h += '<line x1="'+shEnd+'" y1="'+gy+'" x2="'+sx+'" y2="'+sy+'" stroke="#fab005" stroke-width="2.5" stroke-dasharray="8 6"/><circle cx="'+sx+'" cy="'+sy+'" r="22" fill="#fcc419"/>'; }
    // Stab
    const px = 610, ptop = gy - hs*sc, psh = px - ss*sc;
    h += '<polygon points="'+px+','+gy+' '+psh+','+gy+' '+px+','+ptop+'" fill="rgba(28,126,214,.15)"/>';
    h += '<line x1="'+px+'" y1="'+gy+'" x2="'+psh+'" y2="'+gy+'" stroke="#495057" stroke-width="8" stroke-linecap="round"/>';
    h += '<line x1="'+px+'" y1="'+gy+'" x2="'+px+'" y2="'+ptop+'" stroke="#1c7ed6" stroke-width="6"/>';
    h += '<line x1="'+psh+'" y1="'+gy+'" x2="'+(psh+ux*(gy-30)/uy)+'" y2="30" stroke="#fab005" stroke-width="2.5" stroke-dasharray="8 6"/>';
    const lab=(x,y,t,c)=>'<text x="'+x+'" y="'+y+'" fill="'+c+'" font-size="15" font-weight="700" text-anchor="middle" paint-order="stroke" stroke="#fff" stroke-width="4">'+t+'</text>';
    h += lab(tx+34, (gy+top)/2, F(H,1)+" m", "#2b8a3e") + lab((tx+shEnd)/2, gy+26, "Schatten "+F(S,2)+" m", "#495057");
    h += lab(px+34, ptop-6, "1,5 m", "#1c7ed6") + lab((px+psh)/2, gy+26, F(ss,2)+" m", "#495057");
    h += '<path d="M'+(shEnd+34)+','+gy+' A34,34 0 0 0 '+(shEnd+34*Math.cos(ang*Math.PI/180))+','+(gy-34*Math.sin(ang*Math.PI/180))+'" fill="none" stroke="#e67700" stroke-width="2.5"/>'+lab(shEnd+52, gy-10, ang+"°", "#e67700");
    svg.innerHTML = h;
    document.getElementById("sunOut").textContent = ang+"°";
    document.getElementById("treeOut").textContent = F(H,1)+" m";
    document.getElementById("sunTable").innerHTML = '<thead><tr><th></th><th>Höhe</th><th>Schatten</th><th>Höhe : Schatten</th></tr></thead><tbody><tr><td class="c-par">Baum</td><td>'+F(H,1)+' m</td><td>'+F(S,2)+' m</td><td><b>'+F(H/S,3)+'</b></td></tr><tr><td class="c-orig">Stab</td><td>1,5 m</td><td>'+F(ss,2)+' m</td><td><b>'+F(hs/ss,3)+'</b></td></tr></tbody>';
  }
  document.getElementById("sunSlider").addEventListener("input", e=>{ ang=+e.target.value; draw(); });
  document.getElementById("treeSlider").addEventListener("input", e=>{ H=+e.target.value; draw(); });
  draw();
}

window.PAGE_INIT = function(){
  document.getElementById("figTree").innerHTML = Geo.Fig({pts:{B:[0,0],T:[0,9],E:[-12,0],F:[4,0],G:[4,1.5],H:[2,0]},
    segs:[{p:"BT",color:"#2b8a3e",width:6,label:"h",side:1},{p:"EB",color:"#495057",width:5,label:"12 m",side:1},{p:"ET",color:"#fab005",width:2,dash:"6 4"},{p:"FG",color:"#1c7ed6",width:5,label:"1,5 m",side:-1},{p:"HF",color:"#495057",width:5,label:"2 m",side:1},{p:"HG",color:"#fab005",width:2,dash:"6 4"}],
    angles:[{p:"TBE",right:true,color:"#2b8a3e"},{p:"GFH",right:true,color:"#1c7ed6"},{p:"BET",color:"#e67700",r:24},{p:"FHG",color:"#e67700",r:16}], hide:["B","T","E","F","G","H"], nodots:true, width:420, pad:26});
  document.getElementById("figRiver").innerHTML = Geo.Fig({pts:{T:[0,8],A:[0,0],S:[5,0],C:[6.25,0],D:[6.25,-2],U1:[-1,0],U2:[8,0],V1:[-1,8],V2:[8,8]},
    polys:[{p:"U1U2V2V1",fill:"rgba(116,192,252,.25)"}],
    segs:[{p:"AT",color:"#2b8a3e",width:3,label:"x",side:1},{p:"AS",color:"#495057",width:3,label:"20 m",side:1},{p:"SC",color:"#495057",width:3,label:"5 m",side:1},{p:"CD",color:"#1c7ed6",width:3,label:"8 m",side:-1},{p:"TD",color:"#fab005",width:2,dash:"6 4"}],
    angles:[{p:"TAS",right:true,color:"#2b8a3e"},{p:"DCS",right:true,color:"#1c7ed6"}], hide:["U1","U2","V1","V2"], labels:{T:{t:"T 🌳",dy:-14,dx:0},S:{dx:-8,dy:-14},C:{dx:10,dy:-14}}, width:360, pad:26});
  sunApplet();
  GEN.widget("#genSch","schatten"); GEN.widget("#genMas","massstab"); GEN.widget("#genFoe","foerster");
  App.renderTasks("#tasks", window.TASKS_M5);
};
})();
