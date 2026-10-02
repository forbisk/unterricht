/* Sitzplan U-Form (26 Plätze) mit Umschalten auf Gruppenphase – eigene SVG-Zeichnung */
(function(){
  'use strict';
  var NS='http://www.w3.org/2000/svg';
  function U(){ var a=[],k;
    for(k=0;k<8;k++) a.push({x:170,y:232+k*44+Math.floor(k/2)*10,r:90});
    for(k=0;k<10;k++) a.push({x:269+k*46+Math.floor(k/2)*12,y:625,r:0});
    for(k=0;k<8;k++) a.push({x:830,y:570-(k*44+Math.floor(k/2)*10),r:-90});
    return a; }
  var GROUPS=[{c:[260,290],n:4},{c:[260,470],n:4},{c:[420,600],n:3},{c:[580,600],n:3},{c:[740,470],n:4},{c:[740,290],n:4},{c:[500,370],n:4}];
  var OFF4=[[-23,16,0],[23,16,0],[-23,-16,180],[23,-16,180]], OFF3=[[-23,16,0],[23,16,0],[0,-16,180]];
  function G(u){ var a=[],gi=0;
    GROUPS.forEach(function(g,gi){ (g.n===4?OFF4:OFF3).forEach(function(o){ var i=a.length, r=o[2];
      if(r===180 && u[i].r<0) r=-180; a.push({x:g.c[0]+o[0],y:g.c[1]+o[1],r:r,g:gi+1}); }); });
    return a; }
  function mk(tag,attrs,parent,text){ var e=document.createElementNS(NS,tag); for(var k in attrs) e.setAttribute(k,attrs[k]); if(text!=null) e.textContent=text; if(parent) parent.appendChild(e); return e; }
  function room(svg){
    mk('rect',{x:20,y:10,width:960,height:670,rx:14,class:'room'},svg);
    // Fenster (links)
    [[110,200],[270,360],[430,520],[580,660]].forEach(function(w){ mk('rect',{x:12,y:w[0],width:16,height:w[1]-w[0],rx:4,class:'win'},svg); });
    mk('text',{x:58,y:400,class:'lbl vert',transform:'rotate(-90 58 400)','text-anchor':'middle'},svg,'Fenster');
    // Tafel
    mk('rect',{x:330,y:22,width:340,height:22,rx:5,class:'board'},svg);
    mk('text',{x:500,y:80,class:'lbl','text-anchor':'middle'},svg,'Tafel');
    // Lehrertisch
    mk('rect',{x:715,y:90,width:150,height:56,rx:8,class:'tdesk'},svg);
    mk('text',{x:790,y:126,class:'lbl sm','text-anchor':'middle'},svg,'Lehrertisch');
    // Tür (rechts vorne)
    mk('rect',{x:972,y:70,width:16,height:80,class:'doorgap'},svg);
    mk('path',{d:'M980 150 L915 150 M915 150 A65 65 0 0 1 980 85',class:'door'},svg);
    mk('text',{x:945,y:185,class:'lbl sm','text-anchor':'middle'},svg,'Tür');
  }
  function build(svg, opts){
    opts=opts||{};
    var u=U(), g=G(u); svg.innerHTML=''; room(svg);
    var seats=[];
    u.forEach(function(p,i){
      var s=mk('g',{class:'seat','data-g':g[i].g},svg); s.style.transitionDelay=(i*22)+'ms';
      var r=mk('g',{class:'rot'},s); r.style.transitionDelay=(i*22)+'ms';
      mk('rect',{x:-15,y:19,width:30,height:14,rx:6,class:'chair'},r);
      mk('rect',{x:-22,y:-15,width:44,height:30,rx:5,class:'desk'},r);
      mk('text',{x:0,y:7,'text-anchor':'middle',class:'no'},s,String(i+1));
      seats.push(s);
    });
    function set(mode){
      var pos = mode==='g' ? g : u;
      seats.forEach(function(s,i){ var p=pos[i]; s.style.transform='translate('+p.x+'px,'+p.y+'px)'; s.firstChild.style.transform='rotate('+p.r+'deg)'; });
      svg.classList.toggle('gruppen', mode==='g');
    }
    set('u');
    return {set:set, U:u, G:g};
  }
  window.SeatPlan={build:build, U:U};
})();
