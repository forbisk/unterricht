/* Gemeinsame Funktionen: Modellwahl, Menü, Beamer, Tasten-Chips, Mathe-Markup. Eigene Arbeit, ohne Bibliotheken. */
(function(){
"use strict";
var TR = window.TR;
var store = {
  get: function(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
  set: function(k,v){ try { localStorage.setItem(k,v); } catch(e){} }
};
TR.store = store;
TR.keyMap = {};
["ms","dex"].forEach(function(m){ var o={}; TR.models[m].keys.forEach(function(k){ o[k.id]=k; }); TR.keyMap[m]=o; });

/* ---------- Modell ---------- */
TR.getModel = function(){
  var h = (location.hash||"").replace("#","").split("/")[0];
  if (h==="ms"||h==="dex") return h;
  var s = store.get("tr-model"); return (s==="ms"||s==="dex") ? s : "ms";
};
TR.setModel = function(m, noHash){
  store.set("tr-model", m);
  if (!noHash){
    var parts = (location.hash||"").replace("#","").split("/"); parts[0]=m;
    try { history.replaceState(null, "", "#"+parts.join("/")); } catch(e){ location.hash = parts.join("/"); }
  }
  document.querySelectorAll(".model-switch button").forEach(function(b){ b.setAttribute("aria-checked", b.dataset.model===m ? "true":"false"); });
  document.documentElement.setAttribute("data-model", m);
  document.dispatchEvent(new CustomEvent("tr-model", {detail:m}));
};

/* ---------- Tokenizer (gleich wie tools/verify.py) ---------- */
var ALIAS = {"(":"LP", ")":"RP", "×":"MUL", "÷":"DIV", "+":"ADD", "−":"SUB", "-":"SUB", "=":"EQ", "(−)":"NEG", "▶":"RIGHT", "◀":"LEFT", "▲":"UP", "▼":"DOWN", "^":"POW"};
TR.tokens = function(seq, m){
  var out=[]; if(!seq) return out;
  seq.trim().split(/\s+/).forEach(function(t){
    if (ALIAS[t]) { out.push(ALIAS[t]); return; }
    if (/^[0-9.,]+$/.test(t) && !(t.length===1 && TR.keyMap[m][t])) { t.split("").forEach(function(c){ out.push(c==="."||c===","?"DOT":c); }); return; }
    if (t.length===1 && (t==="."||t===",")) { out.push("DOT"); return; }
    out.push(t);
  });
  return out;
};

/* ---------- Beschriftungen ---------- */
var SPECIAL = {SIGMA:"Σ■", PI:"Π■", SQRTBOX:"√■", LOGBOX:"log■□", CBRT:"³√■", NROOT:"■√□", PERIOD:"⁻⁻", ABDC:"a b/c⇔d/c", MIXED:"■□/□", FRAC:"■/□", ABC:"a b/c"};
TR.SPECIAL = SPECIAL;
function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
TR.esc = esc;
/* "x^{2}" -> HTML */
TR.labHTML = function(lab){
  if (lab==null) return "";
  if (lab==="FRAC") return '<span class="fic"><span>■</span><span>—</span><span>□</span></span>';
  if (lab==="PERIOD") return '<span style="text-decoration:overline">▭</span>';
  if (SPECIAL[lab]) lab = SPECIAL[lab];
  return esc(lab).replace(/\^\{([^}]*)\}/g, "<sup>$1</sup>").replace(/_\{([^}]*)\}/g, "<sub>$1</sub>");
};
TR.keyLabel = function(k){
  if (!k) return "?";
  if (k.shape==="pad") return k.label;
  if (!k.label) return k.top || k.id;
  return k.label;
};
TR.chip = function(id, m){
  var k = TR.keyMap[m][id]; if (!k) return '<span class="kc">'+esc(id)+'</span>';
  var cls = "kc";
  if (id==="SHIFT") cls+=" sh"; else if (id==="ALPHA") cls+=" al";
  else if (k.shape==="pad") cls+=" pad"; else if (k.keyc==="del") cls+=" del"; else if (k.shape==="n") cls+=" n";
  var lab = TR.keyLabel(k);
  var html = TR.labHTML(lab);
  if (k.italic) html = "<i>"+html+"</i>";
  return '<span class="'+cls+'" title="'+esc(k.name||id)+'">'+html+'</span>';
};
TR.chips = function(seq, m){
  var t = TR.tokens(seq, m), out=[], num="";
  function flush(){ if (num){ out.push('<span class="kc n num" title="Zifferntasten '+esc(num)+'">'+esc(num)+'</span>'); num=""; } }
  t.forEach(function(id){
    if (/^[0-9]$/.test(id) || id==="DOT"){ num += id==="DOT" ? (m==="dex"?",":".") : id; }
    else { flush(); out.push(TR.chip(id,m)); }
  });
  flush();
  return '<span class="seq '+(m==="dex"?"dexs":"mss")+'" aria-label="Tasten: '+esc(seq)+'">'+out.join("")+'</span>';
};
TR.fillSeqs = function(root, m){
  (root||document).querySelectorAll(".seq[data-seq]").forEach(function(el){
    var mm = el.getAttribute("data-m") || m || TR.getModel();
    var tmp = document.createElement("span"); tmp.innerHTML = TR.chips(el.getAttribute("data-seq"), mm);
    el.innerHTML = tmp.firstChild.innerHTML; el.classList.add(mm==="dex"?"dexs":"mss");
  });
};

/* ---------- Mathe-Markup -> HTML ---------- */
function splitArgs(s){ var a=[],d=0,c=""; for (var i=0;i<s.length;i++){ var ch=s[i]; if(ch==="{")d++; if(ch==="}")d--; if(ch==="|"&&d===0){a.push(c);c="";} else c+=ch; } a.push(c); return a; }
TR.md = function(s){
  if (s==null) return "";
  s = String(s); var out="", i=0;
  while (i<s.length){
    var ch=s[i];
    if (ch==="{"){
      var d=0, j=i;
      for(;j<s.length;j++){ if(s[j]==="{")d++; if(s[j]==="}"){d--; if(d===0)break;} }
      var parts = splitArgs(s.slice(i+1,j)), tag=parts[0], A=parts.slice(1).map(TR.md);
      if (tag==="f") out+='<span class="fr"><span class="nu">'+A[0]+'</span><span class="de">'+A[1]+'</span></span>';
      else if (tag==="m") out+='<span class="mx">'+A[0]+'<span class="fr"><span class="nu">'+A[1]+'</span><span class="de">'+A[2]+'</span></span></span>';
      else if (tag==="r") out+='<span class="sq">√<span class="ov">'+A[0]+'</span></span>';
      else if (tag==="c") out+='<span class="sq"><span class="idx">3</span>√<span class="ov">'+A[0]+'</span></span>';
      else if (tag==="n") out+='<span class="sq"><span class="idx">'+A[0]+'</span>√<span class="ov">'+A[1]+'</span></span>';
      else if (tag==="s") out+='<sup>'+A[0]+'</sup>';
      else if (tag==="sub") out+='<sub>'+A[0]+'</sub>';
      else if (tag==="E") out+='<span class="e10">×10<sup>'+A[0]+'</sup></span>';
      else if (tag==="o") out+='<span class="ovl">'+A[0]+'</span>';
      else out+=esc(s.slice(i,j+1));
      i=j+1; continue;
    }
    out += ch==="-" ? "−" : esc(ch); i++;
  }
  return out;
};
/* reiner Text (für Suche/aria) */
TR.mdText = function(s){ var d=document.createElement("div"); d.innerHTML=TR.md(s); return d.textContent; };

/* ---------- Kopf: Menü, Beamer ---------- */
document.addEventListener("DOMContentLoaded", function(){
  var mb = document.querySelector(".menu-btn"), nav = document.getElementById("mainnav");
  if (mb && nav) mb.addEventListener("click", function(){ var o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", o?"true":"false"); });
  var bb = document.querySelector(".beamer-btn");
  function setBeamer(on){ document.documentElement.classList.toggle("beamer", on); if(bb) bb.setAttribute("aria-pressed", on?"true":"false"); store.set("tr-beamer", on?"1":"0"); window.dispatchEvent(new Event("resize")); }
  if (bb) bb.addEventListener("click", function(){ setBeamer(!document.documentElement.classList.contains("beamer")); });
  if (store.get("tr-beamer")==="1") setBeamer(true);
  document.querySelectorAll(".model-switch button").forEach(function(b){ b.addEventListener("click", function(){ TR.setModel(b.dataset.model); }); });
  document.documentElement.setAttribute("data-model", TR.getModel());
  document.querySelectorAll(".model-switch button").forEach(function(b){ b.setAttribute("aria-checked", b.dataset.model===TR.getModel() ? "true":"false"); });
  var lastM = TR.getModel(), lastH = location.hash;
  window.addEventListener("hashchange", function(){
    var h = (location.hash||"").replace("#","").split("/")[0];
    if ((h==="ms"||h==="dex") && h!==lastM){ lastM=h; TR.setModel(h, true); }
    else if (location.hash!==lastH) document.dispatchEvent(new CustomEvent("tr-hash"));
    lastH = location.hash;
  });
  document.addEventListener("tr-model", function(e){ lastM = e.detail; lastH = location.hash; });
});
})();
