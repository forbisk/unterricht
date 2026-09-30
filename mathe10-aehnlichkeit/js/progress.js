/* "Mein Fortschritt": Fortschritt als Datei speichern / laden, Erinnerung, zuletzt besucht, Lernzeit.
   Läuft komplett offline unter file:// – nichts verlässt den Computer.
   Dateiformat: siehe internes Fortschrittsformat */
(function(){
"use strict";
const P = App.progress = {};
const FORMAT = "aehnlichkeit10-fortschritt", FORMAT_VERSION = 1;
const PREFIX = "aehnlichkeit10-", KEY_MAIN = App.KEY, KEY_PROFILE = PREFIX+"profil", KEY_UI = PREFIX+"ui";
/* Festes "Salz" für die Prüfsumme. Es steht hier offen im Quelltext: Die Prüfsumme erkennt nur
   versehentliches oder einfaches Ändern der Datei, sie ist KEIN Schutz gegen gezielte Manipulation. */
const SALT = "Aehnlichkeit10|Sek-LSA|Fortschritt|v1";
const MODS = ["m0","m1","m2","m3","m4","m5"];
const TRACK_PAGES = ["m0","m1","m2","m3","m4","m5","gruppe","training","pruefung","selbsttest","merk"];
const REMIND_MIN_CHANGES = 3, REMIND_ACTIVE_SEC = 20*60, SNOOZE_MS = 20*60*1000;
P.FORMAT = FORMAT; P.KEYS = {main:KEY_MAIN, profile:KEY_PROFILE, ui:KEY_UI};
const cat = ()=> window.PROGRESS_CATALOG || {modules:{}, pruefung:[], gen:[], refl:[]};
P.catalog = cat;
const esc = s => String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
P.esc = esc;
const isObj = o => !!o && typeof o==="object" && !Array.isArray(o);
function lsGet(k){ try{ return JSON.parse(localStorage.getItem(k)); }catch(e){ return null; } }
function lsSet(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); return true; }catch(e){ return false; } }

/* ---------------- SHA-256 (reines JavaScript, kein crypto.subtle nötig) ---------------- */
const K256 = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
function utf8(str){
  if(window.TextEncoder) return new TextEncoder().encode(str);
  const s = unescape(encodeURIComponent(str)), a = new Uint8Array(s.length);
  for(let i=0;i<s.length;i++) a[i] = s.charCodeAt(i);
  return a;
}
function sha256(str){
  const bytes = utf8(str), l = bytes.length, n = ((l + 9 + 63) >> 6) << 6;
  const m = new Uint8Array(n); m.set(bytes); m[l] = 0x80;
  const dv = new DataView(m.buffer), bits = l*8;
  dv.setUint32(n-4, bits>>>0); dv.setUint32(n-8, Math.floor(bits/4294967296));
  const H = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
  const w = new Uint32Array(64), r = (x,k)=> (x>>>k)|(x<<(32-k));
  for(let o=0;o<n;o+=64){
    for(let i=0;i<16;i++) w[i] = dv.getUint32(o+i*4);
    for(let i=16;i<64;i++){ const x=w[i-15], y=w[i-2]; w[i] = (w[i-16] + (r(x,7)^r(x,18)^(x>>>3)) + w[i-7] + (r(y,17)^r(y,19)^(y>>>10)))>>>0; }
    let a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],f=H[5],g=H[6],h=H[7];
    for(let i=0;i<64;i++){
      const t1 = (h + (r(e,6)^r(e,11)^r(e,25)) + ((e&f)^(~e&g)) + K256[i] + w[i])>>>0;
      const t2 = ((r(a,2)^r(a,13)^r(a,22)) + ((a&b)^(a&c)^(b&c)))>>>0;
      h=g; g=f; f=e; e=(d+t1)>>>0; d=c; c=b; b=a; a=(t1+t2)>>>0;
    }
    H[0]=(H[0]+a)>>>0; H[1]=(H[1]+b)>>>0; H[2]=(H[2]+c)>>>0; H[3]=(H[3]+d)>>>0; H[4]=(H[4]+e)>>>0; H[5]=(H[5]+f)>>>0; H[6]=(H[6]+g)>>>0; H[7]=(H[7]+h)>>>0;
  }
  return H.map(x=>("0000000"+x.toString(16)).slice(-8)).join("");
}
P.sha256 = sha256;
/* kanonisches JSON: Schlüssel sortiert → unabhängig von Formatierung/Reihenfolge in der Datei */
function canon(v){
  if(v===null || v===undefined || typeof v==="function") return "null";
  if(typeof v!=="object") return JSON.stringify(v);
  if(Array.isArray(v)) return "["+v.map(canon).join(",")+"]";
  return "{"+Object.keys(v).filter(k=>v[k]!==undefined && typeof v[k]!=="function").sort().map(k=>JSON.stringify(k)+":"+canon(v[k])).join(",")+"}";
}
P.canon = canon;
P.checksum = function(obj){
  const c = Object.assign({}, obj); delete c.pruefsumme;
  return sha256(SALT+"\n"+canon(c));
};
/* "ok" | "veraendert" | "fehlt" */
P.verify = function(obj){
  if(!isObj(obj) || !isObj(obj.pruefsumme) || typeof obj.pruefsumme.wert!=="string") return "fehlt";
  return P.checksum(obj)===obj.pruefsumme.wert ? "ok" : "veraendert";
};

/* ---------------- Hilfen ---------------- */
const pad = n => (n<10?"0":"")+n;
P.fmtDate = function(ts, withTime){
  if(!ts) return "–";
  const d = new Date(ts); if(isNaN(d)) return "–";
  let s = pad(d.getDate())+"."+pad(d.getMonth()+1)+"."+d.getFullYear();
  if(withTime) s += ", "+pad(d.getHours())+":"+pad(d.getMinutes())+" Uhr";
  return s;
};
P.fmtDuration = function(sec){
  sec = Math.round(sec||0); if(sec<60) return sec? "< 1 min" : "–";
  const h = Math.floor(sec/3600), m = Math.round((sec%3600)/60);
  return h? h+" h "+m+" min" : m+" min";
};
P.isoDay = function(d){ d = d||new Date(); return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate()); };
P.pageInfo = function(id){ return App.PAGES.find(p=>p.id===id) || null; };
P.pageTitle = function(id){
  if(id==="start") return "Startseite";
  const p = P.pageInfo(id); if(!p) return id||"–";
  return /^m\d$/.test(id) ? "Modul "+p.icon+" – "+p.title : p.title;
};
P.safeName = function(name){
  let s = String(name||"").trim().replace(/Ä/g,"Ae").replace(/Ö/g,"Oe").replace(/Ü/g,"Ue").replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/ß/g,"ss").replace(/ı/g,"i").replace(/İ/g,"I").replace(/[łŁ]/g,m=>m==="ł"?"l":"L").replace(/ø/g,"o").replace(/Ø/g,"O").replace(/æ/g,"ae").replace(/Æ/g,"Ae").replace(/œ/g,"oe").replace(/đ/g,"d");
  try{ s = s.normalize("NFD").replace(/[\u0300-\u036f]/g,""); }catch(e){}
  s = s.replace(/[^A-Za-z0-9._-]+/g,"_").replace(/_+/g,"_").replace(/^[_.-]+|[_.-]+$/g,"");
  return s.slice(0,40) || "ohne_Namen";
};
P.filename = function(name, d){ return "Fortschritt_Aehnlichkeit_"+P.safeName(name)+"_"+P.isoDay(d)+".json"; };
/* Datei herunterladen (Blob + Link) – funktioniert unter file:// in Chrome, Edge, Firefox */
App.download = function(filename, text, mime){
  const blob = new Blob([text], {type: mime||"application/octet-stream"});
  if(window.navigator && navigator.msSaveOrOpenBlob){ navigator.msSaveOrOpenBlob(blob, filename); return; }
  const url = URL.createObjectURL(blob), a = document.createElement("a");
  a.href = url; a.download = filename; a.rel = "noopener"; a.style.display = "none";
  document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(url); a.remove(); }, 4000);
};

/* ---------------- Profil & UI-Status ---------------- */
P.profile = function(){ const p = lsGet(KEY_PROFILE); return {name: (isObj(p)&&typeof p.name==="string")? p.name : "", klasse: (isObj(p)&&p.klasse)? String(p.klasse) : "10"}; };
P.setProfile = function(p){ const c = P.profile(); const n = {name: String(p.name!=null? p.name : c.name).slice(0,60), klasse: String(p.klasse!=null? p.klasse : c.klasse).slice(0,12) || "10"}; lsSet(KEY_PROFILE, n); return n; };
P.ui = function(){ const u = lsGet(KEY_UI); return isObj(u)? u : {}; };
P.setUi = function(patch){ const u = Object.assign(P.ui(), patch); lsSet(KEY_UI, u); return u; };
function bumpChanges(){ const u = P.ui(); u.changes = (u.changes||0)+1; lsSet(KEY_UI, u); pageChanges++; refreshStatus(); }
let pageChanges = 0;

/* ---------------- Daten normalisieren ---------------- */
P.normalize = function(m){
  m = isObj(m)? m : {};
  ["sec","task","refl","gen","meta","misc","att"].forEach(k=>{ if(!isObj(m[k])) m[k] = {}; });
  if(!isObj(m.time)) m.time = {total:0, pages:{}};
  if(!isObj(m.time.pages)) m.time.pages = {};
  m.time.total = +m.time.total || 0;
  if(m.last!==undefined && !isObj(m.last)) delete m.last;
  if(m.misc.tests!==undefined && !Array.isArray(m.misc.tests)) delete m.misc.tests;
  return m;
};
const clone = o => JSON.parse(JSON.stringify(o));

/* ---------------- Zusammenfassung (für Datei, Vorschau und Lehrkraft-Auswertung) ---------------- */
function countMarks(list){ const r = {pp:0,p:0,o:0,offen:0}; list.forEach(v=>{ if(v==="pp"||v==="p"||v==="o") r[v]++; else r.offen++; }); return r; }
P.markText = m => (m.pp+m.p+m.o)? m.pp+"× ++, "+m.p+"× +, "+m.o+"× ○" : "–";
P.summarize = function(main){
  const s = P.normalize(clone(main||{})), C = cat();
  const modItems = mid => (C.modules[mid] && C.modules[mid].items) || ((s.meta[mid]&&s.meta[mid].items)||[]).map(id=>({id, kind: /^m\d-(\d+|c\d|d\d|det|lab.*)$/.test(id)? "task":"sec"}));
  const res = {version: App.VERSION, module: []};
  let pctSum = 0;
  MODS.concat(["gruppe"]).forEach(mid=>{
    const items = modItems(mid), p = P.pageInfo(mid);
    const o = {id: mid, titel: P.pageTitle(mid), erledigt:0, gesamt: items.length, prozent:0,
      aufgaben:{geloest:0, gesamt:0}, abschnitte:{erledigt:0, gesamt:0}, versucht:0, ersterVersuchRichtig:0, quoteErsterVersuch:null,
      fehlversuche:0, tippsGenutzt:0, loesungenAngesehen:0, selbsteinschaetzung:null, lernzeitMin: Math.round((s.time.pages[mid]||0)/60)};
    items.forEach(it=>{
      const done = !!(s.sec[it.id] || s.task[it.id]);
      if(done) o.erledigt++;
      if(it.kind==="sec"){ o.abschnitte.gesamt++; if(done) o.abschnitte.erledigt++; return; }
      o.aufgaben.gesamt++; if(s.task[it.id]) o.aufgaben.geloest++;
      const a = s.att[it.id];
      if(isObj(a)){ o.versucht++; if(a.ok1) o.ersterVersuchRichtig++; o.fehlversuche += +a.w||0; o.tippsGenutzt += +a.h||0; o.loesungenAngesehen += a.l?1:0; }
    });
    o.prozent = o.gesamt? Math.round(100*o.erledigt/o.gesamt) : 0;
    const tracked = o.versucht;
    o.quoteErsterVersuch = tracked? Math.round(100*o.ersterVersuchRichtig/tracked) : null;
    const refl = (C.refl||[]).filter(r=>r.module===mid);
    if(refl.length) o.selbsteinschaetzung = countMarks(refl.map(r=>s.refl[r.id]));
    if(mid==="m1") o.konstruktionenRichtig = +s.misc.build||0;
    if(p) o.farbe = p.color;
    if(mid!=="gruppe"){ pctSum += o.prozent; res.module.push(o); } else res.gruppenarbeit = o;
  });
  res.gesamtProzent = Math.round(pctSum/MODS.length);
  // Selbsteinschätzung nach Bereichen A–E
  const areas = {};
  (C.refl||[]).forEach(r=>{ (areas[r.area] = areas[r.area] || {name:r.areaName, werte:[]}).werte.push(s.refl[r.id]); });
  res.selbsteinschaetzung = {bereiche:{}, gesamt: countMarks((C.refl||[]).map(r=>s.refl[r.id]))};
  Object.keys(areas).sort().forEach(k=>{ res.selbsteinschaetzung.bereiche[k] = Object.assign({name: areas[k].name}, countMarks(areas[k].werte)); });
  // Selbsttest
  const tests = (s.misc.tests && s.misc.tests.length)? s.misc.tests : (s.misc.test? [s.misc.test] : []);
  const last = s.misc.test || tests[tests.length-1] || null;
  res.selbsttest = last? {letzter:{datum: last.date || P.fmtDate(last.ts), richtig: +last.right||0, von: 10, bereiche: last.byArea||{}}, versuche: tests.length, bester: Math.max.apply(null, tests.map(t=>+t.right||0))} : null;
  // Prüfungsaufgaben
  const pr = {gesamt:(C.pruefung||[]).length, bearbeitet:0, geloest:0, teileGeloest:0, teileGesamt:0};
  (C.pruefung||[]).forEach(e=>{
    let any = false, all = true;
    e.parts.forEach(pid=>{ pr.teileGesamt++; if(s.task[pid]){ pr.teileGeloest++; any = true; } else { all = false; if(s.att[pid]) any = true; } });
    if(any) pr.bearbeitet++; if(all && e.parts.length) pr.geloest++;
  });
  res.pruefung = pr;
  // Training
  const tr = {richtig:0, mitFehler:0, besteSerie:0, besteMixRunde: +s.misc.mixBest||0, generatoren:0};
  Object.keys(s.gen).forEach(k=>{ const g = s.gen[k]; if(!isObj(g)) return; tr.richtig += +g.right||0; tr.mitFehler += +g.wrong||0; tr.besteSerie = Math.max(tr.besteSerie, +g.best||0, +g.streak||0); if(g.right) tr.generatoren++; });
  res.training = tr;
  res.aufgabenGeloest = Object.keys(s.task).filter(k=>s.task[k]).length;
  res.lernzeitMin = Math.round(s.time.total/60);
  res.zuletzt = s.last? {seite: s.last.page, titel: P.pageTitle(s.last.page), abschnitt: s.last.abschnitt||null, zeit: s.last.ts? new Date(s.last.ts).toISOString() : null} : null;
  // Klartext
  const L = ["Gesamtfortschritt (Module 0–5): "+res.gesamtProzent+" %"];
  res.module.forEach(m=>L.push(m.titel+": "+m.erledigt+" von "+m.gesamt+" erledigt ("+m.prozent+" %)"
      + (m.quoteErsterVersuch!=null? ", beim 1. Versuch richtig: "+m.quoteErsterVersuch+" %" : "")
      + (m.selbsteinschaetzung? ", Selbsteinschätzung: "+P.markText(m.selbsteinschaetzung) : "")));
  if(res.gruppenarbeit) L.push("Gruppenarbeit-Kontrollen: "+res.gruppenarbeit.aufgaben.geloest+" von "+res.gruppenarbeit.aufgaben.gesamt);
  L.push("Selbsteinschätzung gesamt: "+P.markText(res.selbsteinschaetzung.gesamt)+" ("+res.selbsteinschaetzung.gesamt.offen+" offen)");
  L.push(res.selbsttest? "Selbsttest: "+res.selbsttest.letzter.richtig+" von 10 sicher gelöst ("+res.selbsttest.letzter.datum+", "+res.selbsttest.versuche+" Versuch"+(res.selbsttest.versuche===1?"":"e")+", bester: "+res.selbsttest.bester+")" : "Selbsttest: noch nicht gemacht");
  L.push("Prüfungsaufgaben: "+pr.bearbeitet+" von "+pr.gesamt+" bearbeitet, "+pr.geloest+" vollständig gelöst");
  L.push("Training: "+tr.richtig+" Aufgaben richtig, beste Serie "+tr.besteSerie+", beste Mix-Runde "+tr.besteMixRunde+"/10");
  L.push("Lernzeit (aktiv auf der Seite): "+P.fmtDuration(s.time.total));
  if(res.zuletzt) L.push("Zuletzt besucht: "+res.zuletzt.titel+" ("+P.fmtDate(s.last.ts, true)+")");
  res.text = L;
  return res;
};

/* ---------------- Export ---------------- */
P.collect = function(){
  const out = {};
  try{
    for(let i=0;i<localStorage.length;i++){
      const k = localStorage.key(i);
      if(k && k.indexOf(PREFIX)===0 && k!==KEY_UI){ const v = localStorage.getItem(k); try{ out[k] = JSON.parse(v); }catch(e){ out[k] = v; } }
    }
  }catch(e){}
  out[KEY_MAIN] = clone(App.store.get());     // aktueller Stand aus dem Speicher dieser Seite
  out[KEY_PROFILE] = P.profile();
  return out;
};
P.buildExport = function(now){
  now = now || new Date();
  const daten = P.collect(), main = daten[KEY_MAIN], prof = daten[KEY_PROFILE];
  const obj = {
    format: FORMAT, formatVersion: FORMAT_VERSION,
    hinweis: "Fortschrittsdatei der Lernseite \u201eÄhnlichkeit \u2013 Mathematik Klasse 10\u201c. Bitte nicht von Hand bearbeiten (sonst meldet die Auswertung \u201everändert?\u201c).",
    website: {titel: "Ähnlichkeit – Mathematik Klasse 10", version: App.VERSION},
    schueler: {name: prof.name, klasse: prof.klasse},
    exportiertAm: now.toISOString(), exportiertLokal: P.fmtDate(now.getTime(), true),
    zuletztBesucht: main.last? {seite: main.last.page, href: main.last.href, titel: P.pageTitle(main.last.page), abschnitt: main.last.abschnitt||null, zeit: new Date(main.last.ts||0).toISOString()} : null,
    zusammenfassung: P.summarize(main),
    daten: daten
  };
  obj.pruefsumme = {verfahren: "SHA-256 über den kanonischen Dateiinhalt mit festem Salz", wert: P.checksum(obj)};
  return obj;
};
P.save = function(){
  const prof = P.profile();
  if(!prof.name.trim()) return {ok:false, reason:"name"};
  const obj = P.buildExport(), fn = P.filename(prof.name);
  App.download(fn, JSON.stringify(obj, null, 1), "application/json");
  P.setUi({lastExport: Date.now(), lastExportFile: fn, changes: 0, activeSinceSave: 0});
  pageChanges = 0;
  refreshStatus();
  return {ok:true, filename: fn};
};

/* ---------------- Laden / Prüfen ---------------- */
P.parse = function(text){
  let obj;
  try{ obj = JSON.parse(String(text).replace(/^\uFEFF/,"")); }catch(e){ return {ok:false, error:"Die Datei ist keine gültige Fortschrittsdatei (kein lesbares JSON)."}; }
  if(!isObj(obj)) return {ok:false, error:"Die Datei ist keine gültige Fortschrittsdatei."};
  // altes Format: reiner Fortschritts-Code von der Startseite
  if(obj.format!==FORMAT && (isObj(obj.sec) || isObj(obj.task)) ){
    const main = P.normalize(obj);
    return {ok:true, legacy:true, integrity:"fehlt", obj:{schueler:{name:"",klasse:""}, exportiertAm:null, daten:{[KEY_MAIN]:main}}, main, summary:P.summarize(main)};
  }
  if(obj.format!==FORMAT) return {ok:false, error:"Diese Datei gehört nicht zur Lernseite „Ähnlichkeit“."};
  if(!(+obj.formatVersion>=1)) return {ok:false, error:"Unbekannte Version der Fortschrittsdatei."};
  if(+obj.formatVersion>FORMAT_VERSION) return {ok:false, error:"Die Datei stammt aus einer neueren Version der Lernseite. Bitte die aktuelle Lernseite verwenden."};
  if(!isObj(obj.daten) || !isObj(obj.daten[KEY_MAIN])) return {ok:false, error:"In der Datei fehlen die Fortschrittsdaten."};
  const main = P.normalize(clone(obj.daten[KEY_MAIN]));
  if(!isObj(obj.schueler)) obj.schueler = {name:"", klasse:""};
  return {ok:true, integrity: P.verify(obj), obj, main, summary: P.summarize(main)};
};
/* Zusammenführen: von allem das Bessere bzw. die Vereinigung */
P.merge = function(curIn, incIn){
  const cur = P.normalize(clone(curIn||{})), inc = P.normalize(clone(incIn||{}));
  const incNewer = (+inc.misc.lastChange||0) > (+cur.misc.lastChange||0);
  const newer = incNewer? inc : cur, older = incNewer? cur : inc;
  const out = P.normalize({});
  const max = (a,b)=> Math.max(+a||0, +b||0);
  ["sec","task"].forEach(k=>{ [older,newer].forEach(src=>{ Object.keys(src[k]).forEach(id=>{ if(src[k][id]) out[k][id] = src[k][id]; }); }); });
  out.refl = Object.assign({}, older.refl, newer.refl);           // neuere Einschätzung gilt, Lücken aus der älteren
  new Set(Object.keys(cur.gen).concat(Object.keys(inc.gen))).forEach(id=>{
    const a = cur.gen[id]||{}, b = inc.gen[id]||{}, n = newer.gen[id]||{};
    out.gen[id] = {right:max(a.right,b.right), streak: +n.streak||0, best:max(max(a.best,b.best), max(a.streak,b.streak)), wrong:max(a.wrong,b.wrong), clean:max(a.clean,b.clean), tries:max(a.tries,b.tries)};
  });
  new Set(Object.keys(cur.att).concat(Object.keys(inc.att))).forEach(id=>{
    const a = cur.att[id], b = inc.att[id];
    if(!isObj(a) || !isObj(b)){ out.att[id] = clone(isObj(a)? a : b); return; }
    const o = {w:max(a.w,b.w), h:max(a.h,b.h), l:max(a.l,b.l), t:max(a.t,b.t)};
    const sa = +a.s||0, sb = +b.s||0;
    if(sa||sb){ const first = (!sb || (sa && sa<=sb))? a : b; o.s = +first.s; o.ok1 = first.ok1? 1 : 0; }
    out.att[id] = o;
  });
  new Set(Object.keys(cur.meta).concat(Object.keys(inc.meta))).forEach(id=>{
    const a = cur.meta[id], b = inc.meta[id];
    out.meta[id] = clone(!isObj(a)? b : !isObj(b)? a : ((+b.visited||0) > (+a.visited||0)? b : a));
  });
  out.misc = Object.assign({}, older.misc, newer.misc);
  out.misc.build = max(cur.misc.build, inc.misc.build);
  out.misc.mixBest = max(cur.misc.mixBest, inc.misc.mixBest);
  out.misc.lastChange = max(cur.misc.lastChange, inc.misc.lastChange);
  const tests = [].concat(cur.misc.tests||[], inc.misc.tests||[], cur.misc.test? [cur.misc.test] : [], inc.misc.test? [inc.misc.test] : []);
  const seen = {}, uniq = [];
  tests.forEach(t=>{ if(!isObj(t)) return; const k = (t.ts||t.date)+"|"+t.right; if(!seen[k]){ seen[k]=1; uniq.push(t); } });
  uniq.sort((x,y)=>(+x.ts||0)-(+y.ts||0));
  if(uniq.length){ out.misc.tests = uniq.slice(-30); const lastA = cur.misc.test, lastB = inc.misc.test; out.misc.test = (lastA && lastB)? ((+lastB.ts||0) > (+lastA.ts||0)? lastB : lastA) : (lastA||lastB||uniq[uniq.length-1]); }
  out.time = {total: max(cur.time.total, inc.time.total), pages:{}};
  new Set(Object.keys(cur.time.pages).concat(Object.keys(inc.time.pages))).forEach(k=>{ out.time.pages[k] = max(cur.time.pages[k], inc.time.pages[k]); });
  const la = cur.last, lb = inc.last;
  if(la||lb) out.last = clone((la && lb)? ((+lb.ts||0) > (+la.ts||0)? lb : la) : (la||lb));
  // unbekannte Zusatzfelder übernehmen
  Object.keys(newer).forEach(k=>{ if(out[k]===undefined) out[k] = clone(newer[k]); });
  Object.keys(older).forEach(k=>{ if(out[k]===undefined) out[k] = clone(older[k]); });
  return out;
};
P.apply = function(parsed, mode){
  const obj = parsed.obj, cur = App.store.get();
  const main = mode==="merge"? P.merge(cur, parsed.main) : P.normalize(clone(parsed.main));
  lsSet(KEY_MAIN, main);
  // weitere Fortschritts-Schlüssel aus der Datei (zukünftige Versionen)
  Object.keys(obj.daten||{}).forEach(k=>{
    if(k===KEY_MAIN || k===KEY_PROFILE || k===KEY_UI || k.indexOf(PREFIX)!==0) return;
    if(mode!=="merge" || localStorage.getItem(k)===null) lsSet(k, obj.daten[k]);
  });
  const prof = P.profile(), fp = isObj(obj.schueler)? obj.schueler : {};
  if(fp.name && (mode!=="merge" || !prof.name.trim())) P.setProfile({name: fp.name, klasse: fp.klasse || prof.klasse});
  P.setUi({changes: mode==="merge"? 1 : 0, activeSinceSave: 0, lastLoad: Date.now()});
  App.store.reload();
  try{ sessionStorage.setItem(PREFIX+"geladen", JSON.stringify({name: fp.name||"", mode, datei: obj.exportiertAm||null, integrity: parsed.integrity})); }catch(e){}
};
P.readFile = function(file, cb){
  if(!file) return;
  if(file.size > 5*1024*1024){ cb({ok:false, error:"Die Datei ist zu groß – das ist keine Fortschrittsdatei."}); return; }
  const r = new FileReader();
  r.onload = ()=>{ const res = P.parse(r.result); res.fileName = file.name; cb(res); };
  r.onerror = ()=> cb({ok:false, error:"Die Datei konnte nicht gelesen werden."});
  r.readAsText(file, "utf-8");
};
P.continueHref = function(main){
  const s = main || App.store.get(); const l = s.last;
  if(!l || !l.page || TRACK_PAGES.indexOf(l.page)<0) return null;
  const p = P.pageInfo(l.page); if(!p) return null;
  return p.href + (l.abschnitt && /^[A-Za-z][\w-]*$/.test(l.abschnitt)? "#"+l.abschnitt : "");
};

/* =====================================================================
   Oberfläche
   ===================================================================== */
const page = ()=> document.body.dataset.page;
const isTeacherPage = ()=> page()==="auswertung";
let widgets = [];

function hasProgress(){ const s = App.store.get(); return Object.keys(s.task).length>0 || Object.keys(s.sec).some(k=>s.sec[k]) || Object.keys(s.refl).length>0 || Object.keys(s.gen).length>0 || !!s.misc.test; }
function statusInfo(){
  const u = P.ui();
  if(!(u.changes>0) && u.lastLoad && u.lastLoad > (u.lastExport||0)) return {cls:"ok", text:"Aus Datei geladen am "+P.fmtDate(u.lastLoad, true)+" – noch nichts Neues"};
  if(!u.lastExport){ const w = (u.changes||0)>0 || hasProgress(); return {cls: w? "warn" : "none", text: w? ((u.changes||0)>0 && u.lastLoad? "Ungespeicherte Änderungen" : "Noch nie als Datei gespeichert") : "Noch nichts zu speichern"}; }
  if((u.changes||0)>0) return {cls:"warn", text:"Ungespeicherte Änderungen seit "+P.fmtDate(u.lastExport, true)};
  return {cls:"ok", text:"Gespeichert am "+P.fmtDate(u.lastExport, true)};
}
function refreshStatus(){
  const st = statusInfo();
  document.querySelectorAll(".pg-open").forEach(b=>b.classList.toggle("dirty", st.cls==="warn"));
  widgets.forEach(w=>w.refresh());
}
function uid(){ return "pg"+Math.random().toString(36).slice(2,8); }

/* Widget: Name/Klasse, Status, Weiter-Knopf, Speichern/Laden (optional Drop-Zone) */
function widget(container, opts){
  opts = opts||{};
  const id = uid();
  const el = document.createElement("div"); el.className = "pg-widget";
  el.innerHTML =
    '<div class="pg-fields">'
   +  '<label class="pg-field pg-name" for="'+id+'n"><span>Dein Name</span><input type="text" id="'+id+'n" autocomplete="name" maxlength="60" placeholder="Vorname Nachname"></label>'
   +  '<label class="pg-field pg-class" for="'+id+'k"><span>Klasse</span><input type="text" id="'+id+'k" maxlength="12" placeholder="10"></label>'
   +'</div>'
   +'<div class="pg-status"><span class="pg-dot"></span><span class="pg-stext"></span></div>'
   +'<div class="pg-stats"></div>'
   +'<a class="btn ok pg-continue" href="#" hidden>▶ Weiter, wo du aufgehört hast</a>'
   +'<div class="btn-row pg-actions"><button type="button" class="btn pg-save">⬇ Fortschritt speichern</button><button type="button" class="btn ghost pg-load">⬆ Fortschritt laden</button></div>'
   +'<input type="file" class="pg-file" accept=".json,application/json" hidden aria-label="Fortschrittsdatei auswählen">'
   + (opts.drop? '<div class="pg-drop" tabindex="0" role="button" aria-label="Fortschrittsdatei hierher ziehen oder klicken"><b>📂 Fortschrittsdatei hierher ziehen</b><span>oder klicken und die Datei auswählen (z. B. vom USB-Stick)</span></div>' : '')
   +'<div class="pg-msg" role="status" aria-live="polite"></div>'
   +'<details class="pg-help"><summary>Warum speichern? Wo landet die Datei?</summary>'
   +  '<ul>'
   +  '<li><b>Warum?</b> Dein Fortschritt steht erst einmal nur in diesem Browser. Schulrechner löschen solche Daten oft beim Abmelden oder über Nacht. Mit der Datei geht nichts verloren.</li>'
   +  '<li><b>Wo landet die Datei?</b> Im Ordner <b>Downloads</b> (Name: <code>Fortschritt_Aehnlichkeit_…json</code>). Manche Browser fragen vorher, wo sie gespeichert werden soll.</li>'
   +  '<li><b>Was dann?</b> Kopiere die Datei auf deinen <b>USB-Stick</b>, in dein <b>Schul-Netzlaufwerk</b> bzw. die <b>Schul-Cloud</b> – oder schicke sie deiner Lehrkraft.</li>'
   +  '<li><b>Nächstes Mal:</b> „Fortschritt laden“ klicken, die Datei auswählen – und du machst genau dort weiter, wo du aufgehört hast.</li>'
   +  '<li><b>Tipp:</b> Speichere am Ende jeder Stunde. Bitte die Datei nicht selbst öffnen und ändern – sonst gilt sie als „verändert“.</li>'
   +  '</ul></details>';
  container.appendChild(el);
  const nIn = el.querySelector(".pg-name input"), kIn = el.querySelector(".pg-class input"), msg = el.querySelector(".pg-msg");
  const fileIn = el.querySelector(".pg-file"), cont = el.querySelector(".pg-continue");
  function say(html, kind){ msg.className = "pg-msg feedback show "+(kind||"info"); msg.innerHTML = html; }
  function refresh(){
    const pr = P.profile();
    if(document.activeElement!==nIn) nIn.value = pr.name;
    if(document.activeElement!==kIn) kIn.value = pr.klasse;
    const st = statusInfo();
    el.querySelector(".pg-status").className = "pg-status "+st.cls;
    el.querySelector(".pg-stext").textContent = st.text;
    const s = App.store.get(), sum = P.summarize(s);
    el.querySelector(".pg-stats").innerHTML =
      '<div><b>'+sum.gesamtProzent+' %</b><span>Lernpfad</span></div>'
     +'<div><b>'+sum.aufgabenGeloest+'</b><span>Aufgaben gelöst</span></div>'
     +'<div><b>'+(sum.selbsttest? sum.selbsttest.letzter.richtig+'/10' : '–')+'</b><span>Selbsttest</span></div>'
     +'<div><b>'+esc(P.fmtDuration(s.time && s.time.total))+'</b><span>Lernzeit</span></div>';
    const href = P.continueHref(s);
    if(href && opts.showContinue!==false){ cont.hidden = false; cont.href = href; cont.innerHTML = '▶ Weiter, wo du aufgehört hast: <span>'+esc(P.pageTitle(s.last.page))+'</span>'; }
    else cont.hidden = true;
  }
  let t1;
  const saveProfile = ()=>{ clearTimeout(t1); t1 = setTimeout(()=>{ P.setProfile({name: nIn.value.trim(), klasse: kIn.value.trim()||"10"}); nIn.classList.remove("need"); widgets.forEach(w=>{ if(w.el!==el) w.refresh(); }); }, 250); };
  nIn.addEventListener("input", saveProfile); kIn.addEventListener("input", saveProfile);
  el.querySelector(".pg-save").addEventListener("click", ()=>{
    P.setProfile({name: nIn.value.trim(), klasse: kIn.value.trim()||"10"});
    const r = P.save();
    if(!r.ok){ nIn.classList.add("need"); nIn.focus(); say("Bitte gib zuerst deinen <b>Namen</b> ein – er kommt in den Dateinamen, damit deine Lehrkraft die Datei zuordnen kann.", "bad"); return; }
    say("✓ Gespeichert als <b>"+esc(r.filename)+"</b>.<br>Die Datei liegt jetzt in deinem Ordner <b>Downloads</b>. Kopiere sie auf deinen USB-Stick, in die Schul-Cloud oder schicke sie deiner Lehrkraft.", "ok");
    App.toast("💾 Fortschritt gespeichert");
    hideReminder();
  });
  el.querySelector(".pg-load").addEventListener("click", ()=>{ fileIn.value = ""; fileIn.click(); });
  fileIn.addEventListener("change", ()=>{ if(fileIn.files && fileIn.files[0]) P.readFile(fileIn.files[0], res=>handleParsed(res, say)); });
  const drop = el.querySelector(".pg-drop");
  if(drop){
    drop.addEventListener("click", ()=>{ fileIn.value = ""; fileIn.click(); });
    drop.addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); fileIn.value=""; fileIn.click(); } });
    const zone = opts.dropZone || drop;
    ["dragenter","dragover"].forEach(ev=>zone.addEventListener(ev, e=>{ e.preventDefault(); e.stopPropagation(); drop.classList.add("over"); }));
    ["dragleave","dragend"].forEach(ev=>zone.addEventListener(ev, e=>{ if(e.target===zone || e.target===drop) drop.classList.remove("over"); }));
    zone.addEventListener("drop", e=>{
      e.preventDefault(); e.stopPropagation(); drop.classList.remove("over");
      const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if(f) P.readFile(f, res=>handleParsed(res, say));
    });
  }
  const w = {el, refresh, say};
  widgets.push(w); refresh();
  return w;
}
P.widget = widget;

function handleParsed(res, say){
  if(!res.ok){ say("⚠ "+esc(res.error), "bad"); return; }
  showPreview(res);
}

/* ---------- Vorschau vor dem Laden ---------- */
let modalEl = null, lastFocus = null;
function closeModal(){ if(modalEl){ modalEl.remove(); modalEl = null; document.body.classList.remove("pg-lock"); if(lastFocus && lastFocus.focus) lastFocus.focus(); } }
function modBars(sum){
  return '<div class="pg-bars">'+sum.module.map(m=>'<div class="pg-bar-row"><span class="pg-bar-l">'+esc(m.titel.replace(/^Modul (\d) – /,"M$1 · "))+'</span><span class="pg-bar"><i style="width:'+m.prozent+'%;background:'+(m.farbe||"var(--pri)")+'"></i></span><span class="pg-bar-v">'+m.prozent+' %</span></div>').join("")+'</div>';
}
P.modBars = modBars;
function showPreview(res){
  closeModal(); closeDrawer(true);
  lastFocus = document.activeElement;
  const o = res.obj, sum = res.summary, cur = P.summarize(App.store.get()), prof = P.profile();
  const curEmpty = cur.aufgabenGeloest===0 && cur.gesamtProzent===0 && !cur.selbsttest && P.markText(cur.selbsteinschaetzung.gesamt)==="–";
  const name = (o.schueler && o.schueler.name) || "";
  let warn = "";
  if(res.integrity==="veraendert") warn += '<div class="feedback show bad">⚠ <b>Diese Datei wurde nach dem Speichern verändert.</b> Lade sie nur, wenn sie wirklich von dir ist. Deine Lehrkraft sieht den Hinweis „verändert?“.</div>';
  if(res.legacy) warn += '<div class="feedback show info">Das ist ein Fortschritts-Code im alten Format (ohne Namen und Prüfsumme).</div>';
  if(name && prof.name.trim() && name.trim().toLowerCase()!==prof.name.trim().toLowerCase()) warn += '<div class="feedback show info">Achtung: Die Datei gehört zu <b>'+esc(name)+'</b>, hier ist aber <b>'+esc(prof.name)+'</b> eingetragen.</div>';
  modalEl = document.createElement("div");
  modalEl.className = "pg-overlay pg-modal-wrap";
  modalEl.innerHTML = '<div class="pg-modal" role="dialog" aria-modal="true" aria-labelledby="pgPrevT">'
    +'<div class="pg-head"><h2 id="pgPrevT">Fortschritt laden?</h2><button type="button" class="pg-x" aria-label="Schließen">×</button></div>'
    +'<div class="pg-body">'
    + warn
    +'<div class="pg-prev-card">'
    +  '<div class="pg-prev-top"><div class="pg-avatar">'+esc((name||"?").trim().charAt(0).toUpperCase()||"?")+'</div><div><div class="pg-prev-name">'+esc(name||"(ohne Namen)")+(o.schueler&&o.schueler.klasse? ' <span class="tag">Klasse '+esc(o.schueler.klasse)+'</span>' : '')+'</div>'
    +  '<div class="small muted">'+(o.exportiertAm? 'gespeichert am '+esc(P.fmtDate(o.exportiertAm, true)) : 'ohne Datum')+(res.fileName? ' · '+esc(res.fileName) : '')+'</div></div>'
    +  '<div class="pg-prev-total"><b>'+sum.gesamtProzent+' %</b><span>Lernpfad</span></div></div>'
    +  modBars(sum)
    +  '<ul class="pg-prev-list">'
    +   '<li>✅ <b>'+sum.aufgabenGeloest+'</b> Aufgaben gelöst</li>'
    +   '<li>🧭 Selbsttest: <b>'+(sum.selbsttest? sum.selbsttest.letzter.richtig+' von 10' : 'noch nicht gemacht')+'</b></li>'
    +   '<li>🎓 Prüfungsaufgaben: <b>'+sum.pruefung.bearbeitet+'</b> von '+sum.pruefung.gesamt+' bearbeitet</li>'
    +   '<li>✓ Selbsteinschätzung: <b>'+esc(P.markText(sum.selbsteinschaetzung.gesamt))+'</b></li>'
    +   (sum.zuletzt? '<li>📍 Zuletzt: <b>'+esc(sum.zuletzt.titel)+'</b></li>' : '')
    +  '</ul>'
    +'</div>'
    +'<p class="small muted pg-cur">Auf diesem Gerät gespeichert: <b>'+cur.gesamtProzent+' %</b> Lernpfad, <b>'+cur.aufgabenGeloest+'</b> Aufgaben gelöst.</p>'
    +'<div class="pg-choice">'
    +  '<button type="button" class="pg-opt pg-replace'+(curEmpty?' rec':'')+'"><b>↻ Ersetzen</b><span>Der Stand aus der Datei ersetzt den Stand auf diesem Gerät.</span></button>'
    +  '<button type="button" class="pg-opt pg-merge'+(curEmpty?'':' rec')+'"><b>⊕ Zusammenführen</b><span>Beide Stände werden kombiniert – von allem wird das Bessere behalten. Gut, wenn du auf zwei Geräten gearbeitet hast.</span></button>'
    +'</div>'
    +'<div class="btn-row" style="justify-content:flex-end"><button type="button" class="btn ghost pg-cancel">Abbrechen</button></div>'
    +'</div></div>';
  document.body.appendChild(modalEl); document.body.classList.add("pg-lock");
  const go = mode=>{ P.apply(res, mode); closeModal(); App.toast(mode==="merge"? "Fortschritt zusammengeführt ✓" : "Fortschritt geladen ✓"); setTimeout(()=>location.reload(), 350); };
  modalEl.querySelector(".pg-replace").onclick = ()=>go("replace");
  modalEl.querySelector(".pg-merge").onclick = ()=>go("merge");
  modalEl.querySelector(".pg-cancel").onclick = closeModal;
  modalEl.querySelector(".pg-x").onclick = closeModal;
  modalEl.addEventListener("click", e=>{ if(e.target===modalEl) closeModal(); });
  (modalEl.querySelector(".pg-opt.rec")||modalEl.querySelector(".pg-opt")).focus();
}
P.showPreview = showPreview;

/* ---------- Seitenleiste "Mein Fortschritt" ---------- */
let drawer = null, drawerW = null, opener = null;
function openDrawer(){
  if(!drawer){
    drawer = document.createElement("div"); drawer.className = "pg-overlay pg-drawer-wrap"; drawer.hidden = true;
    drawer.innerHTML = '<aside class="pg-drawer" role="dialog" aria-modal="true" aria-labelledby="pgDrT"><div class="pg-head"><h2 id="pgDrT">💾 Mein Fortschritt</h2><button type="button" class="pg-x" aria-label="Schließen">×</button></div><div class="pg-body"><p class="small muted" style="margin-top:0">Speichere deinen Fortschritt als Datei – so geht nichts verloren und du kannst nächstes Mal hier weitermachen.</p></div></aside>';
    document.body.appendChild(drawer);
    drawerW = widget(drawer.querySelector(".pg-body"), {});
    drawer.querySelector(".pg-x").onclick = ()=>closeDrawer();
    drawer.addEventListener("click", e=>{ if(e.target===drawer) closeDrawer(); });
  }
  opener = document.activeElement;
  drawerW.refresh(); drawer.hidden = false; document.body.classList.add("pg-lock");
  requestAnimationFrame(()=>drawer.classList.add("open"));
  const n = drawer.querySelector(".pg-name input");
  setTimeout(()=>{ (n.value? drawer.querySelector(".pg-save") : n).focus(); }, 60);
  return drawerW;
}
function closeDrawer(silent){
  if(!drawer || drawer.hidden) return;
  drawer.classList.remove("open"); drawer.hidden = true; document.body.classList.remove("pg-lock");
  if(!silent && opener && opener.focus) opener.focus();
}
P.openDrawer = openDrawer; P.closeDrawer = closeDrawer;
document.addEventListener("keydown", e=>{ if(e.key==="Escape"){ if(modalEl) closeModal(); else closeDrawer(); } });

function headerButton(){
  const bar = document.querySelector(".site-header .bar"); if(!bar) return;
  const b = document.createElement("button");
  b.type = "button"; b.className = "pg-open"; b.title = "Fortschritt speichern oder laden";
  b.innerHTML = '<span class="pg-ico" aria-hidden="true">💾</span><span class="pg-lbl"><span class="pg-my">Mein </span>Fortschritt</span><i class="pg-badge" aria-hidden="true"></i>';
  b.setAttribute("aria-label","Mein Fortschritt – speichern oder laden");
  bar.appendChild(b);
  b.addEventListener("click", openDrawer);
}

/* ---------- Erinnerung ---------- */
let remEl = null;
function hideReminder(){ if(remEl){ remEl.classList.remove("show"); const r = remEl; remEl = null; setTimeout(()=>r.remove(), 300); } }
function showReminder(reason){
  if(remEl || isTeacherPage()) return;
  P.setUi({lastReminder: Date.now()});
  remEl = document.createElement("div"); remEl.className = "pg-reminder"; remEl.setAttribute("role","status");
  remEl.innerHTML = '<div class="pg-rem-ico" aria-hidden="true">💾</div><div class="pg-rem-txt"><b>Denk daran, deinen Fortschritt zu speichern!</b><span>'
    + (reason==="modul"? "Du hast gerade ein Modul bearbeitet." : "Du arbeitest schon eine Weile.")+' Schulrechner löschen Browserdaten manchmal.</span>'
    + '<div class="pg-rem-btns"><button type="button" class="btn small pg-rem-save">Jetzt speichern</button><button type="button" class="btn small ghost pg-rem-later">Später</button></div></div>'
    + '<button type="button" class="pg-x pg-rem-x" aria-label="Hinweis schließen">×</button>';
  document.body.appendChild(remEl);
  requestAnimationFrame(()=>remEl && remEl.classList.add("show"));
  const snooze = ()=>{ P.setUi({snoozeUntil: Date.now()+SNOOZE_MS}); hideReminder(); };
  remEl.querySelector(".pg-rem-later").onclick = snooze;
  remEl.querySelector(".pg-rem-x").onclick = snooze;
  remEl.querySelector(".pg-rem-save").onclick = ()=>{
    hideReminder();
    const w = openDrawer();
    if(P.profile().name.trim()) w.el.querySelector(".pg-save").click();
    else w.say("Gib deinen Namen ein und klicke dann auf „Fortschritt speichern“.", "info");
  };
}
P.showReminder = showReminder; P.hideReminder = hideReminder;
function reminderDue(){
  const u = P.ui();
  if((u.changes||0) < REMIND_MIN_CHANGES) return false;
  if(u.snoozeUntil && Date.now() < u.snoozeUntil) return false;
  return true;
}
P.reminderDue = reminderDue;

/* ---------- Zuletzt besucht + Lernzeit ---------- */
let lastInput = Date.now(), secTimer = null;
function trackPage(){
  const pid = page();
  if(TRACK_PAGES.indexOf(pid)<0) return;
  const info = P.pageInfo(pid), s = App.store.get();
  const hash = location.hash && /^#[A-Za-z][\w-]*$/.test(location.hash)? location.hash.slice(1) : null;
  s.last = {page: pid, href: info? info.href : "", abschnitt: hash, ts: Date.now()};
  App.store.save(true);
  const sections = ()=> Array.from(document.querySelectorAll("main section[id], main article[id], main .tcard[id]"));
  let pending = null;
  const onScroll = ()=>{
    if(secTimer) return;
    secTimer = setTimeout(()=>{
      secTimer = null;
      const lim = window.innerHeight*0.35; let cur = null;
      sections().forEach(sec=>{ const r = sec.getBoundingClientRect(); if(r.top <= lim && r.bottom > 0) cur = sec.id; });
      if(window.scrollY < 120) cur = null;
      const st = App.store.get();
      if(st.last && st.last.page===pid && st.last.abschnitt!==cur){ st.last.abschnitt = cur; st.last.ts = Date.now(); clearTimeout(pending); pending = setTimeout(()=>App.store.save(true), 400); }
    }, 700);
  };
  window.addEventListener("scroll", onScroll, {passive:true});
}
function trackTime(){
  const pid = page();
  if(TRACK_PAGES.indexOf(pid)<0 && pid!=="start") return;
  ["pointerdown","keydown","scroll","touchstart","wheel"].forEach(ev=>window.addEventListener(ev, ()=>{ lastInput = Date.now(); }, {passive:true, capture:true}));
  setInterval(()=>{
    if(document.visibilityState && document.visibilityState!=="visible") return;
    if(Date.now()-lastInput > 120000) return;       // nur aktive Zeit zählen
    const s = App.store.get();
    s.time = s.time && typeof s.time==="object"? s.time : {total:0, pages:{}};
    s.time.pages = s.time.pages || {};
    s.time.total = (+s.time.total||0) + 15; s.time.pages[pid] = (+s.time.pages[pid]||0) + 15;
    App.store.save(true);
    const u = P.ui(); u.activeSinceSave = (u.activeSinceSave||0) + 15; lsSet(KEY_UI, u);
    if(u.activeSinceSave >= REMIND_ACTIVE_SEC && reminderDue() && (!u.lastReminder || Date.now()-u.lastReminder > SNOOZE_MS)) showReminder("zeit");
  }, 15000);
}

/* ---------- Hinweis nach dem Laden ---------- */
function loadedBanner(){
  let info = null;
  try{ info = JSON.parse(sessionStorage.getItem(PREFIX+"geladen")); sessionStorage.removeItem(PREFIX+"geladen"); }catch(e){}
  if(!info) return;
  const main = document.querySelector("main"); if(!main) return;
  const href = P.continueHref(), s = App.store.get();
  const d = document.createElement("div"); d.className = "pg-loaded no-print";
  d.innerHTML = '<div><b>✓ Fortschritt '+(info.mode==="merge"? "zusammengeführt" : "geladen")+(info.name? ': '+esc(info.name) : '')+'</b>'
    + '<span>'+(info.datei? 'Datei vom '+esc(P.fmtDate(info.datei, true))+'. ' : '')+'Alles ist wiederhergestellt.</span></div>'
    + (href? '<a class="btn ok pg-loaded-go" href="'+esc(href)+'">▶ Weiter, wo du aufgehört hast: '+esc(P.pageTitle(s.last.page))+'</a>' : '')
    + '<button type="button" class="pg-x" aria-label="Hinweis schließen">×</button>';
  main.insertBefore(d, main.firstChild);
  d.querySelector(".pg-x").onclick = ()=>d.remove();
  if(!location.hash) setTimeout(()=>window.scrollTo(0,0), 0);
}

/* ---------- Start ---------- */
App.onChange = bumpChanges;
document.addEventListener("DOMContentLoaded", ()=>{
  if(isTeacherPage()) return;
  headerButton();
  const home = document.getElementById("progressBox");
  if(home) widget(home.querySelector(".pg-home-widget"), {drop:true, dropZone: home});
  trackPage(); trackTime(); loadedBanner(); refreshStatus();
  // Erinnerung beim Verlassen eines Moduls (wird auf der nächsten Seite angezeigt)
  window.addEventListener("pagehide", ()=>{
    if(/^m\d$/.test(page()) && pageChanges>0){ try{ sessionStorage.setItem(PREFIX+"modul-verlassen", page()); }catch(e){} }
  });
  let left = null; try{ left = sessionStorage.getItem(PREFIX+"modul-verlassen"); sessionStorage.removeItem(PREFIX+"modul-verlassen"); }catch(e){}
  if(left && left!==page() && reminderDue()) setTimeout(()=>showReminder("modul"), 900);
});
})();
