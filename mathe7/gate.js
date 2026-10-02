/* Einfacher Passwortschutz */
(function(){
  var H='3a26dafb33dc23130eea105d4d0c11f3fdcee346f42a017ce0c7bc86155b90ce', K='tfgs_ok_mathe7', T='Mathematik Klasse 7';
  try{ if(localStorage.getItem(K)===H) return; }catch(e){}
  var st=document.createElement('style');
  st.id='gateHide'; st.textContent='html.gated body>*:not(#gate){display:none!important}#gate{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0f766e,#1e3a8a);font-family:system-ui,Segoe UI,sans-serif}#gate .box{background:#fff;border-radius:18px;padding:32px 36px;max-width:380px;width:90%;box-shadow:0 20px 50px rgba(0,0,0,.35);text-align:center}#gate h1{font-size:20px;margin:6px 0 2px;color:#0f172a}#gate p{margin:4px 0 16px;color:#475569;font-size:14px}#gate input{width:100%;box-sizing:border-box;font-size:18px;padding:12px;border:2px solid #cbd5e1;border-radius:10px;outline:none}#gate input:focus{border-color:#0f766e}#gate button{margin-top:12px;width:100%;font-size:17px;padding:12px;border:0;border-radius:10px;background:#0f766e;color:#fff;cursor:pointer}#gate .err{color:#dc2626;min-height:20px;font-size:14px;margin-top:8px}#gate small{display:block;margin-top:14px;color:#94a3b8}';
  document.documentElement.classList.add('gated');
  document.head.appendChild(st);
  function sha(s){ return crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)).then(function(b){ return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0')}).join(''); }); }
  function show(){
    var g=document.createElement('div'); g.id='gate';
    g.innerHTML='<form class="box"><div style="font-size:40px">🔒</div><h1>'+T+'</h1><p>Theodor Fontane Gemeinschaftsschule · Lehrer P. Kurlavičius</p><input type="password" placeholder="Passwort" autocomplete="current-password" autofocus><button type="submit">Öffnen</button><div class="err"></div><small>Das Passwort bekommst du von deinem Lehrer.</small></form>';
    document.body.appendChild(g);
    var f=g.querySelector('form'), i=g.querySelector('input'), e=g.querySelector('.err');
    i.focus();
    f.addEventListener('submit',function(ev){ ev.preventDefault(); ev.stopPropagation();
      sha(i.value.trim()).then(function(h){ if(h===H){ try{localStorage.setItem(K,H);}catch(x){} g.remove(); document.documentElement.classList.remove('gated'); }else{ e.textContent='Falsches Passwort.'; i.select(); } }); });
    ['keydown','keyup','click','mousedown','pointerdown','touchstart','wheel'].forEach(function(t){ g.addEventListener(t,function(ev){ ev.stopPropagation(); }); });
  }
  if(document.body) show(); else document.addEventListener('DOMContentLoaded',show);
})();
