/* Gong-Knopf: Klick oder Taste G spielt einen sanften Gong (WebAudio, offline) */
(function(){
  var ctx=null;
  function gong(){
    try{
      ctx = ctx || new (window.AudioContext||window.webkitAudioContext)();
      if(ctx.state==='suspended') ctx.resume();
      var t=ctx.currentTime, master=ctx.createGain();
      master.gain.setValueAtTime(0.0001,t);
      master.gain.exponentialRampToValueAtTime(0.9,t+0.02);
      master.gain.exponentialRampToValueAtTime(0.0001,t+3.2);
      master.connect(ctx.destination);
      [[392,1],[784,0.45],[1176,0.2],[588,0.3]].forEach(function(p){
        var o=ctx.createOscillator(), g=ctx.createGain();
        o.type='sine'; o.frequency.value=p[0]; g.gain.value=p[1];
        o.connect(g); g.connect(master); o.start(t); o.stop(t+3.3);
      });
    }catch(e){}
    btn.classList.remove('ring'); void btn.offsetWidth; btn.classList.add('ring');
  }
  var st=document.createElement('style');
  st.textContent='#gongBtn{position:fixed;left:14px;bottom:56px;z-index:9999;width:58px;height:58px;border-radius:50%;border:3px solid #fff;background:radial-gradient(circle at 35% 30%,#ffe08a,#f4a300 60%,#c47a00);box-shadow:0 4px 14px rgba(0,0,0,.35);font-size:28px;line-height:52px;text-align:center;cursor:pointer;opacity:.85;transition:transform .15s,opacity .15s;padding:0}'+
    '#gongBtn:hover{opacity:1;transform:scale(1.08)}'+
    '#gongBtn.ring{animation:gongRing .9s ease-out}'+
    '@keyframes gongRing{0%{box-shadow:0 0 0 0 rgba(244,163,0,.8)}100%{box-shadow:0 0 0 38px rgba(244,163,0,0)}}'+
    '@media print{#gongBtn{display:none}}';
  document.head.appendChild(st);
  var btn=document.createElement('button');
  btn.id='gongBtn'; btn.type='button'; btn.title='Gong (Taste G)'; btn.setAttribute('aria-label','Gong'); btn.textContent='\uD83D\uDD14';
  ['click','mousedown','pointerdown','touchstart'].forEach(function(ev){ btn.addEventListener(ev,function(e){ e.stopPropagation(); if(ev==='click'){ e.preventDefault(); gong(); } }); });
  document.body.appendChild(btn);
  document.addEventListener('keydown',function(e){
    var t=e.target; if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable)) return;
    if((e.key==='g'||e.key==='G')&&!e.ctrlKey&&!e.metaKey&&!e.altKey){ gong(); }
  });
})();
