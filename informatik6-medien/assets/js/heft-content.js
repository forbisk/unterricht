/* =========================================================
   HEFT-EINTRÄGE – eine Quelle für Folien UND Druckseite (heft.html).
   Wortlaut der Merksätze wie im Unterricht vereinbart.
   ========================================================= */
window.HEFT = [
  { n:1, chapter:2, title:'Information und Repräsentation', lines:[
      ['Information', '= die Bedeutung (im Kopf).'],
      ['Repräsentation', '= die Form (Text, Bild, Ton, Geste, Code).'] ],
    ex:'Beispiel: „Mir ist kalt“ → 🥶 · gesprochen · geschrieben · Geste. Vier Formen – eine Information.' },
  { n:2, chapter:2, title:'Daten, Trägermedium, Interpretation', lines:[
      ['Daten', '= die Zeichen auf einem Trägermedium (Papier, Bildschirm, Ast …).'],
      ['Trägermedium', '= worauf die Daten sind oder übertragen werden: Papier, Bildschirm, Luft, Holz, Stein, USB-Stick.'],
      ['Interpretation', '= der Empfänger gibt den Daten wieder Bedeutung – nur mit gemeinsamer Regel.'] ],
    ex:'Beispiel: 20 Kerben im Ast sind Daten. Wer die Regel „1 Kerbe = 1 Schaf“ kennt, weiß: 20 Schafe.' },
  { n:3, chapter:2, title:'Die goldene Regel', type:'rule', lines:[
      ['', 'Eine Darstellung ist nicht die Sache selbst.'],
      ['', 'Information reist nie nackt.'],
      ['', 'Immer: Form + Medium + jemand, der die Regel kennt.'] ] },
  { n:4, chapter:3, title:'Daten – Information – Wissen', type:'stairs', lines:[
      ['Daten', '= Zeichen, z. B. „38,9“'],
      ['Information', '= die Bedeutung: „Ich habe 38,9 °C Fieber.“'],
      ['Wissen', '= Informationen, die ich verknüpfe und anwenden kann: „Bei Fieber bleibe ich im Bett und trinke viel.“'] ] },
  { n:5, chapter:4, title:'Codes im Alltag', lines:[
      ['Code', '= eine vereinbarte Regel: Welches Zeichen bedeutet was?'],
      ['Beispiele:', 'Strichcode, QR-Code, Verkehrszeichen, Emojis, Wettersymbole.'],
      ['Merke:', 'Nur wer die Regel kennt, kann den Code lesen.'] ] },
  { n:6, chapter:5, title:'Die Kommunikationskette', type:'chain', lines:[
      ['Sender', '„packt die Idee in eine Form“'],
      ['Medium', '„trägt die Daten“'],
      ['Empfänger', '„interpretiert“'] ],
    ex:'Störung: Klemmt ein Glied der Kette (z. B. WLAN aus, fremde Sprache, Lärm), kommt die Nachricht nicht oder falsch an.' },
  { n:7, chapter:6, title:'Zeitreise der Kommunikation', type:'table',
    head:['Wann?','Medium','Form (Repräsentation)'],
    rows:[['vor über 40 000 Jahren','Höhlenwand (Stein)','Bild'],['um 1450','Papier (Buchdruck)','Text'],['1844','Draht (Telegraf)','Morse-Code'],['1941','Computer Z3','Zahlen (0 und 1)'],['heute','Smartphone + Internet','Text, Bild, Ton, Video']],
    ex:'Merke: Mit jeder Erfindung kommt eine Nachricht weiter, schneller und zu mehr Menschen.' },
  { n:8, chapter:7, title:'Medien-Check', lines:[
      ['1. Wer?', 'Wer hat das gemacht? (Quelle)'],
      ['2. Wozu?', 'Informieren, verkaufen oder Stimmung machen?'],
      ['3. Wo noch?', 'Steht es auch in einer zweiten Quelle?'] ],
    ex:'Ich suche mit fragFINN oder Blinde Kuh, schreibe Antworten in eigenen Worten und notiere die Quelle.' }
];

/* Rendert einen Heft-Eintrag als HTML. steps=true → jede Zeile ein Aufdeck-Schritt */
window.renderHeft = function(h, steps){
  var st = steps ? ' step' : '';
  function emo(t){ return String(t).replace(/(🥶)/g,'<span class="emoji">$1</span>'); }
  var html = '';
  if(h.type==='chain'){
    html += '<div class="hchain">'+h.lines.map(function(l,i){
      return (i?'<div class="harrow'+st+'">➜</div>':'')+'<div class="hbox'+st+'"><b>'+l[0]+'</b><span>'+l[1]+'</span></div>'; }).join('')+'</div>';
  } else if(h.type==='table'){
    html += '<table class="htable"><tr>'+h.head.map(function(c){return '<th>'+c+'</th>'}).join('')+'</tr>'+
      h.rows.map(function(r){ return '<tr class="'+st.trim()+'">'+r.map(function(c){return '<td>'+c+'</td>'}).join('')+'</tr>'; }).join('')+'</table>';
  } else if(h.type==='stairs'){
    html += '<ol class="hstairs">'+h.lines.map(function(l,i){ return '<li class="s'+i+st+'"><span class="term">'+l[0]+'</span> '+l[1]+'</li>'; }).join('')+'</ol>';
  } else if(h.type==='rule'){
    html += '<ol class="hrule">'+h.lines.map(function(l){ return '<li class="'+st.trim()+'">'+l[1]+'</li>'; }).join('')+'</ol>';
  } else {
    html += '<ul class="heft-list">'+h.lines.map(function(l){ return '<li class="'+st.trim()+'"><span class="term">'+l[0]+'</span> '+emo(l[1])+'</li>'; }).join('')+'</ul>';
  }
  if(h.ex) html += '<div class="heft-ex'+st+'">'+emo(h.ex)+'</div>';
  return html;
};
