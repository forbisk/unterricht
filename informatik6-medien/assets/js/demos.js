/* =========================================================
   Folien-Aufbau (Kopfzeilen, Heft-Einträge) + interaktive Demos
   Läuft vor deck.js-Init (Skripte am Ende von <body>).
   ========================================================= */
(function(){
  'use strict';
  function $(s,r){return (r||document).querySelector(s)}
  function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
  var CH = window.CHAPTERS || [];

  /* ---------- 1. Kopfzeilen + Typ-Abzeichen ---------- */
  var BADGE = { heft:['heft','i-pencil','Heft-Eintrag'], recherche:['recherche','i-search','Recherche'], denk:['denk','i-chat','Denkfrage'],
                quiz:['quiz','i-hand','Quiz'], demo:['demo','i-play','Live-Demo'], merk:['merk','i-bulb','Merksatz'] };
  $$('.slide').forEach(function(s){
    if(s.classList.contains('title') || s.classList.contains('chapter')) return;
    var c = parseInt(s.dataset.chapter||'1',10), ch = CH[c-1];
    if(ch && !$('.chip',s)) s.insertAdjacentHTML('afterbegin','<div class="chip"><span class="num">'+c+'</span>'+ch.name+'</div>');
    Object.keys(BADGE).forEach(function(k){
      if(s.classList.contains(k)){ var b=BADGE[k], txt=s.dataset.badge||b[2];
        s.insertAdjacentHTML('afterbegin','<div class="badge '+b[0]+'"><svg><use href="#'+b[1]+'"/></svg>'+txt+'</div>'); }
    });
  });

  /* ---------- 1b. Gemischten Text in Flex-Boxen in <span> packen ---------- */
  $$('.takeaway,.merkbox,.goldline,.checks li,.cando li,.facts li,.vs').forEach(function(el){
    var kids = Array.prototype.slice.call(el.childNodes), lead = kids.filter(function(n){ return n.nodeType===1 && (n.classList.contains('emoji')||n.classList.contains('box')); })[0];
    var span = document.createElement('span'); span.className='txt';
    kids.forEach(function(n){ if(n!==lead) span.appendChild(n); }); el.appendChild(span);
  });

  /* ---------- 2. Heft-Einträge rendern ---------- */
  $$('.slide.heft[data-heft]').forEach(function(s){
    var h = (window.HEFT||[]).filter(function(x){return x.n===+s.dataset.heft})[0]; if(!h) return;
    var extra = Array.prototype.slice.call(s.childNodes).filter(function(n){ return !(n.classList && (n.classList.contains('chip')||n.classList.contains('badge'))); });
    var wrap = document.createElement('div'); wrap.className='heft-body';
    wrap.innerHTML = '<div class="hkicker"><svg><use href="#i-pencil"/></svg>Heft-Eintrag '+h.n+'</div><h2>'+h.title+'</h2>'+window.renderHeft(h,true);
    extra.forEach(function(n){ wrap.appendChild(n); });
    s.appendChild(wrap);
    s.insertAdjacentHTML('beforeend','<div class="holes">'+new Array(9).join('<i></i>')+'</div><svg class="pencil"><use href="#i-pencil"/></svg>'+
      '<div class="heft-hint"><svg width="36" height="36"><use href="#i-pencil"/></svg> Abschreiben: Überschrift unterstreichen, Datum dazu!</div>');
    s.classList.add('heft-t-'+(h.type||'list'));
  });

  /* ---------- 3. Sprung zu Kapitel ---------- */
  document.addEventListener('click', function(e){
    var b = e.target.closest('[data-goto-ch]'); if(!b || !window.Deck) return;
    var n = b.getAttribute('data-goto-ch'), idx = Deck.slides.findIndex(function(s){ return s.dataset.chapter===n; });
    if(idx>=0) Deck.go(idx);
  });

  /* ---------- Morse (geteilt) ---------- */
  var MORSE = {A:'·−',B:'−···',C:'−·−·',D:'−··',E:'·',F:'··−·',G:'−−·',H:'····',I:'··',J:'·−−−',K:'−·−',L:'·−··',M:'−−',N:'−·',O:'−−−',P:'·−−·',Q:'−−·−',R:'·−·',
    S:'···',T:'−',U:'··−',V:'···−',W:'·−−',X:'−··−',Y:'−·−−',Z:'−−··','Ä':'·−·−','Ö':'−−−·','Ü':'··−−','0':'−−−−−','1':'·−−−−','2':'··−−−','3':'···−−','4':'····−',
    '5':'·····','6':'−····','7':'−−···','8':'−−−··','9':'−−−−·','!':'−·−·−−','?':'··−−··','.':'·−·−·−',',':'−−··−−'};
  function toMorse(t){ return t.toUpperCase().replace(/ß/g,'SS').split('').map(function(ch){ return ch===' ' ? '/' : (MORSE[ch]||''); }).filter(Boolean); }
  var morsePlaying = null;
  function playMorse(text, opts){
    opts = opts||{}; var unit = 0.085*(opts.slow||1), S = window.DeckSound; var ctx = S && S.unlock(); 
    if(morsePlaying){ morsePlaying.forEach(clearTimeout); }
    morsePlaying = [];
    var t = 0.05, codes = toMorse(text), events = [];
    codes.forEach(function(code, ci){
      if(code==='/'){ t += unit*4; return; }
      code.split('').forEach(function(sym, si){
        var d = sym==='·' ? unit : unit*3;
        events.push({t:t, d:d, ci:ci, si:si}); if(ctx) S.tone(700, t, d, 'sine', .25);
        t += d + unit;
      });
      t += unit*2;
    });
    events.forEach(function(ev){
      morsePlaying.push(setTimeout(function(){ opts.on && opts.on(ev); }, ev.t*1000));
      morsePlaying.push(setTimeout(function(){ opts.off && opts.off(ev); }, (ev.t+ev.d)*1000));
    });
    morsePlaying.push(setTimeout(function(){ opts.done && opts.done(); }, t*1000+100));
    return codes;
  }

  /* ---------- Demo: Eine Idee – viele Formen ---------- */
  (function(){
    var seg = $('#idea-seg'); if(!seg) return;
    var IDEAS = { kalt:{t:'Mir ist kalt.', e:'🥶', m:'KALT', say:'Mir ist kalt!', color:'#2f7fe0'},
                  hunger:{t:'Ich habe Hunger.', e:'😋', m:'HUNGER', say:'Ich habe Hunger!', color:'#ef8a2e'},
                  freude:{t:'Ich freue mich!', e:'🥳', m:'FREUDE', say:'Ich freue mich!', color:'#e0a614'} };
    var cur = 'kalt';
    function set(k){
      cur = k; var d = IDEAS[k];
      $$('button',seg).forEach(function(b){ b.classList.toggle('on', b.dataset.idea===k); });
      $('#f-text').textContent = d.t; $('#f-emoji').textContent = d.e;
      $('#f-morse').textContent = toMorse(d.m).join(' '); $('#f-morse-w').textContent = d.m.split('').join(' ');
      var fig = $('#f-figure'); fig.setAttribute('class','figure '+k); $('.shirt',fig).setAttribute('fill', d.color);
      $$('.fcard').forEach(function(c){ c.classList.remove('pulse'); void c.offsetWidth; c.classList.add('pulse'); });
    }
    seg.addEventListener('click', function(e){ var b=e.target.closest('button'); if(b) set(b.dataset.idea); });
    $('#f-speak').addEventListener('click', function(){
      var w = $('#f-waves'); w.classList.add('on'); setTimeout(function(){ w.classList.remove('on'); }, 1800);
      try{ if(window.speechSynthesis){ var u = new SpeechSynthesisUtterance(IDEAS[cur].say); u.lang='de-DE';
        var v = speechSynthesis.getVoices().filter(function(x){ return /^de/i.test(x.lang); })[0]; if(v) u.voice=v; speechSynthesis.cancel(); speechSynthesis.speak(u); } }catch(err){}
    });
    $('#f-morse-play').addEventListener('click', function(){
      var el = $('#f-morse'); playMorse(IDEAS[cur].m, { on:function(){ el.classList.add('lit'); }, off:function(){ el.classList.remove('lit'); } });
    });
  })();

  /* ---------- Kerbholz: 20 Kerben ---------- */
  (function(){
    var g = $('#notches'); if(!g) return; var h='';
    for(var i=0;i<20;i++){ var x = 40 + i*26 + Math.floor(i/5)*8; h += '<path d="M'+x+' 74v'+(i%5===4?40:30)+'"/>'; }
    g.innerHTML = h;
  })();

  /* ---------- Demo: Datum ---------- */
  (function(){
    var box = $('.rules'); if(!box) return;
    var M = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
    function set(r){
      $$('.rule',box).forEach(function(b){ b.classList.toggle('on', b.dataset.rule===r); });
      var a=5, b=6, day, mon;
      if(r==='us'){ mon=a; day=b; } else { day=a; mon=b; }
      var cal = $('#dt-cal'); cal.classList.remove('flipin'); void cal.offsetWidth; cal.classList.add('flipin');
      $('#dt-m').textContent = M[mon-1]; $('#dt-d').textContent = day; $('#dt-y').textContent = '2027';
      cal.dataset.rule = r;
      $('#dt-raw').textContent = r==='iso' ? '2027-06-05' : '05/06/27';
      $('#dt-iso').innerHTML = r==='iso' ? 'Jahr – Monat – Tag: <b>immer eindeutig</b>' : (r==='us' ? 'Monat zuerst → <b>6. Mai</b>' : 'Tag zuerst → <b>5. Juni</b>');
    }
    box.addEventListener('click', function(e){ var b=e.target.closest('.rule'); if(b) set(b.dataset.rule); });
    set('de');
  })();

  /* ---------- Demo: Wissens-Treppe ---------- */
  (function(){
    var seg = $('#stair-seg'); if(!seg) return;
    var EX = { fieber:['38,9','„Ich habe 38,9 °C Fieber.“','„Bei Fieber bleibe ich im Bett und trinke viel.“'],
               wetter:['90 %','„Morgen regnet es sehr wahrscheinlich.“','„Ich packe die Regenjacke ein – dann bleibe ich trocken.“'],
               akku:['12 %','„Mein Handy-Akku hat nur noch 12 %.“','„Ich lade es jetzt – sonst kann ich später niemanden anrufen.“'] };
    seg.addEventListener('click', function(e){ var b=e.target.closest('button'); if(!b) return;
      $$('button',seg).forEach(function(x){ x.classList.toggle('on', x===b); });
      var d = EX[b.dataset.ex]; $('#st-d').textContent=d[0]; $('#st-i').textContent=d[1]; $('#st-w').textContent=d[2];
      $$('.stair').forEach(function(s){ s.classList.remove('pulse'); void s.offsetWidth; s.classList.add('pulse'); });
    });
  })();

  /* ---------- Demo: EAN-13 Strichcode ---------- */
  var EAN = (function(){
    var L=['0001101','0011001','0010011','0111101','0100011','0110001','0101111','0111011','0110111','0001011'];
    var G=['0100111','0110011','0011011','0100001','0011101','0111001','0000101','0010001','0001001','0010111'];
    var R=['1110010','1100110','1101100','1000010','1011100','1001110','1010000','1000100','1001000','1110100'];
    var P=['LLLLLL','LLGLGG','LLGGLG','LLGGGL','LGLLGG','LGGLLG','LGGGLL','LGLGLG','LGLGGL','LGGLGL'];
    function check(d12){ var s=0; for(var i=0;i<12;i++) s += (+d12[i])*(i%2?3:1); return String((10 - s%10)%10); }
    function bits(code){ var f=+code[0], p=P[f], b='101';
      for(var i=1;i<=6;i++) b += (p[i-1]==='L'?L:G)[+code[i]];
      b += '01010'; for(i=7;i<=12;i++) b += R[+code[i]]; return b+'101'; }
    function svg(code){ var b=bits(code), x0=18, w=2, out='';
      var guard = function(i){ return i<3 || (i>=45&&i<50) || i>=92; };
      for(var i=0;i<b.length;i++) if(b[i]==='1') out += '<rect x="'+(x0+i*w)+'" y="6" width="'+w+'" height="'+(guard(i)?104:94)+'" fill="#1b2536"/>';
      var tx = function(x,t){ return '<text x="'+x+'" y="124" font-family="Consolas,Menlo,monospace" font-size="15" font-weight="700" fill="#1b2536" text-anchor="middle">'+t+'</text>'; };
      var tg = function(x,t){ return '<text x="'+x+'" y="124" font-family="Consolas,Menlo,monospace" font-size="15" font-weight="700" fill="#1b2536" textLength="76" lengthAdjust="spacing">'+t+'</text>'; };
      out += tx(9, code[0]); out += tg(x0+3*w+4, code.slice(1,7)); out += tg(x0+50*w+4, code.slice(7));
      return out; }
    return {check:check, svg:svg};
  })();
  (function(){
    var svg = $('#ean-svg'); if(!svg) return;
    var PR = [ {n:'Apfelsaft 1 l', p:'1,19 €', c:'400712300101'}, {n:'Schoko-Müsli', p:'2,49 €', c:'401234500277'}, {n:'Heft A4, liniert', p:'0,89 €', c:'426012300049'} ];
    PR.forEach(function(p){ p.c += EAN.check(p.c); });
    var cur = 0, busy=false;
    function show(i){ cur=i; svg.innerHTML = EAN.svg(PR[i].c); $$('#ean-prods .prod').forEach(function(b){ b.classList.toggle('on', +b.dataset.i===i); });
      screen('Bereit …','&nbsp;'); var li=$('#ean-last'); if(li) li.innerHTML='„'+PR[i].n+' '+PR[i].p+'“ <small>(Information)</small>'; }
    function screen(a,b,cls){ var s=$('#ean-screen'); s.className='reg-screen '+(cls||''); $('.l1',s).innerHTML=a; $('.l2',s).innerHTML=b; }
    $('#ean-prods').addEventListener('click', function(e){ var b=e.target.closest('.prod'); if(b && !busy) show(+b.dataset.i); });
    $('#ean-scan').addEventListener('click', function(){
      if(busy) return; busy=true; var las=$('#ean-laser'); las.classList.remove('go'); void las.offsetWidth; las.classList.add('go');
      screen('Scanne …','<span class="blinkdots">▮▮▮</span>');
      setTimeout(function(){
        var S=window.DeckSound; if(S) S.tone(1800,0,.12,'square',.08);
        screen('<span class="mono">'+PR[cur].c+'</span>','suche in Datenbank …');
        setTimeout(function(){
          if($('#ean-db').checked) screen(PR[cur].n, PR[cur].p, 'ok');
          else screen('<span class="mono">'+PR[cur].c+'</span>','⚠ Artikel unbekannt!','bad');
          busy=false;
        }, 900);
      }, 1100);
    });
    show(0);
  })();

  /* ---------- Demo: QR-Code ---------- */
  function qrSvg(text, finder){
    if(typeof qrcode==='undefined') return {svg:'<text x="10" y="50">QR-Bibliothek fehlt</text>', n:0, size:100};
    qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
    var q = qrcode(0,'M'); q.addData(text,'Byte'); q.make();
    var n = q.getModuleCount(), m=4, out = '<rect x="0" y="0" width="'+(n+2*m)+'" height="'+(n+2*m)+'" fill="#fff"/>', path='';
    for(var r=0;r<n;r++) for(var c=0;c<n;c++) if(q.isDark(r,c)) path += 'M'+(c+m)+' '+(r+m)+'h1v1h-1z';
    out += '<path d="'+path+'" fill="#1b2536" shape-rendering="crispEdges"/>';
    if(finder) [[0,0],[n-7,0],[0,n-7]].forEach(function(p){ out += '<rect class="finder" x="'+(p[0]+m-.5)+'" y="'+(p[1]+m-.5)+'" width="8" height="8" rx="1.2" fill="none" stroke="#e2455b" stroke-width="1"/>'; });
    return {svg:out, n:n, size:n+2*m};
  }
  (function(){
    var inp = $('#qr-in'); if(!inp) return; var svg = $('#qr-svg');
    function draw(){ var r = qrSvg(inp.value || ' ', $('#qr-finder').checked); svg.setAttribute('viewBox','0 0 '+r.size+' '+r.size); svg.innerHTML=r.svg; $('#qr-count').textContent = (r.n*r.n).toLocaleString('de-DE'); }
    inp.addEventListener('input', draw); $('#qr-finder').addEventListener('change', draw);
    $$('[data-qr]').forEach(function(b){ b.addEventListener('click', function(){ inp.value=b.dataset.qr; draw(); }); });
    draw();
  })();
  $$('.qr-tile').forEach(function(t){ var r=qrSvg('Informatik Klasse 6'); t.setAttribute('viewBox','0 0 '+r.size+' '+r.size); t.innerHTML=r.svg; });

  /* ---------- Demo: Kommunikationskette ---------- */
  (function(){
    var box = $('#kette'); if(!box) return;
    var SC = {
      ok:{out:'„Treffen um 15 Uhr am Spielplatz!“', med:'Handy + WLAN', stop:null, bad:null, inn:'„Alles klar, 15 Uhr! 👍“', info:'✅ <b>Alles klappt:</b> Lena packt die Idee in eine Form (Text), das Medium trägt die Daten, Tom interpretiert sie.'},
      wlan:{out:'„Treffen um 15 Uhr am Spielplatz!“', med:'Handy – kein WLAN!', stop:1, bad:1, inn:'… (Tom wartet und wartet)', info:'📵 Störung beim <b>Medium</b>: Ohne WLAN werden die Daten nicht übertragen. Die Nachricht kommt nie an.'},
      laerm:{out:'🎤 „Treffen um 15 Uhr am Spielplatz!“', med:'Sprachnachricht + Luft (laut!)', stop:null, bad:1, noisy:true, inn:'„Treffen um … Uhr am …platz?“ 🤔', info:'🔊 Störung beim <b>Medium</b>: Lärm auf dem Schulhof überdeckt die Töne. Nur Teile der Daten kommen an.'},
      sprache:{out:'„Tavataan kello 15 leikkipuistossa!“', med:'Handy + WLAN', stop:null, bad:2, inn:'„Hä? Was heißt das?“ 🤷', info:'🌍 Störung beim <b>Empfänger</b>: Die Daten kommen an, aber Tom kennt die Regel (Finnisch) nicht. Keine gemeinsame Regel → keine Information.'},
      tipp:{out:'„Treffen um 51 Uhr am Spielplatz!“', med:'Handy + WLAN', stop:null, bad:0, inn:'„51 Uhr?? Wann denn nun?“ 😕', info:'⌨️ Störung beim <b>Sender</b>: Lena hat die Idee falsch in die Form gepackt. Schon die Daten sind fehlerhaft.'},
      akku:{out:'„Treffen um 15 Uhr am Spielplatz!“', med:'Handy + WLAN', stop:null, bad:2, off:true, inn:'💤 Handy aus – niemand liest die Nachricht.', info:'🔋 Störung beim <b>Empfänger</b>: Die Nachricht ist da, aber Toms Handy ist aus. Ohne Empfänger keine Interpretation.'}
    };
    var pk = $('#k-packet'), running = 0;
    function center(el){ return el.offsetLeft + el.offsetWidth/2; }
    function reset(){ ['k-n0','k-n1','k-n2','k-l0','k-l1'].forEach(function(id){ $('#'+id).classList.remove('bad','good','off'); }); $('#k-in').className='kmsg in'; $('#k-in').textContent='…'; pk.className='packet'; box.classList.remove('noisy'); }
    function run(key){
      var sc = SC[key], my = ++running; reset();
      $$('.kbtns .btn').forEach(function(b){ b.classList.toggle('on', b.dataset.k===key); });
      $('#k-out').textContent = sc.out; $('#k-medname').textContent = sc.med; $('#k-info').innerHTML = 'Die Nachricht ist unterwegs …';
      var x0 = center($('#k-n0'))-40, x1 = center($('#k-n1'))-40, x2 = center($('#k-n2'))-40;
      if(sc.bad===0) $('#k-n0').classList.add('bad');
      pk.style.left = x0+'px'; pk.classList.add('show'); if(sc.noisy) box.classList.add('noisy');
      var a = pk.animate([{left:x0+'px'},{left:x1+'px'}],{duration:900,easing:'ease-in-out',fill:'forwards'});
      a.onfinish = function(){ if(my!==running) return;
        if(sc.stop===1){ $('#k-n1').classList.add('bad'); $('#k-l1').classList.add('bad'); pk.classList.add('dead'); finish(sc); return; }
        if(sc.bad===1) { $('#k-n1').classList.add('bad'); pk.classList.add('shaky'); }
        var b = pk.animate([{left:x1+'px'},{left:x2+'px'}],{duration:900,easing:'ease-in-out',fill:'forwards'});
        b.onfinish = function(){ if(my!==running) return;
          if(sc.bad===2) $('#k-n2').classList.add(sc.off?'off':'bad');
          if(sc.bad==null){ ['k-n0','k-n1','k-n2','k-l0','k-l1'].forEach(function(id){ $('#'+id).classList.add('good'); }); }
          pk.classList.remove('show'); finish(sc); };
      };
    }
    function finish(sc){ var i=$('#k-in'); i.textContent=sc.inn; i.classList.add('show', sc.bad==null?'good':'bad'); $('#k-info').innerHTML=sc.info; }
    $('.kbtns').addEventListener('click', function(e){ var b=e.target.closest('[data-k]'); if(b) run(b.dataset.k); });
  })();

  /* ---------- Demo: Zeitstrahl ---------- */
  (function(){
    var tl = $('#tl'); if(!tl) return;
    var ST = [
      {e:'🖐️', y:'vor 40 000 J.', when:'vor über 40 000 Jahren', t:'Höhlenmalerei', txt:'Menschen malen Tiere und Hände an Höhlenwände. Manche Bilder gibt es heute noch!', med:'Stein (Höhlenwand)', form:'Bild', m:[1,1,1], ml:['nur in der Höhle','sehr langsam – man muss hingehen','wenige Menschen'], img:'assets/img/lascaux.jpg', cap:'Höhlenmalerei in Lascaux (Frankreich), ca. 17 000 Jahre alt'},
      {e:'🔥', y:'vor Tausenden J.', when:'vor Tausenden von Jahren', t:'Rauchzeichen & Trommeln', txt:'Rauchwolken und Trommelschläge sind weit zu sehen oder zu hören. Aber: Nur wer die vereinbarte Regel kennt, versteht sie.', med:'Luft', form:'Rauchzeichen, Töne', m:[2,4,2], ml:['bis zum nächsten Hügel','sofort','alle in der Nähe'], svg:'smoke'},
      {e:'📜', y:'um 1450', when:'um 1450 · Johannes Gutenberg, Mainz', t:'Brief & Buchdruck', txt:'Mit beweglichen Buchstaben kann man viele gleiche Bücher drucken. Briefe reisen mit Boten und Kutschen.', med:'Papier', form:'Text', m:[4,1,4], ml:['sehr weit','Tage bis Wochen','viele Leser'], svg:'press', img:'assets/img/druckpresse.jpg', cap:'Nachbau einer Druckpresse nach Gutenberg'},
      {e:'⚡', y:'1844', when:'1844 · Samuel Morse', t:'Telegraf & Morse-Code', txt:'Kurze und lange Stromstöße reisen durch einen Draht – in Sekunden über Hunderte Kilometer.', med:'Draht (Strom)', form:'Morse-Code', m:[4,5,1], ml:['so weit der Draht reicht','in Sekunden','ein Empfänger'], svg:'tele', img:'assets/img/morse-taste.jpg', cap:'Morsetaste und Klopfer (Telegrafen-Geräte)'},
      {e:'☎️', y:'1861 / 1876', when:'1861 Philipp Reis · 1876 Alexander Graham Bell', t:'Telefon', txt:'Jetzt reist die Stimme selbst durch den Draht. Später wählt man die Nummer mit einer Wählscheibe.', med:'Draht (Strom)', form:'Stimme (Ton)', m:[4,5,1], ml:['sehr weit','sofort','ein Gesprächspartner'], img:'assets/img/waehlscheibe.jpg', cap:'Telefon-Wählscheibe (20. Jahrhundert)'},
      {e:'📻', y:'ab 1923', when:'Radio ab 1923 · Fernsehen ab den 1950ern', t:'Radio & Fernsehen', txt:'Funkwellen bringen Ton und Bild in Millionen Wohnzimmer gleichzeitig – aber nur in eine Richtung.', med:'Funkwellen', form:'Ton, Bild', m:[5,5,5], ml:['ganzes Land','sofort','Millionen – aber nur zuhören'], svg:'radio'},
      {e:'🖥️', y:'1941', when:'1941 · Konrad Zuse, Berlin', t:'Computer Z3', txt:'Der erste funktionierende programmierbare Computer der Welt. Er rechnet mit 0 und 1.', med:'Relais (Strom)', form:'Zahlen (0 und 1)', m:[1,3,1], ml:['nur im Raum','für damals schnell','ein Benutzer'], img:'assets/img/z3.jpg', cap:'Nachbau der Z3 im Deutschen Museum'},
      {e:'🌐', y:'1969 / 1991', when:'1969 erste Verbindung · 1991 World Wide Web', t:'Internet', txt:'Computer auf der ganzen Welt werden verbunden. Alles – Text, Bild, Ton – reist als Bits.', med:'Kabel, Glasfaser, Funk', form:'alles als Bits (0 und 1)', m:[5,5,5], ml:['weltweit','in Sekunden','Milliarden – in beide Richtungen'], svg:'net'},
      {e:'📱', y:'ab 2007', when:'ab 2007', t:'Smartphone', txt:'Telefon, Kamera, Brief, Radio und Computer in der Hosentasche. Jeder kann senden und empfangen.', med:'Bildschirm + Funk', form:'Text, Bild, Ton, Video, Emoji', m:[5,5,5], ml:['weltweit','sofort','Milliarden'], svg:'phone'}
    ];
    var SVGS = {
      press:'<svg viewBox="0 0 300 220"><rect width="300" height="220" fill="#f6ecd9"/><rect x="60" y="20" width="18" height="180" fill="#8a5a2b"/><rect x="222" y="20" width="18" height="180" fill="#8a5a2b"/><rect x="50" y="20" width="200" height="22" rx="4" fill="#6b3f26"/><rect x="50" y="110" width="200" height="16" fill="#6b3f26"/><rect x="138" y="42" width="24" height="40" fill="#c7cdd6"/><rect x="100" y="82" width="100" height="20" rx="3" fill="#8a5a2b"/><path d="M162 60h70" stroke="#6b3f26" stroke-width="8" stroke-linecap="round"/><rect x="95" y="128" width="110" height="10" fill="#fff" stroke="#1b2536" stroke-width="2"/><g fill="#1b2536"><rect x="104" y="150" width="14" height="18" rx="2"/><rect x="122" y="150" width="14" height="18" rx="2"/><rect x="140" y="150" width="14" height="18" rx="2"/><rect x="158" y="150" width="14" height="18" rx="2"/><rect x="176" y="150" width="14" height="18" rx="2"/></g><g fill="#fff" font-family="serif" font-weight="700" font-size="14"><text x="106" y="165">A</text><text x="124" y="165">B</text><text x="142" y="165">C</text><text x="160" y="165">D</text><text x="178" y="165">E</text></g></svg>',
      tele:'<svg viewBox="0 0 300 220"><rect width="300" height="220" fill="#fdf1e4"/><rect x="40" y="140" width="220" height="30" rx="6" fill="#8a5a2b"/><rect x="90" y="122" width="16" height="20" fill="#c9a15a"/><path d="M70 118l140-18" stroke="#c9a15a" stroke-width="10" stroke-linecap="round"/><circle cx="214" cy="98" r="16" fill="#1b2536"/><rect x="180" y="126" width="30" height="16" rx="3" fill="#c9a15a"/><path d="M40 60q60-30 110 0t110 0" stroke="#6b7688" stroke-width="4" fill="none"/><g fill="#d9483b"><circle cx="70" cy="40" r="6"/><rect x="84" y="36" width="22" height="8" rx="4"/><circle cx="120" cy="40" r="6"/></g><text x="150" y="205" text-anchor="middle" font-family="Consolas,monospace" font-weight="700" font-size="22" fill="#1b2536">··· −−− ···</text></svg>',
      smoke:'<svg viewBox="0 0 300 220"><rect width="300" height="220" fill="#ffe8c7"/><path d="M0 180q80-40 150 0t150 0v40H0z" fill="#c99664"/><g fill="#9aa3ad"><circle cx="150" cy="120" r="18"/><circle cx="160" cy="92" r="22"/><circle cx="148" cy="60" r="16"/><circle cx="170" cy="30" r="20"/></g><path d="M135 170l15-30 15 30z" fill="#ef8a2e"/><rect x="215" y="120" width="44" height="54" rx="8" fill="#b07a45"/><ellipse cx="237" cy="120" rx="22" ry="8" fill="#f2d28b"/></svg>',
      radio:'<svg viewBox="0 0 300 220"><rect width="300" height="220" fill="#fdecef"/><rect x="60" y="70" width="180" height="110" rx="18" fill="#8a5a2b"/><circle cx="115" cy="125" r="34" fill="#e9d8b8"/><g stroke="#8a5a2b" stroke-width="4"><path d="M90 115h50M90 125h50M90 135h50"/></g><rect x="165" y="100" width="55" height="14" rx="7" fill="#e9d8b8"/><circle cx="180" cy="150" r="10" fill="#e9d8b8"/><circle cx="208" cy="150" r="10" fill="#e9d8b8"/><path d="M200 70l30-40" stroke="#1b2536" stroke-width="5"/><g fill="none" stroke="#e2455b" stroke-width="5" stroke-linecap="round"><path d="M244 28a18 18 0 0 1 0 26"/><path d="M256 18a34 34 0 0 1 0 46"/></g></svg>',
      net:'<svg viewBox="0 0 300 220"><rect width="300" height="220" fill="#e6f4ff"/><circle cx="150" cy="110" r="80" fill="#2f7fe0"/><path d="M110 60c20 6 24 22 12 32s4 26 22 26 12 22 0 32M178 44c-4 16 10 22 20 22s16 16 10 28" stroke="#8fe3a8" stroke-width="16" fill="none" stroke-linecap="round"/><g fill="#ffd166" stroke="#1b2536" stroke-width="3"><circle cx="60" cy="40" r="12"/><circle cx="250" cy="50" r="12"/><circle cx="40" cy="170" r="12"/><circle cx="262" cy="176" r="12"/></g><g stroke="#1b2536" stroke-width="3" stroke-dasharray="6 6"><path d="M70 48l40 30M240 58l-40 24M50 162l50-24M252 168l-46-24"/></g></svg>',
      phone:'<svg viewBox="0 0 300 220"><rect width="300" height="220" fill="#eef0ff"/><rect x="110" y="16" width="90" height="190" rx="18" fill="#1b2536"/><rect x="118" y="32" width="74" height="150" rx="6" fill="#dbeafe"/><rect x="126" y="44" width="44" height="18" rx="9" fill="#fff"/><rect x="140" y="70" width="44" height="18" rx="9" fill="#22a45d"/><rect x="126" y="96" width="30" height="30" rx="6" fill="#ef8a2e"/><rect x="160" y="96" width="24" height="30" rx="6" fill="#8e4fd8"/><rect x="126" y="134" width="58" height="18" rx="9" fill="#fff"/><g font-size="28"><text x="40" y="80">💬</text><text x="226" y="70">📷</text><text x="36" y="170">🎵</text><text x="230" y="170">🎬</text></g></svg>'
    };
    var track = $('#tl-track'), cur = -1;
    ST.forEach(function(s,i){
      var b = document.createElement('button'); b.className='tl-dot'; b.dataset.i=i; b.style.left = (4 + i*(92/(ST.length-1)))+'%';
      b.innerHTML = '<span class="emoji">'+s.e+'</span><small>'+s.y+'</small>'; track.appendChild(b);
    });
    track.addEventListener('click', function(e){ var b=e.target.closest('.tl-dot'); if(b) select(+b.dataset.i); });
    function select(i){
      if(i===cur) return; cur=i; var s=ST[i];
      $$('.tl-dot',track).forEach(function(d,k){ d.classList.toggle('on',k===i); d.classList.toggle('past',k<i); });
      $('#tl-fill').style.width = (i/(ST.length-1)*100)+'%';
      var fig = $('#tl-img');
      var have = s.img && (window.IMAGES||[]).indexOf(s.img.split('/').pop())>=0;
      if(have) fig.innerHTML = '<img src="'+s.img+'" alt="'+s.t+'"><figcaption>'+s.cap+'</figcaption>';
      else fig.innerHTML = SVGS[s.svg]||'<div class="fallback emoji">'+s.e+'</div>';
      fig.classList.remove('noimg');
      $('#tl-when').textContent = s.when; $('#tl-title').textContent = s.t; $('#tl-text').textContent = s.txt;
      $('#tl-med').textContent = s.med; $('#tl-form').textContent = s.form;
      var L = [['📏','Wie weit?'],['⏱️','Wie schnell?'],['👥','Wie viele?']];
      $('#tl-meters').innerHTML = L.map(function(l,k){ var seg=''; for(var j=0;j<5;j++) seg += '<i class="'+(j<s.m[k]?'on':'')+'" style="transition-delay:'+(j*60)+'ms"></i>';
        return '<div class="meter"><span class="ml"><span class="emoji">'+l[0]+'</span> '+l[1]+'</span><span class="segs">'+seg+'</span><span class="mt">'+s.ml[k]+'</span></div>'; }).join('');
      var d = $('.tl-detail',tl); d.classList.remove('swap'); void d.offsetWidth; d.classList.add('swap');
    }
    var slide = tl.closest('.slide');
    slide.addEventListener('deck:step', function(e){ select(e.detail.steps); });
    select(0);
  })();

  /* ---------- Demo: Morse ---------- */
  (function(){
    var inp = $('#mo-in'); if(!inp) return;
    var table = $('#mo-table'), slow = 1, secret = null;
    table.innerHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(function(c){ return '<div class="mt-cell" data-c="'+c+'"><b>'+c+'</b><span>'+MORSE[c]+'</span></div>'; }).join('');
    function codeText(t){ return toMorse(t).map(function(c){return c==='/'?'  /  ':c}).join('  '); }
    function refresh(){ $('#mo-code').textContent = secret ? '? ? ?' : codeText(inp.value); }
    inp.addEventListener('input', function(){ secret=null; $('#mo-reveal').disabled=true; refresh(); });
    function play(text){
      var lamp=$('#mo-lamp'), tape=$('#mo-tape'); tape.innerHTML='';
      var letters = text.toUpperCase().replace(/ß/g,'SS').split('').filter(function(ch){ return ch===' ' || MORSE[ch]; });
      playMorse(text, { slow:slow,
        on:function(ev){ lamp.classList.add('on'); var sym = toMorse(text)[ev.ci][ev.si]; var s=document.createElement('i'); s.className = sym==='·'?'dot':'dash'; tape.appendChild(s);
          if(ev.si===0 && ev.ci>0){ s.classList.add('gap'); }
          if(!secret) highlight(letters[ev.ci]); },
        off:function(){ lamp.classList.remove('on'); },
        done:function(){ lamp.classList.remove('on'); highlight(null); } });
    }
    function highlight(c){ $$('.mt-cell',table).forEach(function(x){ x.classList.toggle('hl', x.dataset.c===c); }); }
    $('#mo-play').addEventListener('click', function(){ secret=null; $('#mo-reveal').disabled=true; refresh(); play(inp.value); });
    var WORDS = ['HALLO','PAUSE','INFO','CODE','SONNE','KATZE','BALL','HEFT'];
    $('#mo-secret').addEventListener('click', function(){ secret = WORDS[Math.floor(Math.random()*WORDS.length)]; $('#mo-reveal').disabled=false; refresh(); play(secret); });
    $('#mo-reveal').addEventListener('click', function(){ if(!secret) return; $('#mo-code').innerHTML = '<b>'+secret+'</b>  =  '+codeText(secret); });
    $('#mo-speed').addEventListener('click', function(e){ var b=e.target.closest('button'); if(!b) return; slow=+b.dataset.s; $$('button',$('#mo-speed')).forEach(function(x){x.classList.toggle('on',x===b)}); });
    refresh();
  })();

  /* ---------- Demo: Foto – Ausschnitt & Überschrift ---------- */
  (function(){
    var svg = $('#ph-svg'); if(!svg) return;
    var CROP=[470,354,290,158], FULL=[0,22,1200,655], cur=CROP.slice(), anim;
    var HEADS=['&nbsp;','<span class="tabloid">BRUTAL! Schüler stößt Mitschüler um!</span>','<span class="calm">Tolle Klasse: Kinder helfen gestürztem Freund</span>'];
    function vb(a){ svg.setAttribute('viewBox', a.join(' ')); }
    function zoomTo(t){ cancelAnimationFrame(anim); var s=cur.slice(), t0=performance.now();
      (function step(now){ var k=Math.min(1,(now-t0)/900), e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2; cur=s.map(function(v,i){return v+(t[i]-v)*e}); vb(cur); if(k<1) anim=requestAnimationFrame(step); })(t0); }
    $('#ph-crop').addEventListener('click', function(e){ var b=e.target.closest('button'); if(!b) return; $$('button',this).forEach(function(x){x.classList.toggle('on',x===b)}); zoomTo(b.dataset.crop==='1'?CROP:FULL); });
    $('#ph-headseg').addEventListener('click', function(e){ var b=e.target.closest('button'); if(!b) return; $$('button',this).forEach(function(x){x.classList.toggle('on',x===b)});
      var h=$('#ph-head'); h.innerHTML=HEADS[+b.dataset.h]; h.className='headline h'+b.dataset.h; });
    vb(CROP);
  })();
})();
