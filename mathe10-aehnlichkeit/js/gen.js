/* Aufgabengeneratoren – unbegrenzt üben.
   Jeder Generator liefert ein Aufgabenobjekt für App.renderTask + "data" (Rohwerte für den Prüf-Skript). */
(function(){
"use strict";
const F = App.fmt, R = App.rnd, P = App.pick;
const ORIG="#1c7ed6", IMG="#e8590c", ZC="#c2255c", GRN="#2b8a3e";
const r1 = x=>Math.round(x*10)/10, r2 = x=>Math.round(x*100)/100;
const T = s=>"$"+s+"$";
const cm = x=>F(x)+"\\,\\text{cm}";
const m_ = x=>F(x)+"\\,\\text{m}";
const GEN = window.GEN = {};

/* ---------- Figuren-Helfer ---------- */
function triFromSides(a,b,c){ // Seiten a=BC, b=CA, c=AB  -> A(0,0), B(c,0), C
  const x = (b*b + c*c - a*a)/(2*c), y = Math.sqrt(Math.max(0,b*b-x*x));
  return {A:[0,0], B:[c,0], C:[x,y]};
}
function transform(pts, rot, flip, dx, dy, sc){
  const o = {};
  const c = Math.cos(rot*Math.PI/180), s = Math.sin(rot*Math.PI/180);
  for(const k in pts){ let [x,y] = pts[k]; if(flip) x = -x; x*=sc; y*=sc; o[k] = [x*c-y*s+dx, x*s+y*c+dy]; }
  return o;
}
function renamePts(pts, map){ const o={}; for(const k in pts) o[map[k]||k]=pts[k]; return o; }
function angDeg(p,q,r){ const u=[p[0]-q[0],p[1]-q[1]], v=[r[0]-q[0],r[1]-q[1]]; return Math.acos((u[0]*v[0]+u[1]*v[1])/Math.hypot(...u)/Math.hypot(...v))*180/Math.PI; }
GEN.triFromSides = triFromSides; GEN.transform = transform;

/* V-Figur / X-Figur für Strahlensätze.
   L = {SA, AA_, SB, BB_, AB, A_B_, SA_, SB_} → Beschriftungen (String) oder undefined.
   k = SA'/SA (für die Zeichnung), x = true -> X-Figur (Scheitel zwischen den Parallelen) */
function figStrahlen(L, k, x, opt){
  opt = opt||{};
  const th = (opt.angle||34)*Math.PI/180, a = 4, b = opt.bRatio? 4*opt.bRatio : 3.6;
  const S=[0,0], A=[a,0], B=[b*Math.cos(th), b*Math.sin(th)];
  const s = x? -k : k;
  const A_=[A[0]*s, A[1]*s], B_=[B[0]*s, B[1]*s];
  const pts = {S, A, B, A_:A_, B_:B_};
  const segs = [], extra = [];
  const col = "#495057";
  if(x){
    segs.push({p:"A_A", color:col, width:2.5}); segs.push({p:"B_B", color:col, width:2.5});
  }
  const lbl = (p, t, side, color)=>{ if(t!==undefined && t!==null) segs.push({p, label:t, side, color:color||col, width:x&&(p==="SA"||p==="SB"||p==="SA_"||p==="SB_")?2.5:0.001, lcolor:color}); };
  // Parallelen
  segs.push({p:"AB", color:ORIG, width:3.5, arrows:1, label:L.AB, side: 1, off:22, lcolor:ORIG});
  segs.push({p:"A_B_", color:IMG, width:3.5, arrows:1, label:L.A_B_, side: x?-1:1, off:22, lcolor:IMG});
  if(!x){
    lbl("SA", L.SA, 1); lbl("AA_", L.AA_, 1); lbl("SB", L.SB, -1); lbl("BB_", L.BB_, -1);
    // Maßlinien für ganze Scheitelabschnitte SA' und SB'
    const dim = (P1, P2, other, text)=> (X,Y)=>{
      const a={x:X(P1[0]),y:Y(P1[1])}, b={x:X(P2[0]),y:Y(P2[1])}, o={x:X(other[0]),y:Y(other[1])};
      const L=Math.hypot(b.x-a.x,b.y-a.y), u={x:(b.x-a.x)/L,y:(b.y-a.y)/L}; let n={x:-u.y,y:u.x};
      const m={x:(a.x+b.x)/2,y:(a.y+b.y)/2}; if((o.x-m.x)*n.x+(o.y-m.y)*n.y>0) n={x:-n.x,y:-n.y};
      const d=30, a2={x:a.x+n.x*d,y:a.y+n.y*d}, b2={x:b.x+n.x*d,y:b.y+n.y*d};
      let str='<line x1="'+a2.x.toFixed(1)+'" y1="'+a2.y.toFixed(1)+'" x2="'+b2.x.toFixed(1)+'" y2="'+b2.y.toFixed(1)+'" stroke="'+IMG+'" stroke-width="1.6"/>';
      [a2,b2].forEach(q=>{ str+='<line x1="'+(q.x-n.x*6).toFixed(1)+'" y1="'+(q.y-n.y*6).toFixed(1)+'" x2="'+(q.x+n.x*6).toFixed(1)+'" y2="'+(q.y+n.y*6).toFixed(1)+'" stroke="'+IMG+'" stroke-width="1.6"/>'; });
      str+='<text x="'+(m.x+n.x*(d+14)).toFixed(1)+'" y="'+(m.y+n.y*(d+14)).toFixed(1)+'" fill="'+IMG+'" font-size="15" font-weight="700" text-anchor="middle" dominant-baseline="middle" paint-order="stroke" stroke="#fff" stroke-width="4">'+text+'</text>';
      return str; };
    if(L.SA_){ extra.push(dim(S, A_, B_, L.SA_)); pts.P9 = [A_[0]*0.5, -1.35*(k>2?k/2:1)]; }
    if(L.SB_){ extra.push(dim(S, B_, A_, L.SB_)); pts.P8 = [B_[0]*0.5 - 1.1, B_[1]*0.5 + 1.6]; }
  } else {
    lbl("SA", L.SA, 1); lbl("SB", L.SB, -1); lbl("SA_", L.SA_, -1); lbl("SB_", L.SB_, 1);
  }
  const rays = x? [] : [{from:"S", through:"A_", ext:1.12}, {from:"S", through:"B_", ext:1.12}];
  const names = opt.names || {S:"S",A:"A",B:"B",A_:"A'",B_:"B'"};
  const labels = {}; for(const k2 in names) labels[k2] = {t:names[k2]};
  if(!x){ labels.S.dx=-14; labels.S.dy=6; labels.A.dx=4; labels.A.dy=18; labels.A_.dx=4; labels.A_.dy=18; labels.B.dx=-8; labels.B.dy=-14; labels.B_.dx=-8; labels.B_.dy=-14; }
  else { labels.S.dx=0; labels.S.dy=20; }
  return Geo.Fig({pts, segs, rays, labels, extra, hide:["P8","P9"], width:opt.width||440, pad:36, colors:{S:"#212529",A:ORIG,B:ORIG,A_:IMG,B_:IMG}, note:"Skizze nicht maßstäblich", aria: x?"X-Figur":"V-Figur Strahlensatz"});
}
GEN.figStrahlen = figStrahlen;

/* ============ Generatoren ============ */
const LIST = [];
function def(g){ LIST.push(g); GEN[g.id] = g; }

/* 1 Maßstab */
def({id:"massstab", title:"Maßstab", level:"muss", topic:"Wiederholung", icon:"🗺",
 desc:"Karte ↔ Wirklichkeit, Maßstab bestimmen",
 make(){
  const mode = P(["k2w","w2k","find","vergr"]);
  if(mode==="k2w"){
    const n = P([1000,2000,5000,10000,20000,25000,50000,100000]), d = P([2,3,4,5,6,7,8,1.5,2.5,3.5,4.5,12]);
    const real_cm = d*n, km = real_cm/100000, m = real_cm/100;
    const useKm = m>=1000;
    const ans = useKm? km : m;
    if(Math.abs(ans-r2(ans))>1e-9) return this.make();
    return {data:{mode,n,d,ans}, q:"Auf einer Karte im Maßstab $1 : "+F(n).replace(/\u202f/g,"\\,")+"$ ist eine Strecke $"+F(d)+"\\,\\text{cm}$ lang. Wie lang ist sie in Wirklichkeit"+(useKm?" (in km)?":" (in m)?"),
      fields:[{label:"Länge:", ans, unit:useKm?"km":"m", wrong:[{v:real_cm, msg:"Das ist die Länge in cm. Rechne noch um!"}]}],
      hints:["1 cm auf der Karte sind $"+F(n).replace(/\u202f/g,"\\,")+"\\,\\text{cm}$ in Wirklichkeit.", "$"+F(d)+" \\cdot "+F(n).replace(/\u202f/g,"\\,")+" = "+F(real_cm).replace(/\u202f/g,"\\,")+"$ cm. Umrechnen: $1\\,\\text{m} = 100\\,\\text{cm}$, $1\\,\\text{km} = 100\\,000\\,\\text{cm}$."],
      solution:"$"+F(d)+"\\,\\text{cm} \\cdot "+F(n).replace(/\u202f/g,"\\,")+" = "+F(real_cm).replace(/\u202f/g,"\\,")+"\\,\\text{cm} = "+(useKm? F(km)+"\\,\\text{km}" : F(m)+"\\,\\text{m}")+"$"};
  }
  if(mode==="w2k"){
    const n = P([50,100,200,500]), real_m = P([2,3,4,5,6,8,10,12,15,20,25]);
    const ans = real_m*100/n;
    if(ans<0.5||ans>30) return this.make();
    return {data:{mode,n,real_m,ans}, q:"Ein Raum ist in Wirklichkeit $"+F(real_m)+"\\,\\text{m}$ lang. Er wird im Maßstab $1 : "+n+"$ gezeichnet. Wie lang ist er in der Zeichnung?",
      fields:[{label:"Länge:", ans, unit:"cm", wrong:[{v:real_m*n, msg:"Andersherum: Die Zeichnung ist kleiner – teilen!"}]}],
      hints:["Rechne zuerst in cm um: $"+F(real_m)+"\\,\\text{m} = "+F(real_m*100)+"\\,\\text{cm}$.","In der Zeichnung ist alles "+n+"-mal kleiner."],
      solution:"$"+F(real_m*100)+"\\,\\text{cm} : "+n+" = "+F(ans)+"\\,\\text{cm}$"};
  }
  if(mode==="vergr"){
    const n = P([2,4,5,10,20]), real = P([0.2,0.3,0.4,0.5,0.6,0.8,1.2,1.5]);
    const ans = r2(real*n);
    return {data:{mode,n,real,ans}, q:"Ein Insekt ist in Wirklichkeit $"+F(real)+"\\,\\text{cm}$ lang. Es wird im Maßstab $"+n+" : 1$ abgebildet. Wie lang ist es auf dem Bild?",
      fields:[{label:"Länge:", ans, unit:"cm"}], hints:["$"+n+" : 1$ bedeutet Vergrößerung: das Bild ist "+n+"-mal so groß."],
      solution:"$"+F(real)+"\\,\\text{cm} \\cdot "+n+" = "+F(ans)+"\\,\\text{cm}$"};
  }
  const n = P([20,25,50,100,200,250,500]), d = P([2,3,4,5,6,8,12]);
  const real_cm = d*n;
  return {data:{mode,n,d,ans:[1,n]}, q:"In einer Zeichnung ist eine Strecke $"+F(d)+"\\,\\text{cm}$ lang. In Wirklichkeit ist sie $"+F(real_cm/100)+"\\,\\text{m}$ lang. Gib den Maßstab an (Form $1 : n$).",
    fields:[{label:"Maßstab:", ans:[1,n], ratio:true}],
    hints:["Beide Längen in cm: $"+F(real_cm/100)+"\\,\\text{m} = "+F(real_cm)+"\\,\\text{cm}$.","Maßstab = Zeichnung : Wirklichkeit = $"+d+" : "+real_cm+"$, dann so kürzen, dass links 1 steht."],
    solution:"$"+d+"\\,\\text{cm} : "+real_cm+"\\,\\text{cm} = 1 : "+n+"$"};
 }});

/* 2 Zentrische Streckung berechnen */
def({id:"streckung", title:"Zentrische Streckung", level:"muss", topic:"Modul 1", icon:"↗",
 desc:"ZP' = k · ZP – fehlende Größe berechnen",
 make(level){
  const mode = level==="kann"? P(["pp","pp2","umkehr"]) : (level==="soll"? P(["zp","k","pp"]) : P(["zpb","k","zpb"]));
  const k = P([0.5,1.5,2,2.5,3,0.25,0.75,1.2,4,0.4]);
  let zp = P([2,2.5,3,4,5,6,1.5,8,3.5]);
  if(Math.abs(k*zp - r2(k*zp))>1e-9) return this.make(level);
  let zpb = r2(k*zp);
  const kt = F(k);
  const fig = ()=>Geo.Fig({pts:{Z:[0,0],P:[3,0.9],P_:[3*k,0.9*k]}, rays:[{from:"Z",through:k>1?"P_":"P",ext:1.1,dash:"5 5"}], colors:{Z:ZC,P:ORIG,P_:IMG}, width:360, pad:28});
  if(mode==="zpb") return {data:{mode,k,zp,ans:zpb}, q:"Zentrische Streckung mit $k = "+kt+"$ und $\\overline{ZP} = "+cm(zp)+"$. Berechne $\\overline{ZP'}$.", fig,
    fields:[{label:"$\\overline{ZP'} =$", ans:zpb, unit:"cm", wrong:[{v:zp/k,msg:"Du hast geteilt. Bild = k · Urbild."}]}],
    hints:["$\\overline{ZP'} = k \\cdot \\overline{ZP}$"], solution:"$\\overline{ZP'} = "+kt+" \\cdot "+cm(zp)+" = "+cm(zpb)+"$"};
  if(mode==="k") return {data:{mode,zp,zpb,ans:k}, q:"Es ist $\\overline{ZP} = "+cm(zp)+"$ und $\\overline{ZP'} = "+cm(zpb)+"$. Berechne den Streckungsfaktor $k$.", fig,
    fields:[{label:"$k =$", ans:k, wrong:[{v:1/k,msg:"Richtung gemischt! k = ZP' : ZP (Bild durch Urbild)."}]}],
    hints:["$k = \\overline{ZP'} : \\overline{ZP}$"], solution:"$k = "+cm(zpb)+" : "+cm(zp)+" = "+kt+"$"};
  if(mode==="zp") return {data:{mode,k,zpb,ans:zp}, q:"Bei einer zentrischen Streckung mit $k = "+kt+"$ ist $\\overline{ZP'} = "+cm(zpb)+"$. Wie lang ist $\\overline{ZP}$?", fig,
    fields:[{label:"$\\overline{ZP} =$", ans:zp, unit:"cm", wrong:[{v:k*zpb,msg:"Urbild = Bild : k – du hast multipliziert."}]}],
    hints:["$\\overline{ZP'} = k \\cdot \\overline{ZP}$ nach $\\overline{ZP}$ umstellen."], solution:"$\\overline{ZP} = "+cm(zpb)+" : "+kt+" = "+cm(zp)+"$"};
  if(mode==="umkehr"){
    const kk = P([2,4,5,0.5,0.25,1.25,2.5]); const inv = 1/kk;
    return {data:{mode,kk,ans:inv}, q:"Eine Figur wurde mit $k = "+F(kk)+"$ gestreckt. Mit welchem Faktor (gleiches Zentrum) erhält man aus dem Bild wieder das Original? Gib den Faktor als Dezimalzahl oder Bruch an.",
      fields:[{label:"Faktor:", ans:inv}], hints:["Umkehrung: Faktor $\\frac{1}{k}$"], solution:"$\\frac{1}{"+F(kk)+"} = "+F(inv,4)+"$"};
  }
  // PP'
  if(k===1) return this.make(level);
  const pp = r2(Math.abs(zpb-zp));
  if(mode==="pp") return {data:{mode,k,zp,ans:pp}, q:"Es ist $\\overline{ZP} = "+cm(zp)+"$ und $k = "+kt+"$. Wie lang ist die Strecke $\\overline{PP'}$?", fig,
    fields:[{label:"$\\overline{PP'} =$", ans:pp, unit:"cm", wrong:[{v:zpb,msg:"Das ist ZP'. Gesucht ist der Abstand von P zu P'."}]}],
    hints:["Berechne zuerst $\\overline{ZP'}$.", k>1? "$\\overline{PP'} = \\overline{ZP'} - \\overline{ZP}$":"$\\overline{PP'} = \\overline{ZP} - \\overline{ZP'}$ (bei $k<1$ liegt $P'$ zwischen $Z$ und $P$)"],
    solution:"$\\overline{ZP'} = "+kt+" \\cdot "+cm(zp)+" = "+cm(zpb)+"$, &nbsp; $\\overline{PP'} = "+(k>1? cm(zpb)+" - "+cm(zp) : cm(zp)+" - "+cm(zpb))+" = "+cm(pp)+"$"};
  // pp2: k>1, ZP' und PP' gegeben
  if(k<1) return this.make(level);
  return {data:{mode,zpb,pp,ans:k}, q:"Bei einer Streckung mit $k&gt;1$ ist $\\overline{ZP'} = "+cm(zpb)+"$ und $\\overline{PP'} = "+cm(pp)+"$. Berechne $k$.", fig,
    fields:[{label:"$k =$", ans:k}], hints:["$\\overline{ZP} = \\overline{ZP'} - \\overline{PP'}$","Dann $k = \\overline{ZP'} : \\overline{ZP}$"],
    solution:"$\\overline{ZP} = "+cm(zpb)+" - "+cm(pp)+" = "+cm(zp)+"$; &nbsp; $k = "+cm(zpb)+" : "+cm(zp)+" = "+kt+"$"};
 }});

/* 3 ww – ähnlich? */
def({id:"ww", title:"Hauptähnlichkeitssatz ww", level:"muss", topic:"Modul 2", icon:"∠",
 desc:"Zwei Winkel gegeben – sind die Dreiecke ähnlich?",
 make(){
  let a,b,c;
  do{ a=R(25,95); b=R(25,95); c=180-a-b; }while(c<20||a===b||b===c||a===c);
  const similar = Math.random()<0.55;
  let t2 = App.shuffle([a,b,c]).slice(0,2);
  if(!similar){
    const d = P([-7,-5,-4,4,5,6,8]); t2 = [t2[0], t2[1]+d];
    const c2 = 180-t2[0]-t2[1];
    if(c2<15 || [a,b,c].indexOf(c2)>=0 || [a,b,c].indexOf(t2[1])>=0) return this.make();
  }
  const third1 = c, third2 = 180-t2[0]-t2[1];
  const s1 = [a,b,c].sort((x,y)=>x-y).join(","), s2 = [t2[0],t2[1],third2].sort((x,y)=>x-y).join(",");
  const isSim = s1===s2;
  return {data:{a,b,t2,ans:isSim}, type:"mc",
    q:"Dreieck $ABC$: $\\alpha = "+a+"^\\circ$, $\\beta = "+b+"^\\circ$. &nbsp; Dreieck $DEF$: $\\delta = "+t2[0]+"^\\circ$, $\\varepsilon = "+t2[1]+"^\\circ$. <br>Sind die Dreiecke ähnlich?",
    choices:["Ja, sie sind ähnlich (ww).","Nein, sie sind nicht ähnlich."], correct: isSim?0:1,
    why: "Dritte Winkel: $\\gamma = 180^\\circ - "+a+"^\\circ - "+b+"^\\circ = "+third1+"^\\circ$, $\\varphi = "+third2+"^\\circ$. Winkel $ABC$: "+[a,b,c].join("°, ")+"°; $DEF$: "+[t2[0],t2[1],third2].join("°, ")+"°.",
    wrongWhy:{0:"Berechne in beiden Dreiecken den dritten Winkel und vergleiche alle drei.",1:"Berechne in beiden Dreiecken den dritten Winkel – vielleicht stimmen doch zwei Winkel überein!"},
    hints:["Berechne jeweils den dritten Winkel: $180^\\circ$ minus die beiden gegebenen.","Ähnlich, wenn (mindestens) zwei Winkel in beiden Dreiecken vorkommen."],
    solution:"$\\gamma = "+third1+"^\\circ$, $\\varphi = "+third2+"^\\circ$. <br>$ABC$: $"+[a,b,c].join("^\\circ,\\ ")+"^\\circ$ &nbsp; $DEF$: $"+[t2[0],t2[1],third2].join("^\\circ,\\ ")+"^\\circ$ <br>"+(isSim?"Zwei (sogar alle drei) Winkel stimmen überein → <b>ähnlich</b>.":"Die Winkel stimmen nicht in zwei Winkeln überein → <b>nicht ähnlich</b>.")};
 }});

/* 4 Ähnliche Dreiecke: fehlende Seiten */
def({id:"seiten", title:"Fehlende Seiten berechnen", level:"muss", topic:"Modul 2", icon:"△",
 desc:"ΔABC ~ ΔDEF – k bestimmen, Seiten berechnen",
 make(level){
  let a,b,c;
  const trip = P([[3,4,5],[4,5,6],[5,6,7],[4,6,7],[3,5,6],[5,7,8],[6,8,9],[4,7,9],[2.4,3.2,4],[3.6,4.8,6]]);
  [a,b,c] = App.shuffle(trip);
  if(a+b<=c||a+c<=b||b+c<=a) return this.make(level);
  const k = level==="muss"? P([2,3,0.5,1.5,2.5]) : P([1.5,2.5,0.6,1.25,0.8,1.2,0.4,3.5]);
  const d = r2(a*k), e = r2(b*k), f = r2(c*k);   // DEF: EF=a*k (↔BC), FD=b*k(↔CA), DE=c*k(↔AB)
  const pts1 = triFromSides(a,b,c);
  const flip = level!=="muss" && Math.random()<0.5, rot = level==="muss"?0:P([0,90,160,200,250,-30]);
  const pts2raw = transform(triFromSides(a,b,c), rot, flip, 0, 0, Math.min(k,1.6));
  // Figur: beide nebeneinander
  const b1 = Object.values(pts1).map(p=>p[0]); const w1 = Math.max(...b1);
  const xs2 = Object.values(pts2raw).map(p=>p[0]), ys2 = Object.values(pts2raw).map(p=>p[1]);
  const ys1 = Object.values(pts1).map(p=>p[1]);
  const off = w1 + 1.6 - Math.min(...xs2), offy = Math.min(...ys1) - Math.min(...ys2);
  const p2 = {}; for(const kk in pts2raw) p2[{A:"D",B:"E",C:"F"}[kk]] = [pts2raw[kk][0]+off, pts2raw[kk][1]+offy];
  const known = P(["DE","EF","FD"]);
  const lab = {AB:cm(c), BC:cm(a), CA:cm(b)};
  const val = {DE:f, EF:d, FD:e}, corr = {DE:"AB", EF:"BC", FD:"CA"}, orig={DE:c, EF:a, FD:b};
  const unknowns = ["DE","EF","FD"].filter(s=>s!==known);
  const segs = [{p:"AB",label:F(c)+" cm",color:ORIG},{p:"BC",label:F(a)+" cm",color:ORIG},{p:"CA",label:F(b)+" cm",color:ORIG}];
  ["DE","EF","FD"].forEach(s=>segs.push({p:s, label: s===known? F(val[s])+" cm" : (s===unknowns[0]?"x":"y"), color:IMG}));
  const allPts = Object.assign({}, pts1, p2);
  const fig = Geo.Fig({pts:allPts, polys:[{p:"ABC",fill:"rgba(28,126,214,.10)",stroke:ORIG},{p:"DEF",fill:"rgba(232,89,12,.10)",stroke:IMG}], segs,
    angles:[{p:"CAB",color:GRN,r:20},{p:"FDE",color:GRN,r:20},{p:"ABC",color:"#7048e8",r:18,double:true},{p:"DEF",color:"#7048e8",r:18,double:true}],
    colors:{A:ORIG,B:ORIG,C:ORIG,D:IMG,E:IMG,F:IMG}, width:520, pad:34, note:"nicht maßstäblich"});
  const kk = val[known]/orig[known];
  return {data:{a,b,c,k,known,ans:[val[unknowns[0]],val[unknowns[1]]]},
    q:"Es gilt $\\triangle ABC \\sim \\triangle DEF$ (gleich markierte Winkel sind gleich groß). Berechne die Seitenlängen $x$ und $y$.", fig,
    fields:[{label:"$x = "+"\\overline{"+unknowns[0]+"} =$", ans:val[unknowns[0]], unit:"cm"},{label:"$y = \\overline{"+unknowns[1]+"} =$", ans:val[unknowns[1]], unit:"cm"}],
    hints:["Entsprechende Seiten liegen gegenüber von gleichen Winkeln: $\\overline{DE} \\leftrightarrow \\overline{AB}$, $\\overline{EF} \\leftrightarrow \\overline{BC}$, $\\overline{FD} \\leftrightarrow \\overline{CA}$.",
      "$k = \\dfrac{\\text{Bild}}{\\text{Urbild}} = \\dfrac{\\overline{"+known+"}}{\\overline{"+corr[known]+"}} = \\dfrac{"+F(val[known])+"}{"+F(orig[known])+"} = "+F(kk,4)+"$"],
    solution:"$k = \\dfrac{\\overline{"+known+"}}{\\overline{"+corr[known]+"}} = \\dfrac{"+cm(val[known])+"}{"+cm(orig[known])+"} = "+F(kk,4)+"$<br>"+
      "$x = \\overline{"+unknowns[0]+"} = k \\cdot \\overline{"+corr[unknowns[0]]+"} = "+F(kk,4)+" \\cdot "+cm(orig[unknowns[0]])+" = "+cm(val[unknowns[0]])+"$<br>"+
      "$y = \\overline{"+unknowns[1]+"} = k \\cdot \\overline{"+corr[unknowns[1]]+"} = "+F(kk,4)+" \\cdot "+cm(orig[unknowns[1]])+" = "+cm(val[unknowns[1]])+"$"};
 }});

/* 5 Ähnlichkeitssätze sss / sws / ww */
def({id:"saetze", title:"Ähnlich oder nicht? (sss, sws, ww)", level:"kann", topic:"Modul 2", icon:"≈",
 desc:"Mit dem passenden Ähnlichkeitssatz entscheiden",
 make(){
  const mode = P(["sss","sws"]);
  const k = P([1.5,2,2.5,0.5,3,0.4,1.2]);
  const sim = Math.random()<0.5;
  if(mode==="sss"){
    const [a,b,c] = P([[3,4,5],[4,5,6],[5,6,8],[4,6,7],[2,3,4],[6,7,9],[5,5,8]]);
    let d=r2(a*k), e=r2(b*k), f=r2(c*k);
    if(!sim){ const w = R(0,2); const arr=[d,e,f]; arr[w] = r2(arr[w] + P([-1,1,0.5,-0.5])*(k>=1?1:0.5)); [d,e,f]=arr;
      const srt=[d,e,f].sort((x,y)=>x-y); if(srt[0]<=0 || srt[0]+srt[1]<=srt[2]+0.2) return this.make(); }
    const q1 = [d/a, e/b, f/c];
    const isSim = Math.abs(q1[0]-q1[1])<1e-9 && Math.abs(q1[1]-q1[2])<1e-9;
    const order = App.shuffle([[d,"a"],[e,"b"],[f,"c"]]);
    return {data:{mode,a,b,c,d,e,f,ans:isSim}, type:"mc",
      q:"Dreieck 1 hat die Seiten $"+[a,b,c].map(F).join("\\,\\text{cm};\\ ")+"\\,\\text{cm}$. Dreieck 2 hat die Seiten $"+order.map(o=>F(o[0])).join("\\,\\text{cm};\\ ")+"\\,\\text{cm}$. Sind die Dreiecke ähnlich?",
      choices:["Ja, ähnlich (sss: alle Seitenverhältnisse gleich)","Nein, nicht ähnlich"], correct:isSim?0:1,
      hints:["Ordne beide Seitenlisten der Größe nach. Die kürzeste gehört zur kürzesten usw.","Berechne die drei Quotienten $\\frac{\\text{Seite in Dreieck 2}}{\\text{Seite in Dreieck 1}}$."],
      solution:"Sortiert: $"+F(a)+" \\leftrightarrow "+F(d)+"$, $"+F(b)+" \\leftrightarrow "+F(e)+"$, $"+F(c)+" \\leftrightarrow "+F(f)+"$<br>Quotienten: $"+q1.map(x=>F(x,3)).join(";\\ ")+"$ → "+(isSim?"alle gleich → <b>ähnlich</b> (sss), $k = "+F(q1[0],3)+"$":"nicht alle gleich → <b>nicht ähnlich</b>"),
      why:"", wrongWhy:{}};
  }
  if(mode==="sws"){
    const a = P([3,4,5,6]), b = P([4,5,6,7,8]), g = P([40,50,60,70,80,100,110]);
    const d = r2(a*k), e = r2(b*k);
    let g2 = g;
    let dd=d;
    if(!sim){ if(Math.random()<0.5) g2 = g + P([-10,10,15,-15]); else dd = r2(d + P([0.5,1,-0.5])); }
    const isSim = g2===g && Math.abs(dd/a - e/b)<1e-9;
    return {data:{mode,a,b,g,d:dd,e,g2,ans:isSim}, type:"mc",
      q:"Dreieck 1: $a = "+cm(a)+"$, $b = "+cm(b)+"$, eingeschlossener Winkel $\\gamma = "+g+"^\\circ$. <br>Dreieck 2: $a' = "+cm(dd)+"$, $b' = "+cm(e)+"$, eingeschlossener Winkel $\\gamma' = "+g2+"^\\circ$. <br>Sind die Dreiecke ähnlich?",
      choices:["Ja, ähnlich (sws)","Nein, nicht ähnlich"], correct:isSim?0:1,
      hints:["sws: Zwei Seitenverhältnisse gleich <b>und</b> der eingeschlossene Winkel gleich.","$\\frac{a'}{a}$ und $\\frac{b'}{b}$ vergleichen, dann die Winkel."],
      solution:"$\\frac{a'}{a} = \\frac{"+F(dd)+"}{"+F(a)+"} = "+F(dd/a,3)+"$, $\\frac{b'}{b} = \\frac{"+F(e)+"}{"+F(b)+"} = "+F(e/b,3)+"$; Winkel: $"+g+"^\\circ$ und $"+g2+"^\\circ$. → "+(isSim?"<b>ähnlich</b> (sws)":"<b>nicht ähnlich</b>")};
  }
 }});

/* 6 1. Strahlensatz */
def({id:"sts1", title:"1. Strahlensatz", level:"soll", topic:"Modul 3", icon:"⋀",
 desc:"Abschnitte auf den Strahlen berechnen (V-Figur)",
 make(level){
  const k = P([1.5,2,2.5,3,1.6,1.25,1.8,4/3]);
  let sa = P([2,2.4,3,3.5,4,4.5,5,6]), sb = P([2.5,3,3.2,4,4.8,5,6,7.5]);
  const saB = r2(sa*k), sbB = r2(sb*k);
  if(Math.abs(saB*100-Math.round(saB*100))>1e-6 || Math.abs(sbB-r1(sbB))>1e-9 || Math.abs(saB-r1(saB))>1e-9) return this.make(level);
  const aa = r2(saB-sa), bb = r2(sbB-sb);
  const mode = level==="kann"? P(["between","between2"]) : P(["tip","tip","between"]);
  if(mode==="tip"){ // SA, SA', SB gegeben -> SB'
    const L = {SA:F(sa)+" cm", AA_:F(aa)+" cm", SB:F(sb)+" cm", BB_:"x"};
    const ans = bb;
    return {data:{mode,sa,saB,sb,ans}, fig:figStrahlen(L,k,false),
      q:"Die Geraden $AB$ und $A'B'$ sind parallel. Es ist $\\overline{SA} = "+cm(sa)+"$, $\\overline{AA'} = "+cm(aa)+"$ und $\\overline{SB} = "+cm(sb)+"$. Berechne $x = \\overline{BB'}$.",
      fields:[{label:"$x =$", ans, unit:"cm", wrong:[{v:sbB,msg:"Das ist SB'. Gesucht ist nur das Stück BB'."}]}],
      hints:["1. Strahlensatz: $\\dfrac{\\overline{SA'}}{\\overline{SA}} = \\dfrac{\\overline{SB'}}{\\overline{SB}}$ oder auch $\\dfrac{\\overline{AA'}}{\\overline{SA}} = \\dfrac{\\overline{BB'}}{\\overline{SB}}$.","Direkt: $\\dfrac{x}{"+F(sb)+"} = \\dfrac{"+F(aa)+"}{"+F(sa)+"}$ &nbsp;→&nbsp; mit $"+F(sb)+"$ multiplizieren."],
      solution:"$\\dfrac{x}{\\overline{SB}} = \\dfrac{\\overline{AA'}}{\\overline{SA}}$ &nbsp;⟹&nbsp; $x = \\dfrac{"+F(aa)+" \\cdot "+F(sb)+"}{"+F(sa)+"}\\,\\text{cm} = "+cm(ans)+"$"};
  }
  if(mode==="between"){ // SA, SA' (ganz), SB' gegeben -> SB
    const L = {SA:F(sa)+" cm", SA_:"SA' = "+F(saB)+" cm", SB:"x", SB_:"SB' = "+F(sbB)+" cm"};
    return {data:{mode,sa,saB,sbB,ans:sb}, fig:figStrahlen(L,k,false),
      q:"Es gilt $AB \\parallel A'B'$. Gegeben: $\\overline{SA} = "+cm(sa)+"$, $\\overline{SA'} = "+cm(saB)+"$, $\\overline{SB'} = "+cm(sbB)+"$. Berechne $x = \\overline{SB}$.",
      fields:[{label:"$x =$", ans:sb, unit:"cm", wrong:[{v:r2(sbB*saB/sa),msg:"Verhältnis verkehrt herum aufgestellt – prüfe, was oben und was unten steht."}]}],
      hints:["$\\dfrac{\\overline{SB}}{\\overline{SB'}} = \\dfrac{\\overline{SA}}{\\overline{SA'}}$ (unbekannte Größe nach oben!)","$x = \\dfrac{"+F(sa)+"}{"+F(saB)+"} \\cdot "+F(sbB)+"$"],
      solution:"$\\dfrac{x}{"+F(sbB)+"} = \\dfrac{"+F(sa)+"}{"+F(saB)+"}$ &nbsp;⟹&nbsp; $x = \\dfrac{"+F(sa)+" \\cdot "+F(sbB)+"}{"+F(saB)+"}\\,\\text{cm} = "+cm(sb)+"$"};
  }
  // between2: AA', SB, BB' gegeben -> SA
  const L = {SA:"x", AA_:F(aa)+" cm", SB:F(sb)+" cm", BB_:F(bb)+" cm"};
  return {data:{mode,aa,sb,bb,ans:sa}, fig:figStrahlen(L,k,false),
    q:"Es gilt $AB \\parallel A'B'$. Gegeben: $\\overline{AA'} = "+cm(aa)+"$, $\\overline{SB} = "+cm(sb)+"$, $\\overline{BB'} = "+cm(bb)+"$. Berechne $x = \\overline{SA}$.",
    fields:[{label:"$x =$", ans:sa, unit:"cm"}],
    hints:["Auch Abschnitte zwischen den Parallelen darf man beim 1. Strahlensatz verwenden: $\\dfrac{\\overline{SA}}{\\overline{AA'}} = \\dfrac{\\overline{SB}}{\\overline{BB'}}$","$x = \\dfrac{"+F(sb)+"}{"+F(bb)+"} \\cdot "+F(aa)+"$"],
    solution:"$\\dfrac{x}{"+F(aa)+"} = \\dfrac{"+F(sb)+"}{"+F(bb)+"}$ &nbsp;⟹&nbsp; $x = \\dfrac{"+F(sb)+" \\cdot "+F(aa)+"}{"+F(bb)+"}\\,\\text{cm} = "+cm(sa)+"$"};
 }});

/* 7 2. Strahlensatz */
def({id:"sts2", title:"2. Strahlensatz", level:"soll", topic:"Modul 3", icon:"∥",
 desc:"Länge der Parallelstrecke berechnen",
 make(level){
  const k = P([1.5,2,2.5,3,1.25,1.6,1.8,1.2]);
  const sa = P([2,2.5,3,4,5,6]), ab = P([1.5,2,2.4,3,3.5,4,4.5]);
  const saB = r2(sa*k), abB = r2(ab*k), aa = r2(saB-sa);
  if(Math.abs(abB-r1(abB))>1e-9||Math.abs(saB-r1(saB))>1e-9) return this.make(level);
  const trap = level!=="muss" && Math.random()<0.5;
  if(!trap){
    const L = {SA:F(sa)+" cm", AA_:F(aa)+" cm", AB:F(ab)+" cm", A_B_:"x"};
    return {data:{mode:"ab",sa,aa,ab,ans:abB}, fig:figStrahlen(L,k,false),
      q:"Es gilt $AB \\parallel A'B'$. Gegeben: $\\overline{SA} = "+cm(sa)+"$, $\\overline{AA'} = "+cm(aa)+"$, $\\overline{AB} = "+cm(ab)+"$. Berechne $x = \\overline{A'B'}$.",
      fields:[{label:"$x =$", ans:abB, unit:"cm", wrong:[{v:r2(ab*aa/sa),msg:"Achtung Falle! Beim 2. Strahlensatz nur Strecken ab dem Scheitel S verwenden: SA' = SA + AA'."}]}],
      hints:["2. Strahlensatz: $\\dfrac{\\overline{A'B'}}{\\overline{AB}} = \\dfrac{\\overline{SA'}}{\\overline{SA}}$ – nur Abschnitte <b>vom Scheitel aus</b>!","$\\overline{SA'} = "+F(sa)+" + "+F(aa)+" = "+F(saB)+"$ cm"],
      solution:"$\\overline{SA'} = "+cm(sa)+" + "+cm(aa)+" = "+cm(saB)+"$<br>$\\dfrac{x}{"+F(ab)+"} = \\dfrac{"+F(saB)+"}{"+F(sa)+"}$ &nbsp;⟹&nbsp; $x = \\dfrac{"+F(saB)+" \\cdot "+F(ab)+"}{"+F(sa)+"}\\,\\text{cm} = "+cm(abB)+"$"};
  }
  // umgekehrt: A'B', AB, SA' gegeben -> SA
  const L = {SA:"x", SA_:"SA' = "+F(saB)+" cm", AB:F(ab)+" cm", A_B_:F(abB)+" cm"};
  return {data:{mode:"sa",saB,ab,abB,ans:sa}, fig:figStrahlen(L,k,false),
    q:"Es gilt $AB \\parallel A'B'$. Gegeben: $\\overline{AB} = "+cm(ab)+"$, $\\overline{A'B'} = "+cm(abB)+"$, $\\overline{SA'} = "+cm(saB)+"$. Berechne $x = \\overline{SA}$.",
    fields:[{label:"$x =$", ans:sa, unit:"cm"}],
    hints:["$\\dfrac{\\overline{SA}}{\\overline{SA'}} = \\dfrac{\\overline{AB}}{\\overline{A'B'}}$","$x = \\dfrac{"+F(ab)+"}{"+F(abB)+"} \\cdot "+F(saB)+"$"],
    solution:"$\\dfrac{x}{"+F(saB)+"} = \\dfrac{"+F(ab)+"}{"+F(abB)+"}$ &nbsp;⟹&nbsp; $x = \\dfrac{"+F(ab)+" \\cdot "+F(saB)+"}{"+F(abB)+"}\\,\\text{cm} = "+cm(sa)+"$"};
 }});

/* 8 X-Figur */
def({id:"stsx", title:"X-Figur (Scheitel zwischen den Parallelen)", level:"soll", topic:"Modul 3", icon:"✕",
 desc:"Strahlensätze, wenn sich die Geraden zwischen den Parallelen schneiden",
 make(){
  const k = P([1.5,2,2.5,0.5,1.25,0.8,1.2,3]);
  const sa = P([2,2.5,3,4,5,6]), sb = P([2,3,3.5,4,4.5]), ab = P([2,2.5,3,3.6,4]);
  const saB=r2(sa*k), sbB=r2(sb*k), abB=r2(ab*k);
  if([saB,sbB,abB].some(v=>Math.abs(v-r1(v))>1e-9)) return this.make();
  const mode = P(["seg","par","seg2"]);
  if(mode==="par"){
    const L = {SA:F(sa)+" cm", SA_:F(saB)+" cm", AB:F(ab)+" cm", A_B_:"x"};
    return {data:{mode,sa,saB,ab,ans:abB}, fig:figStrahlen(L,k,true),
      q:"Die Geraden $AA'$ und $BB'$ schneiden sich in $S$, und es gilt $AB \\parallel A'B'$. Gegeben: $\\overline{SA} = "+cm(sa)+"$, $\\overline{SA'} = "+cm(saB)+"$, $\\overline{AB} = "+cm(ab)+"$. Berechne $x = \\overline{A'B'}$.",
      fields:[{label:"$x =$", ans:abB, unit:"cm"}],
      hints:["Auch in der X-Figur gilt der 2. Strahlensatz: $\\dfrac{\\overline{A'B'}}{\\overline{AB}} = \\dfrac{\\overline{SA'}}{\\overline{SA}}$","$x = \\dfrac{"+F(saB)+"}{"+F(sa)+"} \\cdot "+F(ab)+"$"],
      solution:"$x = \\dfrac{\\overline{SA'}}{\\overline{SA}} \\cdot \\overline{AB} = \\dfrac{"+F(saB)+"}{"+F(sa)+"} \\cdot "+cm(ab)+" = "+cm(abB)+"$"};
  }
  if(mode==="seg"){
    const L = {SA:F(sa)+" cm", SA_:F(saB)+" cm", SB:F(sb)+" cm", SB_:"x"};
    return {data:{mode,sa,saB,sb,ans:sbB}, fig:figStrahlen(L,k,true),
      q:"In der X-Figur gilt $AB \\parallel A'B'$. Gegeben: $\\overline{SA} = "+cm(sa)+"$, $\\overline{SA'} = "+cm(saB)+"$, $\\overline{SB} = "+cm(sb)+"$. Berechne $x = \\overline{SB'}$.",
      fields:[{label:"$x =$", ans:sbB, unit:"cm"}],
      hints:["1. Strahlensatz in der X-Figur: $\\dfrac{\\overline{SB'}}{\\overline{SB}} = \\dfrac{\\overline{SA'}}{\\overline{SA}}$"],
      solution:"$x = \\dfrac{"+F(saB)+"}{"+F(sa)+"} \\cdot "+cm(sb)+" = "+cm(sbB)+"$"};
  }
  const L = {SA:"x", SA_:F(saB)+" cm", AB:F(ab)+" cm", A_B_:F(abB)+" cm"};
  return {data:{mode,saB,ab,abB,ans:sa}, fig:figStrahlen(L,k,true),
    q:"In der X-Figur gilt $AB \\parallel A'B'$. Gegeben: $\\overline{AB} = "+cm(ab)+"$, $\\overline{A'B'} = "+cm(abB)+"$, $\\overline{SA'} = "+cm(saB)+"$. Berechne $x = \\overline{SA}$.",
    fields:[{label:"$x =$", ans:sa, unit:"cm"}],
    hints:["$\\dfrac{\\overline{SA}}{\\overline{SA'}} = \\dfrac{\\overline{AB}}{\\overline{A'B'}}$"],
    solution:"$x = \\dfrac{"+F(ab)+"}{"+F(abB)+"} \\cdot "+cm(saB)+" = "+cm(sa)+"$"};
 }});

/* 9 Schatten */
def({id:"schatten", title:"Höhe über den Schatten", level:"soll", topic:"Modul 5", icon:"🌳",
 desc:"Baum, Turm, Laterne – Höhe mit Schattenlängen",
 make(){
  const obj = P([["Baum","🌳"],["Kirchturm","⛪"],["Fahnenmast","🚩"],["Laternenmast","💡"],["Schornstein","🏭"]]);
  const who = P([["die $1{,}6\\,\\text{m}$ große Lena",1.6],["der $1{,}8\\,\\text{m}$ große Tom",1.8],["ein $1{,}5\\,\\text{m}$ langer senkrechter Stab",1.5],["die $1{,}5\\,\\text{m}$ große Mia",1.5],["ein senkrecht gehaltener Meterstab ($1\\,\\text{m}$)",1]]);
  const hs = who[1];
  const ss = P([1.2,1.5,2,2.4,2.5,3,0.8,1.6]);
  const f = P([4,5,6,7.5,8,10,12,15]);
  const H = r2(hs*f), S = r2(ss*f);
  if(Math.abs(H-r1(H))>1e-9||Math.abs(S-r1(S))>1e-9) return this.make();
  const fig = Geo.Fig({pts:{B:[0,0],T:[0,H],E:[S,0],F:[S+1.2,0],G:[S+1.2,hs],E2:[S+1.2+ss,0]},
    segs:[{p:"BT",color:"#2b8a3e",width:6,label:"h = ?",side:-1,lcolor:"#2b8a3e"},{p:"BE",color:"#868e96",width:5,label:F(S)+" m",side:-1},{p:"TE",color:"#fab005",width:2,dash:"6 5"},
      {p:"FG",color:ORIG,width:5,label:F(hs)+" m",side:1,lcolor:ORIG},{p:"FE2",color:"#868e96",width:5,label:F(ss)+" m",side:-1},{p:"GE2",color:"#fab005",width:2,dash:"6 5"}],
    hide:["B","T","E","F","G","E2"], nodots:true, width:460, pad:30, note:"nicht maßstäblich"});
  return {data:{hs,ss,S,ans:H}, fig,
    q:obj[1]+" Ein "+obj[0]+" wirft einen $"+F(S)+"\\,\\text{m}$ langen Schatten. Zur gleichen Zeit wirft "+who[0]+" einen $"+F(ss)+"\\,\\text{m}$ langen Schatten. Wie hoch ist der "+obj[0]+"?",
    fields:[{label:"$h =$", ans:H, unit:"m", wrong:[{v:r2(S*ss/hs),msg:"Verhältnis verdreht: Höhe verhält sich zu Schatten wie Höhe zu Schatten."}]}],
    hints:["Die Sonnenstrahlen sind parallel → die beiden Dreiecke (Höhe, Schatten, Sonnenstrahl) sind ähnlich (ww: rechter Winkel und gleicher Sonnenwinkel).","$\\dfrac{h}{"+F(S)+"} = \\dfrac{"+F(hs)+"}{"+F(ss)+"}$"],
    solution:"$\\dfrac{h}{\\text{Schatten}} = \\dfrac{"+F(hs)+"\\,\\text{m}}{"+F(ss)+"\\,\\text{m}}$ &nbsp;⟹&nbsp; $h = \\dfrac{"+F(hs)+" \\cdot "+F(S)+"}{"+F(ss)+"}\\,\\text{m} = "+m_(H)+"$<br>Antwort: Der "+obj[0]+" ist $"+m_(H)+"$ hoch."};
 }});

/* 10 Fläche k² */
def({id:"flaeche", title:"Flächeninhalt bei Ähnlichkeit (k²)", level:"kann", topic:"Modul 4", icon:"▣",
 desc:"Wie ändert sich die Fläche beim Strecken?",
 make(){
  const mode = P(["A2","A2","k","A1"]);
  const k = P([2,3,0.5,1.5,2.5,4,0.4]);
  const A = P([4,5,6,8,10,12,20,24]);
  const A2raw = A*k*k, A2 = r2(A2raw);
  if(Math.abs(A2raw-A2)>1e-9) return this.make();
  if(mode==="A2") return {data:{mode,k,A,ans:A2}, q:"Eine Figur mit dem Flächeninhalt $A = "+F(A)+"\\,\\text{cm}^2$ wird mit $k = "+F(k)+"$ zentrisch gestreckt. Berechne den Flächeninhalt $A'$ des Bildes.",
    fields:[{label:"$A' =$", ans:A2, unit:"cm²", wrong:[{v:r2(A*k),msg:"Flächen wachsen nicht mit k, sondern mit k² (Länge UND Breite werden gestreckt)."}]}],
    hints:["Flächen ändern sich mit dem Faktor $k^2$.","$A' = k^2 \\cdot A = "+F(k)+"^2 \\cdot "+F(A)+"$"], solution:"$A' = k^2 \\cdot A = "+F(k*k)+" \\cdot "+F(A)+"\\,\\text{cm}^2 = "+F(A2)+"\\,\\text{cm}^2$"};
  if(mode==="A1") return {data:{mode,k,A2,ans:A}, q:"Nach einer Streckung mit $k = "+F(k)+"$ hat das Bild den Flächeninhalt $A' = "+F(A2)+"\\,\\text{cm}^2$. Wie groß war der Flächeninhalt des Originals?",
    fields:[{label:"$A =$", ans:A, unit:"cm²"}], hints:["$A' = k^2 \\cdot A$ nach $A$ umstellen."], solution:"$A = A' : k^2 = "+F(A2)+" : "+F(k*k)+" = "+F(A)+"\\,\\text{cm}^2$"};
  return {data:{mode,A,A2,ans:k}, q:"Ein Quadrat hat den Flächeninhalt $"+F(A)+"\\,\\text{cm}^2$. Ein dazu ähnliches Quadrat hat $"+F(A2)+"\\,\\text{cm}^2$. Mit welchem Faktor $k$ wurden die Seiten gestreckt?",
    fields:[{label:"$k =$", ans:k, wrong:[{v:k*k,msg:"Das ist k². Du brauchst noch die Wurzel."}]}], hints:["$\\dfrac{A'}{A} = k^2$","$k = \\sqrt{A' : A}$"], solution:"$k^2 = "+F(A2)+" : "+F(A)+" = "+F(k*k)+"$ &nbsp;⟹&nbsp; $k = \\sqrt{"+F(k*k)+"} = "+F(k)+"$"};
 }});

/* 11 Volumen k³ */
def({id:"volumen", title:"Volumen bei Ähnlichkeit (k³)", level:"kann", topic:"Modul 4", icon:"🧊",
 desc:"Wie ändert sich das Volumen beim Strecken?",
 make(){
  const mode = P(["V2","V2","k","ratio"]);
  const k = P([2,3,0.5,1.5,4,10]);
  const V = P([2,5,8,12,20,27,50]);
  const V2raw = V*k*k*k, V2 = r2(V2raw);
  if(Math.abs(V2raw-V2)>1e-9) return this.make();
  if(mode==="V2") return {data:{mode,k,V,ans:V2}, q:"Ein Körper mit dem Volumen $V = "+F(V)+"\\,\\text{cm}^3$ wird mit $k = "+F(k)+"$ ähnlich vergrößert bzw. verkleinert. Berechne das Volumen $V'$.",
    fields:[{label:"$V' =$", ans:V2, unit:"cm³", wrong:[{v:r2(V*k),msg:"Volumen wächst mit k³ (Länge, Breite UND Höhe)."},{v:r2(V*k*k),msg:"k² gilt für Flächen. Für Volumen: k³."}]}],
    hints:["Volumen ändern sich mit dem Faktor $k^3$.","$V' = "+F(k)+"^3 \\cdot "+F(V)+"$"], solution:"$V' = k^3 \\cdot V = "+F(k*k*k)+" \\cdot "+F(V)+"\\,\\text{cm}^3 = "+F(V2)+"\\,\\text{cm}^3$"};
  if(mode==="ratio"){ const kk = P([2,3,4,5,10]); return {data:{mode,kk,ans:kk*kk*kk}, q:"Ein Modellauto ist im Maßstab $1 : "+kk+"$ gebaut – also ist das Original $"+kk+"$-mal so lang. Wie viel Mal so groß ist das Volumen des Originals (bei gleicher Form)?",
    fields:[{label:"Faktor:", ans:kk*kk*kk}], hints:["$k = "+kk+"$, Volumen mit $k^3$."], solution:"$k^3 = "+kk+"^3 = "+(kk*kk*kk)+"$"}; }
  return {data:{mode,V,V2,ans:k}, q:"Ein Würfel hat das Volumen $"+F(V)+"\\,\\text{cm}^3$, ein dazu ähnlicher Würfel $"+F(V2)+"\\,\\text{cm}^3$. Mit welchem Faktor $k$ wurden die Kanten gestreckt?",
    fields:[{label:"$k =$", ans:k}], hints:["$\\dfrac{V'}{V} = k^3$","Dritte Wurzel ziehen: $k = \\sqrt[3]{V':V}$"], solution:"$k^3 = "+F(V2)+" : "+F(V)+" = "+F(k*k*k)+"$ &nbsp;⟹&nbsp; $k = \\sqrt[3]{"+F(k*k*k)+"} = "+F(k)+"$"};
 }});

/* 12 Försterdreieck / Daumensprung */
def({id:"foerster", title:"Försterdreieck & Daumensprung", level:"kann", topic:"Modul 5", icon:"📐",
 desc:"Messen mit ähnlichen Dreiecken im Gelände",
 make(){
  const mode = P(["foerster","daumen","foerster"]);
  if(mode==="foerster"){
    const auge = P([1.5,1.6,1.7]), dist = P([12,15,18,20,24,25]);
    const ratio = P([[1,1],[1,2],[2,3],[3,4]]); // gleichschenklig 1:1 oder Kathetenverhältnis
    const [g,a] = ratio;  // Dreieck: waagrechte Kathete a (zum Baum), senkrechte Kathete g
    const up = r2(dist*g/a), h = r2(up+auge);
    if(Math.abs(h-r1(h))>1e-9) return this.make();
    const fig = Geo.Fig({pts:{F:[0,0],A:[0,auge],T:[dist,h],B:[dist,0],Q:[dist,auge]}, segs:[{p:"FA",color:ORIG,width:4,label:F(auge)+" m",side:1},{p:"AQ",color:"#868e96",dash:"5 5",width:2,label:F(dist)+" m",side:-1},{p:"AT",color:"#fab005",width:2,dash:"6 4"},{p:"BT",color:GRN,width:6,label:"h",side:-1},{p:"FB",color:"#495057",width:2}],
      angles:[{p:"TQA",right:true,color:"#495057"}], hide:["F","B","Q"], labels:{A:{t:"Auge"},T:{t:"Spitze"}}, width:440, pad:36, note:"nicht maßstäblich"});
    return {data:{mode,auge,dist,g,a,ans:h}, fig,
      q:"Eine Försterin peilt mit einem rechtwinkligen Dreieck (Kathetenverhältnis senkrecht : waagerecht $= "+g+" : "+a+"$) die Spitze eines Baumes an. Sie steht $"+F(dist)+"\\,\\text{m}$ vom Baum entfernt, ihre Augenhöhe beträgt $"+F(auge)+"\\,\\text{m}$. Wie hoch ist der Baum?",
      fields:[{label:"$h =$", ans:h, unit:"m", wrong:[{v:up,msg:"Fast! Die Augenhöhe muss noch dazu."}]}],
      hints:["Das Peildreieck und das große Dreieck (Auge – Baum – Spitze) sind ähnlich.","Höhe über Augenhöhe: $x = "+F(dist)+" \\cdot \\frac{"+g+"}{"+a+"}$, dann $+\\,"+F(auge)+"\\,\\text{m}$."],
      solution:"$\\dfrac{x}{"+F(dist)+"} = \\dfrac{"+g+"}{"+a+"}$ &nbsp;⟹&nbsp; $x = "+m_(up)+"$. <br>$h = "+m_(up)+" + "+m_(auge)+" = "+m_(h)+"$"};
  }
  const arm = P([0.6,0.65,0.7]), aug = P([0.06,0.065,0.07]), sprung = P([10,12,15,20,24,30,40]);
  // Daumensprung: Entfernung / Sprungweite = Armlänge / Augenabstand
  const e = r2(sprung*arm/aug);
  if(Math.abs(e-Math.round(e))>1e-9) return this.make();
  return {data:{mode,arm,aug,sprung,ans:e},
    q:"Daumensprung: Der Arm ist $"+F(arm*100)+"\\,\\text{cm}$ lang, der Augenabstand beträgt $"+F(aug*100)+"\\,\\text{cm}$. Beim Wechsel des Auges „springt“ der Daumen an einem entfernten Haus um $"+F(sprung)+"\\,\\text{m}$ weiter. Wie weit ist das Haus ungefähr entfernt?",
    fields:[{label:"Entfernung:", ans:e, unit:"m", tol: e*0.01}],
    hints:["Ähnliche Dreiecke: $\\dfrac{\\text{Entfernung}}{\\text{Sprungweite}} = \\dfrac{\\text{Armlänge}}{\\text{Augenabstand}}$","Das Verhältnis Arm : Augenabstand ist $"+F(arm*100)+" : "+F(aug*100)+" = "+F(arm/aug,2)+"$."],
    solution:"$\\text{Entfernung} = "+F(sprung)+"\\,\\text{m} \\cdot \\dfrac{"+F(arm*100)+"}{"+F(aug*100)+"} = "+m_(e)+"$"};
 }});

GEN.list = LIST;
GEN.byLevel = function(lv){ const order={muss:0,soll:1,kann:2}; return LIST.filter(g=>order[g.level]<=order[lv]); };

/* ---------- Widget: Generator in einem Container ---------- */
GEN.widget = function(container, genId, opts){
  opts = opts||{};
  const c = typeof container==="string"? document.querySelector(container) : container;
  const g = GEN[genId];
  const wrap = document.createElement("div"); c.appendChild(wrap);
  const bar = document.createElement("div"); bar.className="btn-row";
  const nb = document.createElement("button"); nb.className="btn ghost"; nb.textContent="🎲 Neue Aufgabe";
  const sc = document.createElement("span"); sc.className="score-pill";
  bar.appendChild(nb); bar.appendChild(sc);
  const holder = document.createElement("div");
  wrap.appendChild(holder); wrap.appendChild(bar);
  function stat(){ const s=App.store.get(); const st=s.gen[genId]||{right:0,streak:0}; sc.innerHTML = "✓ "+st.right+" richtig · 🔥 Serie "+st.streak; }
  let solvedThis=false, counted=false, wrongThis=false;
  function fresh(){
    holder.innerHTML=""; solvedThis=false; counted=false; wrongThis=false;
    const t = g.make(opts.level||g.level);
    t.level = t.level || opts.level || g.level; t.title = t.title || g.title; t.num = opts.label || "🎲";
    const el = App.renderTask(t, {container:holder, nocount:true, fresh:true, onSolved:()=>{
      if(counted) return; counted=true;
      const s=App.store.get(); const st=s.gen[genId]=s.gen[genId]||{right:0,streak:0,tries:0};
      st.right++; st.streak++; st.best = Math.max(st.best||0, st.streak); if(!wrongThis) st.clean = (st.clean||0)+1; App.store.save(); stat();
      if(st.streak===5) App.toast("🔥 5 richtige in Folge – stark!");
    }});
    // falsche Antwort bricht die Serie
    el.addEventListener("click", e=>{ setTimeout(()=>{ if(el.querySelector(".feedback.bad")&&!counted){ const s=App.store.get(); const st=s.gen[genId]=s.gen[genId]||{right:0,streak:0}; let ch=false; if(!wrongThis){ wrongThis=true; st.wrong=(st.wrong||0)+1; ch=true; } if(st.streak){ st.streak=0; ch=true; } if(ch){ App.store.save(); stat(); } } },0); });
  }
  nb.onclick = fresh;
  stat(); fresh();
  return {fresh};
};
})();
