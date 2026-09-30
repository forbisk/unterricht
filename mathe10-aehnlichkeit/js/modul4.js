/* Modul 4 – Fläche und Volumen */
(function(){
const NS="http://www.w3.org/2000/svg";
window.TASKS_M4 = [
 {id:"m4-1", level:"kann", q:"Die Seitenlänge eines Quadrats wird verdreifacht. Mit welchem Faktor ändert sich der Flächeninhalt?", fields:[{label:"Faktor:", ans:9, wrong:[{v:3,msg:"Seiten ×3, Fläche ×3² !"}]}], hints:["$k = 3$, Fläche mit $k^2$."], solution:"$k^2 = 3^2 = 9$"},
 {id:"m4-2", level:"kann", q:"Ein Dreieck mit $A = 6\\,\\text{cm}^2$ wird mit $k = 2$ zentrisch gestreckt. Berechne den Flächeninhalt des Bilddreiecks.", fields:[{label:"$A' =$", ans:24, unit:"cm²", wrong:[{v:12,msg:"Fläche wächst mit k² = 4, nicht mit k = 2."}]}], hints:["$A' = k^2 \\cdot A$"], solution:"$A' = 2^2 \\cdot 6\\,\\text{cm}^2 = 24\\,\\text{cm}^2$"},
 {id:"m4-3", level:"kann", q:"Der Radius eines Kreises wird halbiert. Mit welchem Faktor ändert sich der Flächeninhalt? (Dezimalzahl)", fields:[{label:"Faktor:", ans:0.25, wrong:[{v:0.5,msg:"k = 0,5 – aber die Fläche ändert sich mit k²."}]}], hints:["$k = 0{,}5$"], solution:"$k^2 = 0{,}5^2 = 0{,}25$ – die Fläche ist nur noch ein Viertel so groß."},
 {id:"m4-4", level:"kann", q:"Ein Modellhaus im Maßstab $1 : 10$ hat eine Dachfläche von $150\\,\\text{cm}^2$. Wie groß ist die Dachfläche des echten Hauses in $\\text{m}^2$?", fields:[{label:"Dachfläche:", ans:1.5, unit:"m²", wrong:[{v:15000,msg:"Richtig in cm² – jetzt noch in m² umrechnen (: 10 000)."},{v:0.15,msg:"Fläche mit k² = 100, nicht mit k = 10."}]}],
  hints:["$k = 10$, also Fläche $\\times 100$.","$1\\,\\text{m}^2 = 10\\,000\\,\\text{cm}^2$"], solution:"$150\\,\\text{cm}^2 \\cdot 100 = 15\\,000\\,\\text{cm}^2 = 1{,}5\\,\\text{m}^2$", why:"(Ein echtes Dach wäre natürlich größer – das Modell ist eben ein Spielzeughaus.)"},
 {id:"m4-5", level:"kann", q:"Die Kantenlänge eines Würfels wird verdoppelt. Wie viel Mal so groß wird das Volumen?", fields:[{label:"Faktor:", ans:8}], hints:["Volumen mit $k^3$."], solution:"$2^3 = 8$"},
 {id:"m4-6", level:"kann", type:"mc", q:"<b>Beurteilen Sie</b> folgende Aussage (ähnlich Prüfung 2025): „Für alle Kreiszylinder mit gleicher Höhe gilt: Wird der Radius verdoppelt, vervierfacht sich das Volumen.“",
  choices:["Wahr, denn $V = \\pi r^2 h$: Nur $r$ wird verdoppelt, $r^2$ also vervierfacht, $h$ bleibt gleich.","Falsch, das Volumen verachtfacht sich ($2^3$).","Falsch, das Volumen verdoppelt sich."], correct:0,
  why:"Achtung: Hier wird nicht der ganze Zylinder ähnlich vergrößert (die Höhe bleibt!). Würden Radius <i>und</i> Höhe verdoppelt, wäre es $\\times 8$.", wrongWhy:{1:"$\\times 8$ gilt nur, wenn auch die Höhe verdoppelt wird (ähnliche Vergrößerung).",2:"Der Radius steht im Quadrat in der Formel."}},
 {id:"m4-7", level:"kann", q:"Ein Foto wird so vergrößert, dass seine Fläche $9$-mal so groß ist. Mit welchem Faktor wurden die Seiten vergrößert?", fields:[{label:"$k =$", ans:3}], hints:["$k^2 = 9$"], solution:"$k = \\sqrt{9} = 3$"},
 {id:"m4-8", level:"kann", q:"Ein Modell einer Statue im Maßstab $1 : 5$ wiegt $2\\,\\text{kg}$. Wie schwer wäre die Original-Statue aus demselben Material?", fields:[{label:"Masse:", ans:250, unit:"kg", wrong:[{v:10,msg:"Die Masse hängt vom Volumen ab: Faktor k³."},{v:50,msg:"k² gilt für Flächen. Masse ~ Volumen ~ k³."}]}], hints:["$k = 5$, Masse wie Volumen: $k^3$"], solution:"$5^3 \\cdot 2\\,\\text{kg} = 125 \\cdot 2\\,\\text{kg} = 250\\,\\text{kg}$"},
 {id:"m4-9", level:"kann", type:"mc", q:"Eine Figur wird mit $k = 4$ gestreckt. Wie ändert sich der Umfang?", choices:["$\\times 4$","$\\times 16$","$\\times 64$"], correct:0, why:"Der Umfang ist eine Länge – Faktor $k$.", wrongWhy:{1:"×16 gilt für den Flächeninhalt.",2:"×64 gilt für Volumen."}}
];

function tiles(){
  const st = document.getElementById("tileStage");
  const svg = document.createElementNS(NS,"svg"); svg.setAttribute("viewBox","0 0 680 420"); svg.setAttribute("role","img"); svg.setAttribute("aria-label","Kacheln");
  st.appendChild(svg);
  let shape="tri", k=2;
  function draw(){
    const u = 68; let h = '<rect width="680" height="420" fill="#fbfcff"/>';
    const O={x:40,y:380};
    const tri = [[0,0],[1,0],[0.35,0.85]], rect=[[0,0],[1.3,0],[1.3,0.9],[0,0.9]];
    const pt=(x,y,ox,oy,s)=>(ox+x*s).toFixed(1)+","+(oy-y*s).toFixed(1);
    // Original
    const base = shape==="tri"? tri : rect;
    h += '<polygon points="'+base.map(p=>pt(p[0],p[1],O.x,O.y,u)).join(" ")+'" fill="rgba(28,126,214,.3)" stroke="#1c7ed6" stroke-width="3"/>';
    h += '<text x="'+(O.x+u*0.55)+'" y="'+(O.y+28)+'" text-anchor="middle" font-weight="700" fill="#1c7ed6" font-size="15">Original</text>';
    const ox = 190, oy = 380, s = Math.min(u, 440/(1.3*k), 330/(0.9*k));
    let n=0;
    if(shape==="tri"){
      const A=tri[0],B=tri[1],C=tri[2];
      const P=(i,j)=>[A[0]+i*(B[0]-A[0])+j*(C[0]-A[0]), A[1]+i*(B[1]-A[1])+j*(C[1]-A[1])];
      for(let i=0;i<k;i++) for(let j=0;j<k-i;j++){
        const t=[P(i,j),P(i+1,j),P(i,j+1)]; n++;
        h += '<polygon points="'+t.map(p=>pt(p[0],p[1],ox,oy,s)).join(" ")+'" fill="rgba(28,126,214,.22)" stroke="#fff" stroke-width="2" style="animation:pop .3s '+(n*0.03)+'s both"/>';
        if(i+j<=k-2){ const d=[P(i+1,j),P(i+1,j+1),P(i,j+1)]; n++;
          h += '<polygon points="'+d.map(p=>pt(p[0],p[1],ox,oy,s)).join(" ")+'" fill="rgba(232,89,12,.25)" stroke="#fff" stroke-width="2" style="animation:pop .3s '+(n*0.03)+'s both"/>'; }
      }
      h += '<polygon points="'+[P(0,0),P(k,0),P(0,k)].map(p=>pt(p[0],p[1],ox,oy,s)).join(" ")+'" fill="none" stroke="#e8590c" stroke-width="3.5"/>';
    } else {
      for(let i=0;i<k;i++) for(let j=0;j<k;j++){ n++;
        const r=[[i*1.3,j*0.9],[(i+1)*1.3,j*0.9],[(i+1)*1.3,(j+1)*0.9],[i*1.3,(j+1)*0.9]];
        h += '<polygon points="'+r.map(p=>pt(p[0],p[1],ox,oy,s)).join(" ")+'" fill="'+((i+j)%2?"rgba(232,89,12,.25)":"rgba(28,126,214,.22)")+'" stroke="#fff" stroke-width="2" style="animation:pop .3s '+(n*0.02)+'s both"/>'; }
      h += '<rect x="'+ox+'" y="'+(oy-0.9*k*s)+'" width="'+(1.3*k*s)+'" height="'+(0.9*k*s)+'" fill="none" stroke="#e8590c" stroke-width="3.5"/>';
    }
    if(s<u) h += '<text x="670" y="20" text-anchor="end" font-size="12" fill="#868e96">Bild verkleinert dargestellt</text>';
    svg.innerHTML = h;
    document.getElementById("tileK").textContent = "k = "+k;
    document.getElementById("tSides").textContent = "× "+k;
    document.getElementById("tPer").textContent = "× "+k;
    document.getElementById("tCount").innerHTML = "<b>"+n+"</b>";
    document.getElementById("tArea").innerHTML = "<b>× "+(k*k)+" = "+k+"²</b>";
  }
  document.getElementById("tileSlider").addEventListener("input", e=>{ k=+e.target.value; draw(); });
  document.querySelectorAll("#shapeBtns [data-s]").forEach(b=>b.onclick=()=>{ shape=b.dataset.s; document.querySelectorAll("#shapeBtns [data-s]").forEach(x=>x.classList.toggle("ghost", x!==b)); draw(); });
  draw();
}

function cubes(){
  const st = document.getElementById("cubeStage");
  const svg = document.createElementNS(NS,"svg"); svg.setAttribute("viewBox","0 0 680 420"); svg.setAttribute("role","img"); svg.setAttribute("aria-label","Würfel aus kleinen Würfeln");
  st.appendChild(svg);
  let k=2;
  function draw(){
    const s = Math.min(46, 200/k), c=Math.cos(Math.PI/6), sn=0.5;
    const proj=(x,y,z,ox,oy,ss)=>[ox+(x-y)*c*ss, oy+(x+y)*sn*ss - z*ss];
    let h='<rect width="680" height="420" fill="#fbfcff"/>';
    function cube(x,y,z,ox,oy,ss,col){
      const P=(a,b,d)=>proj(x+a,y+b,z+d,ox,oy,ss).map(v=>v.toFixed(1)).join(",");
      const top=[P(0,0,1),P(1,0,1),P(1,1,1),P(0,1,1)], left=[P(0,1,0),P(1,1,0),P(1,1,1),P(0,1,1)], right=[P(1,0,0),P(1,1,0),P(1,1,1),P(1,0,1)];
      return '<polygon points="'+top.join(" ")+'" fill="'+col[0]+'" stroke="#fff" stroke-width="1.5"/><polygon points="'+left.join(" ")+'" fill="'+col[1]+'" stroke="#fff" stroke-width="1.5"/><polygon points="'+right.join(" ")+'" fill="'+col[2]+'" stroke="#fff" stroke-width="1.5"/>';
    }
    const blue=["#a5d8ff","#4dabf7","#1c7ed6"], orange=["#ffd8a8","#ffa94d","#e8590c"];
    h += cube(0,0,0,90,300,46,blue);
    h += '<text x="90" y="350" text-anchor="middle" font-weight="700" fill="#1c7ed6" font-size="15">Original</text>';
    const ox=430, oy=400-(k*s*1.0)-20;
    const list=[];
    for(let x=0;x<k;x++) for(let y=0;y<k;y++) for(let z=0;z<k;z++) list.push([x,y,z]);
    list.sort((a,b)=>(a[0]+a[1])-(b[0]+b[1]) || a[2]-b[2]);
    list.forEach(q=>h+=cube(q[0],q[1],q[2],ox,oy,s,orange));
    if(s<46) h+='<text x="670" y="20" text-anchor="end" font-size="12" fill="#868e96">Bild verkleinert dargestellt</text>';
    svg.innerHTML=h;
    document.getElementById("cubeK").textContent="k = "+k;
    document.getElementById("cEdge").textContent="× "+k;
    document.getElementById("cSurf").textContent="× "+(k*k)+" = "+k+"²";
    document.getElementById("cCount").innerHTML="<b>"+(k*k*k)+"</b>";
    document.getElementById("cVol").innerHTML="<b>× "+(k*k*k)+" = "+k+"³</b>";
  }
  document.getElementById("cubeSlider").addEventListener("input", e=>{ k=+e.target.value; draw(); });
  draw();
}

window.PAGE_INIT = function(){
  tiles(); cubes();
  GEN.widget("#genA","flaeche"); GEN.widget("#genV","volumen");
  App.renderTasks("#tasks", window.TASKS_M4);
};
})();
