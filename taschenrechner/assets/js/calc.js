/* Selbst gezeichnete, interaktive Rechner-Grafik (SVG) + Displaysimulation. Eigene Arbeit – keine Fotos. */
(function(){
"use strict";
var TR = window.TR, NS = "http://www.w3.org/2000/svg";
var FC = [58.3,115,171.7,228.3,285,341.7], NC = [64,132,200,268,336];
var GEO = {
  ms:  {W:400,H:780,y0:240,y1:290,fr:[347,402,457],nr:[530,592,654,716],lcd:{x:54,y:92,w:292,h:92},bez:{x:36,y:74,w:328,h:128},fs:21},
  dex: {W:400,H:860,y0:320,y1:370,fr:[428,483,538],nr:[612,674,736,798],lcd:{x:48,y:110,w:304,h:140},bez:{x:32,y:94,w:336,h:176},fs:19}
};
var STY = {
  ms:  {body1:"#565b62",body2:"#2e3135",face:"#3a3e44",f1:"#3b3f45",f2:"#1f2226",ft:"#f1f3f5",n1:"#6a7078",n2:"#474c53",nt:"#ffffff",d1:"#6a7078",d2:"#474c53",dt:"#ff8a8a",r1:"#5c6168",r2:"#3c4046",sh:"#f7c948",al:"#ff7b7b",bl:"#74c0fc",edge:"#101214"},
  dex: {body1:"#2a2c30",body2:"#111214",face:"#1c1d20",f1:"#26282c",f2:"#0b0c0e",ft:"#ffffff",n1:"#3d4046",n2:"#26282c",nt:"#ffffff",d1:"#f2c94c",d2:"#d4a017",dt:"#1b1b1b",r1:"#26282c",r2:"#0b0c0e",sh:"#f2c14e",al:"#ff6b8a",bl:"#74c0fc",edge:"#000"}
};
function el(tag, attrs, parent){ var e=document.createElementNS(NS,tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if(parent) parent.appendChild(e); return e; }

/* SVG-Text mit ^{…} */
function svgText(parent, lab, x, y, size, fill, anchor, weight, italic){
  var t = el("text", {x:x, y:y, "font-size":size, fill:fill, "text-anchor":anchor||"middle", "font-weight":weight||800, "font-family":"Nunito, Arial, sans-serif"}, parent);
  if (italic) t.setAttribute("font-style","italic");
  if (lab==="FRAC" || lab==="MIXED" || lab==="PERIOD") { drawIcon(parent, lab, x, y, size, fill, anchor); t.remove(); return; }
  if (TR.SPECIAL[lab] && lab!=="ABC") lab = TR.SPECIAL[lab];
  if (lab==="ABC") { // a b/c
    var s1=el("tspan",{},t); s1.textContent="a ";
    var s2=el("tspan",{"font-size":size*0.72,dy:-size*0.28},t); s2.textContent="b";
    var s3=el("tspan",{"font-size":size*0.72,dy:size*0.28},t); s3.textContent="/c";
    return t;
  }
  var re=/\^\{([^}]*)\}/g, last=0, m;
  while ((m=re.exec(lab))){
    if (m.index>last){ var a=el("tspan",{},t); a.textContent=lab.slice(last,m.index); }
    var sp=el("tspan",{"font-size":size*0.66, dy:-size*0.38},t); sp.textContent=m[1];
    var back=el("tspan",{dy:size*0.38},t); back.textContent="\u200a";
    last=re.lastIndex;
  }
  if (last<lab.length){ var b=el("tspan",{},t); b.textContent=lab.slice(last); }
  return t;
}
function drawIcon(parent, lab, x, y, size, fill, anchor){
  var s=size/13, g=el("g",{},parent);
  var cx = anchor==="start" ? x+6*s : anchor==="end" ? x-6*s : x;
  if (lab==="FRAC"){
    el("rect",{x:cx-3.2*s,y:y-12*s,width:6.4*s,height:4.6*s,fill:fill},g);
    el("rect",{x:cx-5.5*s,y:y-6.4*s,width:11*s,height:1.3*s,fill:fill},g);
    el("rect",{x:cx-2.7*s,y:y-4*s,width:5.4*s,height:4*s,fill:"none",stroke:fill,"stroke-width":1.1*s},g);
  } else if (lab==="MIXED"){
    cx -= 3*s;
    el("rect",{x:cx-6*s,y:y-8*s,width:4.2*s,height:5*s,fill:fill},g);
    el("rect",{x:cx,y:y-10*s,width:4*s,height:3*s,fill:"none",stroke:fill,"stroke-width":s},g);
    el("rect",{x:cx-1*s,y:y-6*s,width:6*s,height:1*s,fill:fill},g);
    el("rect",{x:cx,y:y-4.4*s,width:4*s,height:3*s,fill:"none",stroke:fill,"stroke-width":s},g);
  } else if (lab==="PERIOD"){
    el("rect",{x:cx-3*s,y:y-7*s,width:6*s,height:6*s,fill:"none",stroke:fill,"stroke-width":1.1*s},g);
    el("rect",{x:cx-4*s,y:y-10*s,width:8*s,height:1.3*s,fill:fill},g);
  }
}

/* ungefähre Textbreite in Einheiten der Schriftgröße */
function tw(lab){
  if (lab==="FRAC"||lab==="PERIOD") return 1.0; if (lab==="MIXED") return 1.3;
  var t = TR.SPECIAL[lab] || lab; t = t.replace(/\^\{([^}]*)\}/g, function(_,a){ return a.length>0? "x".repeat(Math.ceil(a.length*0.66)) : ""; });
  var w=0; for (var i=0;i<t.length;i++){ var c=t[i]; w += /[ilI.,:;'!|]/.test(c)?0.32 : /[mwMW■□⇔]/.test(c)?0.95 : /[A-Z0-9#]/.test(c)?0.74 : 0.6; }
  return w;
}
function keyPos(m, k){
  var G=GEO[m];
  if (k.shape==="pad") return {x:200, y:(G.y0+G.y1)/2};
  if (k.row===0) return {x:FC[k.col], y:G.y0};
  if (k.row===1) return {x:FC[k.col], y:G.y1};
  if (k.row<=4) return {x:FC[k.col], y:G.fr[k.row-2]};
  return {x:NC[k.col], y:G.nr[k.row-5]};
}
function keySize(m, k){
  if (k.shape==="r") return m==="ms" ? {w:48,h:24,rx:12} : {w:50,h:26,rx:13};
  if (k.shape==="n") return {w:56,h:38,rx:9};
  return {w:46,h:27,rx:8};
}

function buildSVG(m, interactive){
  var G=GEO[m], S=STY[m];
  var svg = el("svg",{viewBox:"0 0 "+G.W+" "+G.H, role: interactive?"group":"img", "aria-label": (m==="ms"?"Casio fx-82MS":"Casio fx-87DE X")+" – selbst gezeichnete Abbildung"});
  var defs = el("defs",{},svg), uid = "g"+m+Math.floor(Math.random()*1e6);
  function grad(id,c1,c2,vert){ var g=el("linearGradient",{id:uid+id,x1:0,y1:0,x2:vert?0:1,y2:vert?1:0},defs); el("stop",{offset:"0","stop-color":c1},g); el("stop",{offset:"1","stop-color":c2},g); return "url(#"+uid+id+")"; }
  var gBody=grad("b",S.body1,S.body2,true), gF=grad("f",S.f1,S.f2,true), gN=grad("n",S.n1,S.n2,true), gD=grad("d",S.d1,S.d2,true), gR=grad("r",S.r1,S.r2,true);
  var gL = grad("l", m==="ms"?"#d3e0c9":"#dfe6d8", m==="ms"?"#b9c9ae":"#c7d1c0", true);
  // Gehäuse
  el("rect",{x:4,y:4,width:G.W-8,height:G.H-8,rx:m==="ms"?34:40,fill:gBody,stroke:S.edge,"stroke-width":3},svg);
  el("rect",{x:14,y:14,width:G.W-28,height:G.H-28,rx:m==="ms"?28:34,fill:"none",stroke:"rgba(255,255,255,.08)","stroke-width":2},svg);
  svgText(svg,"CASIO",40,52,22,"#f1f3f5","start",900).setAttribute("letter-spacing","3");
  if (m==="ms"){
    svgText(svg,"fx-82MS",360,52,18,"#e9ecef","end",900,true);
  } else {
    var sp = el("g",{},svg); el("rect",{x:238,y:26,width:126,height:48,rx:5,fill:"#2b1f1c",stroke:"#000"},sp);
    for (var i=1;i<6;i++) el("line",{x1:238+i*21,y1:27,x2:238+i*21,y2:73,stroke:"#46322c","stroke-width":1.4},sp);
    el("line",{x1:239,y1:50,x2:363,y2:50,stroke:"#46322c","stroke-width":1},sp);
    svgText(svg,"fx-87DE X",40,80,15,"#dee2e6","start",900);
  }
  // Display
  el("rect",{x:G.bez.x,y:G.bez.y,width:G.bez.w,height:G.bez.h,rx:12,fill:m==="ms"?"#23262a":"#0d0e10",stroke:"#000","stroke-width":2},svg);
  el("rect",{x:G.lcd.x,y:G.lcd.y,width:G.lcd.w,height:G.lcd.h,rx:4,fill:gL},svg);
  if (m==="ms") svgText(svg,"S-V.P.A.M.",G.bez.x+12,G.bez.y+G.bez.h-6,9,"#adb5bd","start",800);
  else svgText(svg,"CLASSWIZ",G.bez.x+G.bez.w-12,G.bez.y+G.bez.h-8,13,"#f06595","end",900,true).setAttribute("letter-spacing","1.5");
  // Steuerkreuz
  var pc={x:200,y:(G.y0+G.y1)/2};
  el("ellipse",{cx:pc.x,cy:pc.y,rx:62,ry:44,fill:m==="ms"?"#2a2d31":"#0b0c0e",stroke:"#000","stroke-width":2},svg);
  if (m==="ms") svgText(svg,"REPLAY",pc.x,pc.y-48,8.5,"#ced4da","middle",900);
  var keysG = el("g",{"class":"keys"},svg), byId={};
  TR.models[m].keys.forEach(function(k){
    var g = el("g",{"class":"key lvl"+(k.lvl||2),"data-id":k.id}, keysG);
    if (interactive){ g.setAttribute("tabindex","0"); g.setAttribute("role","button"); g.setAttribute("aria-label", k.name||k.id); }
    byId[k.id]=g;
    if (k.shape==="pad"){ drawPad(g,k,pc,m,S); return; }
    var p=keyPos(m,k), s=keySize(m,k), x=p.x-s.w/2, y=p.y-s.h/2;
    var hasAbove = k.shift||k.alpha||k.top||k.blue;
    el("rect",{"class":"hit",x:x-5,y:y-(hasAbove?16:5),width:s.w+10,height:s.h+(hasAbove?21:10),rx:8,fill:"rgba(0,0,0,0)"},g);
    el("rect",{"class":"glow",x:x-5,y:y-5,width:s.w+10,height:s.h+10,rx:s.rx+4,fill:"rgba(255,212,59,.45)",stroke:"#ffd43b","stroke-width":3},g);
    el("rect",{"class":"ring",x:x-4,y:y-4,width:s.w+8,height:s.h+8,rx:s.rx+3,fill:"none",stroke:"#4dabf7","stroke-width":3.5},g);
    el("rect",{"class":"ring2",x:x-3.5,y:y-3.5,width:s.w+7,height:s.h+7,rx:s.rx+3,fill:"none",stroke:"#ffd43b","stroke-width":2.5,"stroke-dasharray":"5 3"},g);
    var kb = el("g",{"class":"kb"},g);
    var fill = k.shape==="n" ? (k.keyc==="del"?gD:gN) : k.shape==="r" ? gR : gF;
    el("rect",{x:x,y:y+2.5,width:s.w,height:s.h,rx:s.rx,fill:"#000",opacity:.55},kb);
    el("rect",{x:x,y:y,width:s.w,height:s.h,rx:s.rx,fill:fill,stroke:"rgba(255,255,255,.12)","stroke-width":1},kb);
    // Beschriftung auf der Taste
    var tcol = k.shape==="n" ? (k.keyc==="del"?S.dt:S.nt) : S.ft;
    if (k.shape==="r"){
      var tc = k.top==="SHIFT"?S.sh : k.top==="ALPHA"?S.al : "#fff";
      svgText(kb, k.top, p.x, p.y+(m==="ms"?4:4.5), m==="ms"?10.5:11.5, tc, "middle", 900);
      if (k.top2) svgText(g,k.top2,p.x,y-5,10.5,S.sh,"middle",900);
    } else {
      var fs = k.shape==="n" ? (/^\d$/.test(k.label)?20:(k.label.length>3?13:17)) : (k.label.length>=5?11.5:(k.label.length>=4?12.5:14));
      if (k.label==="×10^{x}") fs = k.shape==="n"?14:12;
      if (k.label==="SQRTBOX"||k.label==="LOGBOX"||k.label==="SIGMA") fs=13;
      if (k.label==="FRAC") fs=17;
      svgText(kb, k.label, p.x, p.y+fs*0.36, fs, tcol, "middle", 800, k.italic);
    }
    // Zweitfunktionen oberhalb
    var ly = y-4.5, fz = k.shape==="n"?11.5:10.5;
    var second = k.alpha ? k.alpha.lab : k.blue;
    if (k.shift && second){
      var avail = s.w + 8, need = (tw(k.shift.lab) + tw(second)) * fz + 5;
      var f2 = need > avail ? Math.max(7.2, fz * avail / need) : fz;
      svgText(g,k.shift.lab,x-3,ly,f2,S.sh,"start",800);
      svgText(g,second,x+s.w+3,ly,k.alpha?f2:f2-0.5,k.alpha?S.al:S.bl,"end",800);
    }
    else if (k.shift){ svgText(g,k.shift.lab,p.x,ly,fz,S.sh,"middle",800); }
    else if (k.alpha){ svgText(g,k.alpha.lab,x+s.w+1,ly,fz,S.al,"end",800); }
    else if (k.blue){ svgText(g,k.blue,p.x,ly,fz,S.bl,"middle",800); }
    if (k.blue2 && m==="ms"){ svgText(g,k.blue2,x-1,y+s.h+10,8.5,S.bl,"start",800); svgText(g,k.blue3,x+s.w+1,y+s.h+10,8.5,S.bl,"end",800); }
  });
  return {svg:svg, byId:byId};
}
function drawPad(g,k,pc,m,S){
  var d = {up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}[k.dir], rx=58, ry=40;
  // Keil als Pfad
  var a0 = {right:-45,down:45,left:135,up:225}[k.dir], a1=a0+90;
  function pt(a,r1,r2){ var t=a*Math.PI/180; return [pc.x+Math.cos(t)*r1, pc.y+Math.sin(t)*r2]; }
  var p0=pt(a0,rx,ry), p1=pt(a1,rx,ry), q0=pt(a0,14,10), q1=pt(a1,14,10);
  var path="M"+q0+" L"+p0+" A"+rx+" "+ry+" 0 0 1 "+p1+" L"+q1+" A14 10 0 0 0 "+q0+"Z";
  el("path",{"class":"hit",d:path,fill:"rgba(0,0,0,0)"},g);
  el("path",{"class":"glow",d:path,fill:"rgba(255,212,59,.55)",stroke:"#ffd43b","stroke-width":2},g);
  el("path",{"class":"ring",d:path,fill:"none",stroke:"#4dabf7","stroke-width":3},g);
  el("path",{"class":"ring2",d:path,fill:"none",stroke:"#ffd43b","stroke-width":2,"stroke-dasharray":"5 3"},g);
  var kb=el("g",{"class":"kb"},g);
  el("path",{d:path,fill:m==="ms"?"#4a4f56":"#1f2125",stroke:"#000","stroke-width":1.2},kb);
  var cx=pc.x+d[0]*37, cy=pc.y+d[1]*25, s=6;
  var tri = d[0]!==0 ? [[cx+d[0]*s,cy],[cx-d[0]*s*0.6,cy-s],[cx-d[0]*s*0.6,cy+s]] : [[cx,cy+d[1]*s],[cx-s,cy-d[1]*s*0.6],[cx+s,cy-d[1]*s*0.6]];
  el("polygon",{points:tri.map(function(p){return p.join(",");}).join(" "),fill:"#f1f3f5"},kb);
}

/* ---------- 7-Segment (fx-82MS Ergebniszeile) ---------- */
var SEG = {a:[2,0,9,2.6],b:[10.4,1.4,2.6,8.9],c:[10.4,11.7,2.6,8.9],d:[2,19.4,9,2.6],e:[0,11.7,2.6,8.9],f:[0,1.4,2.6,8.9],g:[2,9.7,9,2.6]};
var DIG = {"0":"abcdef","1":"bc","2":"abged","3":"abgcd","4":"fgbc","5":"afgcd","6":"afgedc","7":"abc","8":"abcdefg","9":"abcdfg","-":"g","⌟":"cd"," ":""};
function segCells(str, x0, y0, sc, out){
  var x=x0;
  for (var i=0;i<str.length;i++){
    var ch=str[i];
    if (ch==="."||ch===","){ out.push('<circle cx="'+(x-2.2*sc)+'" cy="'+(y0+21*sc)+'" r="'+(1.6*sc)+'"/>'); if(ch===",") out.push('<path d="M'+(x-1.2*sc)+' '+(y0+21*sc)+' l-1.8 4" stroke="currentColor" stroke-width="'+(1.2*sc)+'"/>'); continue; }
    var segs = DIG[ch]; if (segs==null) continue;
    for (var j=0;j<segs.length;j++){ var r=SEG[segs[j]]; out.push('<rect x="'+(x+r[0]*sc)+'" y="'+(y0+r[1]*sc)+'" width="'+(r[2]*sc)+'" height="'+(r[3]*sc)+'" rx="'+(0.8*sc)+'"/>'); }
    x += 16*sc;
  }
  return x;
}
function sevenSeg(str){
  var m = /^(.*?)(\{E\|(-?\d+)\})?$/.exec(str), man=m[1], ex=m[3], out=[];
  var x = segCells(man, 2, 6, 1, out);
  if (ex!=null){
    out.push('<text x="'+(x+1)+'" y="26" font-size="10" font-weight="800" font-family="Nunito,Arial">×10</text>');
    x = segCells(ex, x+22, 0, 0.55, out);
  }
  var w = Math.max(x+2, 20);
  return '<svg viewBox="0 0 '+w+' 30" style="height:1.15em" fill="currentColor" aria-hidden="true">'+out.join("")+'</svg>';
}
TR.sevenSeg = sevenSeg;

/* ---------- Display rendern ---------- */
function renderLCD(div, m, st){
  st = st || {};
  div.className = "lcd "+m+(st.off?" off":"");
  var ind = (st.ind||"").split(/\s+/).filter(Boolean).map(function(x){ return "<span>"+TR.esc(x)+"</span>"; }).join("");
  var html = '<div class="ind">'+ind+'</div>';
  var text = [];
  if (st.menu){
    html += '<div class="menu">'+st.menu.map(TR.esc).join("\n")+'</div>';
    text.push(st.menu.join(" / "));
  } else if (st.table){
    html += '<table class="tt">'+st.table.map(function(r,i){ return "<tr>"+r.map(function(c){ return (i?"<td>":"<th>")+TR.esc(c)+(i?"</td>":"</th>"); }).join("")+"</tr>"; }).join("")+'</table>';
  } else {
    var o = st.o==null ? "" : String(st.o), isErr = /ERROR|Fehler/.test(o);
    if (m==="ms"){
      if (isErr){ html += '<div class="l1 err">'+TR.esc(o)+'</div><div class="l2"></div>'; }
      else {
        html += '<div class="l1">'+TR.md(st.i||"")+'</div>';
        var numeric = /^-?[0-9.,⌟]*(\{E\|-?\d+\})?$/.test(o) && o!=="";
        html += '<div class="l2">'+(numeric?sevenSeg(o):TR.md(o))+'</div>';
      }
    } else {
      if (isErr){ html += '<div class="l1 err" style="text-align:center;margin-top:.4em">'+TR.esc(o)+'</div><div class="l1" style="text-align:center;font-size:.55em">[AC] :Abbrechen</div>'; }
      else {
        var cur = (!st.i && !o) ? '<span class="cur">|</span>' : "";
        html += '<div class="l1">'+TR.md(st.i||"")+cur+'</div><div class="l2">'+TR.md(o)+'</div>';
      }
    }
    text.push((st.i?TR.mdText(st.i)+" ":"")+(o?"→ "+TR.mdText(o):""));
  }
  div.innerHTML = html;
  div.setAttribute("aria-label","Anzeige: "+text.join(" "));
}
TR.renderLCD = renderLCD;
/* eigenständiges kleines Display (für Beispiele, Quiz, Fehler) */
TR.lcdBox = function(m, st){
  var box = document.createElement("div"); box.className="lcdbox "+m;
  var d = document.createElement("div"); box.appendChild(d); d.setAttribute("role","img");
  renderLCD(d, m, st); return box;
};

/* ---------- Rechner-Komponente ---------- */
TR.Calc = function(container, m, opts){
  opts = opts || {};
  container.innerHTML=""; container.classList.add("calc-wrap");
  var b = buildSVG(m, !opts.mini), G=GEO[m];
  container.appendChild(b.svg);
  var lcd = document.createElement("div");
  lcd.style.left=(G.lcd.x/G.W*100)+"%"; lcd.style.top=(G.lcd.y/G.H*100)+"%"; lcd.style.width=(G.lcd.w/G.W*100)+"%"; lcd.style.height=(G.lcd.h/G.H*100)+"%";
  container.appendChild(lcd);
  function fit(){ var w = container.clientWidth || 300; lcd.style.fontSize = (w/400*G.fs)+"px"; }
  fit();
  if (window.ResizeObserver) new ResizeObserver(fit).observe(container); else window.addEventListener("resize", fit);
  var api = {el:container, svg:b.svg, byId:b.byId, model:m, timers:[]};
  api.setLCD = function(st){ renderLCD(lcd, m, st); };
  api.setLCD(opts.lcd || (m==="ms" ? {o:"0.", ind:"D"} : {i:"", o:"", ind:"D"}));
  api.select = function(id){ Object.keys(b.byId).forEach(function(k){ b.byId[k].classList.toggle("sel", k===id); }); };
  api.lit = function(id, on){ var g=b.byId[id]; if(g) g.classList.toggle("lit", on!==false); };
  api.clearLit = function(){ Object.keys(b.byId).forEach(function(k){ b.byId[k].classList.remove("lit"); }); };
  api.stop = function(){ api.timers.forEach(clearTimeout); api.timers=[]; api.clearLit(); };
  api.play = function(seq, o){
    o = o || {}; api.stop();
    var toks = Array.isArray(seq) ? seq : TR.tokens(seq, m), dt = o.step || 620, i=0;
    function next(){
      api.clearLit();
      if (i>=toks.length){ if (o.onDone) o.onDone(); return; }
      var id = toks[i]; api.lit(id, true); if (o.onKey) o.onKey(id, i);
      i++;
      api.timers.push(setTimeout(function(){ api.lit(id,false); api.timers.push(setTimeout(next, dt*0.25)); }, dt*0.75));
    }
    api.timers.push(setTimeout(next, o.delay||150));
  };
  api.flash = function(id){ var g=b.byId[id]; if(!g) return; g.classList.add("press","lit"); setTimeout(function(){ g.classList.remove("press","lit"); }, 220); };
  if (!opts.mini){
    var handler = function(ev){
      var g = ev.target.closest ? ev.target.closest(".key") : null; if (!g) return;
      if (ev.type==="keydown" && ev.key!=="Enter" && ev.key!==" ") return;
      ev.preventDefault();
      api.flash(g.getAttribute("data-id"));
      if (opts.onKey) opts.onKey(g.getAttribute("data-id"));
    };
    b.svg.addEventListener("click", handler);
    b.svg.addEventListener("keydown", handler);
  } else {
    b.svg.setAttribute("aria-hidden","true");
  }
  return api;
};
TR.mini = function(){
  document.querySelectorAll("[data-mini]").forEach(function(d){
    var m=d.getAttribute("data-mini");
    TR.Calc(d, m, {mini:true, lcd: m==="ms" ? {i:"2⌟3+1⌟5", o:"13⌟15.", ind:"D"} : {i:"{f|2|3}+{f|1|5}", o:"{f|13|15}", ind:"D"}});
  });
};
})();
