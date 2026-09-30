/* automatisch erzeugt aus src/ – Heft-Einträge */
window.HEFT = [
{
"n": 1,
"chapter": 3,
"title": "Gleichung, Variable, Lösung",
"blocks": [
{
"html": "<span class=\"term\">Gleichung</span> = zwei Terme, verbunden durch ein Gleichheitszeichen.  Beispiel: <span class=\"m\">2<i>x</i> + 3 = 11</span>"
},
{
"html": "<span class=\"term\">Variable</span> = Platzhalter für eine Zahl (meist <span class=\"m\"><i>x</i></span>)."
},
{
"html": "<span class=\"term\">Lösung</span> = die Zahl, die beim Einsetzen eine <b>wahre Aussage</b> ergibt."
},
{
"cls": "ex",
"html": "Beispiel: <span class=\"m\">2<i>x</i> + 3 = 11</span> hat die Lösung <span class=\"m\"><i>x</i> = 4</span>, denn <span class=\"m\">2 · 4 + 3 = 11</span> &nbsp;(wahr).<br><span class=\"m\"><i>x</i> = 5</span> ist keine Lösung, denn <span class=\"m\">2 · 5 + 3</span> = 13 ≠ 11 &nbsp;(falsch)."
}
],
"tag": "ABSCHREIBEN",
"tagcls": "abschreiben"
},
{
"n": 2,
"chapter": 3,
"title": "Probe, Grundbereich, Lösungsmenge",
"blocks": [
{
"html": "<span class=\"term\">Probe</span>: Lösung in die Ausgangsgleichung einsetzen, beide Seiten ausrechnen – links = rechts?"
},
{
"html": "<span class=\"term\">Grundbereich</span> <span class=\"m\"><i>G</i></span>: Zahlen, die eingesetzt werden dürfen, z. B. <span class=\"set\">ℕ</span> (natürliche), <span class=\"set\">ℤ</span> (ganze), <span class=\"set\">ℚ</span> (rationale Zahlen)."
},
{
"html": "<span class=\"term\">Lösungsmenge</span> <span class=\"m\"><i>L</i></span>: alle Lösungen aus <span class=\"m\"><i>G</i></span>. Schreibweise: <span class=\"m\"><i>L</i></span> = {4} &nbsp; Keine Lösung: <span class=\"m\"><i>L</i></span> = { }"
},
{
"cls": "ex",
"html": "Beispiel: <span class=\"m\">2<i>x</i> = 5</span> &nbsp; in <span class=\"set\">ℕ</span>: <span class=\"m\"><i>L</i></span> = { } &nbsp;·&nbsp; in <span class=\"set\">ℚ</span>: <span class=\"m\"><i>L</i></span> = {2,5}, denn <span class=\"m\">2 · 2,5 = 5</span>"
}
],
"tag": "ABSCHREIBEN",
"tagcls": "abschreiben"
},
{
"n": 3,
"chapter": 4,
"title": "Rückwärtsrechnen (Pfeilschema)",
"blocks": [
{
"html": "Jede Rechenoperation hat eine <span class=\"term\">Umkehroperation</span>: <span class=\"m\">+</span> ↔ <span class=\"m\">−</span> und <span class=\"m\"> · </span> ↔ <span class=\"m\"> : </span>."
},
{
"html": "Beispiel: <span class=\"m\">3<i>x</i> + 5 = 20</span>"
},
{
"cls": "box",
"html": "<b>vorwärts:</b> <div class=\"hchain\"><span class=\"bx\"><i>x</i></span><span class=\"ar\"><small>· 3</small>⟶</span><span class=\"bx\"></span><span class=\"ar\"><small>+ 5</small>⟶</span><span class=\"bx\">20</span></div>"
},
{
"cls": "box",
"html": "<b>rückwärts:</b> <div class=\"hchain back\"><span class=\"bx\">20</span><span class=\"ar\"><small>− 5</small>⟶</span><span class=\"bx\">15</span><span class=\"ar\"><small>: 3</small>⟶</span><span class=\"bx\">5</span></div> &nbsp; also <span class=\"m\"><i>x</i> = 5</span>"
},
{
"cls": "ex",
"html": "Merke: Beim Rückwärtsrechnen fängst du <b>hinten</b> an und machst jede Rechnung mit der Umkehroperation rückgängig."
}
],
"tag": "ABSCHREIBEN",
"tagcls": "abschreiben"
},
{
"n": 4,
"chapter": 5,
"title": "Äquivalenzumformungen (Waageregel)",
"blocks": [
{
"html": "Eine Gleichung ist wie eine Waage im Gleichgewicht. Ich darf auf <b>beiden Seiten</b>"
},
{
"cls": "rule",
"html": "<span class=\"nr\">+</span><span class=\"tx\">dieselbe Zahl (oder denselben Term) addieren oder subtrahieren,</span>"
},
{
"cls": "rule",
"html": "<span class=\"nr\">·</span><span class=\"tx\">mit derselben Zahl multiplizieren oder durch dieselbe Zahl dividieren (nicht 0).</span>"
},
{
"html": "Das heißt <span class=\"term\">Äquivalenzumformung</span> – die Lösung bleibt gleich. Die Rechnung schreibe ich hinter einen senkrechten Strich: <b style=\"color:#c2185b\">| − 3</b>"
},
{
"cls": "ex",
"html": "<div class=\"solve sm\"><div class=\"sl\"><span class=\"l\">2<i>x</i> + 3</span><span class=\"e\">=</span><span class=\"r\">11</span><span class=\"o\">| − 3</span></div><div class=\"sl\"><span class=\"l\">2<i>x</i></span><span class=\"e\">=</span><span class=\"r\">8</span><span class=\"o\">| : 2</span></div><div class=\"sl fin\"><span class=\"l\"><i>x</i></span><span class=\"e\">=</span><span class=\"r\">4</span><span class=\"o\"></span></div></div>"
}
],
"tag": "ABSCHREIBEN",
"tagcls": "abschreiben"
},
{
"n": 5,
"chapter": 6,
"title": "Lösungsschema in 6 Schritten",
"blocks": [
{
"cls": "rule",
"html": "<span class=\"nr\">1</span><span class=\"tx\">Klammern auflösen</span>"
},
{
"cls": "rule",
"html": "<span class=\"nr\">2</span><span class=\"tx\">Gleichartige Glieder zusammenfassen</span>"
},
{
"cls": "rule",
"html": "<span class=\"nr\">3</span><span class=\"tx\">Variablen auf eine Seite bringen</span>"
},
{
"cls": "rule",
"html": "<span class=\"nr\">4</span><span class=\"tx\">Zahlen auf die andere Seite bringen</span>"
},
{
"cls": "rule",
"html": "<span class=\"nr\">5</span><span class=\"tx\">Durch den Faktor vor <span class=\"m\"><i>x</i></span> teilen</span>"
},
{
"cls": "rule",
"html": "<span class=\"nr\">6</span><span class=\"tx\">Probe mit der Ausgangsgleichung</span>"
}
],
"tag": "ABSCHREIBEN",
"tagcls": "abschreiben"
},
{
"n": 6,
"chapter": 6,
"title": "Musterbeispiel mit Klammer",
"blocks": [
{
"html": "<div class=\"solve sm\"><div class=\"sl\"><span class=\"l\">3(<i>x</i> + 2)</span><span class=\"e\">=</span><span class=\"r\"><i>x</i> + 14</span><span class=\"o\"><span class=\"lab\">Klammern auflösen, zusammenfassen</span></span></div><div class=\"sl\"><span class=\"l\">3<i>x</i> + 6</span><span class=\"e\">=</span><span class=\"r\"><i>x</i> + 14</span><span class=\"o\">| − <i>x</i></span></div><div class=\"sl\"><span class=\"l\">2<i>x</i> + 6</span><span class=\"e\">=</span><span class=\"r\">14</span><span class=\"o\">| − 6</span></div><div class=\"sl\"><span class=\"l\">2<i>x</i></span><span class=\"e\">=</span><span class=\"r\">8</span><span class=\"o\">| : 2</span></div><div class=\"sl fin\"><span class=\"l\"><i>x</i></span><span class=\"e\">=</span><span class=\"r\">4</span><span class=\"o\"></span></div></div>"
},
{
"cls": "ex",
"html": "Probe: &nbsp;links 3 · (4 + 2) = 18 &nbsp;·&nbsp; rechts 4 + 14 = 18 &nbsp;<b class=\"ok\">✔</b>"
},
{
"html": "Minus vor der Klammer: alle Vorzeichen in der Klammer drehen! &nbsp;<span class=\"m\">−(<i>x</i> − 4) = −<i>x</i> + 4</span>"
}
],
"tag": "BEISPIEL INS HEFT",
"tagcls": "beispiel"
},
{
"n": 7,
"chapter": 7,
"title": "Sonderfälle und Brüche",
"blocks": [
{
"html": "Verschwindet <span class=\"m\"><i>x</i></span> beim Umformen, entscheidet die übrig gebliebene Aussage:"
},
{
"cls": "box",
"html": "falsche Aussage (z. B. <span class=\"m\">3 = 7</span>) → <span class=\"term\">keine Lösung</span>: <span class=\"m\"><i>L</i></span> = { }"
},
{
"cls": "box",
"html": "wahre Aussage (z. B. <span class=\"m\">6 = 6</span>) → <span class=\"term\">unendlich viele Lösungen</span>: <span class=\"m\"><i>L</i></span> = <span class=\"set\">ℚ</span>"
},
{
"html": "Brüche: beide Seiten mit dem <span class=\"term\">Hauptnenner</span> multiplizieren. &nbsp;<span class=\"fr\"><span class=\"nu\"><i>x</i></span><span class=\"de\">2</span></span> + <span class=\"fr\"><span class=\"nu\"><i>x</i></span><span class=\"de\">3</span></span> = 10 <span class=\"opc\">| · 6</span> → 3<i>x</i> + 2<i>x</i> = 60 → 5<i>x</i> = 60 <span class=\"opc\">| : 5</span> → <i>x</i> = 12"
}
],
"tag": "ABSCHREIBEN",
"tagcls": "abschreiben"
},
{
"n": 8,
"chapter": 8,
"title": "Textaufgaben in 6 Schritten",
"blocks": [
{
"cls": "rule",
"html": "<span class=\"nr\">1</span><span class=\"tx\"><b>Lesen:</b> Was ist gegeben? Was ist gesucht?</span>"
},
{
"cls": "rule",
"html": "<span class=\"nr\">2</span><span class=\"tx\"><b>Variable festlegen:</b> <span class=\"m\"><i>x</i></span> = … (mit Einheit)</span>"
},
{
"cls": "rule",
"html": "<span class=\"nr\">3</span><span class=\"tx\"><b>Gleichung aufstellen</b></span>"
},
{
"cls": "rule",
"html": "<span class=\"nr\">4</span><span class=\"tx\"><b>Gleichung lösen</b></span>"
},
{
"cls": "rule",
"html": "<span class=\"nr\">5</span><span class=\"tx\"><b>Probe am Text</b> (nicht nur an der Gleichung!)</span>"
},
{
"cls": "rule",
"html": "<span class=\"nr\">6</span><span class=\"tx\"><b>Antwortsatz</b> schreiben</span>"
}
],
"tag": "ABSCHREIBEN",
"tagcls": "abschreiben"
},
{
"n": 9,
"chapter": 9,
"title": "Formeln umstellen",
"blocks": [
{
"html": "Eine Formel stelle ich um wie eine Gleichung. Die gesuchte Größe behandle ich wie <span class=\"m\"><i>x</i></span>, alle anderen Buchstaben wie Zahlen."
},
{
"cls": "ex",
"html": "<div class=\"solve sm\"><div class=\"sl\"><span class=\"l\"><i>u</i></span><span class=\"e\">=</span><span class=\"r\">2<i>a</i> + 2<i>b</i></span><span class=\"o\">| − 2<i>b</i></span></div><div class=\"sl\"><span class=\"l\"><i>u</i> − 2<i>b</i></span><span class=\"e\">=</span><span class=\"r\">2<i>a</i></span><span class=\"o\">| : 2</span></div><div class=\"sl\"><span class=\"l\">(<i>u</i> − 2<i>b</i>) : 2</span><span class=\"e\">=</span><span class=\"r\"><i>a</i></span><span class=\"o\"><span class=\"lab\">⇄ Seiten tauschen</span></span></div><div class=\"sl fin\"><span class=\"l\"><i>a</i></span><span class=\"e\">=</span><span class=\"r\">(<i>u</i> − 2<i>b</i>) : 2</span><span class=\"o\"></span></div></div>"
},
{
"html": "Kontrolle mit Zahlen: <span class=\"m\"><i>u</i> = 20</span>, <span class=\"m\"><i>b</i> = 4</span> → <span class=\"m\"><i>a</i> = (20 − 8) : 2 = 6</span>"
}
],
"tag": "ABSCHREIBEN",
"tagcls": "abschreiben"
}
];
