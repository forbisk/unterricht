/* =========================================================
   MathCore – Bruchrechnung, Parser für lineare Terme, Formatierung,
   automatischer Lösungsweg und Aufgabengeneratoren.
   Läuft im Browser (window.MathCore) und in Node (require) für Tests.
   Eingabe-Schreibweise (ASCII):  3x+5=20   2(x-4)=x+1   {x/3}+2=6   0.5x=2
   ========================================================= */
(function(root){
  'use strict';
  /* ---------- Brüche ---------- */
  function gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ var t=a%b; a=b; b=t; } return a||1; }
  function lcm(a,b){ return Math.abs(a*b)/gcd(a,b); }
  function F(n,d){ if(d===undefined) d=1; if(d===0) throw new Error('Division durch 0');
    if(!Number.isInteger(n)||!Number.isInteger(d)) throw new Error('F braucht ganze Zahlen');
    if(d<0){ n=-n; d=-d; } var g=gcd(n,d); return {n:n/g, d:d/g}; }
  function fnum(x){ if(typeof x==='object') return x; if(Number.isInteger(x)) return F(x,1);
    var s=String(x), k=(s.split('.')[1]||'').length, p=Math.pow(10,k); return F(Math.round(x*p),p); }
  function add(a,b){ return F(a.n*b.d+b.n*a.d, a.d*b.d); }
  function sub(a,b){ return F(a.n*b.d-b.n*a.d, a.d*b.d); }
  function mul(a,b){ return F(a.n*b.n, a.d*b.d); }
  function div(a,b){ if(b.n===0) throw new Error('Division durch 0'); return F(a.n*b.d, a.d*b.n); }
  function neg(a){ return F(-a.n,a.d); }
  function feq(a,b){ return a.n===b.n && a.d===b.d; }
  function isZero(a){ return a.n===0; }
  function isInt(a){ return a.d===1; }
  function val(a){ return a.n/a.d; }
  function isDecimal(a){ var d=a.d; while(d%2===0) d/=2; while(d%5===0) d/=5; return d===1; }
  function fstr(a, mode){ // ASCII-Darstellung einer Zahl
    if(a.d===1) return String(a.n);
    if(mode!=='frac' && isDecimal(a)){ var s=(a.n/a.d).toFixed(6).replace(/0+$/,'').replace(/\.$/,''); return s; }
    return (a.n<0?'-':'')+'{'+Math.abs(a.n)+'/'+a.d+'}';
  }

  /* ---------- Tokenizer ---------- */
  function tokenize(s){
    var t=[], i=0; s=String(s).replace(/\s+/g,'').replace(/·/g,'*').replace(/−/g,'-').replace(/,/g,'.');
    while(i<s.length){
      var c=s[i];
      if(/[0-9.]/.test(c)){ var j=i; while(j<s.length && /[0-9.]/.test(s[j])) j++; t.push({k:'num', v:s.slice(i,j)}); i=j; continue; }
      if(/[a-zA-ZäöüÄÖÜ]/.test(c)){ t.push({k:'var', v:c}); i++; continue; }
      if('+-*:/()={}^|<>≠'.indexOf(c)>=0){ t.push({k:'op', v:c}); i++; continue; }
      t.push({k:'raw', v:c}); i++;
    }
    return t;
  }

  /* ---------- Formatierung (HTML) – identisch zu src/mathfmt.py ---------- */
  function fmt(s){
    var t=tokenize(s), out='', prev=null, depth=0;
    function isUnary(p){ return !p || (p.k==='op' && '(+-*:={/^'.indexOf(p.v)>=0) || (p.k==='op' && p.v==='<') || (p.k==='op' && p.v==='>') || (p.k==='op' && p.v==='≠'); }
    for(var i=0;i<t.length;i++){
      var x=t[i];
      if(x.k==='num'){ out+=x.v.replace('.',','); }
      else if(x.k==='var'){ out+='<i>'+x.v+'</i>'; }
      else if(x.k==='raw'){ out+=x.v; }
      else {
        var v=x.v;
        if(v==='{'){ // Bruch {Zähler/Nenner}
          var j=i+1, d=0, slash=-1;
          for(; j<t.length; j++){ var y=t[j]; if(y.k!=='op') continue; if(y.v==='{') d++; else if(y.v==='}'){ if(d===0) break; d--; } else if(y.v==='/' && d===0 && slash<0) slash=j; }
          var num=t.slice(i+1,slash).map(tokStr).join(''), den=t.slice(slash+1,j).map(tokStr).join('');
          out+='<span class="fr"><span class="nu">'+fmt(num)+'</span><span class="de">'+fmt(den)+'</span></span>';
          i=j; prev={k:'num',v:'0'}; continue;
        }
        if(v==='^'){ var e=t[i+1]; out+='<sup>'+(e?(e.k==='num'?e.v:e.k==='var'?'<i>'+e.v+'</i>':e.v):'')+'</sup>'; i++; prev={k:'num',v:'0'}; continue; }
        if(v==='-'){ out+= isUnary(prev) ? '−' : ' − '; }
        else if(v==='+'){ out+= isUnary(prev) ? '+' : ' + '; }
        else if(v==='*'){ out+=' · '; }
        else if(v===':'){ out+=' : '; }
        else if(v==='='){ out+=' = '; }
        else if(v==='≠'){ out+=' ≠ '; }
        else if(v==='<'){ out+=' &lt; '; }
        else if(v==='>'){ out+=' &gt; '; }
        else out+=v;
      }
      prev=x;
    }
    return out;
  }
  function tokStr(x){ return x.v; }

  /* ---------- Parser → lineare Form {a,b}  (a·x + b) ---------- */
  function parseLin(s){
    var t=tokenize(s), p=0, vname=null;
    function peek(){ return t[p]; }
    function isOp(v){ var x=t[p]; return x && x.k==='op' && x.v===v; }
    function L(a,b){ return {a:a,b:b}; }
    function ladd(u,v){ return L(add(u.a,v.a),add(u.b,v.b)); }
    function lsub(u,v){ return L(sub(u.a,v.a),sub(u.b,v.b)); }
    function lmul(u,v){ if(!isZero(u.a) && !isZero(v.a)) throw new Error('nichtlinear'); return L(add(mul(u.a,v.b),mul(v.a,u.b)), mul(u.b,v.b)); }
    function ldiv(u,v){ if(!isZero(v.a)) throw new Error('Division durch Variable'); if(isZero(v.b)) throw new Error('Division durch 0'); return L(div(u.a,v.b),div(u.b,v.b)); }
    function expr(){ var v=term(); while(isOp('+')||isOp('-')){ var o=t[p++].v, w=term(); v = o==='+'?ladd(v,w):lsub(v,w); } return v; }
    function startsFactor(){ var x=peek(); return x && (x.k==='num'||x.k==='var'||(x.k==='op'&&(x.v==='('||x.v==='{'))); }
    function term(){ var v=factor();
      while(true){ if(isOp('*')){ p++; v=lmul(v,factor()); } else if(isOp(':')){ p++; v=ldiv(v,factor()); } else if(startsFactor()){ v=lmul(v,factor()); } else break; }
      return v; }
    function factor(){ if(isOp('-')){ p++; var f=factor(); return L(neg(f.a),neg(f.b)); } if(isOp('+')){ p++; return factor(); } return power(); }
    function power(){ var b=primary(); if(isOp('^')){ p++; var e=t[p++]; var n=parseInt(e.v,10);
        if(!isZero(b.a)){ if(n===1) return b; if(n===0) return L(F(0),F(1)); throw new Error('nichtlinear'); }
        var r=F(1); for(var i=0;i<n;i++) r=mul(r,b.b); return L(F(0),r); } return b; }
    function primary(){ var x=t[p++]; if(!x) throw new Error('Ausdruck unvollständig');
      if(x.k==='num') return L(F(0),fnum(parseFloat(x.v)));
      if(x.k==='var'){ if(vname && vname!==x.v) throw new Error('zwei Variablen'); vname=x.v; return L(F(1),F(0)); }
      if(x.k==='op' && x.v==='('){ var v=expr(); if(!isOp(')')) throw new Error('Klammer fehlt'); p++; return v; }
      if(x.k==='op' && x.v==='{'){ var nu=expr(); if(!isOp('/')) throw new Error('Bruch: / fehlt'); p++; var de=expr(); if(!isOp('}')) throw new Error('Bruch: } fehlt'); p++; return ldiv(nu,de); }
      throw new Error('Unerwartet: '+x.v);
    }
    var r=expr(); if(p<t.length) throw new Error('Unerwartet: '+t[p].v);
    r.v=vname; return r;
  }
  function parseEq(s){ var parts=String(s).split('='); if(parts.length!==2) throw new Error('Genau ein = nötig'); var l=parseLin(parts[0]), r=parseLin(parts[1]); return {L:l,R:r,v:l.v||r.v||'x'}; }
  function evalAt(side, x){ var l=parseLin(substitute(norm(side), x)); return l.b; }

  /* lineare Form → ASCII */
  function coefStr(a, mode){ if(a.n===a.d) return ''; if(a.n===-a.d) return '-'; var s=fstr(a,mode); return s; }
  function linStr(l, v, mode){ v=v||'x';
    var s='';
    function tm(a){ return (mode==='colon' && a.n===1 && a.d>1) ? v+':'+a.d : coefStr(a,mode)+v; }
    if(!isZero(l.a) && l.a.n<0 && l.b.n>0) return fstr(l.b,mode)+'-'+tm(neg(l.a));
    if(!isZero(l.a)) s = tm(l.a);
    if(!isZero(l.b)){ var bs=fstr(l.b,mode); if(s){ s += (l.b.n<0 ? '-'+bs.replace(/^-/,'') : '+'+bs); } else s=bs; }
    if(!s) s='0';
    return s;
  }
  function opStr(kind, q, v, mode){ // kind: + - * :  q: Frac oder {a,b}
    var qs;
    if(q.a!==undefined){ qs = linStr(q,v,mode); } else qs = fstr(q,mode);
    if((kind==='*'||kind===':') && /^-/.test(qs)) qs='('+qs+')';
    return kind+qs;
  }
  function norm(s){ return String(s).replace(/\s+/g,'').replace(/·/g,'*').replace(/−/g,'-').replace(/,/g,'.'); }

  /* ---------- Lösungsweg nach Schema ---------- */
  function solveSteps(eq, opts){
    opts=opts||{}; var mode=opts.mode||(/\{/.test(eq)?'frac':(/[a-z]:\d/.test(eq)&&!/\(/.test(eq)?'colon':'dec'));
    var E=parseEq(eq), v=E.v, L=E.L, R=E.R, lines=[{eq:norm(eq), op:''}];
    function cur(){ return linStr(L,v,mode)+'='+linStr(R,v,mode); }
    function push(op, label){ lines[lines.length-1].op=op; if(label) lines[lines.length-1].label=label; lines.push({eq:cur(), op:''}); }
    // 1./2. Brüche weg, Klammern auflösen, zusammenfassen
    var dens=[L.a.d,L.b.d,R.a.d,R.b.d], m=dens.reduce(lcm,1);
    if(m>1 && mode==='frac'){ var M=F(m); L={a:mul(L.a,M),b:mul(L.b,M)}; R={a:mul(R.a,M),b:mul(R.b,M)}; push('*'+m, 'mit Hauptnenner '+m+' multiplizieren'); }
    else if(cur()!==lines[0].eq){ push('ZF', /\(/.test(eq)?'Klammern auflösen, zusammenfassen':'zusammenfassen'); }
    var xs='L';
    // 3. Variable auf eine Seite
    if(!isZero(R.a) && !isZero(L.a)){
      if(sub(L.a,R.a).n>=0){ var q={a:R.a,b:F(0)}; L={a:sub(L.a,R.a),b:L.b}; R={a:F(0),b:R.b}; push(opStr('-',q,v,mode).replace(/^--/,'+')); xs='L'; }
      else { var q2={a:L.a,b:F(0)}; R={a:sub(R.a,L.a),b:R.b}; L={a:F(0),b:L.b}; push(opStr('-',q2,v,mode).replace(/^--/,'+')); xs='R'; }
    } else if(!isZero(R.a)) xs='R';
    if(isZero(L.a) && isZero(R.a)){
      var ok = feq(L.b,R.b); return {lines:lines, sol: ok?'all':'none', v:v, mode:mode};
    }
    // 4. Zahlen auf die andere Seite
    var X = xs==='L'?L:R, O = xs==='L'?R:L;
    if(!isZero(X.b)){ var k=X.b; X={a:X.a,b:F(0)}; O={a:O.a,b:sub(O.b,k)}; if(xs==='L'){L=X;R=O;}else{R=X;L=O;} push(k.n>0?'-'+fstr(k,mode):'+'+fstr(neg(k),mode)); }
    // 5. durch Faktor teilen
    if(!feq(X.a,F(1))){ var c=X.a; X={a:F(1),b:F(0)}; O={a:F(0),b:div(O.b,c)}; if(xs==='L'){L=X;R=O;}else{R=X;L=O;} push((mode==='colon'&&c.n===1&&c.d>1)?'*'+c.d:opStr(':',c,v,mode)); }
    if(xs==='R'){ var tmp=L; L=R; R=tmp; push('swap','Seiten tauschen'); }
    return {lines:lines, sol:R.b, v:v, mode:mode};
  }

  /* Einsetzen für die Probe: "3x+5" , 4 → "3*4+5" */
  function substitute(side, x, v){
    v=v||'x'; var t=tokenize(side), out='', xs=fstr(fnum(x));
    var wrap = /^-|\{/.test(xs);
    for(var i=0;i<t.length;i++){ var k=t[i];
      if(k.k==='var' && k.v===v){ var p=t[i-1], nx=t[i+1];
        if(p && (p.k==='num' || (p.k==='op'&&(p.v===')'||p.v==='}')) || p.k==='var')) out+='*';
        out += wrap ? '('+xs+')' : xs;
        if(nx && (nx.k==='num' || nx.k==='var' || (nx.k==='op'&&(nx.v==='('||nx.v==='{')))) out+='*';
      } else if(k.k==='op' && k.v==='(' && t[i-1] && (t[i-1].k==='num' || (t[i-1].k==='op' && t[i-1].v===')'))){ out+='*('; }
      else out+=k.v;
    }
    return out;
  }
  function probe(eq, x){ var parts=norm(eq).split('='); var l=evalAt(parts[0],x), r=evalAt(parts[1],x);
    return {left:substitute(parts[0],x), right:substitute(parts[1],x), lv:l, rv:r, ok:feq(l,r)}; }

  /* ---------- Zufall ---------- */
  function rng(seed){ if(seed==null) return Math.random; var s=seed>>>0; return function(){ s=(s+0x6D2B79F5)>>>0; var t=s; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; }; }
  function ri(r,a,b){ return a+Math.floor(r()*(b-a+1)); }
  function pick(r,arr){ return arr[Math.floor(r()*arr.length)]; }
  function sgn(n){ return n<0 ? '-'+Math.abs(n) : '+'+n; }
  function cx(c){ return c===1?'x':c===-1?'-x':c+'x'; }

  /* ---------- Generatoren ---------- */
  var LEVELS = {
    1:{name:'x + a = b', stars:1},
    2:{name:'a · x = b', stars:1},
    3:{name:'ax + b = c', stars:2},
    4:{name:'x auf beiden Seiten', stars:2},
    5:{name:'mit Klammern', stars:3},
    6:{name:'negativ & Dezimal', stars:3},
    7:{name:'mit Brüchen', stars:3},
    8:{name:'bunt gemischt', stars:3}
  };
  function gen(level, r){
    r = r || Math.random; var x, a, b, c, d, e, eq;
    switch(+level){
      case 1: a=ri(r,2,19);
        switch(ri(r,0,2)){
          case 0: x=ri(r,2,25); eq='x+'+a+'='+(x+a); break;
          case 1: x=ri(r,a+1,a+25); eq='x-'+a+'='+(x-a); break;
          default: x=ri(r,2,25); eq=a+'+x='+(x+a);
        } break;
      case 2: a=ri(r,2,9);
        if(r()<0.6){ x=ri(r,2,12); eq=a+'x='+(a*x); } else { b=ri(r,2,12); x=a*b; eq='x:'+a+'='+b; } break;
      case 3: a=ri(r,2,9); x=ri(r,1,12); b=ri(r,1,30);
        switch(ri(r,0,2)){
          case 0: eq=a+'x+'+b+'='+(a*x+b); break;
          case 1: if(a*x-b<=0) b=ri(r,1,a*x-1)||1; eq=a+'x-'+b+'='+(a*x-b); break;
          default: eq=b+'+'+a+'x='+(a*x+b);
        } break;
      case 4: do { a=ri(r,2,9); c=ri(r,1,8); } while(a===c);
        x=ri(r,1,10); b=ri(r,-15,20); d=a*x+b-c*x;
        if(d===0) d=0;
        eq=cx(a)+(b?sgn(b):'')+'='+cx(c)+(d?sgn(d):''); break;
      case 5: x=ri(r,1,10);
        switch(ri(r,0,3)){
          case 0: a=ri(r,2,6); b=ri(r,1,9); eq=a+'(x+'+b+')='+(a*(x+b)); break;
          case 1: a=ri(r,2,6); b=ri(r,1,6); c=ri(r,1,a-1||1); if(c>=a) c=1; d=a*(x-b)-c*x; eq=a+'(x-'+b+')='+cx(c)+(d?sgn(d):''); break;
          case 2: b=ri(r,1,8); c=ri(r,1,4); e=ri(r,20,40); d=e-(x+b)-c*x; eq=e+'-(x+'+b+')='+cx(c)+(d?sgn(d):''); break;
          default: a=ri(r,2,4); b=ri(r,1,5); c=ri(r,2,4); d=ri(r,1,6); if(2*a===c) c=3; e=a*(2*x+b)-c*(x+d); eq=a+'(2x+'+b+')='+c+'(x+'+d+')'+(e?sgn(e):'');
        } break;
      case 6:
        if(r()<0.5){ // negative Zahlen
          x=ri(r,-9,-1);
          if(r()<0.5){ a=-ri(r,2,7); b=ri(r,-12,12)||5; eq=cx(a)+sgn(b)+'='+(a*x+b); }
          else { do { a=ri(r,2,8); c=ri(r,1,7); } while(a===c); b=ri(r,-10,10); d=a*x+b-c*x; eq=cx(a)+(b?sgn(b):'')+'='+cx(c)+(d?sgn(d):''); }
        } else { // Dezimalzahlen
          var P=pick(r,[[1,2],[3,2],[5,2],[1,5],[2,5],[6,5],[3,4]]); var p=F(P[0],P[1]);
          x=ri(r,1,10); var q=F(ri(r,1,40),10); var rr=add(mul(p,F(x)),q);
          eq=fstr(p)+'x+'+fstr(q)+'='+fstr(rr);
        } break;
      case 7:
        switch(ri(r,0,3)){
          case 0: a=ri(r,2,6); b=ri(r,1,9); c=ri(r,1,9); x=a*c; eq='{x/'+a+'}+'+b+'='+(c+b); break;
          case 1: a=ri(r,2,6); b=ri(r,1,9); c=ri(r,1,9); x=a*c; eq='{x/'+a+'}-'+b+'='+(c-b); break;
          case 2: a=pick(r,[2,3,4]); b=pick(r,[3,4,5,6].filter(function(z){return z!==a && lcm(a,z)!==Math.max(a,z);})); if(!b) b=a===2?3:5; var m=lcm(a,b); x=m*ri(r,1,4); c=x/a+x/b; eq='{x/'+a+'}+{x/'+b+'}='+c; break;
          default: a=ri(r,2,9); c=pick(r,[2,4,5,10]); b=c*ri(r,1,3); /* x/a = b/c */ var t0=a*b; if(t0%c!==0){ b=c; } x=a*b/c; eq='{x/'+a+'}={'+b+'/'+c+'}';
        } break;
      default: return gen(ri(r,3,6), r);
    }
    var s=solveSteps(eq);
    return {eq:eq, level:+level, steps:s.lines, sol:s.sol, v:'x'};
  }

  /* Pfeilschema / Zahlenrätsel: Kette aus 2 Operationen */
  var OPN = {'+':'addiere','-':'subtrahiere','*':'multipliziere mit',':':'dividiere durch'};
  var INV = {'+':'-','-':'+','*':':',':':'*'};
  function applyOp(v,o){ return o.op==='+'?v+o.v:o.op==='-'?v-o.v:o.op==='*'?v*o.v:v/o.v; }
  function chainGen(r){
    r=r||Math.random; var x, ops;
    switch(ri(r,0,4)){
      case 0: x=ri(r,2,12); ops=[{op:'*',v:ri(r,2,9)},{op:'+',v:ri(r,2,20)}]; break;
      case 1: x=ri(r,2,12); var a=ri(r,2,9); ops=[{op:'*',v:a},{op:'-',v:ri(r,1,a*x-1)}]; break;
      case 2: var d=ri(r,2,6); x=d*ri(r,2,9); ops=[{op:':',v:d},{op:'+',v:ri(r,1,15)}]; break;
      case 3: x=ri(r,2,15); ops=[{op:'+',v:ri(r,1,9)},{op:'*',v:ri(r,2,6)}]; break;
      default: var d2=ri(r,2,5), b=ri(r,1,9); x=b+d2*ri(r,1,8); ops=[{op:'-',v:b},{op:':',v:d2}];
    }
    return chainFrom(x, ops);
  }
  function chainFrom(x, ops){
    var vals=[x]; ops.forEach(function(o){ vals.push(applyOp(vals[vals.length-1],o)); });
    var res=vals[vals.length-1], term='x';
    ops.forEach(function(o,i){ var needBr = i>0 && (o.op==='*'||o.op===':') && (ops[i-1].op==='+'||ops[i-1].op==='-');
      if(needBr) term='('+term+')';
      if(o.op==='*' && term==='x') term=o.v+'x'; else term=term+o.op+o.v; });
    var text='Ich denke mir eine Zahl. Ich '+ops.map(function(o,i){ return (i? (i===ops.length-1?' und ':' , '):'')+OPN[o.op]+' '+o.v; }).join('').replace(' , ',', ')+'. Ich erhalte '+res+'.';
    return {x:x, ops:ops, vals:vals, result:res, eq:term+'='+res, text:text,
      back: ops.slice().reverse().map(function(o){ return {op:INV[o.op], v:o.v}; })};
  }

  var API = {F:F, fnum:fnum, add:add, sub:sub, mul:mul, div:div, neg:neg, feq:feq, isInt:isInt, val:val, fstr:fstr,
    tokenize:tokenize, fmt:fmt, parseLin:parseLin, parseEq:parseEq, evalAt:evalAt, linStr:linStr, opStr:opStr, norm:norm,
    solveSteps:solveSteps, substitute:substitute, probe:probe, rng:rng, ri:ri, gen:gen, LEVELS:LEVELS, chainGen:chainGen, chainFrom:chainFrom,
    applyOp:applyOp, INV:INV, OPN:OPN, gcd:gcd, lcm:lcm};
  if(typeof module!=='undefined' && module.exports) module.exports=API; else root.MathCore=API;
})(typeof window!=='undefined'?window:this);
