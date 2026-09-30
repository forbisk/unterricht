/* Kleine SVG-Geometriebibliothek (ohne externe Abhängigkeiten)
   - Board: interaktive Zeichenfläche mit ziehbaren Punkten (Maus + Touch)
   - Fig:   statische Figuren als SVG-Text für Aufgaben                      */
(function(){
"use strict";
const NS = "http://www.w3.org/2000/svg";
const G = window.Geo = {};
G.dist = (a,b)=> Math.hypot(b.x-a.x, b.y-a.y);
G.sub = (a,b)=>({x:a.x-b.x, y:a.y-b.y});
G.add = (a,b)=>({x:a.x+b.x, y:a.y+b.y});
G.mul = (a,k)=>({x:a.x*k, y:a.y*k});
G.lerp = (a,b,t)=>({x:a.x+(b.x-a.x)*t, y:a.y+(b.y-a.y)*t});
G.stretch = (Z,P,k)=>({x:Z.x+k*(P.x-Z.x), y:Z.y+k*(P.y-Z.y)});
G.angle = (A,B,C)=>{ // Winkel bei B in Grad
  const u = G.sub(A,B), v = G.sub(C,B);
  const c = (u.x*v.x+u.y*v.y)/(Math.hypot(u.x,u.y)*Math.hypot(v.x,v.y));
  return Math.acos(Math.max(-1,Math.min(1,c)))*180/Math.PI;
};
G.cross = (a,b)=> a.x*b.y-a.y*b.x;
G.intersect = (p1,p2,p3,p4)=>{ // Schnitt der Geraden p1p2 und p3p4
  const d = G.cross(G.sub(p2,p1), G.sub(p4,p3));
  if(Math.abs(d)<1e-12) return null;
  const t = G.cross(G.sub(p3,p1), G.sub(p4,p3))/d;
  return G.lerp(p1,p2,t);
};
function el(tag, attrs, parent){
  const e = document.createElementNS(NS, tag);
  for(const k in attrs) e.setAttribute(k, attrs[k]);
  if(parent) parent.appendChild(e);
  return e;
}
G.el = el;
const val = (v)=> typeof v === "function" ? v() : v;

/* ================= Board ================= */
class Board{
  constructor(container, o){
    this.o = Object.assign({xmin:-1, xmax:13, ymin:-1, ymax:9, grid:1, gridSub:0, axes:false, scale:50}, o||{});
    const W = (this.o.xmax-this.o.xmin)*this.o.scale, H = (this.o.ymax-this.o.ymin)*this.o.scale;
    this.W=W; this.H=H;
    this.svg = el("svg", {viewBox:"0 0 "+W+" "+H, role:"img", "aria-label": this.o.label || "Interaktive Zeichnung"});
    (typeof container==="string"?document.querySelector(container):container).appendChild(this.svg);
    this.gGrid = el("g",{},this.svg); this.gFill = el("g",{},this.svg); this.gLines = el("g",{},this.svg);
    this.gTop = el("g",{},this.svg); this.gText = el("g",{},this.svg); this.gPts = el("g",{},this.svg);
    this.items = []; this.listeners = [];
    if(this.o.grid) this.drawGrid();
    this.initDrag();
  }
  X(x){ return (x-this.o.xmin)*this.o.scale; }
  Y(y){ return (this.o.ymax-y)*this.o.scale; }
  toWorld(cx, cy){
    const pt = this.svg.createSVGPoint(); pt.x=cx; pt.y=cy;
    const m = this.svg.getScreenCTM(); if(!m) return {x:0,y:0};
    const p = pt.matrixTransform(m.inverse());
    return {x: p.x/this.o.scale + this.o.xmin, y: this.o.ymax - p.y/this.o.scale};
  }
  drawGrid(){
    const o=this.o, g=this.gGrid;
    el("rect",{x:0,y:0,width:this.W,height:this.H,fill:"#fbfcff"},g);
    const step = o.grid;
    for(let x=Math.ceil(o.xmin/step)*step; x<=o.xmax+1e-9; x+=step){
      const major = o.major && Math.abs(Math.round(x/o.major)*o.major-x)<1e-9;
      el("line",{x1:this.X(x),y1:0,x2:this.X(x),y2:this.H,stroke:major?"#c9d3e6":"#e3e8f2","stroke-width":major?1.2:1},g);
    }
    for(let y=Math.ceil(o.ymin/step)*step; y<=o.ymax+1e-9; y+=step){
      const major = o.major && Math.abs(Math.round(y/o.major)*o.major-y)<1e-9;
      el("line",{x1:0,y1:this.Y(y),x2:this.W,y2:this.Y(y),stroke:major?"#c9d3e6":"#e3e8f2","stroke-width":major?1.2:1},g);
    }
  }
  /* ----- Elemente ----- */
  point(x, y, opt){
    opt = Object.assign({name:"", color:"#1c7ed6", r:7, drag:true, snap:0, labelOff:{x:10,y:-12}}, opt||{});
    const P = {x, y, opt, board:this, isPoint:true};
    const g = el("g", {class: opt.drag?"pt":""}, opt.layer==="text"?this.gText:this.gPts);
    const halo = el("circle", {r: opt.drag? 22 : 0, class:"halo"}, g);
    const c = el("circle", {r: opt.r, fill: opt.fill||opt.color, stroke:"#fff", "stroke-width":2.5}, g);
    const t = el("text", {class:"svg-label", fill: opt.color, "font-size": opt.fontSize||17}, g);
    t.textContent = opt.name;
    if(opt.drag){ g.setAttribute("tabindex","0"); g.setAttribute("aria-label","Punkt "+opt.name+" (ziehbar, Pfeiltasten)"); }
    P.g = g;
    P.update = ()=>{
      if(opt.pos){ const q = opt.pos(); P.x=q.x; P.y=q.y; }
      const vis = opt.visible? opt.visible() : true;
      g.style.display = vis ? "" : "none";
      halo.setAttribute("cx", this.X(P.x)); halo.setAttribute("cy", this.Y(P.y));
      c.setAttribute("cx", this.X(P.x)); c.setAttribute("cy", this.Y(P.y));
      const lo = val(opt.labelOff);
      t.setAttribute("x", this.X(P.x)+lo.x); t.setAttribute("y", this.Y(P.y)+lo.y);
      if(opt.labelFn) t.textContent = opt.labelFn();
    };
    if(opt.drag){
      g.addEventListener("pointerdown", (e)=>{ e.preventDefault(); this.dragging = P; this.svg.setPointerCapture && this.svg.setPointerCapture(e.pointerId); g.classList.add("drag"); });
      g.addEventListener("keydown", (e)=>{
        const st = opt.snap || 0.1; let dx=0, dy=0;
        if(e.key==="ArrowLeft") dx=-st; else if(e.key==="ArrowRight") dx=st; else if(e.key==="ArrowUp") dy=st; else if(e.key==="ArrowDown") dy=-st; else return;
        e.preventDefault(); this.movePoint(P, P.x+dx, P.y+dy);
      });
    }
    this.items.push(P);
    return P;
  }
  movePoint(P, x, y){
    const o = this.o, opt = P.opt;
    if(opt.snap){ x = Math.round(x/opt.snap)*opt.snap; y = Math.round(y/opt.snap)*opt.snap; }
    const m = 0.2;
    x = Math.max(o.xmin+m, Math.min(o.xmax-m, x)); y = Math.max(o.ymin+m, Math.min(o.ymax-m, y));
    if(opt.constrain){ const q = opt.constrain({x,y}); if(!q) return; x=q.x; y=q.y; }
    P.x = x; P.y = y;
    this.update();
  }
  initDrag(){
    const mv = (e)=>{ if(!this.dragging) return; e.preventDefault(); const w = this.toWorld(e.clientX, e.clientY); this.movePoint(this.dragging, w.x, w.y); };
    const up = ()=>{ if(this.dragging){ this.dragging.g.classList.remove("drag"); this.dragging=null; this.listeners.forEach(f=>f("end")); } };
    this.svg.addEventListener("pointermove", mv);
    this.svg.addEventListener("pointerup", up);
    this.svg.addEventListener("pointercancel", up);
    this.svg.addEventListener("pointerleave", up);
    if(this.o.onClick) this.svg.addEventListener("click", (e)=>{ if(e.target.closest(".pt")) return; this.o.onClick(this.toWorld(e.clientX,e.clientY)); });
  }
  _line(parent, opt, fn){
    const l = el("line", {stroke: opt.color||"#333", "stroke-width": opt.width||3, "stroke-linecap":"round"}, parent);
    if(opt.dash) l.setAttribute("stroke-dasharray", opt.dash);
    if(opt.marker) l.setAttribute("marker-end", opt.marker);
    const item = {update: ()=>{ const vis = opt.visible? opt.visible():true; l.style.display = vis?"":"none"; if(!vis) return; const s = fn(); if(!s){ l.style.display="none"; return; } l.setAttribute("x1",this.X(s[0].x)); l.setAttribute("y1",this.Y(s[0].y)); l.setAttribute("x2",this.X(s[1].x)); l.setAttribute("y2",this.Y(s[1].y)); if(opt.colorFn) l.setAttribute("stroke", opt.colorFn()); }, node:l};
    this.items.push(item); return item;
  }
  segment(A, B, opt){ opt=opt||{}; return this._line(opt.top?this.gTop:this.gLines, opt, ()=>[val(A), val(B)]); }
  ray(A, B, opt){ // von A durch B bis zum Rand
    opt=opt||{};
    return this._line(this.gLines, opt, ()=>{ const a=val(A), b=val(B); const d=G.sub(b,a); const L=Math.hypot(d.x,d.y); if(L<1e-9) return null; const big=(this.o.xmax-this.o.xmin+this.o.ymax-this.o.ymin)*2; return [a, G.add(a, G.mul(d, big/L))]; });
  }
  line(A, B, opt){
    opt=opt||{};
    return this._line(this.gLines, opt, ()=>{ const a=val(A), b=val(B); const d=G.sub(b,a); const L=Math.hypot(d.x,d.y); if(L<1e-9) return null; const big=(this.o.xmax-this.o.xmin+this.o.ymax-this.o.ymin)*2; return [G.add(a,G.mul(d,-big/L)), G.add(a, G.mul(d, big/L))]; });
  }
  polygon(ptsFn, opt){
    opt=opt||{};
    const p = el("polygon", {fill: opt.fill||"rgba(28,126,214,.12)", stroke: opt.stroke||"none", "stroke-width": opt.width||0, "stroke-linejoin":"round"}, opt.top?this.gTop:this.gFill);
    if(opt.dash) p.setAttribute("stroke-dasharray", opt.dash);
    const item = {node:p, update: ()=>{ const vis = opt.visible? opt.visible():true; p.style.display = vis?"":"none"; if(!vis) return; p.setAttribute("points", val(ptsFn).map(q=>this.X(q.x)+","+this.Y(q.y)).join(" ")); if(opt.fillFn) p.setAttribute("fill", opt.fillFn()); }};
    this.items.push(item); return item;
  }
  circle(C, r, opt){
    opt=opt||{};
    const c = el("circle", {fill: opt.fill||"none", stroke: opt.stroke||"#333", "stroke-width": opt.width||2}, opt.top?this.gTop:this.gLines);
    if(opt.dash) c.setAttribute("stroke-dasharray", opt.dash);
    const item = {node:c, update: ()=>{ const vis = opt.visible? opt.visible():true; c.style.display = vis?"":"none"; if(!vis) return; const q=val(C); c.setAttribute("cx",this.X(q.x)); c.setAttribute("cy",this.Y(q.y)); c.setAttribute("r", val(r)*this.o.scale); }};
    this.items.push(item); return item;
  }
  text(pos, str, opt){
    opt=opt||{};
    const t = el("text", {class:"svg-label", fill: opt.color||"#333", "font-size": opt.size||15, "text-anchor": opt.anchor||"middle", "dominant-baseline":"middle"}, this.gText);
    if(opt.weight) t.setAttribute("font-weight", opt.weight);
    const item = {node:t, update: ()=>{ const vis = opt.visible? opt.visible():true; t.style.display = vis?"":"none"; if(!vis) return; const q=val(pos); t.setAttribute("x", this.X(q.x)+(opt.dx||0)); t.setAttribute("y", this.Y(q.y)+(opt.dy||0)); t.textContent = val(str); if(opt.colorFn) t.setAttribute("fill", opt.colorFn()); }};
    this.items.push(item); return item;
  }
  /* Winkelbogen bei B zwischen BA und BC, Beschriftung mit Gradzahl */
  angle(A, B, C, opt){
    opt = Object.assign({r:0.7, color:"#2b8a3e", label:true}, opt||{});
    const path = el("path", {fill: opt.fill||"rgba(43,138,62,.15)", stroke: opt.color, "stroke-width":2}, this.gTop);
    const t = el("text", {class:"svg-label", fill: opt.color, "font-size": opt.size||13, "text-anchor":"middle", "dominant-baseline":"middle"}, this.gText);
    const item = {update: ()=>{
      const vis = opt.visible? opt.visible():true; path.style.display = t.style.display = vis?"":"none"; if(!vis) return;
      const a=val(A), b=val(B), c=val(C);
      const r = val(opt.r)*this.o.scale;
      let a1 = Math.atan2(-(a.y-b.y), a.x-b.x), a2 = Math.atan2(-(c.y-b.y), c.x-b.x);
      let d = a2-a1; while(d<=-Math.PI) d+=2*Math.PI; while(d>Math.PI) d-=2*Math.PI;
      const bx=this.X(b.x), by=this.Y(b.y);
      const p1 = [bx+r*Math.cos(a1), by+r*Math.sin(a1)], p2=[bx+r*Math.cos(a1+d), by+r*Math.sin(a1+d)];
      path.setAttribute("d", "M"+bx+","+by+" L"+p1+" A"+r+","+r+" 0 0 "+(d>0?1:0)+" "+p2+" Z");
      const mid = a1+d/2, rr = r+ (opt.labelDist||16);
      t.setAttribute("x", bx+rr*Math.cos(mid)); t.setAttribute("y", by+rr*Math.sin(mid));
      t.textContent = opt.label ? (typeof opt.label==="function"? opt.label() : (G.angle(a,b,c).toFixed(opt.dec||0).replace(".",",")+"°")) : "";
    }};
    this.items.push(item); return item;
  }
  onUpdate(f){ this.listeners.push(f); }
  update(){ this.items.forEach(i=>i.update()); this.listeners.forEach(f=>f("move")); }
}
G.Board = Board;

/* ================= Statische Figuren =================
 spec = { pts:{A:[x,y],...}  (y nach oben),
          polys:[{p:"ABC", fill, stroke}], segs:[{p:"AB", label, color, dash, width, side:1|-1}],
          rays:[{from:"S", through:"A", ext:1.2}], angles:[{p:"BAC", label, color, right:true}],
          labels:{A:{dx,dy}} , hide:["X"], extra:[svg-string], width, pad }            */
const tok = p=> Array.isArray(p)? p : p.match(/[A-Z][0-9]*_?/g);
G.Fig = function(spec){
  const pts = {};
  for(const k in spec.pts) pts[k] = {x:spec.pts[k][0], y:spec.pts[k][1]};
  // Strahlen verlängern
  (spec.rays||[]).forEach((r,i)=>{ const a=pts[r.from], b=pts[r.through]; pts["_r"+i] = G.lerp(a,b,r.ext||1.25); });
  let xs=[], ys=[];
  for(const k in pts){ xs.push(pts[k].x); ys.push(pts[k].y); }
  const minx=Math.min(...xs), maxx=Math.max(...xs), miny=Math.min(...ys), maxy=Math.max(...ys);
  const W = spec.width || 420;
  const pad = spec.pad!==undefined? spec.pad : 40;
  const sc = (W-2*pad)/Math.max(maxx-minx, 1e-9);
  let H = (maxy-miny)*sc + 2*pad;
  if(spec.maxH && H>spec.maxH){ /* ok, CSS begrenzt */ }
  const X = x=> pad + (x-minx)*sc, Y = y=> H - pad - (y-miny)*sc;
  const P = k=>({x:X(pts[k].x), y:Y(pts[k].y)});
  let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W.toFixed(0)+' '+H.toFixed(0)+'" width="'+W.toFixed(0)+'" role="img" aria-label="'+(spec.aria||"Abbildung")+'" style="font-family:Inter,sans-serif">';
  const cx = xs.reduce((a,b)=>a+b,0)/xs.length, cy = ys.reduce((a,b)=>a+b,0)/ys.length;
  (spec.polys||[]).forEach(p=>{ s += '<polygon points="'+tok(p.p).map(k=>{const q=P(k); return q.x.toFixed(1)+","+q.y.toFixed(1);}).join(" ")+'" fill="'+(p.fill||"rgba(28,126,214,.10)")+'" stroke="'+(p.stroke||"none")+'" stroke-width="'+(p.width||2.5)+'" stroke-linejoin="round"/>'; });
  (spec.rays||[]).forEach((r,i)=>{ const a=P(r.from), b=P("_r"+i); s += '<line x1="'+a.x.toFixed(1)+'" y1="'+a.y.toFixed(1)+'" x2="'+b.x.toFixed(1)+'" y2="'+b.y.toFixed(1)+'" stroke="'+(r.color||"#868e96")+'" stroke-width="'+(r.width||2)+'"'+(r.dash?' stroke-dasharray="'+r.dash+'"':'')+'/>'; });
  (spec.angles||[]).forEach(a=>{
    const ap = tok(a.p); const A=P(ap[0]), B=P(ap[1]), C=P(ap[2]); const r = a.r||26;
    const a1=Math.atan2(A.y-B.y,A.x-B.x), a2=Math.atan2(C.y-B.y,C.x-B.x);
    let d=a2-a1; while(d<=-Math.PI) d+=2*Math.PI; while(d>Math.PI) d-=2*Math.PI;
    const col = a.color||"#2b8a3e";
    if(a.right){
      const u={x:Math.cos(a1),y:Math.sin(a1)}, v={x:Math.cos(a2),y:Math.sin(a2)}, q=16;
      s += '<path d="M'+(B.x+u.x*q)+','+(B.y+u.y*q)+' L'+(B.x+u.x*q+v.x*q)+','+(B.y+u.y*q+v.y*q)+' L'+(B.x+v.x*q)+','+(B.y+v.y*q)+'" fill="none" stroke="'+col+'" stroke-width="2"/>';
      s += '<circle cx="'+(B.x+(u.x+v.x)*q*0.5)+'" cy="'+(B.y+(u.y+v.y)*q*0.5)+'" r="2" fill="'+col+'"/>';
    } else {
      const p1=[B.x+r*Math.cos(a1),B.y+r*Math.sin(a1)], p2=[B.x+r*Math.cos(a1+d),B.y+r*Math.sin(a1+d)];
      s += '<path d="M'+B.x.toFixed(1)+','+B.y.toFixed(1)+' L'+p1.map(v=>v.toFixed(1))+' A'+r+','+r+' 0 0 '+(d>0?1:0)+' '+p2.map(v=>v.toFixed(1))+' Z" fill="'+(a.fill||"rgba(43,138,62,.18)")+'" stroke="'+col+'" stroke-width="2"/>';
      if(a.double){ const r2=r-5; const q1=[B.x+r2*Math.cos(a1),B.y+r2*Math.sin(a1)], q2=[B.x+r2*Math.cos(a1+d),B.y+r2*Math.sin(a1+d)]; s+='<path d="M'+q1.map(v=>v.toFixed(1))+' A'+r2+','+r2+' 0 0 '+(d>0?1:0)+' '+q2.map(v=>v.toFixed(1))+'" fill="none" stroke="'+col+'" stroke-width="2"/>'; }
    }
    if(a.label){ const mid=a1+d/2, rr=(a.right?22:r)+(a.ld||16); s += '<text x="'+(B.x+rr*Math.cos(mid)).toFixed(1)+'" y="'+(B.y+rr*Math.sin(mid)).toFixed(1)+'" fill="'+col+'" font-size="'+(a.size||14)+'" font-weight="700" text-anchor="middle" dominant-baseline="middle" paint-order="stroke" stroke="#fff" stroke-width="4">'+a.label+'</text>'; }
  });
  (spec.segs||[]).forEach(g=>{
    const gp = tok(g.p); const A=P(gp[0]), B=P(gp[1]);
    s += '<line x1="'+A.x.toFixed(1)+'" y1="'+A.y.toFixed(1)+'" x2="'+B.x.toFixed(1)+'" y2="'+B.y.toFixed(1)+'" stroke="'+(g.color||"#212529")+'" stroke-width="'+(g.width||3)+'" stroke-linecap="round"'+(g.dash?' stroke-dasharray="'+g.dash+'"':'')+'/>';
    if(g.arrows){ // Parallel-Markierung
      const m = {x:(A.x+B.x)/2, y:(A.y+B.y)/2}, L=Math.hypot(B.x-A.x,B.y-A.y), u={x:(B.x-A.x)/L,y:(B.y-A.y)/L}, n={x:-u.y,y:u.x};
      for(let i=0;i<g.arrows;i++){ const c={x:m.x+u.x*(i*9-4*(g.arrows-1)), y:m.y+u.y*(i*9-4*(g.arrows-1))};
        s += '<path d="M'+(c.x-u.x*6+n.x*6).toFixed(1)+','+(c.y-u.y*6+n.y*6).toFixed(1)+' L'+c.x.toFixed(1)+','+c.y.toFixed(1)+' L'+(c.x-u.x*6-n.x*6).toFixed(1)+','+(c.y-u.y*6-n.y*6).toFixed(1)+'" fill="none" stroke="'+(g.color||"#212529")+'" stroke-width="2.2"/>'; }
    }
    if(g.label){
      const m = {x:(A.x+B.x)/2, y:(A.y+B.y)/2}, L=Math.hypot(B.x-A.x,B.y-A.y)||1;
      let n = {x:-(B.y-A.y)/L, y:(B.x-A.x)/L};
      // standardmäßig nach außen (weg vom Schwerpunkt)
      const cc = {x:X(cx), y:Y(cy)};
      if(g.side===undefined){ if((m.x-cc.x)*n.x+(m.y-cc.y)*n.y < 0) n = {x:-n.x,y:-n.y}; }
      else if(g.side<0) n = {x:-n.x,y:-n.y};
      const off = g.off||16;
      s += '<text x="'+(m.x+n.x*off+(g.dx||0)).toFixed(1)+'" y="'+(m.y+n.y*off+(g.dy||0)).toFixed(1)+'" fill="'+(g.lcolor||g.color||"#212529")+'" font-size="'+(g.size||15)+'" font-weight="700" text-anchor="middle" dominant-baseline="middle" paint-order="stroke" stroke="#fff" stroke-width="4">'+g.label+'</text>';
    }
  });
  (spec.extra||[]).forEach(e=>{ s += typeof e==="function"? e(X,Y) : e; });
  for(const k in spec.pts){
    if(spec.hide && spec.hide.indexOf(k)>=0) continue;
    const q=P(k); const lo = (spec.labels&&spec.labels[k])||{};
    // Beschriftung vom Schwerpunkt weg
    let dx=q.x-X(cx), dy=q.y-Y(cy); const L=Math.hypot(dx,dy)||1; dx/=L; dy/=L;
    const lx = q.x + (lo.dx!==undefined?lo.dx:dx*16), ly = q.y + (lo.dy!==undefined?lo.dy:dy*16);
    const col = (spec.colors&&spec.colors[k])||"#212529";
    if(!spec.nodots) s += '<circle cx="'+q.x.toFixed(1)+'" cy="'+q.y.toFixed(1)+'" r="3.5" fill="'+col+'"/>';
    s += '<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" fill="'+col+'" font-size="16" font-weight="800" text-anchor="middle" dominant-baseline="middle" paint-order="stroke" stroke="#fff" stroke-width="4">'+(lo.t||k.replace(/_/g,"'"))+'</text>';
  }
  s += (spec.note? '<text x="'+(W-6)+'" y="'+(H-6)+'" font-size="11" fill="#868e96" text-anchor="end">'+spec.note+'</text>' : '');
  s += '</svg>';
  return s;
};
})();
