/* =========================================================
   MathGen – exakte Bruchrechnung, Parser, deutsche Formatierung, Aufgabengeneratoren.
   Reines JS ohne DOM → auch mit Node testbar (tests/gen_dump.js).
   Interne Schreibweise wie src/mathlib.py:  (-12):4   2.5*(-1.4)   -3|4   1_1|2   (-2)^2
   ========================================================= */
(function(root){
  'use strict';
  var MINUS = '\u2212';
  function gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ var t=a%b; a=b; b=t; } return a||1; }
  function Q(n,d){ if(d===undefined) d=1; if(d===0) throw new Error('Division durch 0'); if(d<0){n=-n;d=-d;} var g=gcd(n,d); this.n=n/g; this.d=d/g; }
  Q.prototype.add=function(o){ return new Q(this.n*o.d+o.n*this.d, this.d*o.d); };
  Q.prototype.sub=function(o){ return new Q(this.n*o.d-o.n*this.d, this.d*o.d); };
  Q.prototype.mul=function(o){ return new Q(this.n*o.n, this.d*o.d); };
  Q.prototype.div=function(o){ if(o.n===0) throw new Error('Division durch 0'); return new Q(this.n*o.d, this.d*o.n); };
  Q.prototype.pow=function(k){ var r=new Q(1); for(var i=0;i<k;i++) r=r.mul(this); return r; };
  Q.prototype.neg=function(){ return new Q(-this.n,this.d); };
  Q.prototype.eq=function(o){ return this.n===o.n && this.d===o.d; };
  Q.prototype.val=function(){ return this.n/this.d; };
  function fromDec(s){ var p=String(s).split('.'); if(p.length===1) return new Q(parseInt(p[0],10)); var k=p[1].length; return new Q(parseInt(p[0]+p[1],10), Math.pow(10,k)); }

  /* ---------- Parser ---------- */
  var RX=/\s*(?:(\d+_\d+\|\d+)|(\d+\|\d+)|(\d+(?:\.\d+)?)|([-+*:^()?]))/y;
  function tokenize(s){ var out=[], pos=0; s=String(s).trim();
    while(pos<s.length){ RX.lastIndex=pos; var m=RX.exec(s); if(!m) throw new Error('Zeichen? '+s+' @'+pos);
      out.push(m[1]?['mixed',m[1]]:m[2]?['frac',m[2]]:m[3]?['num',m[3]]:['op',m[4]]); pos=RX.lastIndex; while(s[pos]===' ') pos++; }
    return out; }
  function parse(s){
    var t=tokenize(s), i=0;
    function pk(){ return t[i]||[null,null]; }
    function eat(v){ var x=pk(); if(v!==undefined && x[1]!==v) throw new Error('Erwartet '+v+' in '+s); i++; return x; }
    function expr(){ var n=term(); while(pk()[1]==='+'||pk()[1]==='-'){ var op=eat()[1]; n={k:'bin',op:op,a:n,b:term()}; } return n; }
    function term(){ var n=unary(); while(pk()[1]==='*'||pk()[1]===':'){ var op=eat()[1]; n={k:'bin',op:op,a:n,b:unary()}; } return n; }
    function unary(){ if(pk()[1]==='-'){ eat(); return {k:'neg',a:unary()}; } if(pk()[1]==='+'){ eat(); return {k:'pos',a:unary()}; } return power(); }
    function power(){ var b=atom(); if(pk()[1]==='^'){ eat(); var e = pk()[1]==='-' ? (eat(),{k:'neg',a:atom()}) : atom(); return {k:'bin',op:'^',a:b,b:e}; } return b; }
    function atom(){ var x=pk();
      if(x[0]==='num'||x[0]==='frac'||x[0]==='mixed'){ eat(); return {k:x[0],v:x[1]}; }
      if(x[1]==='?'){ eat(); return {k:'hole'}; }
      if(x[1]==='('){ eat(); var n=expr(); eat(')'); n.paren=true; return n; }
      throw new Error('Unerwartet '+x[1]+' in '+s); }
    var n=expr(); if(i!==t.length) throw new Error('Rest in '+s); return n;
  }
  function litQ(k,v){ if(k==='num') return fromDec(v); if(k==='frac'){ var p=v.split('|'); return new Q(+p[0],+p[1]); }
    var w=v.split('_'), r=w[1].split('|'); return new Q(+w[0]*(+r[1])+(+r[0]), +r[1]); }
  function evaluate(n){ if(typeof n==='string') n=parse(n);
    switch(n.k){ case 'num': case 'frac': case 'mixed': return litQ(n.k,n.v); case 'neg': return evaluate(n.a).neg(); case 'pos': return evaluate(n.a);
      case 'hole': throw new Error('Platzhalter'); }
    var x=evaluate(n.a), y=evaluate(n.b);
    switch(n.op){ case '+': return x.add(y); case '-': return x.sub(y); case '*': return x.mul(y); case ':': return x.div(y); case '^': return x.pow(y.n); }
  }

  /* ---------- Formatierung ---------- */
  function fracH(a,b){ return '<span class="fr"><span>'+a+'</span><span>'+b+'</span></span>'; }
  function decStr(q, maxdp){ maxdp=maxdp||4; var d=q.d, t=0, f=0; while(d%2===0){d/=2;t++;} while(d%5===0){d/=5;f++;} if(d!==1) return null;
    var dp=Math.max(t,f); if(dp>maxdp) return null; var neg=q.n<0, sc=Math.abs(q.n)*Math.pow(10,dp)/q.d; sc=Math.round(sc);
    var s=String(sc); while(s.length<dp+1) s='0'+s; if(dp) s=s.slice(0,-dp)+','+s.slice(-dp); return (neg?MINUS:'')+s; }
  function numH(q, mode){ mode=mode||'auto'; if(q.d===1) return (q.n<0?MINUS:'')+Math.abs(q.n);
    if(mode==='auto'||mode==='dec'){ var s=decStr(q); if(s!==null) return s; }
    var neg=q.n<0, a=Math.abs(q.n);
    if(mode==='mixed' && a>q.d){ var w=Math.floor(a/q.d), r=a-w*q.d; return (neg?MINUS:'')+w+fracH(r,q.d); }
    return (neg?MINUS:'')+fracH(a,q.d); }
  var OPS={'+':' + ','-':' '+MINUS+' ','*':' · ',':':' : '};
  function litH(k,v){ if(k==='num') return v.replace('.',','); if(k==='frac'){ var p=v.split('|'); return fracH(p[0],p[1]); }
    var w=v.split('_'), r=w[1].split('|'); return w[0]+fracH(r[0],r[1]); }
  function toH(n){ if(typeof n==='string') n=parse(n); var s;
    if(n.k==='num'||n.k==='frac'||n.k==='mixed') s=litH(n.k,n.v);
    else if(n.k==='hole') s='<span class="hole">\u25a1</span>';
    else if(n.k==='neg') s=MINUS+toH(n.a); else if(n.k==='pos') s='+'+toH(n.a);
    else if(n.op==='^') s=toH(n.a)+'<sup>'+toH(n.b)+'</sup>';
    else s=toH(n.a)+OPS[n.op]+toH(n.b);
    return n.paren ? '('+s+')' : s; }
  function m(expr){ return '<span class="m">'+toH(expr)+'</span>'; }
  function numIn(q){ /* Zahl als interner Ausdruck, negative mit Klammer */ var s=q.d===1?String(Math.abs(q.n)):(decStr(q)!==null?decStr(new Q(Math.abs(q.n),q.d)).replace(',','.'):Math.abs(q.n)+'|'+q.d); return q.n<0?'(-'+s+')':s; }
  function numInBare(q){ var s=numIn(q); return s.charAt(0)==='(' ? s.slice(1,-1) : s; }

  /* ---------- Zufall ---------- */
  var rnd = Math.random;
  function ri(a,b){ return a+Math.floor(rnd()*(b-a+1)); }
  function pick(arr){ return arr[Math.floor(rnd()*arr.length)]; }
  function nz(a,b){ var x; do{ x=ri(a,b); }while(x===0); return x; }
  function sgn(){ return rnd()<0.5?-1:1; }
  function signed(x){ return x<0 ? '(-'+Math.abs(x)+')' : String(x); }
  function signedD(s){ return s.charAt(0)==='-' ? '('+s+')' : s; }

  /* ---------- Generatoren (liefern {e: intern, a: Q, mode}) ---------- */
  var G = {};
  // Kopfrechen-Blitz: + − · rationaler Zahlen (Wiederholung)
  G.blitz = function(){
    var t = ri(0,5), a, b, e;
    if(t===0){ a=nz(-15,15); b=nz(-15,15); e=signed(a)+'+'+signed(b); }
    else if(t===1){ a=nz(-15,15); b=nz(-15,15); e=signed(a)+'-'+signed(b); }
    else if(t===2){ a=nz(-9,9); b=nz(-9,9); e=signed(a)+'*'+signed(b); }
    else if(t===3){ a=nz(-9,9); var d=pick(['0.5','0.2','0.1','1.5','2.5']); e=signed(a)+'*'+(sgn()<0?'(-'+d+')':d); }
    else if(t===4){ var x=pick(['1.5','2.5','0.5','3.5','4.5']), y=pick(['2','3','1.5','0.5','4']); e=(sgn()<0?'(-'+x+')':x)+(rnd()<.5?'+':'-')+(sgn()<0?'(-'+y+')':y); }
    else { a=nz(-5,5); b=nz(-5,5); var c=nz(-3,3); e=signed(a)+'*'+signed(b)+'*'+signed(c); }
    if(e.charAt(0)==='(' && rnd()<0.5) e = e.replace(/^\((-[\d.]+)\)/,'$1');
    return {e:e, a:evaluate(e), mode:'auto'};
  };
  // Division: level int | dec | frac | mix
  G.div = function(level){
    level = level||'int'; var e;
    if(level==='mix') level = pick(['int','int','dec','frac']);
    if(level==='int'){ var q=nz(-10,10), b=nz(-10,10); if(Math.abs(b)===1) b=b*ri(2,9); e=signed(q*b)+':'+signed(b); }
    else if(level==='dec'){ var t=ri(0,2), qd, bd;
      if(t===0){ qd=nz(-12,12); bd=pick(['0.5','0.2','0.25','0.1','0.4']); }
      else if(t===1){ qd=pick(['0.5','1.5','0.2','0.3','2.5','1.2','0.8']); bd=String(nz(2,9)); }
      else { qd=pick(['0.5','1.5','0.2','0.3','2.5','1.2']); bd=pick(['0.5','0.2','0.3','0.4','1.5','0.6']); }
      var Qq=fromDec(String(qd)).mul(new Q(sgn())), Bb=fromDec(bd).mul(new Q(sgn()));
      var A=Qq.mul(Bb); if(decStr(A)===null||decStr(A).replace(/[^0-9]/g,'').length>4) return G.div('dec');
      e=numIn(A)+':'+numIn(Bb); if(rnd()<0.4) e=e.replace(/^\((-[\d.]+)\)/,'$1');
      return {e:e, a:evaluate(e), mode:'dec'}; }
    else { var p1=ri(1,9), q1=ri(2,9), p2=ri(1,9), q2=ri(2,9); if(p1%q1===0||p2%q2===0) return G.div('frac');
      var s1=sgn(), s2=sgn(); var f1=new Q(p1,q1), f2=new Q(p2,q2); if(f1.d===1||f2.d===1) return G.div('frac');
      var x = (s1<0?'(-':'')+f1.n+'|'+f1.d+(s1<0?')':''), y=(s2<0?'(-':'')+f2.n+'|'+f2.d+(s2<0?')':'');
      e=x+':'+y; var r=evaluate(e); if(Math.abs(r.n)>60||r.d>40) return G.div('frac'); return {e:e, a:r, mode:'mixed'}; }
    return {e:e, a:evaluate(e), mode:'auto'};
  };
  // Umkehraufgabe: a · b = c  →  c : b = a,  c : a = b
  G.umkehr = function(){ var a=nz(-9,9), b=nz(-9,9); if(Math.abs(a)<2) a=a*ri(2,6); if(Math.abs(b)<2) b=b*ri(2,6); return {a:a,b:b,c:a*b}; };
  // Vorrang: Rechenausdrücke mit ganzzahligen Zwischenergebnissen
  function intDivs(n){ if(!n||!n.k) return true; if(n.k==='bin'){ if(!intDivs(n.a)||!intDivs(n.b)) return false;
      if(n.op===':'){ var x=evaluate(n.a), y=evaluate(n.b); if(y.n===0) return false; if(x.div(y).d!==1) return false; }
      if(n.paren && evaluate(n).n===0) return false; return true; }
    if(n.k==='neg'||n.k==='pos') return intDivs(n.a); return true; }
  var VT = {
    1:['{a}+{b}*{c}','{a}-{b}*{c}','{a}*{b}+{c}','{d}:{b}+{c}','{a}-{d}:{b}','{a}*({b}+{c})','({a}-{b})*{c}','({a}+{b}):{c}'],
    2:['{a}+{b}*({c}-{d})','{a}*{b}-{d}:{e}','({a}-{b})*({c}+{d})','{x}^2+{b}*{c}','{a}-({b}+{c}):{d}','{d}:({a}-{b})+{c}','{a}*{b}*{c}-{d}'],
    3:['(-2)^{n}+{b}*{c}','-{p}^2+{x}^2','({a}*{b}-{c}):{d}*{e}','{a}-({b}-{c})^2','{x}^3-{a}*({b}-{c})','({a}+{b})^2:{c}-{d}','{d}:({a}+{b}*{c})']
  };
  G.vorrang = function(level){
    level=level||2; var tries=0;
    while(tries++<500){
      var tpl = pick(VT[level]);
      var e = tpl.replace(/\{(\w)\}/g, function(_,k){ if(k==='n') return String(ri(2,5)); if(k==='p') return String(ri(2,5));
        if(k==='x') return '(-'+ri(2,4)+')'; if(k==='d') return signed(nz(-30,30)); return signed(nz(-9,9)); });
      e = e.replace(/(^|\()\((-\d+)\)(?!\^)/g, '$1$2');
      try{ var t=parse(e); if(!intDivs(t)) continue; var v=evaluate(t); if(v.d!==1||Math.abs(v.n)>150||v.n===0) continue; return {e:e,a:v,mode:'auto'}; }catch(err){}
    }
    return {e:'8+3*(-2)',a:evaluate('8+3*(-2)'),mode:'auto'};
  };
  // Punkt mit ganzzahligen Koordinaten
  G.point = function(r, allowAxes){ r=r||6; var x,y; do{ x=ri(-r,r); y=ri(-r+1,r-1); }while(!allowAxes && (x===0||y===0)); return {x:x,y:y}; };
  G.quadrant = function(x,y){ if(x===0||y===0) return 0; return x>0 ? (y>0?1:4) : (y>0?2:3); };
  // Temperaturwoche mit exaktem Mittelwert (ganz oder ,5)
  G.week = function(){ var v=[], i, s; do{ v=[]; var base=ri(-6,3); for(i=0;i<7;i++) v.push(base+ri(-4,4)); s=v.reduce(function(a,b){return a+b},0); }while((2*s)%7!==0); return v; };
  // Rechteck im KS
  G.rect = function(){ var x1,x2,y1,y2; // ganz im KS x∈[−6;6], y∈[−5;5], mindestens eine negative Koordinate
    do{ x1=ri(-6,4); x2=ri(x1+2,Math.min(6,x1+9)); y1=ri(-5,3); y2=ri(y1+2,Math.min(5,y1+7)); }while(!(x1<0||y1<0));
    return {x1:x1,x2:x2,y1:y1,y2:y2,a:x2-x1,b:y2-y1,A:(x2-x1)*(y2-y1)}; };

  var API = {Q:Q, fromDec:fromDec, parse:parse, evaluate:evaluate, toH:toH, m:m, numH:numH, decStr:decStr, numIn:numIn, numInBare:numInBare,
    G:G, ri:ri, pick:pick, nz:nz, signed:signed, MINUS:MINUS, setRandom:function(f){ rnd=f; } };
  if(typeof module!=='undefined' && module.exports) module.exports = API; else root.MG = API;
})(this);
