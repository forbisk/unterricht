/* AUTOMATISCH ERZEUGT von tools/pruefung/json2js.py – nicht von Hand bearbeiten, sondern content.py / figs.py ändern.
   Format: siehe internes Prüfungsdatenformat */
window.PRUEFUNG_META = {
 "erzeugt_aus": "research/pruefungsaufgaben.json",
 "themen": [
  {
   "key": "massstab",
   "name": "Maßstab & Modelle",
   "icon": "🗺"
  },
  {
   "key": "figuren",
   "name": "Ähnliche Figuren erkennen & zeichnen",
   "icon": "🖼"
  },
  {
   "key": "dreiecke",
   "name": "Ähnliche Dreiecke begründen",
   "icon": "📐"
  },
  {
   "key": "streckung",
   "name": "Zentrische Streckung, Flächen & Volumen (k², k³)",
   "icon": "🔍"
  },
  {
   "key": "strahlensatz",
   "name": "Strahlensatz / ähnliche Dreiecke in Sachaufgaben",
   "icon": "📏"
  },
  {
   "key": "zeichnen",
   "name": "Maßstäblich zeichnen (Randthema)",
   "icon": "✏️"
  }
 ],
 "tipps_thema": {
  "massstab": "Merke: Maßstab 1 : n → Original = Bild · n, Bild = Original : n. Immer zuerst in gleiche Einheiten umrechnen.",
  "figuren": "Ähnlich = gleiche Form: alle Längen mit demselben k, alle Winkel gleich. Addieren (+2 cm) erzeugt keine ähnliche Figur.",
  "dreiecke": "Ähnlichkeit von Dreiecken: zwei gleiche Winkelpaare (ww) genügen. Schreibe alle Winkel in die Skizze.",
  "streckung": "Längen mit k, Flächen mit k², Volumen mit k³.",
  "strahlensatz": "Ohne Formel: Suche zwei ähnliche Dreiecke (gemeinsamer Winkel + Parallelen/rechte Winkel), dann Verhältnisgleichung.",
  "zeichnen": "Erst alle Maße umrechnen und in einer Liste notieren, dann sauber zeichnen und beschriften."
 },
 "ausgelassen": {
  "SH-2019-H1-A14": "nicht rekonstruierbar – der Zeitungsausschnitt mit den nötigen Maßen ist im veröffentlichten PDF geschwärzt"
 },
 "anzahl": 30
};
window.PRUEFUNG_DATA = [
 {
  "id": "LSA-2016-PA1b",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Realschulabschluss (Klasse 10), schriftliche Abschlussprüfung",
  "jahr": 2016,
  "teil": "Pflichtteil 2",
  "aufgabe": "Pflichtaufgabe 1 b",
  "be": "Teil von 10 BE (PA 1 gesamt)",
  "relevanz": "maßstab",
  "themen_original": [
   "Maßstab",
   "Landkarte"
  ],
  "thema": "massstab",
  "stufe": 1,
  "titel": "Maßstab einer Landkarte bestimmen",
  "fokus": "Teilaufgabe b",
  "text": "b) Ein See hat an seiner breitesten Stelle eine Ausdehnung von 2 km. Auf einer Landkarte wird diese Ausdehnung mit 2 cm dargestellt.\nGeben Sie den verwendeten Maßstab an.",
  "tabelle": null,
  "quelle_url": "https://lisa.sachsen-anhalt.de/fileadmin/Bibliothek/Politik_und_Verwaltung/MK/LISA/Unterricht/ZLE/RSA_10/Mathematik/rsa16_ma_ET_Teil2.pdf",
  "quelle_url_alt": null,
  "seite": 2,
  "auswertung_url": null,
  "loesung_url": null,
  "quote_original": null,
  "quote": null,
  "quote_wert": null,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "Beide Längen in dieselbe Einheit umrechnen: $2\\,\\text{km} = 200\\,000\\,\\text{cm}$.",
   "$2\\,\\text{cm} \\;\\widehat{=}\\; 200\\,000\\,\\text{cm}$ – jetzt beide Seiten durch 2 teilen."
  ],
  "checks": [
   {
    "type": "num",
    "fields": [
     {
      "label": "Maßstab:",
      "ans": [
       1,
       100000
      ],
      "ratio": true
     }
    ]
   }
  ],
  "gruppe": null,
  "pruefungstipp": "Maßstab immer als 1 : … angeben, ohne Einheiten.",
  "hinweis_eigen": null,
  "figur": null,
  "figur_hinweis": null,
  "loesung_figur": null,
  "loesung": "$2\\,\\text{cm} \\;\\widehat{=}\\; 2\\,\\text{km} = 200\\,000\\,\\text{cm}$, also $1\\,\\text{cm} \\;\\widehat{=}\\; 100\\,000\\,\\text{cm}$. Maßstab: $1 : 100\\,000$.",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "LSA-2018-PT1-9",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Realschulabschluss (Klasse 10), schriftliche Abschlussprüfung",
  "jahr": 2018,
  "teil": "Pflichtteil 1 (ohne Taschenrechner)",
  "aufgabe": "Aufgabe 9",
  "be": 1,
  "relevanz": "maßstab",
  "themen_original": [
   "Maßstab"
  ],
  "thema": "massstab",
  "stufe": 1,
  "titel": "Maßstab 1 : 20 – Tabelle ergänzen",
  "fokus": "Aufgabe 9 (ohne Taschenrechner)",
  "text": "9. Ergänzen Sie die Tabelle für einen Maßstab von 1 : 20.\n[Tabelle] Länge der Bildstrecke: 20 cm | Länge der Originalstrecke: ____",
  "tabelle": "<table class=\"nice small\"><tbody><tr><th>Länge der Bildstrecke</th><td>20 cm</td></tr><tr><th>Länge der Originalstrecke</th><td>____</td></tr></tbody></table>",
  "quelle_url": "https://lisa.sachsen-anhalt.de/fileadmin/Bibliothek/Politik_und_Verwaltung/MK/LISA/Unterricht/ZLE/RSA_10/Mathematik/rsa18_mat_ET_Teil1.pdf",
  "quelle_url_alt": null,
  "seite": null,
  "auswertung_url": null,
  "loesung_url": null,
  "quote_original": null,
  "quote": null,
  "quote_wert": null,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "Maßstab $1 : 20$ heißt: $1\\,\\text{cm}$ im Bild entspricht $20\\,\\text{cm}$ im Original.",
   "Also: Bildlänge $\\cdot\\, 20$."
  ],
  "checks": [
   {
    "type": "num",
    "fields": [
     {
      "label": "Originalstrecke:",
      "ans": 400,
      "unit": "cm",
      "wrong": [
       {
        "v": 1,
        "msg": "20 : 20 wäre der umgekehrte Weg. Das Original ist größer!"
       }
      ]
     }
    ]
   }
  ],
  "gruppe": null,
  "pruefungstipp": "Kurz prüfen: Das Original ist bei 1 : 20 immer größer als das Bild.",
  "hinweis_eigen": null,
  "figur": null,
  "figur_hinweis": null,
  "loesung_figur": null,
  "loesung": "$20\\,\\text{cm} \\cdot 20 = 400\\,\\text{cm} = 4\\,\\text{m}$",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "LSA-2021-PT1-6",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Realschulabschluss (Klasse 10), schriftliche Abschlussprüfung",
  "jahr": 2021,
  "teil": "Pflichtteil 1 (ohne Taschenrechner)",
  "aufgabe": "Aufgabe 6",
  "be": 1,
  "relevanz": "maßstab",
  "themen_original": [
   "Maßstab",
   "Modell"
  ],
  "thema": "massstab",
  "stufe": 1,
  "titel": "Bedeutung des Maßstabs 1 : 15",
  "fokus": "Aufgabe 6 (ohne Taschenrechner)",
  "text": "6. Ein Modell eines Quaders wurde im Maßstab 1: 15 angefertigt.\nGeben Sie die Bedeutung dieses Maßstabs an.",
  "tabelle": null,
  "quelle_url": "https://www.bildung-lsa.de/files/216b1e276e2a4350a9302f936e647dde/rsa21_mat_aufgaben_teil1.pdf",
  "quelle_url_alt": null,
  "seite": null,
  "auswertung_url": "https://www.bildung-lsa.de/files/216b1e276e2a4350a9302f936e647dde/rsa21_mat_auswertung.pdf",
  "loesung_url": null,
  "quote_original": "54 %, laut Auswertung 2021",
  "quote": "54 % gelöst",
  "quote_wert": 54,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "Links steht das Modell (Bild), rechts das Original.",
   "Formuliere mit einer Längeneinheit: „1 cm am Modell entspricht …“"
  ],
  "checks": [
   {
    "type": "mc",
    "choices": [
     "$1\\,\\text{cm}$ am Modell entspricht $15\\,\\text{cm}$ am Original.",
     "$15\\,\\text{cm}$ am Modell entsprechen $1\\,\\text{cm}$ am Original.",
     "Das Modell ist 15-mal so groß wie das Original."
    ],
    "correct": 0,
    "why": "Das Modell ist eine Verkleinerung mit $k = \\tfrac{1}{15}$.",
    "wrongWhy": {
     "1": "Das wäre eine Vergrößerung (15 : 1).",
     "2": "Bei 1 : 15 ist das Modell kleiner."
    }
   }
  ],
  "gruppe": null,
  "pruefungstipp": "„Geben Sie die Bedeutung an“ heißt: in einem Satz mit Einheiten erklären.",
  "hinweis_eigen": null,
  "figur": null,
  "figur_hinweis": null,
  "loesung_figur": null,
  "loesung": "1 cm (allgemein: 1 Längeneinheit) am Modell entspricht 15 cm (15 Längeneinheiten) am Original. Jede Länge des Quaders ist im Modell 15-mal kleiner, also $k = \\tfrac{1}{15}$.",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "LSA-2024-PA1d",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Realschulabschluss (Klasse 10), schriftliche Abschlussprüfung",
  "jahr": 2024,
  "teil": "Pflichtteil 2",
  "aufgabe": "Pflichtaufgabe 1 d",
  "be": 2,
  "relevanz": "maßstab",
  "themen_original": [
   "Maßstab",
   "Modell"
  ],
  "thema": "massstab",
  "stufe": 1,
  "titel": "Eiffelturm-Modell 1 : 300",
  "fokus": "Teilaufgabe d",
  "text": "d) Der Eiffelturm in Paris ist etwa 330 Meter hoch. Ein Modell des Eiffelturms wird im Maßstab 1: 300 angefertigt.\nBerechnen Sie die Höhe des Modells.",
  "tabelle": null,
  "quelle_url": "https://www.bildung-lsa.de/files/216b1e276e2a4350a9302f936e647dde/rsa24_mat_aufgaben_teil2.pdf",
  "quelle_url_alt": null,
  "seite": null,
  "auswertung_url": "https://www.bildung-lsa.de/files/216b1e276e2a4350a9302f936e647dde/Auswertungsbericht_2024_Abschlusspr_fung_Mathematik.pdf",
  "loesung_url": null,
  "quote_original": "52 %, laut Auswertungsbericht 2024",
  "quote": "52 % gelöst",
  "quote_wert": 52,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "Bei $1 : 300$ ist das Modell 300-mal kleiner.",
   "$330\\,\\text{m} : 300$"
  ],
  "checks": [
   {
    "type": "num",
    "fields": [
     {
      "label": "Höhe des Modells:",
      "ans": 1.1,
      "unit": "m",
      "wrong": [
       {
        "v": 99000,
        "msg": "Du hast multipliziert – das Modell ist kleiner, also teilen."
       },
       {
        "v": 110,
        "msg": "110 cm stimmt! Gib hier bitte die Antwort in m an."
       }
      ]
     }
    ]
   }
  ],
  "gruppe": null,
  "pruefungstipp": "Antwortsatz mit sinnvoller Einheit (1,1 m oder 110 cm).",
  "hinweis_eigen": null,
  "figur": null,
  "figur_hinweis": null,
  "loesung_figur": null,
  "loesung": "$330\\,\\text{m} : 300 = 1{,}1\\,\\text{m} = 110\\,\\text{cm}$. Das Modell ist etwa $1{,}1\\,\\text{m}$ hoch.",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "LSA-2026-WPA1a",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Mittlerer Schulabschluss (Realschulabschluss), Klasse 10, schriftliche Abschlussprüfung",
  "jahr": 2026,
  "teil": "Wahlpflichtteil",
  "aufgabe": "Wahlpflichtaufgabe 1 a",
  "be": 2,
  "relevanz": "maßstab",
  "themen_original": [
   "Maßstab",
   "maßstäbliche Verkleinerung"
  ],
  "thema": "massstab",
  "stufe": 1,
  "titel": "Parfümflasche Fernsehturm 1 : 2000",
  "fokus": "Teilaufgabe a",
  "text": "Wahlpflichtaufgabe 1\nDer Berliner Fernsehturm ist ca. 368 m hoch. In einem Souvenirshop wird Parfüm der Marke „Berlin“ in Geschenkdosen angeboten. Die Parfümflaschen haben die Form des Berliner Fernsehturms. Die Geschenkdosen haben die Form eines Kreiszylinders (s. Abbildung). Das Parfüm wird als Probiergröße und als Standardgröße angeboten.\na) Die Parfümflasche in Standardgröße wurde im Maßstab 1: 2000 hergestellt. Berechnen Sie die Höhe der Parfümflasche in Standardgröße.",
  "tabelle": null,
  "quelle_url": "https://www.bildung-lsa.de/files/216b1e276e2a4350a9302f936e647dde/2026_RSA_Mat_Teil2.pdf",
  "quelle_url_alt": null,
  "seite": 5,
  "auswertung_url": "https://www.bildung-lsa.de/files/216b1e276e2a4350a9302f936e647dde/2026_Ergebnisbericht_RSA_Mathematik.pdf",
  "loesung_url": null,
  "quote_original": "63 %, laut Ergebnisbericht 2026",
  "quote": "63 % gelöst",
  "quote_wert": 63,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "$368\\,\\text{m} = 36\\,800\\,\\text{cm}$",
   "$36\\,800\\,\\text{cm} : 2000$"
  ],
  "checks": [
   {
    "type": "num",
    "fields": [
     {
      "label": "Höhe:",
      "ans": 18.4,
      "unit": "cm",
      "wrong": [
       {
        "v": 0.184,
        "msg": "0,184 m stimmt – gib es hier in cm an."
       }
      ]
     }
    ]
   }
  ],
  "gruppe": null,
  "pruefungstipp": "Erst in cm umrechnen, dann teilen – so entstehen keine Kommafehler.",
  "hinweis_eigen": null,
  "figur": null,
  "figur_hinweis": "Im Original: Foto der Flaschen und Dosen – für die Lösung nicht nötig.",
  "loesung_figur": null,
  "loesung": "$368\\,\\text{m} : 2000 = 0{,}184\\,\\text{m} = 18{,}4\\,\\text{cm}$",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "BB-2015-A6a",
  "land": "BB",
  "bundesland": "Brandenburg",
  "pruefung": "Prüfung am Ende der Jahrgangsstufe 10 (P10) Mathematik",
  "jahr": 2015,
  "teil": "Aufgabe 6",
  "aufgabe": "6 a",
  "be": 2,
  "relevanz": "maßstab",
  "themen_original": [
   "Maßstab",
   "maßstäbliches Modell (ähnliche Pyramide)"
  ],
  "thema": "massstab",
  "stufe": 1,
  "titel": "Karlsruher Pyramide – vom Modell zum Original",
  "fokus": "Teilaufgabe a",
  "text": "Aufgabe 6: Karlsruher Pyramide (11 Punkte)\nDas Bild zeigt das Wahrzeichen der Stadt Karlsruhe, eine quadratische Pyramide aus Sandstein.\nTim hat ein Modell der Pyramide im Maßstab 1 : 10 gebaut.\nSein Modell ist 0,68 m hoch.\nDie Grundkante ist im Modell 0,80 m lang.\na) Geben Sie an, wie hoch die Karlsruher Pyramide tatsächlich ist und welche Länge ihre Grundkante hat. (2 P)",
  "tabelle": null,
  "quelle_url": "https://bildungsserver.berlin-brandenburg.de/fileadmin/bbb/unterricht/pruefungen/pruefungen_am_ende_der_jahrgangsstufe_10/Pruefungsaufgaben_P10_Mathematik/15_P10_Ma_A.pdf",
  "quelle_url_alt": null,
  "seite": null,
  "auswertung_url": null,
  "loesung_url": null,
  "quote_original": null,
  "quote": null,
  "quote_wert": null,
  "lizenz": "Quelle: Bildungsserver Berlin-Brandenburg (Prüfungen am Ende der Jahrgangsstufe 10). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "Vom Modell zum Original: mal 10.",
   "$0{,}68\\,\\text{m} \\cdot 10$ und $0{,}80\\,\\text{m} \\cdot 10$"
  ],
  "checks": [
   {
    "type": "num",
    "fields": [
     {
      "label": "Höhe:",
      "ans": 6.8,
      "unit": "m"
     },
     {
      "label": "Grundkante:",
      "ans": 8.0,
      "unit": "m"
     }
    ]
   }
  ],
  "gruppe": "Schätzt zuerst: Wie hoch ist ein Klassenraum? Passt die echte Pyramide hinein?",
  "pruefungstipp": null,
  "hinweis_eigen": null,
  "figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 278 278\" width=\"278\" role=\"img\" aria-label=\"Pyramidenmodell\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><polygon points=\"40.0,230.0 172.0,230.0 132.4,86.9\" fill=\"rgba(28,126,214,.12)\" stroke=\"#1c7ed6\" stroke-width=\"2\" stroke-linejoin=\"round\" /><polygon points=\"172.0,230.0 224.8,183.8 132.4,86.9\" fill=\"rgba(28,126,214,.22)\" stroke=\"#1c7ed6\" stroke-width=\"2\" stroke-linejoin=\"round\" /><line x1=\"40.0\" y1=\"230.0\" x2=\"92.8\" y2=\"183.8\" stroke=\"#1c7ed6\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-dasharray=\"5 4\"/><line x1=\"92.8\" y1=\"183.8\" x2=\"224.8\" y2=\"183.8\" stroke=\"#1c7ed6\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-dasharray=\"5 4\"/><line x1=\"92.8\" y1=\"183.8\" x2=\"132.4\" y2=\"86.9\" stroke=\"#1c7ed6\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-dasharray=\"5 4\"/><line x1=\"132.4\" y1=\"206.9\" x2=\"132.4\" y2=\"86.9\" stroke=\"#c2255c\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-dasharray=\"5 4\"/><text x=\"142.4\" y=\"146.9\" fill=\"#c2255c\" font-size=\"13\" font-weight=\"700\" text-anchor=\"start\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">0,68 m</text><text x=\"106.0\" y=\"246.0\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">Modell: 0,80 m</text><text x=\"272\" y=\"270\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">nicht maßstäblich – eigene Nachzeichnung</text></svg>",
  "figur_hinweis": null,
  "loesung_figur": null,
  "loesung": "Höhe: $0{,}68\\,\\text{m} \\cdot 10 = 6{,}8\\,\\text{m}$; Grundkante: $0{,}80\\,\\text{m} \\cdot 10 = 8{,}0\\,\\text{m}$. <br><i>Weiterdenken (KANN):</i> Flächen am Original sind $10^2 = 100$-mal, das Volumen $10^3 = 1000$-mal so groß.",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "BB-2018-A6c",
  "land": "BB",
  "bundesland": "Brandenburg",
  "pruefung": "Prüfung am Ende der Jahrgangsstufe 10 (P10) Mathematik",
  "jahr": 2018,
  "teil": "Aufgabe 6",
  "aufgabe": "6 c",
  "be": 2,
  "relevanz": "maßstab",
  "themen_original": [
   "Maßstab",
   "Modell"
  ],
  "thema": "massstab",
  "stufe": 1,
  "titel": "Fuchsturm-Modell 1 : 50",
  "fokus": "Teilaufgabe c",
  "text": "Aufgabe 6: Fuchsturm (9 Punkte)\nDer Fuchsturm ist ein beliebtes Ausflugsziel in der Stadt Jena.\nDer Turm hat einen Durchmesser d von 6,4 m und eine Gesamthöhe h von 30,0 m.\n[…]\nc) Ein Modell des Fuchsturmes soll im Maßstab 1 : 50 gebaut werden.\nGeben Sie die Höhe h und den Durchmesser d des Modells an. (2 P)",
  "tabelle": null,
  "quelle_url": "https://bildungsserver.berlin-brandenburg.de/fileadmin/bbb/unterricht/pruefungen/pruefungen_am_ende_der_jahrgangsstufe_10/Pruefungsaufgaben_P10_Mathematik/18_P10_Ma_A.pdf",
  "quelle_url_alt": null,
  "seite": null,
  "auswertung_url": null,
  "loesung_url": null,
  "quote_original": null,
  "quote": null,
  "quote_wert": null,
  "lizenz": "Quelle: Bildungsserver Berlin-Brandenburg (Prüfungen am Ende der Jahrgangsstufe 10). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "In cm umrechnen: $30{,}0\\,\\text{m} = 3000\\,\\text{cm}$, $6{,}4\\,\\text{m} = 640\\,\\text{cm}$.",
   "Beide Längen durch 50 teilen."
  ],
  "checks": [
   {
    "type": "num",
    "fields": [
     {
      "label": "Höhe $h$:",
      "ans": 60,
      "unit": "cm"
     },
     {
      "label": "Durchmesser $d$:",
      "ans": 12.8,
      "unit": "cm"
     }
    ]
   }
  ],
  "gruppe": null,
  "pruefungstipp": null,
  "hinweis_eigen": null,
  "figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 250 348\" width=\"250\" role=\"img\" aria-label=\"Turm: Zylinder mit Kegeldach\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><rect x=\"54\" y=\"110\" width=\"72\" height=\"170\" fill=\"rgba(28,126,214,.08)\"/><line x1=\"54.0\" y1=\"280.0\" x2=\"54.0\" y2=\"110.0\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"126.0\" y1=\"280.0\" x2=\"126.0\" y2=\"110.0\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M54.0,280.0 A36.0,9.0 0 0 1 126.0,280.0\" fill=\"none\" stroke=\"#1c7ed6\" stroke-width=\"1.4\" stroke-dasharray=\"5 4\"/><path d=\"M54.0,280.0 A36.0,9.0 0 0 0 126.0,280.0\" fill=\"none\" stroke=\"#1c7ed6\" stroke-width=\"2\"/><polygon points=\"48.0,110.0 132.0,110.0 90.0,50.0\" fill=\"rgba(232,89,12,.12)\" stroke=\"#e8590c\" stroke-width=\"2\" stroke-linejoin=\"round\" /><line x1=\"54.0\" y1=\"302.0\" x2=\"126.0\" y2=\"302.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"54.0\" y1=\"297.0\" x2=\"54.0\" y2=\"307.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"126.0\" y1=\"297.0\" x2=\"126.0\" y2=\"307.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><text x=\"90.0\" y=\"313.0\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">d = 6,4 m</text><line x1=\"160.0\" y1=\"280.0\" x2=\"160.0\" y2=\"50.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"155.0\" y1=\"280.0\" x2=\"165.0\" y2=\"280.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"155.0\" y1=\"50.0\" x2=\"165.0\" y2=\"50.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><text x=\"171.0\" y=\"165.0\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">h = 30,0 m</text><text x=\"244\" y=\"340\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">nicht maßstäblich – eigene Nachzeichnung</text></svg>",
  "figur_hinweis": null,
  "loesung_figur": null,
  "loesung": "$h = 3000\\,\\text{cm} : 50 = 60\\,\\text{cm}$; $d = 640\\,\\text{cm} : 50 = 12{,}8\\,\\text{cm}$",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "SH-2013-H1-A13",
  "land": "SH",
  "bundesland": "Schleswig-Holstein",
  "pruefung": "Realschulabschluss Mathematik, Heft 1",
  "jahr": 2013,
  "teil": "Teil A (Kurzaufgaben)",
  "aufgabe": "A13",
  "be": 1,
  "relevanz": "maßstab",
  "themen_original": [
   "Maßstab",
   "Landkarte"
  ],
  "thema": "massstab",
  "stufe": 1,
  "titel": "Karte 1 : 200 000",
  "fokus": "A13",
  "text": "A13 Auf einer Karte mit dem Maßstab 1:200 000 werden 5 cm zwischen zwei Orten gemessen. Wie lang ist der Weg in der Wirklichkeit?\n☐ 2 km ☐ 10 km ☐ 20 000 m ☐ 50 km",
  "tabelle": null,
  "quelle_url": "https://transparenz.schleswig-holstein.de/dataset/a5085303-444a-4408-a316-50af7a23bbea/resource/39f138da-f914-49a4-9860-f6f83745b83b/download/2013_rsa_mathematik_2013_schlerheft1_geschwrzt.pdf",
  "quelle_url_alt": null,
  "seite": null,
  "auswertung_url": null,
  "loesung_url": "https://transparenz.schleswig-holstein.de/dataset/a5085303-444a-4408-a316-50af7a23bbea/resource/351f36b3-c19b-4c39-878c-c774bfdee412/download/2013_rsa_mathematik_2013_korrekturanweisung_geschwrzt.pdf",
  "quote_original": null,
  "quote": null,
  "quote_wert": null,
  "lizenz": "Quelle: MBWK Schleswig-Holstein über das Transparenzportal. Lizenz: CC BY-ND 4.0 (https://creativecommons.org/licenses/by-nd/4.0/deed.de). Aufgabentext unverändert übernommen, Abbildung nicht nachgezeichnet.",
  "tipps": [
   "$5\\,\\text{cm} \\cdot 200\\,000$ rechnen, dann in km umwandeln ($100\\,000\\,\\text{cm} = 1\\,\\text{km}$)."
  ],
  "checks": [
   {
    "type": "mc",
    "choices": [
     "2 km",
     "10 km",
     "20 000 m",
     "50 km"
    ],
    "correct": 1,
    "why": "$5 \\cdot 200\\,000\\,\\text{cm} = 1\\,000\\,000\\,\\text{cm} = 10\\,\\text{km}$"
   }
  ],
  "gruppe": null,
  "pruefungstipp": null,
  "hinweis_eigen": null,
  "figur": null,
  "figur_hinweis": null,
  "abb_worte": null,
  "loesung": null,
  "loesung_offiziell": "Offiziell: 10 km (5 cm · 200 000 = 1 000 000 cm = 10 km).",
  "loesung_typ": "offiziell (Korrekturanweisung MBWK SH)"
 },
 {
  "id": "SH-2017-H1-A1",
  "land": "SH",
  "bundesland": "Schleswig-Holstein",
  "pruefung": "Mittlerer Schulabschluss (MSA) Mathematik, Heft 1",
  "jahr": 2017,
  "teil": "Teil A (Kurzformaufgaben)",
  "aufgabe": "A1",
  "be": 1,
  "relevanz": "kern",
  "themen_original": [
   "Streckfaktor / Verkleinerungsfaktor",
   "Maßstab"
  ],
  "thema": "massstab",
  "stufe": 1,
  "titel": "Fernsehturm auf dem Foto",
  "fokus": "A1",
  "text": "A1 Ein Fernsehturm ist 200 m hoch. Auf einem Foto erscheint er nur 4 cm hoch.\nGib den Verkleinerungsfaktor an.\nDer Verkleinerungsfaktor beträgt ______.",
  "tabelle": null,
  "quelle_url": "https://transparenz.schleswig-holstein.de/dataset/a5085303-444a-4408-a316-50af7a23bbea/resource/81c587b2-1caa-442c-ba1f-a25077df91ce/download/2017_msa_mathematik_2017_schlerheft1_geschwrzt.pdf",
  "quelle_url_alt": null,
  "seite": null,
  "auswertung_url": null,
  "loesung_url": "https://transparenz.schleswig-holstein.de/dataset/a5085303-444a-4408-a316-50af7a23bbea/resource/2c327e63-fc56-4197-9d5a-e8d79fe2e4c0/download/2017_msa_mathematik_2017_korrekturanweisung_geschwrzt.pdf",
  "quote_original": null,
  "quote": null,
  "quote_wert": null,
  "lizenz": "Quelle: MBWK Schleswig-Holstein über das Transparenzportal. Lizenz: CC BY-ND 4.0 (https://creativecommons.org/licenses/by-nd/4.0/deed.de). Aufgabentext unverändert übernommen, Abbildung nicht nachgezeichnet.",
  "tipps": [
   "$200\\,\\text{m} = 20\\,000\\,\\text{cm}$",
   "$20\\,000\\,\\text{cm} : 4\\,\\text{cm}$"
  ],
  "checks": [
   {
    "type": "num",
    "fields": [
     {
      "label": "Verkleinerungsfaktor:",
      "ans": 5000
     }
    ]
   }
  ],
  "gruppe": null,
  "pruefungstipp": null,
  "hinweis_eigen": "Sprechweise: Die offizielle Lösung nennt 5000 den „Verkleinerungsfaktor“. Als Streckfaktor der zentrischen Streckung wäre $k = \\tfrac{1}{5000}$ (Maßstab $1 : 5000$).",
  "figur": null,
  "figur_hinweis": null,
  "abb_worte": null,
  "loesung": null,
  "loesung_offiziell": "Offiziell: „Der Verkleinerungsfaktor beträgt 5000.“ (200 m = 20 000 cm; 20 000 : 4 = 5000, also Maßstab 1 : 5000.)",
  "loesung_typ": "offiziell (Korrekturanweisung MBWK SH)"
 },
 {
  "id": "LSA-2020-WPA1c",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Realschulabschluss (Klasse 10), schriftliche Abschlussprüfung",
  "jahr": 2020,
  "teil": "Wahlpflichtteil",
  "aufgabe": "Wahlpflichtaufgabe 1 c",
  "be": "Teil von 8 BE",
  "relevanz": "maßstab",
  "themen_original": [
   "Maßstab",
   "maßstäbliches Modell (ähnlicher Körper)"
  ],
  "thema": "massstab",
  "stufe": 2,
  "titel": "Bismarckturm Calbe – Nachbau",
  "fokus": "Teilaufgabe c (a und b sind Körperberechnung)",
  "text": "Wahlpflichtaufgabe 1 (erreichbare BE: 8)\nDie Abbildung zeigt den Bismarckturm Calbe. Mit 30 m Höhe ist dieser der höchste Bismarckturm in Sachsen-Anhalt. Für den Bau dieses Turms waren insgesamt 1600 m³ Mauerwerk erforderlich. Vereinfacht wird angenommen, dass der Bismarckturm Calbe die Form eines Hohlzylinders hat, dessen Außendurchmesser 12 m beträgt.\na) Der umbaute Raum ist ein veraltetes Maß für das Volumen, das ein Gebäude insgesamt einnimmt. Zeigen Sie, dass der umbaute Raum dieses Bismarckturms etwa 3393 m³ beträgt.\nb) Berechnen Sie die Dicke des Mauerwerks.\nc) Der Bismarckturm Calbe wird maßstäblich nachgebaut. Der Außendurchmesser des Nachbaus beträgt 6 cm. Ermitteln Sie die Höhe des Nachbaus und geben Sie den für den Nachbau verwendeten Maßstab an.",
  "tabelle": null,
  "quelle_url": "https://lisa.sachsen-anhalt.de/fileadmin/Bibliothek/Politik_und_Verwaltung/MK/LISA/Unterricht/ZLE/RSA_10/Mathematik/rsa20_ma_ET_Teil2.pdf",
  "quelle_url_alt": null,
  "seite": null,
  "auswertung_url": "https://lisa.sachsen-anhalt.de/fileadmin/Bibliothek/Politik_und_Verwaltung/MK/LISA/Unterricht/ZLE/RSA_10/Mathematik/DBL_02_2020_RSA_Mathematik_Endversion.pdf",
  "loesung_url": null,
  "quote_original": "c (Höhe): 62 %, c (Maßstab): 37 %, laut Auswertung 2020",
  "quote": "Maßstab: nur 37 %, Höhe: 62 % gelöst",
  "quote_wert": 37,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "Gleiche Einheiten: $12\\,\\text{m} = 1200\\,\\text{cm}$.",
   "Maßstab $= 6\\,\\text{cm} : 1200\\,\\text{cm}$ – kürzen!",
   "Die Höhe wird im selben Verhältnis verkleinert: $3000\\,\\text{cm} : 200$."
  ],
  "checks": [
   {
    "type": "num",
    "fields": [
     {
      "label": "Höhe des Nachbaus:",
      "ans": 15,
      "unit": "cm"
     },
     {
      "label": "Maßstab:",
      "ans": [
       1,
       200
      ],
      "ratio": true
     }
    ]
   }
  ],
  "gruppe": null,
  "pruefungstipp": "Nur 37 % gaben den Maßstab richtig an! Häufiger Fehler: 6 : 12 = 1 : 2 (Einheiten vergessen).",
  "hinweis_eigen": null,
  "figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 260 328\" width=\"260\" role=\"img\" aria-label=\"Hohlzylinder-Modell des Turms\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><rect x=\"60\" y=\"60\" width=\"120\" height=\"200\" fill=\"rgba(28,126,214,.08)\"/><line x1=\"60.0\" y1=\"260.0\" x2=\"60.0\" y2=\"60.0\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"180.0\" y1=\"260.0\" x2=\"180.0\" y2=\"60.0\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M60.0,260.0 A60.0,14.0 0 0 1 180.0,260.0\" fill=\"none\" stroke=\"#1c7ed6\" stroke-width=\"1.4\" stroke-dasharray=\"5 4\"/><path d=\"M60.0,260.0 A60.0,14.0 0 0 0 180.0,260.0\" fill=\"none\" stroke=\"#1c7ed6\" stroke-width=\"2\"/><ellipse cx=\"120.0\" cy=\"60.0\" rx=\"60.0\" ry=\"14.0\" fill=\"none\" stroke=\"#1c7ed6\" stroke-width=\"2\"/><ellipse cx=\"120.0\" cy=\"60.0\" rx=\"43.2\" ry=\"10.0\" fill=\"none\" stroke=\"#868e96\" stroke-width=\"1.5\"/><line x1=\"60.0\" y1=\"288.0\" x2=\"180.0\" y2=\"288.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"60.0\" y1=\"283.0\" x2=\"60.0\" y2=\"293.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"180.0\" y1=\"283.0\" x2=\"180.0\" y2=\"293.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><text x=\"120.0\" y=\"299.0\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">12 m</text><line x1=\"204.0\" y1=\"260.0\" x2=\"204.0\" y2=\"60.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"199.0\" y1=\"260.0\" x2=\"209.0\" y2=\"260.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"199.0\" y1=\"60.0\" x2=\"209.0\" y2=\"60.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><text x=\"215.0\" y=\"160.0\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">30 m</text><text x=\"254\" y=\"320\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">nicht maßstäblich – eigene Nachzeichnung</text></svg>",
  "figur_hinweis": "Im Original: Foto des Turms. Hier: vereinfachtes Modell (Hohlzylinder).",
  "loesung_figur": null,
  "loesung": "Maßstab: $6\\,\\text{cm} : 12\\,\\text{m} = 6\\,\\text{cm} : 1200\\,\\text{cm} = 1 : 200$. <br>Höhe: $30\\,\\text{m} = 3000\\,\\text{cm}$, $3000\\,\\text{cm} : 200 = 15\\,\\text{cm}$. <br><small>Zur Vollständigkeit: a) $V = \\pi \\cdot 6^2 \\cdot 30 \\approx 3393\\,\\text{m}^3$; b) Innenvolumen $\\approx 3393 - 1600 = 1793\\,\\text{m}^3$, $r_i = \\sqrt{1793 : (30\\pi)} \\approx 4{,}36\\,\\text{m}$, Mauerdicke $\\approx 6 - 4{,}36 \\approx 1{,}6\\,\\text{m}$.</small>",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "SH-2018-H2-B1a",
  "land": "SH",
  "bundesland": "Schleswig-Holstein",
  "pruefung": "Mittlerer Schulabschluss (MSA) Mathematik, Heft 2",
  "jahr": 2018,
  "teil": "B1 Trigonometrie „Turm“",
  "aufgabe": "B1 a (2. Teil)",
  "be": 1,
  "relevanz": "maßstab",
  "themen_original": [
   "Maßstab",
   "maßstäbliche Zeichnung"
  ],
  "thema": "massstab",
  "stufe": 2,
  "titel": "Turm auf dem Berg – Höhe in der Zeichnung",
  "fokus": "B1 a, 2. Punkt (Maßstab)",
  "text": "Auf einem Berg steht ein 12 m hoher Turm. […] Der Techniker peilt aus einer Augenhöhe von 1,70 m den unteren Rand des Turmes unter einem Höhenwinkel von 14 ° und den oberen Rand des Turmes unter einem Höhenwinkel von 19 ° an.\na) Für weitere Betrachtungen soll eine maßstabsgetreue Zeichnung angefertigt werden, in der der Turm sowie die Position des Technikers (ausgehend von dessen Augenhöhe) dargestellt sind.\n• Bestimme die Innenwinkel dieses Dreiecks ACD. (3 P.)\n• Bestimme die Höhe, die der Turm im Maßstab 1:1000 in der Zeichnung haben muss. (1 P.)\n• Zeichne das Dreieck ACD mit Hilfe der zuvor ermittelten Turmhöhe. (2 P.)",
  "tabelle": null,
  "quelle_url": "https://transparenz.schleswig-holstein.de/dataset/a5085303-444a-4408-a316-50af7a23bbea/resource/d41ee011-ec86-4223-a06a-cdfc38dd04ea/download/2018_msa_mathematik_2018_schlerheft2_geschwrzt.pdf",
  "quelle_url_alt": null,
  "seite": 4,
  "auswertung_url": null,
  "loesung_url": "https://transparenz.schleswig-holstein.de/dataset/a5085303-444a-4408-a316-50af7a23bbea/resource/720ccb5a-1df8-4dfa-b970-021486ccd0d4/download/2018_msa_mathematik_2018_korrekturanweisung_geschwrzt.pdf",
  "quote_original": null,
  "quote": null,
  "quote_wert": null,
  "lizenz": "Quelle: MBWK Schleswig-Holstein über das Transparenzportal. Lizenz: CC BY-ND 4.0 (https://creativecommons.org/licenses/by-nd/4.0/deed.de). Aufgabentext unverändert übernommen, Abbildung nicht nachgezeichnet.",
  "tipps": [
   "$12\\,\\text{m} = 1200\\,\\text{cm}$",
   "Bei $1 : 1000$: $1200\\,\\text{cm} : 1000$"
  ],
  "checks": [
   {
    "type": "num",
    "fields": [
     {
      "label": "Turmhöhe in der Zeichnung:",
      "ans": 1.2,
      "unit": "cm"
     }
    ]
   }
  ],
  "gruppe": null,
  "pruefungstipp": null,
  "hinweis_eigen": null,
  "figur": null,
  "figur_hinweis": "Die Abbildung ist urheberrechtlich geschützt (CC BY-ND 4.0) und wird hier bewusst NICHT nachgezeichnet. Bitte im Original-PDF ansehen (S. 4).",
  "abb_worte": "Nicht maßstabsgetreue Skizze: A = Auge des Technikers; B = Punkt senkrecht unter dem Turm auf Augenhöhe; C = unterer Turmrand, D = oberer Turmrand (CD = 12 m senkrecht); Höhenwinkel ∢BAC = 14°, ∢BAD = 19°; rechter Winkel bei B.",
  "loesung": null,
  "loesung_offiziell": "Offiziell: ∢CAD = 19° − 14° = 5°; ∢ACB = 76° ⇒ ∢DCA = 104°; ∢ADC = 71°. „1 : 1000 → 1,2 cm ≙ 1200 cm = 12 m. Der Turm muss für die Zeichnung eine Höhe von 1,2 cm haben.“",
  "loesung_typ": "offiziell (Korrekturanweisung MBWK SH)"
 },
 {
  "id": "LSA-2017-PT1-10",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Realschulabschluss (Klasse 10), schriftliche Abschlussprüfung",
  "jahr": 2017,
  "teil": "Pflichtteil 1 (ohne Taschenrechner)",
  "aufgabe": "Aufgabe 10",
  "be": 1,
  "relevanz": "kern",
  "themen_original": [
   "ähnliche Figuren zeichnen"
  ],
  "thema": "figuren",
  "stufe": 1,
  "titel": "Zeichne eine ähnliche Figur",
  "fokus": "Aufgabe 10 (ohne Taschenrechner)",
  "text": "10. Zeichnen Sie eine zum gegebenen Viereck ähnliche Figur.",
  "tabelle": null,
  "quelle_url": "https://lisa.sachsen-anhalt.de/fileadmin/Bibliothek/Politik_und_Verwaltung/MK/LISA/Unterricht/ZLE/RSA_10/Mathematik/rsa17_mat_ET_Teil1_Aufgaben.pdf",
  "quelle_url_alt": null,
  "seite": 4,
  "auswertung_url": null,
  "loesung_url": null,
  "quote_original": null,
  "quote": null,
  "quote_wert": null,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "Ähnlich heißt: alle Seiten mit demselben Faktor $k$ strecken, alle Winkel bleiben gleich.",
   "Das Rechteck ist $5\\,\\text{cm} \\times 2\\,\\text{cm}$. Wähle z. B. $k = 2$ oder $k = \\tfrac12$."
  ],
  "checks": [
   {
    "type": "open"
   }
  ],
  "gruppe": null,
  "pruefungstipp": "Beschrifte deine Seitenlängen, damit man k sofort sieht.",
  "hinweis_eigen": null,
  "figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 248\" width=\"400\" role=\"img\" aria-label=\"Rechteck 5 cm mal 2 cm auf Kästchenpapier\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><line x1=\"20.0\" y1=\"20.0\" x2=\"20.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"40.0\" y1=\"20.0\" x2=\"40.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"60.0\" y1=\"20.0\" x2=\"60.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"80.0\" y1=\"20.0\" x2=\"80.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"100.0\" y1=\"20.0\" x2=\"100.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"120.0\" y1=\"20.0\" x2=\"120.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"140.0\" y1=\"20.0\" x2=\"140.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"160.0\" y1=\"20.0\" x2=\"160.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"180.0\" y1=\"20.0\" x2=\"180.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"200.0\" y1=\"20.0\" x2=\"200.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"220.0\" y1=\"20.0\" x2=\"220.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"240.0\" y1=\"20.0\" x2=\"240.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"260.0\" y1=\"20.0\" x2=\"260.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"280.0\" y1=\"20.0\" x2=\"280.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"300.0\" y1=\"20.0\" x2=\"300.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"320.0\" y1=\"20.0\" x2=\"320.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"340.0\" y1=\"20.0\" x2=\"340.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"360.0\" y1=\"20.0\" x2=\"360.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"380.0\" y1=\"20.0\" x2=\"380.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"20.0\" y1=\"20.0\" x2=\"380.0\" y2=\"20.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"20.0\" y1=\"40.0\" x2=\"380.0\" y2=\"40.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"20.0\" y1=\"60.0\" x2=\"380.0\" y2=\"60.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"20.0\" y1=\"80.0\" x2=\"380.0\" y2=\"80.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"20.0\" y1=\"100.0\" x2=\"380.0\" y2=\"100.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"20.0\" y1=\"120.0\" x2=\"380.0\" y2=\"120.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"20.0\" y1=\"140.0\" x2=\"380.0\" y2=\"140.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"20.0\" y1=\"160.0\" x2=\"380.0\" y2=\"160.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"20.0\" y1=\"180.0\" x2=\"380.0\" y2=\"180.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"20.0\" y1=\"200.0\" x2=\"380.0\" y2=\"200.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><polygon points=\"40.0,60.0 240.0,60.0 240.0,140.0 40.0,140.0\" fill=\"rgba(28,126,214,.12)\" stroke=\"#1c7ed6\" stroke-width=\"3\" stroke-linejoin=\"round\" /><text x=\"140.0\" y=\"160.0\" fill=\"#1c7ed6\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">5,0 cm (10 Kästchen)</text><text x=\"264.0\" y=\"100.0\" fill=\"#1c7ed6\" font-size=\"12\" font-weight=\"700\" text-anchor=\"start\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">2,0 cm</text><text x=\"394\" y=\"240\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">Kästchen = 0,5 cm (eigene Nachzeichnung)</text></svg>",
  "figur_hinweis": null,
  "loesung_figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 476 200\" width=\"476\" role=\"img\" aria-label=\"Ähnliche Rechtecke\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><line x1=\"14.0\" y1=\"14.0\" x2=\"14.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"28.0\" y1=\"14.0\" x2=\"28.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"42.0\" y1=\"14.0\" x2=\"42.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"56.0\" y1=\"14.0\" x2=\"56.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"70.0\" y1=\"14.0\" x2=\"70.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"84.0\" y1=\"14.0\" x2=\"84.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"98.0\" y1=\"14.0\" x2=\"98.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"112.0\" y1=\"14.0\" x2=\"112.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"126.0\" y1=\"14.0\" x2=\"126.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"140.0\" y1=\"14.0\" x2=\"140.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"154.0\" y1=\"14.0\" x2=\"154.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"168.0\" y1=\"14.0\" x2=\"168.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"182.0\" y1=\"14.0\" x2=\"182.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"196.0\" y1=\"14.0\" x2=\"196.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"210.0\" y1=\"14.0\" x2=\"210.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"224.0\" y1=\"14.0\" x2=\"224.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"238.0\" y1=\"14.0\" x2=\"238.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"252.0\" y1=\"14.0\" x2=\"252.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"266.0\" y1=\"14.0\" x2=\"266.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"280.0\" y1=\"14.0\" x2=\"280.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"294.0\" y1=\"14.0\" x2=\"294.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"308.0\" y1=\"14.0\" x2=\"308.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"322.0\" y1=\"14.0\" x2=\"322.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"336.0\" y1=\"14.0\" x2=\"336.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"350.0\" y1=\"14.0\" x2=\"350.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"364.0\" y1=\"14.0\" x2=\"364.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"378.0\" y1=\"14.0\" x2=\"378.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"392.0\" y1=\"14.0\" x2=\"392.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"406.0\" y1=\"14.0\" x2=\"406.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"420.0\" y1=\"14.0\" x2=\"420.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"434.0\" y1=\"14.0\" x2=\"434.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"448.0\" y1=\"14.0\" x2=\"448.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"462.0\" y1=\"14.0\" x2=\"462.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"14.0\" y1=\"14.0\" x2=\"462.0\" y2=\"14.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"14.0\" y1=\"28.0\" x2=\"462.0\" y2=\"28.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"14.0\" y1=\"42.0\" x2=\"462.0\" y2=\"42.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"14.0\" y1=\"56.0\" x2=\"462.0\" y2=\"56.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"14.0\" y1=\"70.0\" x2=\"462.0\" y2=\"70.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"14.0\" y1=\"84.0\" x2=\"462.0\" y2=\"84.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"14.0\" y1=\"98.0\" x2=\"462.0\" y2=\"98.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"14.0\" y1=\"112.0\" x2=\"462.0\" y2=\"112.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"14.0\" y1=\"126.0\" x2=\"462.0\" y2=\"126.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"14.0\" y1=\"140.0\" x2=\"462.0\" y2=\"140.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"14.0\" y1=\"154.0\" x2=\"462.0\" y2=\"154.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"14.0\" y1=\"168.0\" x2=\"462.0\" y2=\"168.0\" stroke=\"#e9ecef\" stroke-width=\"1\" stroke-linecap=\"round\"/><polygon points=\"28.0,28.0 168.0,28.0 168.0,84.0 28.0,84.0\" fill=\"rgba(28,126,214,.12)\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linejoin=\"round\" /><text x=\"98.0\" y=\"56.0\" fill=\"#1c7ed6\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">Original 5 × 2</text><polygon points=\"196.0,28.0 462.0,28.0 462.0,140.0 196.0,140.0\" fill=\"rgba(232,89,12,.10)\" stroke=\"#e8590c\" stroke-width=\"2.5\" stroke-linejoin=\"round\" /><text x=\"329.0\" y=\"84.0\" fill=\"#e8590c\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">k = 2: 10 × 4</text><polygon points=\"28.0,112.0 98.0,112.0 98.0,140.0 28.0,140.0\" fill=\"rgba(43,138,62,.12)\" stroke=\"#2b8a3e\" stroke-width=\"2.5\" stroke-linejoin=\"round\" /><text x=\"63.0\" y=\"158.2\" fill=\"#2b8a3e\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">k = ½: 2,5 × 1</text><text x=\"470\" y=\"192\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">Kästchen = 0,5 cm</text></svg>",
  "loesung": "Jedes Rechteck mit dem Seitenverhältnis $5 : 2$, z. B. $10\\,\\text{cm} \\times 4\\,\\text{cm}$ ($k = 2$) oder $2{,}5\\,\\text{cm} \\times 1\\,\\text{cm}$ ($k = 0{,}5$). Alle Winkel bleiben $90^\\circ$. <br><b>Falsch</b> wäre z. B. $7\\,\\text{cm} \\times 4\\,\\text{cm}$ (je $+2\\,\\text{cm}$) – addieren erzeugt keine ähnliche Figur!",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "LSA-2020-PA1c",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Realschulabschluss (Klasse 10), schriftliche Abschlussprüfung",
  "jahr": 2020,
  "teil": "Pflichtteil 2",
  "aufgabe": "Pflichtaufgabe 1 c",
  "be": "Teil von PA 1",
  "relevanz": "kern",
  "themen_original": [
   "ähnliche Rechtecke",
   "Seitenverhältnis"
  ],
  "thema": "figuren",
  "stufe": 2,
  "titel": "Ähnliche Fotoformate",
  "fokus": "Teilaufgabe c",
  "text": "c) Fotos werden in den Bildformaten 9 x 13 , 10 x 15 , 13 x 18 und 20 x 30 angeboten.\nGeben Sie die zwei zueinander ähnlichen Bildformate an und begründen Sie Ihre Angabe.",
  "tabelle": null,
  "quelle_url": "https://lisa.sachsen-anhalt.de/fileadmin/Bibliothek/Politik_und_Verwaltung/MK/LISA/Unterricht/ZLE/RSA_10/Mathematik/rsa20_ma_ET_Teil2.pdf",
  "quelle_url_alt": null,
  "seite": null,
  "auswertung_url": "https://lisa.sachsen-anhalt.de/fileadmin/Bibliothek/Politik_und_Verwaltung/MK/LISA/Unterricht/ZLE/RSA_10/Mathematik/DBL_02_2020_RSA_Mathematik_Endversion.pdf",
  "loesung_url": null,
  "quote_original": "47 % (AFB I), laut Auswertung 2020",
  "quote": "47 % gelöst",
  "quote_wert": 47,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "Berechne für jedes Format das Seitenverhältnis lang : kurz.",
   "$13 : 9 \\approx 1{,}44$ &nbsp; $15 : 10 = 1{,}5$ &nbsp; $18 : 13 \\approx 1{,}38$ &nbsp; $30 : 20 = 1{,}5$"
  ],
  "checks": [
   {
    "type": "mc",
    "choices": [
     "$10 \\times 15$ und $20 \\times 30$",
     "$9 \\times 13$ und $13 \\times 18$",
     "$9 \\times 13$ und $10 \\times 15$",
     "$13 \\times 18$ und $20 \\times 30$"
    ],
    "correct": 0,
    "why": "$20 : 10 = 30 : 15 = 2$ – ein gemeinsamer Faktor $k = 2$.",
    "wrongWhy": {
     "1": "$13 : 9 \\approx 1{,}44$, aber $18 : 13 \\approx 1{,}38$.",
     "2": "$10 : 9 \\approx 1{,}11$, aber $15 : 13 \\approx 1{,}15$.",
     "3": "$20 : 13 \\approx 1{,}54$, aber $30 : 18 \\approx 1{,}67$."
    }
   }
  ],
  "gruppe": "Legt echte Fotos oder zugeschnittene Rechtecke übereinander (linke untere Ecke gemeinsam): Bei ähnlichen Rechtecken liegen die Ecken auf einer Diagonalen.",
  "pruefungstipp": "„Begründen“ heißt: die Rechnung für k hinschreiben, nicht nur das Ergebnis.",
  "hinweis_eigen": null,
  "figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 456 278\" width=\"456\" role=\"img\" aria-label=\"Vier Fotoformate\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><polygon points=\"20.0,230.0 78.5,230.0 78.5,145.5 20.0,145.5\" fill=\"rgba(0,0,0,.03)\" stroke=\"#868e96\" stroke-width=\"2.2\" stroke-linejoin=\"round\" /><text x=\"49.2\" y=\"246.0\" fill=\"#868e96\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">9 × 13</text><polygon points=\"100.5,230.0 165.5,230.0 165.5,132.5 100.5,132.5\" fill=\"rgba(0,0,0,.03)\" stroke=\"#1c7ed6\" stroke-width=\"2.2\" stroke-linejoin=\"round\" /><text x=\"133.0\" y=\"246.0\" fill=\"#1c7ed6\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">10 × 15</text><polygon points=\"187.5,230.0 272.0,230.0 272.0,113.0 187.5,113.0\" fill=\"rgba(0,0,0,.03)\" stroke=\"#868e96\" stroke-width=\"2.2\" stroke-linejoin=\"round\" /><text x=\"229.8\" y=\"246.0\" fill=\"#868e96\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">13 × 18</text><polygon points=\"294.0,230.0 424.0,230.0 424.0,35.0 294.0,35.0\" fill=\"rgba(0,0,0,.03)\" stroke=\"#e8590c\" stroke-width=\"2.2\" stroke-linejoin=\"round\" /><text x=\"359.0\" y=\"246.0\" fill=\"#e8590c\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">20 × 30</text><text x=\"450\" y=\"270\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">Seitenlängen in cm, maßstäblich zueinander</text></svg>",
  "figur_hinweis": null,
  "loesung_figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 330 278\" width=\"330\" role=\"img\" aria-label=\"Formate übereinander gelegt\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><polygon points=\"20.0,240.0 160.0,240.0 160.0,30.0 20.0,30.0\" fill=\"none\" stroke=\"#e8590c\" stroke-width=\"2\" stroke-linejoin=\"round\" /><polygon points=\"20.0,240.0 90.0,240.0 90.0,135.0 20.0,135.0\" fill=\"none\" stroke=\"#1c7ed6\" stroke-width=\"2\" stroke-linejoin=\"round\" /><polygon points=\"20.0,240.0 111.0,240.0 111.0,114.0 20.0,114.0\" fill=\"none\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linejoin=\"round\" /><polygon points=\"20.0,240.0 83.0,240.0 83.0,149.0 20.0,149.0\" fill=\"none\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linejoin=\"round\" /><line x1=\"20.0\" y1=\"240.0\" x2=\"178.0\" y2=\"3.0\" stroke=\"#c2255c\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-dasharray=\"6 4\"/><text x=\"180.0\" y=\"40.0\" fill=\"#c2255c\" font-size=\"12\" font-weight=\"700\" text-anchor=\"start\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">gemeinsame Diagonale</text><text x=\"324\" y=\"270\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">10 × 15 und 20 × 30 liegen auf einer Diagonalen → ähnlich</text></svg>",
  "loesung": "$10 \\times 15$ und $20 \\times 30$ sind ähnlich, denn $\\dfrac{20}{10} = \\dfrac{30}{15} = 2$ (Streckfaktor $k = 2$). Beide haben das Seitenverhältnis $2 : 3$. Die anderen Formate: $13 : 9 \\approx 1{,}44$ und $18 : 13 \\approx 1{,}38$.",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "LSA-BLF-2026-5",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Besondere Leistungsfeststellung zum Erwerb des qualifizierten Hauptschulabschlusses (Klasse 9)",
  "jahr": 2026,
  "teil": "Teil 2",
  "aufgabe": "Aufgabe 5",
  "be": 5,
  "relevanz": "kern",
  "themen_original": [
   "ähnliche Rechtecke (DIN-Formate)",
   "Flächenverhältnis",
   "Anwendung"
  ],
  "thema": "figuren",
  "stufe": 2,
  "titel": "DIN-Formate (qualifizierter Hauptschulabschluss)",
  "fokus": "a) bis c)",
  "text": "In der Tabelle sind die Maße der Papierformate DIN A3 bis DIN A5 angegeben. Die Formate ergeben sich jeweils durch Halbierung des vorherigen Formats (s. Abbildung).\n[Tabelle] Format | Maße in mm: DIN A3 | 297 x 420; DIN A4 | 210 x 297; DIN A5 | 148 x 210; DIN A6 | (leer)\na) Geben Sie die Maße einer Postkarte im Format DIN A6 an.\nb) Ermitteln Sie, um wie viel Prozent eine Verkleinerung des Flächeninhalts vom Format DIN A3 zum Format DIN A5 erfolgt.\nc) Ein handelsübliches Blatt Papier im Format DIN A0 hat einen Flächeninhalt von 1 m² und wiegt 80 g. Bestimmen Sie die Masse eines Blattes aus dem gleichen Papier im Format DIN A4.",
  "tabelle": "<table class=\"nice small\"><thead><tr><th>Format</th><th>Maße in mm</th></tr></thead><tbody><tr><td>DIN A3</td><td>297 x 420</td></tr><tr><td>DIN A4</td><td>210 x 297</td></tr><tr><td>DIN A5</td><td>148 x 210</td></tr><tr><td>DIN A6</td><td></td></tr></tbody></table>",
  "quelle_url": "https://www.bildung-lsa.de/files/379ed81382ce7246b5b8d7daa349273e/2026_bLF_Mat_Teil2.pdf",
  "quelle_url_alt": null,
  "seite": 3,
  "auswertung_url": null,
  "loesung_url": null,
  "quote_original": null,
  "quote": null,
  "quote_wert": null,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "a) Halbiere die <b>längere</b> Seite von A5: $210 : 2$.",
   "b) Flächen berechnen: $297 \\cdot 420$ und $148 \\cdot 210$, dann den Anteil bilden.",
   "b) Kurzer Weg: A5 ist zweimal halbiert, also ein Viertel von A3 (ähnliche Rechtecke mit $k = \\tfrac12$, Fläche $k^2 = \\tfrac14$).",
   "c) A0 → A1 → A2 → A3 → A4: viermal halbieren, $2^4 = 16$."
  ],
  "checks": [
   {
    "type": "num",
    "fields": [
     {
      "label": "a) A6 kurze Seite:",
      "ans": 105,
      "unit": "mm"
     },
     {
      "label": "a) A6 lange Seite:",
      "ans": 148,
      "unit": "mm"
     },
     {
      "label": "b) Verkleinerung um ca.",
      "ans": 75,
      "unit": "%",
      "tol": 0.6,
      "wrong": [
       {
        "v": 25,
        "msg": "25 % ist der Anteil, der übrig bleibt. Gefragt ist die Verkleinerung."
       }
      ]
     },
     {
      "label": "c) Masse A4:",
      "ans": 5,
      "unit": "g"
     }
    ]
   }
  ],
  "gruppe": null,
  "pruefungstipp": "Prozent der Verkleinerung = 100 % − verbleibender Anteil.",
  "hinweis_eigen": null,
  "figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 252\" width=\"300\" role=\"img\" aria-label=\"DIN-Formate durch Halbieren\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><polygon points=\"20.0,20.0 280.4,20.0 280.4,204.1 20.0,204.1\" fill=\"rgba(28,126,214,.06)\" stroke=\"#1c7ed6\" stroke-width=\"2.2\" stroke-linejoin=\"round\" /><line x1=\"150.2\" y1=\"20.0\" x2=\"150.2\" y2=\"204.1\" stroke=\"#1c7ed6\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"150.2\" y1=\"112.1\" x2=\"280.4\" y2=\"112.1\" stroke=\"#1c7ed6\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"215.3\" y1=\"112.1\" x2=\"215.3\" y2=\"204.1\" stroke=\"#1c7ed6\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-dasharray=\"5 4\"/><text x=\"85.1\" y=\"112.1\" fill=\"#1c7ed6\" font-size=\"16\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">A4</text><text x=\"215.3\" y=\"66.0\" fill=\"#1c7ed6\" font-size=\"15\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">A5</text><text x=\"182.8\" y=\"158.1\" fill=\"#868e96\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">A6</text><text x=\"247.8\" y=\"158.1\" fill=\"#868e96\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">A6</text><text x=\"150.2\" y=\"220.1\" fill=\"#212529\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">DIN A3: 420 mm × 297 mm</text><text x=\"294\" y=\"244\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">nicht maßstäblich – eigene Nachzeichnung</text></svg>",
  "figur_hinweis": null,
  "loesung_figur": null,
  "loesung": "a) DIN A6: $105\\,\\text{mm} \\times 148\\,\\text{mm}$. <br>b) $A_{A3} = 297 \\cdot 420 = 124\\,740\\,\\text{mm}^2$, $A_{A5} = 148 \\cdot 210 = 31\\,080\\,\\text{mm}^2$; $31\\,080 : 124\\,740 \\approx 0{,}249$ – die Fläche wird also um ca. $75\\,\\%$ kleiner. <br>c) A4 ist $\\tfrac{1}{16}$ von A0: $80\\,\\text{g} : 16 = 5\\,\\text{g}$. <br><i>Ähnlichkeit:</i> Alle DIN-A-Formate sind zueinander ähnlich (Seitenverhältnis $1 : \\sqrt2 \\approx 1 : 1{,}414$).",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "LSA-2016-PA2c",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Realschulabschluss (Klasse 10), schriftliche Abschlussprüfung",
  "jahr": 2016,
  "teil": "Pflichtteil 2",
  "aufgabe": "Pflichtaufgabe 2 (a–c)",
  "be": 8,
  "relevanz": "rand",
  "themen_original": [
   "ähnliche Teildreiecke im rechtwinkligen Dreieck",
   "Winkelbegründung"
  ],
  "thema": "dreiecke",
  "stufe": 2,
  "titel": "Gleichschenkliges Dreieck: gleiche Winkel begründen",
  "fokus": "Teilaufgabe c (a und b: Trigonometrie)",
  "text": "Pflichtaufgabe 2 (erreichbare BE: 8)\nGegeben ist ein gleichschenkliges Dreieck ABC wie in Abbildung 2 mit:\nAB = 5,0 cm\nAC = BC = 5,6 cm\na) Berechnen Sie die Größe des Winkels α = ∢ BAC und die Länge der Strecke AH.\nb) Berechnen Sie den Flächeninhalt des Vierecks HFGC.\nc) Begründen Sie, dass die Winkel ∢ HFA und ∢ ACF gleich groß sind.",
  "tabelle": null,
  "quelle_url": "https://lisa.sachsen-anhalt.de/fileadmin/Bibliothek/Politik_und_Verwaltung/MK/LISA/Unterricht/ZLE/RSA_10/Mathematik/rsa16_ma_ET_Teil2.pdf",
  "quelle_url_alt": null,
  "seite": 3,
  "auswertung_url": null,
  "loesung_url": null,
  "quote_original": null,
  "quote": null,
  "quote_wert": null,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "Markiere alle rechten Winkel: bei $F$ (Höhe) und bei $H$ (Lot).",
   "Betrachte die Dreiecke $AFH$ und $ACF$. Welchen Winkel haben beide gemeinsam?",
   "Rechtwinklig + gemeinsamer Winkel $\\alpha$ ⇒ ähnlich (ww) ⇒ auch der dritte Winkel stimmt überein."
  ],
  "checks": [
   {
    "type": "open"
   }
  ],
  "gruppe": null,
  "pruefungstipp": "Beim Begründen jeden Schritt mit dem Grund nennen: „weil … rechtwinklig“, „weil Winkelsumme 180°“.",
  "hinweis_eigen": null,
  "figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 328\" width=\"300\" role=\"img\" aria-label=\"Gleichschenkliges Dreieck ABC mit Loten\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><polygon points=\"60.9,228.1 145.0,270.0 229.1,228.1 145.0,59.5\" fill=\"rgba(232,89,12,.12)\" stroke=\"none\" stroke-width=\"2.5\" stroke-linejoin=\"round\" /><polygon points=\"40.0,270.0 250.0,270.0 145.0,59.5\" fill=\"none\" stroke=\"#212529\" stroke-width=\"2.5\" stroke-linejoin=\"round\" /><line x1=\"145.0\" y1=\"59.5\" x2=\"145.0\" y2=\"270.0\" stroke=\"#868e96\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"145.0\" y1=\"270.0\" x2=\"60.9\" y2=\"228.1\" stroke=\"#e8590c\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><line x1=\"145.0\" y1=\"270.0\" x2=\"229.1\" y2=\"228.1\" stroke=\"#e8590c\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M55.1,239.7 L66.8,245.5 L72.6,233.9\" fill=\"none\" stroke=\"#e8590c\" stroke-width=\"1.8\"/><circle cx=\"63.8\" cy=\"236.8\" r=\"1.8\" fill=\"#e8590c\"/><path d=\"M234.9,239.7 L223.2,245.5 L217.4,233.9\" fill=\"none\" stroke=\"#e8590c\" stroke-width=\"1.8\"/><circle cx=\"226.2\" cy=\"236.8\" r=\"1.8\" fill=\"#e8590c\"/><path d=\"M158.0,270.0 L158.0,257.0 L145.0,257.0\" fill=\"none\" stroke=\"#868e96\" stroke-width=\"1.8\"/><circle cx=\"151.5\" cy=\"263.5\" r=\"1.8\" fill=\"#868e96\"/><path d=\"M40.0,270.0 L64.0,270.0 A24,24 0 0 0 50.7,248.5 Z\" fill=\"rgba(43,138,62,.15)\" stroke=\"#2b8a3e\" stroke-width=\"1.8\"/><text x=\"74.0\" y=\"249.0\" fill=\"#2b8a3e\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">α</text><circle cx=\"40.0\" cy=\"270.0\" r=\"3.5\" fill=\"#212529\"/><text x=\"28.0\" y=\"278.0\" fill=\"#212529\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">A</text><circle cx=\"250.0\" cy=\"270.0\" r=\"3.5\" fill=\"#212529\"/><text x=\"262.0\" y=\"278.0\" fill=\"#212529\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">B</text><circle cx=\"145.0\" cy=\"59.5\" r=\"3.5\" fill=\"#212529\"/><text x=\"145.0\" y=\"45.5\" fill=\"#212529\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">C</text><circle cx=\"145.0\" cy=\"270.0\" r=\"3.5\" fill=\"#212529\"/><text x=\"145.0\" y=\"286.0\" fill=\"#212529\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">F</text><circle cx=\"60.9\" cy=\"228.1\" r=\"3.5\" fill=\"#212529\"/><text x=\"46.9\" y=\"224.1\" fill=\"#212529\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">H</text><circle cx=\"229.1\" cy=\"228.1\" r=\"3.5\" fill=\"#212529\"/><text x=\"243.1\" y=\"224.1\" fill=\"#212529\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">G</text><text x=\"195.0\" y=\"292.0\" fill=\"#868e96\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">5,0 cm</text><text x=\"58.5\" y=\"164.8\" fill=\"#868e96\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">5,6 cm</text><text x=\"231.5\" y=\"164.8\" fill=\"#868e96\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">5,6 cm</text><text x=\"294\" y=\"320\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">nicht maßstäblich – eigene Nachzeichnung</text></svg>",
  "figur_hinweis": null,
  "loesung_figur": null,
  "loesung": "c) Im rechtwinkligen Dreieck $AFH$ (rechter Winkel bei $H$) gilt $\\angle HFA = 90^\\circ - \\alpha$. Im rechtwinkligen Dreieck $AFC$ (rechter Winkel bei $F$) gilt $\\angle ACF = 90^\\circ - \\alpha$. Also sind beide Winkel gleich groß. <br><i>Mit Ähnlichkeit:</i> $\\triangle AFH \\sim \\triangle ACF$ nach dem Hauptähnlichkeitssatz (je ein rechter Winkel und der gemeinsame Winkel $\\alpha$), deshalb stimmen auch die dritten Winkel überein. <br><small>Zur Vollständigkeit: a) $\\cos\\alpha = 2{,}5 : 5{,}6$, $\\alpha \\approx 63{,}5^\\circ$; $\\overline{AH} = 2{,}5 \\cdot \\cos\\alpha \\approx 1{,}12\\,\\text{cm}$. b) $A_{HFGC} \\approx 10{,}0\\,\\text{cm}^2$.</small>",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "LSA-2022-PA1c",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Realschulabschluss (Klasse 10), schriftliche Abschlussprüfung",
  "jahr": 2022,
  "teil": "Pflichtteil 2",
  "aufgabe": "Pflichtaufgabe 1 c",
  "be": "Teil von PA 1",
  "relevanz": "kern",
  "themen_original": [
   "Dreiecke auf Ähnlichkeit untersuchen",
   "Gegenbeispiel"
  ],
  "thema": "dreiecke",
  "stufe": 2,
  "titel": "Sind die Dreiecke DEF und ABC ähnlich?",
  "fokus": "Teilaufgabe c (2)",
  "text": "c) Gegeben ist das Dreieck ABC mit\n♦ AB = 6,4 cm\n♦ BC = 4,0 cm\n♦ ∢CBA = 58°\n(1) Konstruieren Sie das Dreieck ABC.\n(2) Das Dreieck DEF hat folgende Eigenschaften:\n♦ EF = 2,0 cm\n♦ DE = 3,2 cm\n♦ ∢FED = 29°\nEntscheiden Sie, ob das Dreieck DEF ähnlich zum Dreieck ABC ist. Begründen Sie Ihre Entscheidung.",
  "tabelle": null,
  "quelle_url": "https://www.bildung-lsa.de/files/216b1e276e2a4350a9302f936e647dde/rsa22_mat_aufgaben_teil2.pdf",
  "quelle_url_alt": null,
  "seite": 2,
  "auswertung_url": "https://www.bildung-lsa.de/files/216b1e276e2a4350a9302f936e647dde/rsa22_mat_auswertung.pdf",
  "loesung_url": null,
  "quote_original": "1c insgesamt 66 % (AFB I/II), laut Auswertung 2022",
  "quote": "66 % gelöst",
  "quote_wert": 66,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "Vergleiche $DE : AB$ und $EF : BC$. Was fällt auf?",
   "Welcher Winkel liegt zwischen $DE$ und $EF$ bzw. zwischen $AB$ und $BC$?",
   "Was passiert mit Winkeln bei einer zentrischen Streckung?"
  ],
  "checks": [
   {
    "type": "mc",
    "choices": [
     "Nein – der eingeschlossene Winkel ist $29^\\circ$ statt $58^\\circ$.",
     "Ja – beide Seiten sind halb so lang ($k = \\tfrac12$).",
     "Ja – auch der Winkel wird halbiert, das passt zu $k = \\tfrac12$."
    ],
    "correct": 0,
    "why": "Beim Strecken bleiben Winkel gleich. Entsprechende Winkel müssten gleich groß sein.",
    "wrongWhy": {
     "1": "Die Seiten passen zu k = ½, aber die Winkel müssen auch stimmen.",
     "2": "Winkel werden beim Strecken NICHT verändert – das ist die typische Falle."
    }
   }
  ],
  "gruppe": "Zeichnet beide Dreiecke auf Folie und versucht, DEF durch Drehen und Strecken auf ABC zu legen.",
  "pruefungstipp": "66 % gelöst. Die Falle: „Halbe Seiten, halber Winkel“ klingt logisch, ist aber falsch.",
  "hinweis_eigen": null,
  "figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 258\" width=\"420\" role=\"img\" aria-label=\"Dreiecke ABC und DEF\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><polygon points=\"30.0,200.0 222.0,200.0 158.4,98.2\" fill=\"rgba(28,126,214,.10)\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linejoin=\"round\" /><path d=\"M222.0,200.0 L196.0,200.0 A26,26 0 0 1 208.2,178.0 Z\" fill=\"rgba(43,138,62,.15)\" stroke=\"#2b8a3e\" stroke-width=\"1.8\"/><text x=\"183.5\" y=\"178.7\" fill=\"#2b8a3e\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">58°</text><text x=\"126.0\" y=\"218.0\" fill=\"#868e96\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">6,4 cm</text><text x=\"216.2\" y=\"149.1\" fill=\"#868e96\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">4,0 cm</text><circle cx=\"30.0\" cy=\"200.0\" r=\"3.5\" fill=\"#212529\"/><text x=\"18.0\" y=\"208.0\" fill=\"#212529\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">A</text><circle cx=\"222.0\" cy=\"200.0\" r=\"3.5\" fill=\"#212529\"/><text x=\"234.0\" y=\"208.0\" fill=\"#212529\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">B</text><circle cx=\"158.4\" cy=\"98.2\" r=\"3.5\" fill=\"#212529\"/><text x=\"158.4\" y=\"84.2\" fill=\"#212529\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">C</text><polygon points=\"290.0,200.0 386.0,200.0 333.5,170.9\" fill=\"rgba(232,89,12,.12)\" stroke=\"#e8590c\" stroke-width=\"2.5\" stroke-linejoin=\"round\" /><path d=\"M386.0,200.0 L356.0,200.0 A30,30 0 0 1 359.8,185.5 Z\" fill=\"rgba(43,138,62,.15)\" stroke=\"#2b8a3e\" stroke-width=\"1.8\"/><text x=\"341.5\" y=\"188.5\" fill=\"#2b8a3e\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">29°</text><text x=\"338.0\" y=\"218.0\" fill=\"#868e96\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">3,2 cm</text><text x=\"381.8\" y=\"179.5\" fill=\"#868e96\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">2,0 cm</text><circle cx=\"290.0\" cy=\"200.0\" r=\"3.5\" fill=\"#212529\"/><text x=\"278.0\" y=\"208.0\" fill=\"#212529\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">D</text><circle cx=\"386.0\" cy=\"200.0\" r=\"3.5\" fill=\"#212529\"/><text x=\"398.0\" y=\"208.0\" fill=\"#212529\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">E</text><circle cx=\"333.5\" cy=\"170.9\" r=\"3.5\" fill=\"#212529\"/><text x=\"329.5\" y=\"156.9\" fill=\"#212529\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">F</text><text x=\"414\" y=\"250\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">eigene Skizze (maßstäblich zueinander); DEF im Original ohne Abbildung</text></svg>",
  "figur_hinweis": null,
  "loesung_figur": null,
  "loesung": "<b>Nicht ähnlich.</b> Zwar gilt $DE : AB = 3{,}2 : 6{,}4 = \\tfrac12$ und $EF : BC = 2{,}0 : 4{,}0 = \\tfrac12$, aber der eingeschlossene Winkel ist $\\angle FED = 29^\\circ$ und nicht $58^\\circ$. Bei ähnlichen Dreiecken sind entsprechende Winkel gleich groß (die zentrische Streckung ist winkeltreu). <br><small>Kontrolle (Kosinussatz): $\\overline{AC} \\approx 5{,}46\\,\\text{cm}$, $\\overline{DF} \\approx 1{,}74\\,\\text{cm}$, und $1{,}74 : 5{,}46 \\approx 0{,}32 \\ne \\tfrac12$.</small>",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "LSA-2023-PA3",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Realschulabschluss (Klasse 10), schriftliche Abschlussprüfung",
  "jahr": 2023,
  "teil": "Pflichtteil 2",
  "aufgabe": "Pflichtaufgabe 3 (Kern: c)",
  "be": 6,
  "relevanz": "kern",
  "themen_original": [
   "Dreiecke auf Ähnlichkeit untersuchen",
   "Winkelvergleich",
   "Sinussatz"
  ],
  "thema": "dreiecke",
  "stufe": 3,
  "titel": "Trapez RSTU: Diagonale und Ähnlichkeit",
  "fokus": "b und c (a: Konstruktion)",
  "text": "Pflichtaufgabe 3 (erreichbare BE: 6)\nGegeben ist das Trapez ABCD mit AB ∥ CD und\n♦ AB = 7,4 cm\n♦ AD = 4,2 cm\n♦ CD = 3,4 cm\n♦ ∢BAD = α = 55°\na) Konstruieren Sie das Trapez ABCD.\nDie Abbildung zeigt das Trapez RSTU mit der Diagonale US. Die Seite RS ist 9,0 cm lang.\nb) Berechnen Sie die Länge der Diagonale US.\nc) Entscheiden Sie, ob das Dreieck RSU und das Dreieck STU ähnlich zueinander sind. Begründen Sie Ihre Entscheidung.",
  "tabelle": null,
  "quelle_url": "https://www.bildung-lsa.de/files/216b1e276e2a4350a9302f936e647dde/rsa23_mat_aufgaben_teil2.pdf",
  "quelle_url_alt": null,
  "seite": 3,
  "auswertung_url": "https://www.bildung-lsa.de/files/216b1e276e2a4350a9302f936e647dde/rsa23_mat_auswertung.pdf",
  "loesung_url": null,
  "quote_original": "3a 71 %, 3b 38 %, 3c 58 % (AFB III), laut Auswertung 2023",
  "quote": "3b: 38 %, 3c: 58 % gelöst",
  "quote_wert": 38,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "b) Winkel im Dreieck $RSU$: $\\angle RSU = 90^\\circ - 39^\\circ$ (weil $\\angle RST = 90^\\circ$).",
   "b) Dritter Winkel: $\\angle RUS = 180^\\circ - 45^\\circ - 51^\\circ = 84^\\circ$. Dann Sinussatz.",
   "c) Bestimme alle drei Winkel beider Dreiecke. $\\angle SUT$ ist Wechselwinkel zu $\\angle RSU$ (weil $UT \\parallel RS$).",
   "c) Stimmen zwei Winkel überein? Wenn nicht: nicht ähnlich."
  ],
  "checks": [
   {
    "type": "num",
    "fields": [
     {
      "label": "b) $\\overline{US} \\approx$",
      "ans": 6.4,
      "unit": "cm",
      "tol": 0.051
     }
    ]
   },
   {
    "type": "mc",
    "q": "c) Sind die Dreiecke RSU und STU ähnlich?",
    "choices": [
     "Nein – nur ein Winkelpaar ($51^\\circ$) stimmt überein.",
     "Ja – beide haben einen Winkel von $51^\\circ$.",
     "Ja – beide liegen im selben Trapez und haben die Seite $US$ gemeinsam."
    ],
    "correct": 0,
    "why": "Winkel: $STU$: $90^\\circ, 39^\\circ, 51^\\circ$ – $RSU$: $45^\\circ, 51^\\circ, 84^\\circ$.",
    "wrongWhy": {
     "1": "Ein gleicher Winkel reicht nicht – ww braucht zwei.",
     "2": "Eine gemeinsame Seite sagt nichts über Ähnlichkeit."
    }
   }
  ],
  "gruppe": "Jede Person berechnet die Winkel eines Dreiecks; dann vergleicht ihr gemeinsam.",
  "pruefungstipp": "3b: nur 38 % gelöst. Tipp: Erst ALLE Winkel in die Skizze schreiben, dann rechnen.",
  "hinweis_eigen": null,
  "figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 278\" width=\"360\" role=\"img\" aria-label=\"Trapez RSTU mit Diagonale US\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><polygon points=\"30.0,220.0 336.0,220.0 336.0,50.9 199.1,50.9\" fill=\"rgba(28,126,214,.08)\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linejoin=\"round\" /><line x1=\"199.1\" y1=\"50.9\" x2=\"336.0\" y2=\"220.0\" stroke=\"#e8590c\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M30.0,220.0 L60.0,220.0 A30,30 0 0 0 51.2,198.8 Z\" fill=\"rgba(43,138,62,.15)\" stroke=\"#2b8a3e\" stroke-width=\"1.8\"/><text x=\"72.5\" y=\"202.4\" fill=\"#2b8a3e\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">45°</text><path d=\"M336.0,220.0 L310.8,188.9 A40,40 0 0 1 336.0,180.0 Z\" fill=\"rgba(43,138,62,.15)\" stroke=\"#c2255c\" stroke-width=\"1.8\"/><text x=\"317.3\" y=\"167.2\" fill=\"#c2255c\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">39°</text><path d=\"M323.0,50.9 L323.0,63.9 L336.0,63.9\" fill=\"none\" stroke=\"#212529\" stroke-width=\"1.8\"/><circle cx=\"329.5\" cy=\"57.4\" r=\"1.8\" fill=\"#212529\"/><circle cx=\"30.0\" cy=\"220.0\" r=\"3.5\" fill=\"#212529\"/><text x=\"18.0\" y=\"228.0\" fill=\"#212529\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">R</text><circle cx=\"336.0\" cy=\"220.0\" r=\"3.5\" fill=\"#212529\"/><text x=\"348.0\" y=\"228.0\" fill=\"#212529\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">S</text><circle cx=\"336.0\" cy=\"50.9\" r=\"3.5\" fill=\"#212529\"/><text x=\"348.0\" y=\"42.9\" fill=\"#212529\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">T</text><circle cx=\"199.1\" cy=\"50.9\" r=\"3.5\" fill=\"#212529\"/><text x=\"191.1\" y=\"36.9\" fill=\"#212529\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">U</text><text x=\"183.0\" y=\"240.0\" fill=\"#868e96\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">9,0 cm</text><text x=\"354\" y=\"270\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">nicht maßstäblich – eigene Nachzeichnung</text></svg>",
  "figur_hinweis": null,
  "loesung_figur": null,
  "loesung": "b) $\\angle RSU = 90^\\circ - 39^\\circ = 51^\\circ$, $\\angle RUS = 180^\\circ - 45^\\circ - 51^\\circ = 84^\\circ$. Sinussatz: $\\overline{US} = \\dfrac{9{,}0 \\cdot \\sin 45^\\circ}{\\sin 84^\\circ} \\approx 6{,}4\\,\\text{cm}$. <br>c) <b>Nicht ähnlich.</b> Dreieck $STU$: $90^\\circ$, $39^\\circ$, $51^\\circ$ ($\\angle SUT = 51^\\circ$ als Wechselwinkel). Dreieck $RSU$: $45^\\circ$, $51^\\circ$, $84^\\circ$. Nur ein Winkel ($51^\\circ$) stimmt überein – nach dem Hauptähnlichkeitssatz bräuchte man zwei.",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "LSA-2018-PA2",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Realschulabschluss (Klasse 10), schriftliche Abschlussprüfung",
  "jahr": 2018,
  "teil": "Pflichtteil 2",
  "aufgabe": "Pflichtaufgabe 2 (relevant: c)",
  "be": 8,
  "relevanz": "kern",
  "themen_original": [
   "Mittendreieck",
   "zentrische Streckung k = 1/2",
   "Flächenverhältnis k²"
  ],
  "thema": "streckung",
  "stufe": 2,
  "titel": "Seitenmitten und Flächenverhältnis",
  "fokus": "Teilaufgabe c",
  "text": "Gegeben ist ein Dreieck ABC mit AB = 8 cm, BC = 7 cm und ∢CBA = β = 100°.\na) Konstruieren Sie das Dreieck ABC.\nb) Berechnen Sie die Länge der Seite AC sowie den Flächeninhalt des Dreiecks ABC.\nc) Die Mittelpunkte der Seiten des Dreiecks ABC werden wie folgt bezeichnet.\n[Tabelle] Seite AB – Mittelpunkt M1; Seite BC – Mittelpunkt M2; Seite AC – Mittelpunkt M3\nErmitteln Sie das Verhältnis der Flächeninhalte der beiden Dreiecke ABC und M1BM2 zueinander.",
  "tabelle": null,
  "quelle_url": "https://lisa.sachsen-anhalt.de/fileadmin/Bibliothek/Politik_und_Verwaltung/MK/LISA/Unterricht/ZLE/RSA_10/Mathematik/rsa18_mat_ET_Teil2.pdf",
  "quelle_url_alt": null,
  "seite": null,
  "auswertung_url": null,
  "loesung_url": null,
  "quote_original": null,
  "quote": null,
  "quote_wert": null,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "Zeichne eine Skizze mit $M_1$, $M_2$. Wie lang sind $\\overline{BM_1}$ und $\\overline{BM_2}$ im Vergleich zu $\\overline{BA}$ und $\\overline{BC}$?",
   "$M_1BM_2$ entsteht aus $ABC$ durch zentrische Streckung mit Zentrum $B$ und $k = \\tfrac12$.",
   "Flächen ändern sich mit $k^2$."
  ],
  "checks": [
   {
    "type": "num",
    "fields": [
     {
      "label": "$A_{ABC} : A_{M_1BM_2} =$",
      "ans": [
       4,
       1
      ],
      "ratio": true
     }
    ]
   }
  ],
  "gruppe": "Schneidet ein Dreieck aus Papier aus, faltet die Ecken an den Mittellinien um: Wie oft passt das kleine Dreieck hinein?",
  "pruefungstipp": "Die Reihenfolge im Verhältnis beachten: erst ABC, dann M₁BM₂ → 4 : 1 (nicht 1 : 4).",
  "hinweis_eigen": null,
  "figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 308\" width=\"420\" role=\"img\" aria-label=\"Dreieck ABC mit Seitenmitten\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><polygon points=\"390.0,240.0 150.0,240.0 113.5,33.2\" fill=\"rgba(28,126,214,.08)\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linejoin=\"round\" /><polygon points=\"270.0,240.0 150.0,240.0 131.8,136.6\" fill=\"rgba(232,89,12,.22)\" stroke=\"#e8590c\" stroke-width=\"2.5\" stroke-linejoin=\"round\" /><line x1=\"270.0\" y1=\"240.0\" x2=\"131.8\" y2=\"136.6\" stroke=\"#e8590c\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"131.8\" y1=\"136.6\" x2=\"251.8\" y2=\"136.6\" stroke=\"#868e96\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-dasharray=\"5 4\"/><line x1=\"251.8\" y1=\"136.6\" x2=\"270.0\" y2=\"240.0\" stroke=\"#868e96\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-dasharray=\"5 4\"/><path d=\"M150.0,240.0 L172.0,240.0 A22,22 0 0 0 146.2,218.3 Z\" fill=\"rgba(43,138,62,.15)\" stroke=\"#2b8a3e\" stroke-width=\"1.8\"/><text x=\"175.7\" y=\"209.4\" fill=\"#2b8a3e\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">100°</text><circle cx=\"390.0\" cy=\"240.0\" r=\"3.5\" fill=\"#212529\"/><text x=\"402.0\" y=\"250.0\" fill=\"#212529\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">A</text><circle cx=\"150.0\" cy=\"240.0\" r=\"3.5\" fill=\"#212529\"/><text x=\"148.0\" y=\"256.0\" fill=\"#212529\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">B</text><circle cx=\"113.5\" cy=\"33.2\" r=\"3.5\" fill=\"#212529\"/><text x=\"103.5\" y=\"21.2\" fill=\"#212529\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">C</text><circle cx=\"270.0\" cy=\"240.0\" r=\"3.5\" fill=\"#212529\"/><text x=\"270.0\" y=\"258.0\" fill=\"#212529\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">M₁</text><circle cx=\"131.8\" cy=\"136.6\" r=\"3.5\" fill=\"#212529\"/><text x=\"111.8\" y=\"136.6\" fill=\"#212529\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">M₂</text><circle cx=\"251.8\" cy=\"136.6\" r=\"3.5\" fill=\"#212529\"/><text x=\"261.8\" y=\"122.6\" fill=\"#212529\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">M₃</text><text x=\"270.0\" y=\"274.0\" fill=\"#868e96\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">8 cm</text><text x=\"101.8\" y=\"162.6\" fill=\"#868e96\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">7 cm</text><text x=\"414\" y=\"300\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">eigene Skizze – im Original keine Abbildung</text></svg>",
  "figur_hinweis": null,
  "loesung_figur": null,
  "loesung": "Dreieck $M_1BM_2$ ist das Bild von $ABC$ bei der zentrischen Streckung mit Zentrum $B$ und $k = \\tfrac12$ ($\\overline{BM_1} = 4\\,\\text{cm}$, $\\overline{BM_2} = 3{,}5\\,\\text{cm}$, gleicher Winkel $\\beta$). Also $A_{M_1BM_2} = k^2 \\cdot A_{ABC} = \\tfrac14 \\cdot A_{ABC}$. <br>Verhältnis: $A_{ABC} : A_{M_1BM_2} = 4 : 1$. <br><small>Mit Zahlen: $A_{ABC} = \\tfrac12 \\cdot 8 \\cdot 7 \\cdot \\sin 100^\\circ \\approx 27{,}6\\,\\text{cm}^2$, $A_{M_1BM_2} \\approx 6{,}9\\,\\text{cm}^2$. b) $\\overline{AC} \\approx 11{,}5\\,\\text{cm}$.</small>",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "LSA-2016-PA1d",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Realschulabschluss (Klasse 10), schriftliche Abschlussprüfung",
  "jahr": 2016,
  "teil": "Pflichtteil 2",
  "aufgabe": "Pflichtaufgabe 1 d",
  "be": "Teil von 10 BE (PA 1 gesamt)",
  "relevanz": "rand",
  "themen_original": [
   "ähnliche Körper (Kegel)",
   "Kegelstumpf",
   "Volumen"
  ],
  "thema": "streckung",
  "stufe": 3,
  "titel": "Kegelstumpf – Volumen (mit k³ prüfen)",
  "fokus": "Teilaufgabe d",
  "text": "d) Von einem Kreiskegel mit einem Grundkreisradius von 4 cm und einer Höhe von 8 cm wird eine kegelförmige Spitze mit einer Höhe von 6 cm und einem Radius von 3 cm abgeschnitten. Dabei entsteht ein Restkörper. Dieser ist in der Abbildung 1 grau dargestellt.\nBerechnen Sie das Volumen des Restkörpers.",
  "tabelle": null,
  "quelle_url": "https://lisa.sachsen-anhalt.de/fileadmin/Bibliothek/Politik_und_Verwaltung/MK/LISA/Unterricht/ZLE/RSA_10/Mathematik/rsa16_ma_ET_Teil2.pdf",
  "quelle_url_alt": null,
  "seite": 2,
  "auswertung_url": null,
  "loesung_url": null,
  "quote_original": null,
  "quote": null,
  "quote_wert": null,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "Restkörper = großer Kegel − Spitze.",
   "$V = \\tfrac13 \\pi r^2 h$: $\\tfrac13\\pi \\cdot 4^2 \\cdot 8$ und $\\tfrac13\\pi \\cdot 3^2 \\cdot 6$.",
   "Ähnlichkeit (KANN): Die Spitze ist mit $k = \\tfrac34$ zum großen Kegel ähnlich, also $V_\\text{Spitze} = k^3 \\cdot V_\\text{Kegel}$."
  ],
  "checks": [
   {
    "type": "num",
    "fields": [
     {
      "label": "$V_\\text{Rest} \\approx$",
      "ans": 77.5,
      "unit": "cm³",
      "tol": 0.06
     }
    ]
   }
  ],
  "gruppe": null,
  "pruefungstipp": "Mit π bis zum Schluss rechnen (74π/3) und erst am Ende runden.",
  "hinweis_eigen": null,
  "figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 318\" width=\"360\" role=\"img\" aria-label=\"Kegel mit abgeschnittener Spitze\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><path d=\"M66,250 L92,198 A78,12.0 0 0 0 248,198 L274,250 A104,16 0 0 1 66,250 Z\" fill=\"#ced4da\"/><ellipse cx=\"170\" cy=\"198\" rx=\"78\" ry=\"12.0\" fill=\"#dee2e6\" stroke=\"#212529\" stroke-width=\"1.6\"/><line x1=\"66.0\" y1=\"250.0\" x2=\"170.0\" y2=\"42.0\" stroke=\"#212529\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"274.0\" y1=\"250.0\" x2=\"170.0\" y2=\"42.0\" stroke=\"#212529\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M66.0,250.0 A104.0,16.0 0 0 1 274.0,250.0\" fill=\"none\" stroke=\"#212529\" stroke-width=\"1.4\" stroke-dasharray=\"5 4\"/><path d=\"M66.0,250.0 A104.0,16.0 0 0 0 274.0,250.0\" fill=\"none\" stroke=\"#212529\" stroke-width=\"2\"/><line x1=\"170.0\" y1=\"250.0\" x2=\"170.0\" y2=\"42.0\" stroke=\"#868e96\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-dasharray=\"5 4\"/><line x1=\"170.0\" y1=\"250.0\" x2=\"274.0\" y2=\"250.0\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"170.0\" y1=\"198.0\" x2=\"248.0\" y2=\"198.0\" stroke=\"#e8590c\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><text x=\"222.0\" y=\"264.0\" fill=\"#1c7ed6\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">4 cm</text><text x=\"209.0\" y=\"186.0\" fill=\"#e8590c\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">3 cm</text><line x1=\"312.0\" y1=\"250.0\" x2=\"312.0\" y2=\"42.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"307.0\" y1=\"250.0\" x2=\"317.0\" y2=\"250.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"307.0\" y1=\"42.0\" x2=\"317.0\" y2=\"42.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><text x=\"323.0\" y=\"146.0\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">8 cm</text><line x1=\"42.0\" y1=\"198.0\" x2=\"42.0\" y2=\"42.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"37.0\" y1=\"198.0\" x2=\"47.0\" y2=\"198.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"37.0\" y1=\"42.0\" x2=\"47.0\" y2=\"42.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><text x=\"53.0\" y=\"120.0\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">6 cm</text><circle cx=\"170.0\" cy=\"42.0\" r=\"3.5\" fill=\"#212529\"/><circle cx=\"170.0\" cy=\"250.0\" r=\"2.5\" fill=\"#868e96\"/><text x=\"286.0\" y=\"228.0\" fill=\"#495057\" font-size=\"12\" font-weight=\"700\" text-anchor=\"start\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">Restkörper</text><text x=\"354\" y=\"310\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">nicht maßstäblich – eigene Nachzeichnung</text></svg>",
  "figur_hinweis": null,
  "loesung_figur": null,
  "loesung": "$V_\\text{Kegel} = \\tfrac13 \\pi \\cdot 4^2 \\cdot 8 = \\tfrac{128\\pi}{3} \\approx 134{,}0\\,\\text{cm}^3$, $V_\\text{Spitze} = \\tfrac13\\pi \\cdot 3^2 \\cdot 6 = 18\\pi \\approx 56{,}5\\,\\text{cm}^3$. <br>$V_\\text{Rest} = \\tfrac{128\\pi}{3} - 18\\pi = \\tfrac{74\\pi}{3} \\approx 77{,}5\\,\\text{cm}^3$. <br><i>Kontrolle mit Ähnlichkeit:</i> $k = \\tfrac68 = \\tfrac34$, $k^3 = \\tfrac{27}{64}$, $\\tfrac{27}{64} \\cdot \\tfrac{128\\pi}{3} = 18\\pi$ ✓",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "LSA-2021-WPA2",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Realschulabschluss (Klasse 10), schriftliche Abschlussprüfung",
  "jahr": 2021,
  "teil": "Wahlpflichtteil",
  "aufgabe": "Wahlpflichtaufgabe 2 (Kern: b)",
  "be": 8,
  "relevanz": "kern",
  "themen_original": [
   "Mittendreieck",
   "Flächenverhältnis ähnlicher Dreiecke"
  ],
  "thema": "streckung",
  "stufe": 3,
  "titel": "Dreieck mit Halbkreisen – Flächenverhältnis",
  "fokus": "Kern: b (a, c, d zur Übung)",
  "text": "Die Abbildung zeigt eine geometrische Figur mit folgenden Eigenschaften:\n♦ Die Punkte M1, M2 und M3 sind die jeweiligen Mittelpunkte der Dreiecksseiten AB, BC und AC.\n♦ Die Halbkreise über jeder Dreiecksseite haben jeweils den Radius r = 4,0 cm.\na) Berechnen Sie den Inhalt der schraffierten Fläche.\nb) Geben Sie das Verhältnis der Flächeninhalte des Vierecks ABM2M3 und des Dreiecks M2CM3 an. Begründen Sie Ihre Angabe.\nc) Begründen Sie, dass AB ⊥ M1C gilt.\nd) Zeigen Sie, dass die Länge der Strecke M1C mit dem Term r·√3 berechnet werden kann.",
  "tabelle": null,
  "quelle_url": "https://www.bildung-lsa.de/files/216b1e276e2a4350a9302f936e647dde/rsa21_mat_aufgaben_teil2.pdf",
  "quelle_url_alt": "https://lisa.sachsen-anhalt.de/fileadmin/Bibliothek/Politik_und_Verwaltung/MK/LISA/Unterricht/ZLE/RSA_10/Mathematik/2021_RSA_Mat_Aufgaben_Teil2.pdf",
  "seite": 5,
  "auswertung_url": "https://www.bildung-lsa.de/files/216b1e276e2a4350a9302f936e647dde/rsa21_mat_auswertung.pdf",
  "loesung_url": null,
  "quote_original": "a 76 %, b 45 % (AFB III), c 41 %, d 40 %, laut Auswertung 2021",
  "quote": "Teil b: 45 % gelöst",
  "quote_wert": 45,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "a) Drei Halbkreise mit $r = 4\\,\\text{cm}$: $3 \\cdot \\tfrac12 \\pi r^2$.",
   "b) $M_2$ und $M_3$ sind Seitenmitten. Welche Streckung bildet $\\triangle BCA$ auf $\\triangle M_2CM_3$ ab? (Zentrum $C$)",
   "b) Das kleine Dreieck hat $k^2 = \\tfrac14$ der Fläche. Wie viel bleibt für das Viereck?",
   "d) Pythagoras im Dreieck $AM_1C$: $\\overline{AC} = 2r$, $\\overline{AM_1} = r$."
  ],
  "checks": [
   {
    "type": "num",
    "fields": [
     {
      "label": "a) schraffierte Fläche:",
      "ans": 75.4,
      "unit": "cm²",
      "tol": 0.06
     },
     {
      "label": "b) $A_{ABM_2M_3} : A_{M_2CM_3} =$",
      "ans": [
       3,
       1
      ],
      "ratio": true,
      "wrong": [
       {
        "v": 4,
        "msg": "4 : 1 wäre ganzes Dreieck : kleines Dreieck. Gefragt ist das Viereck!"
       }
      ]
     }
    ]
   }
  ],
  "gruppe": "Zeichnet das Dreieck groß auf, schneidet es an M₂M₃ durch und legt das kleine Dreieck viermal in das große.",
  "pruefungstipp": "b: nur 45 % gelöst. „Begründen“ = Streckung mit Zentrum und k nennen + k² für Flächen.",
  "hinweis_eigen": null,
  "figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 510 348\" width=\"510\" role=\"img\" aria-label=\"Gleichseitiges Dreieck mit Halbkreisen\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><defs><pattern id=\"hatch21\" width=\"8\" height=\"8\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(45)\"><line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"8\" stroke=\"#868e96\" stroke-width=\"1.6\"/></pattern></defs><path d=\"M160.0,150.0 A88,88 0 0 1 336.0,150.0 Z\" fill=\"url(#hatch21)\" stroke=\"#212529\" stroke-width=\"2\"/><path d=\"M336.0,150.0 A88,88 0 0 1 248.0,302.4 Z\" fill=\"url(#hatch21)\" stroke=\"#212529\" stroke-width=\"2\"/><path d=\"M248.0,302.4 A88,88 0 0 1 160.0,150.0 Z\" fill=\"url(#hatch21)\" stroke=\"#212529\" stroke-width=\"2\"/><polygon points=\"160.0,150.0 248.0,302.4 336.0,150.0\" fill=\"#fff\" stroke=\"#212529\" stroke-width=\"2.5\" stroke-linejoin=\"round\" /><line x1=\"292.0\" y1=\"226.2\" x2=\"248.0\" y2=\"150.0\" stroke=\"#e8590c\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"204.0\" y1=\"226.2\" x2=\"336.0\" y2=\"150.0\" stroke=\"#c2255c\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-dasharray=\"6 4\"/><circle cx=\"160.0\" cy=\"150.0\" r=\"3.5\" fill=\"#212529\"/><text x=\"146.0\" y=\"146.0\" fill=\"#212529\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">A</text><circle cx=\"336.0\" cy=\"150.0\" r=\"3.5\" fill=\"#212529\"/><text x=\"350.0\" y=\"146.0\" fill=\"#212529\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">C</text><circle cx=\"248.0\" cy=\"302.4\" r=\"3.5\" fill=\"#212529\"/><text x=\"248.0\" y=\"318.4\" fill=\"#212529\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">B</text><circle cx=\"248.0\" cy=\"150.0\" r=\"3.5\" fill=\"#212529\"/><text x=\"248.0\" y=\"164.0\" fill=\"#212529\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">M₃</text><circle cx=\"204.0\" cy=\"226.2\" r=\"3.5\" fill=\"#212529\"/><text x=\"182.0\" y=\"228.2\" fill=\"#212529\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">M₁</text><circle cx=\"292.0\" cy=\"226.2\" r=\"3.5\" fill=\"#212529\"/><text x=\"314.0\" y=\"228.2\" fill=\"#212529\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">M₂</text><text x=\"504\" y=\"340\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">eigene Nachzeichnung, r = 4,0 cm</text></svg>",
  "figur_hinweis": null,
  "loesung_figur": null,
  "loesung": "a) $3 \\cdot \\tfrac12 \\cdot \\pi \\cdot 4^2 = 24\\pi \\approx 75{,}4\\,\\text{cm}^2$. <br>b) $M_2M_3$ verbindet zwei Seitenmitten. Dreieck $M_2CM_3$ ist das Bild von $BCA$ bei der zentrischen Streckung mit Zentrum $C$ und $k = \\tfrac12$. Es hat also $k^2 = \\tfrac14$ der Fläche von $ABC$, für das Viereck $ABM_2M_3$ bleiben $\\tfrac34$. <b>Verhältnis $3 : 1$.</b> <br>c) Im gleichseitigen Dreieck ist die Seitenhalbierende $CM_1$ zugleich Höhe, also $AB \\perp M_1C$. <br>d) $\\overline{M_1C} = \\sqrt{(2r)^2 - r^2} = \\sqrt{3r^2} = r\\sqrt3$ ($\\approx 6{,}93\\,\\text{cm}$).",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "SH-2015-H1-A21",
  "land": "SH",
  "bundesland": "Schleswig-Holstein",
  "pruefung": "Mittlerer Schulabschluss (MSA) Mathematik, Heft 1",
  "jahr": 2015,
  "teil": "Teil A (Kurzaufgaben)",
  "aufgabe": "A21",
  "be": 2,
  "relevanz": "kern",
  "themen_original": [
   "Strahlensatz (1. und 2.)",
   "Verhältnisgleichung"
  ],
  "thema": "strahlensatz",
  "stufe": 1,
  "titel": "Strahlensatz-Gleichung ergänzen",
  "fokus": "A21",
  "text": "A21 Ergänze die Gleichung so, dass eine richtige Aussage zum vorgegebenen Strahlensatz entsteht.\n[Gleichung im Heft:] A1B1 / ☐ = ZB1 / ZB2 = ☐ / ZA2",
  "tabelle": null,
  "quelle_url": "https://transparenz.schleswig-holstein.de/dataset/a5085303-444a-4408-a316-50af7a23bbea/resource/e21853d7-67a1-499d-9edf-97d2f5002ce1/download/2015_msa_mathematik_2015_schlerheft1_geschwrzt.pdf",
  "quelle_url_alt": null,
  "seite": 8,
  "auswertung_url": null,
  "loesung_url": "https://transparenz.schleswig-holstein.de/dataset/a5085303-444a-4408-a316-50af7a23bbea/resource/f28f5a96-dae1-4861-9866-878d8ab146d2/download/2015_msa_mathematik_2015_korrekturanweisung_geschwrzt.pdf",
  "quote_original": null,
  "quote": null,
  "quote_wert": null,
  "lizenz": "Quelle: MBWK Schleswig-Holstein über das Transparenzportal. Lizenz: CC BY-ND 4.0 (https://creativecommons.org/licenses/by-nd/4.0/deed.de). Aufgabentext unverändert übernommen, Abbildung nicht nachgezeichnet.",
  "tipps": [
   "Alle Brüche: kleine Figur oben, große Figur unten.",
   "Ähnliche Dreiecke $ZA_1B_1 \\sim ZA_2B_2$: entsprechende Seiten ins Verhältnis setzen."
  ],
  "checks": [
   {
    "type": "mc",
    "choices": [
     "$\\overline{A_2B_2}$ und $\\overline{ZA_1}$",
     "$\\overline{ZA_2}$ und $\\overline{ZA_1}$",
     "$\\overline{A_2B_2}$ und $\\overline{A_1A_2}$"
    ],
    "correct": 0,
    "why": "Immer „klein zu groß“ in derselben Reihenfolge: $\\tfrac{A_1B_1}{A_2B_2} = \\tfrac{ZB_1}{ZB_2} = \\tfrac{ZA_1}{ZA_2}$",
    "wrongWhy": {
     "1": "Im Nenner steht beim ersten Bruch die große Parallele.",
     "2": "A₁A₂ ist ein Abschnitt, keine Strecke ab Z – beim 2. Strahlensatz nur Strecken ab Z verwenden."
    }
   }
  ],
  "gruppe": null,
  "pruefungstipp": null,
  "hinweis_eigen": null,
  "figur": null,
  "figur_hinweis": "Die Abbildung ist urheberrechtlich geschützt (CC BY-ND 4.0) und wird hier bewusst NICHT nachgezeichnet. Bitte im Original-PDF ansehen (S. 8).",
  "abb_worte": "Strahlensatzfigur: Zentrum Z oben; Strahl 1 senkrecht nach unten durch A1 (Mitte) und A2 (unten); Strahl 2 schräg nach rechts unten durch B1 und B2. Die Parallelen A1B1 und A2B2 sind waagerecht (A1B1 etwa auf 60 % der Höhe, A2B2 an der Basis); rechtwinklige Anordnung (ZA2 ⊥ A2B2). Keine Maßangaben.",
  "loesung": null,
  "loesung_offiziell": "Offiziell: A1B1/A2B2 = ZB1/ZB2 = ZA1/ZA2. Die Kästchen enthalten also A2B2 und ZA1.",
  "loesung_typ": "offiziell (Korrekturanweisung MBWK SH)"
 },
 {
  "id": "SH-2019-H1-A11",
  "land": "SH",
  "bundesland": "Schleswig-Holstein",
  "pruefung": "Mittlerer Schulabschluss (MSA) Mathematik, Heft 1",
  "jahr": 2019,
  "teil": "Teil A (Kurzaufgaben)",
  "aufgabe": "A11",
  "be": 1,
  "relevanz": "kern",
  "themen_original": [
   "Strahlensatz (1.)"
  ],
  "thema": "strahlensatz",
  "stufe": 1,
  "titel": "g ∥ h – gib x an",
  "fokus": "A11",
  "text": "A11 g ist parallel zu h.\nGib x an.\nDie Zeichnung ist nicht maßstabsgetreu!\nx = ______ m",
  "tabelle": null,
  "quelle_url": "https://transparenz.schleswig-holstein.de/dataset/a5085303-444a-4408-a316-50af7a23bbea/resource/08c1b505-b781-4294-9b83-ba6273184022/download/2019_msa_mathematik_2019_schlerheft1_geschwrzt.pdf",
  "quelle_url_alt": null,
  "seite": 7,
  "auswertung_url": null,
  "loesung_url": "https://transparenz.schleswig-holstein.de/dataset/a5085303-444a-4408-a316-50af7a23bbea/resource/e0e829cd-e449-47a0-ad90-5145d60edfc0/download/2019_msa_mathematik_2019_korrekturanweisung_geschwrzt.pdf",
  "quote_original": null,
  "quote": null,
  "quote_wert": null,
  "lizenz": "Quelle: MBWK Schleswig-Holstein über das Transparenzportal. Lizenz: CC BY-ND 4.0 (https://creativecommons.org/licenses/by-nd/4.0/deed.de). Aufgabentext unverändert übernommen, Abbildung nicht nachgezeichnet.",
  "tipps": [
   "1. Strahlensatz mit Abschnitten auf beiden Strahlen: $\\dfrac{x}{4} = \\dfrac{3}{6}$."
  ],
  "checks": [
   {
    "type": "num",
    "fields": [
     {
      "label": "$x =$",
      "ans": 2,
      "unit": "m"
     }
    ]
   }
  ],
  "gruppe": null,
  "pruefungstipp": null,
  "hinweis_eigen": null,
  "figur": null,
  "figur_hinweis": "Die Abbildung ist urheberrechtlich geschützt (CC BY-ND 4.0) und wird hier bewusst NICHT nachgezeichnet. Bitte im Original-PDF ansehen (S. 7).",
  "abb_worte": "Zentrum links unten. Strahl 1 waagerecht nach rechts; Strahl 2 schräg nach rechts oben (ca. 35–40°). Zwei parallele Geraden g und h verlaufen von links oben nach rechts unten und schneiden beide Strahlen. Auf Strahl 1: Zentrum bis g = 6 m, g bis h = 4 m. Auf Strahl 2: Zentrum bis g = 3 m, g bis h = x.",
  "loesung": null,
  "loesung_offiziell": "Offiziell: x = 2 m (3/6 = x/4 ⇒ x = 2).",
  "loesung_typ": "offiziell (Korrekturanweisung MBWK SH)"
 },
 {
  "id": "LSA-2019-WPA1c",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Realschulabschluss (Klasse 10), schriftliche Abschlussprüfung",
  "jahr": 2019,
  "teil": "Wahlpflichtteil",
  "aufgabe": "Wahlpflichtaufgabe 1 c",
  "be": "Teil von 8 BE",
  "relevanz": "kern",
  "themen_original": [
   "Strahlensatz (ohne Namensnennung)",
   "Streckenverhältnis",
   "Anwendung Astronomie"
  ],
  "thema": "strahlensatz",
  "stufe": 3,
  "titel": "Verdeckt die Scheibe den Mond?",
  "fokus": "Teilaufgabe c (a, b: Kreis und Kugel)",
  "text": "Wahlpflichtaufgabe 1 (erreichbare BE: 8)\nDer Mond ist durchschnittlich 384400 km von der Erde entfernt und hat einen Durchmesser von ca. 3500 km.\na) Die Umlaufbahn des Mondes um die Erde wird vereinfacht als kreisförmig betrachtet. Berechnen Sie die Länge dieser Umlaufbahn.\nb) Ermitteln Sie annähernd den Oberflächeninhalt des Mondes und geben Sie den Oberflächeninhalt in der Schreibweise a · 10^7 an.\nc) Zeigen Sie rechnerisch, dass ein vom Auge eines Beobachters 50 cm entfernter kreisförmiger Gegenstand mit einem Durchmesser von 5 mm den Mond verdeckt.",
  "tabelle": null,
  "quelle_url": "https://lisa.sachsen-anhalt.de/fileadmin/Bibliothek/Politik_und_Verwaltung/MK/LISA/Unterricht/ZLE/RSA_10/Mathematik/rsa19_mat_ET_Teil2.pdf",
  "quelle_url_alt": null,
  "seite": null,
  "auswertung_url": "https://lisa.sachsen-anhalt.de/fileadmin/Bibliothek/Politik_und_Verwaltung/MK/LISA/Unterricht/ZLE/RSA_10/Mathematik/rsa2019_mat_landesergebnis.pdf",
  "loesung_url": null,
  "quote_original": "1c: 10 % (AFB III, „Streckenverhältnisse berechnen“), laut Landesergebnis 2019",
  "quote": "Teil c: nur 10 % gelöst",
  "quote_wert": 10,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "Skizze: Auge = Zentrum $Z$. Strahlen zum oberen und unteren Mondrand. Die Scheibe steht parallel zum Monddurchmesser.",
   "Ähnliche Dreiecke (V-Figur): $\\dfrac{d}{50\\,\\text{cm}} = \\dfrac{3500\\,\\text{km}}{384\\,400\\,\\text{km}}$",
   "Rechne in mm: $d = 500\\,\\text{mm} \\cdot \\dfrac{3500}{384\\,400}$. Ist $d$ kleiner als $5\\,\\text{mm}$?"
  ],
  "checks": [
   {
    "type": "num",
    "fields": [
     {
      "label": "Mond-„Bild“ in 50 cm Entfernung: $d \\approx$",
      "ans": 4.55,
      "unit": "mm",
      "tol": 0.02
     }
    ]
   }
  ],
  "gruppe": "Probiert es aus: Haltet eine Münze bzw. einen 5-mm-Kreis in 50 cm Entfernung und peilt einen entfernten Gegenstand an.",
  "pruefungstipp": "Nur 10 % gelöst! Der Schlüssel ist die Skizze mit dem Auge als Streckzentrum.",
  "hinweis_eigen": null,
  "figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 700 328\" width=\"700\" role=\"img\" aria-label=\"Auge, Scheibe und Mond\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><circle cx=\"610\" cy=\"150\" r=\"70\" fill=\"#dee2e6\" stroke=\"#868e96\" stroke-width=\"2\"/><line x1=\"40.0\" y1=\"150.0\" x2=\"610.0\" y2=\"80.0\" stroke=\"#fab005\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-dasharray=\"6 5\"/><line x1=\"40.0\" y1=\"150.0\" x2=\"610.0\" y2=\"220.0\" stroke=\"#fab005\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-dasharray=\"6 5\"/><line x1=\"150.0\" y1=\"136.5\" x2=\"150.0\" y2=\"163.5\" stroke=\"#e8590c\" stroke-width=\"5\" stroke-linecap=\"round\"/><ellipse cx=\"40\" cy=\"150\" rx=\"14\" ry=\"9\" fill=\"#fff\" stroke=\"#212529\" stroke-width=\"2\"/><circle cx=\"44\" cy=\"150\" r=\"4\" fill=\"#212529\"/><line x1=\"610.0\" y1=\"80.0\" x2=\"610.0\" y2=\"220.0\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-dasharray=\"4 3\"/><text x=\"610.0\" y=\"60.0\" fill=\"#1c7ed6\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">Mond: d ≈ 3500 km</text><text x=\"150.0\" y=\"108.0\" fill=\"#e8590c\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">Scheibe: 5 mm</text><line x1=\"40.0\" y1=\"246.0\" x2=\"150.0\" y2=\"246.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"40.0\" y1=\"241.0\" x2=\"40.0\" y2=\"251.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"150.0\" y1=\"241.0\" x2=\"150.0\" y2=\"251.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><text x=\"95.0\" y=\"257.0\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">50 cm</text><line x1=\"40.0\" y1=\"276.0\" x2=\"610.0\" y2=\"276.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"40.0\" y1=\"271.0\" x2=\"40.0\" y2=\"281.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"610.0\" y1=\"271.0\" x2=\"610.0\" y2=\"281.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><text x=\"325.0\" y=\"287.0\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">384 400 km</text><text x=\"40.0\" y=\"180.0\" fill=\"#c2255c\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">Auge (Z)</text><text x=\"694\" y=\"320\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">eigene Skizze – im Original keine Abbildung, stark nicht maßstäblich</text></svg>",
  "figur_hinweis": null,
  "loesung_figur": null,
  "loesung": "Das Auge ist das Zentrum, Scheibe und Monddurchmesser sind parallel (V-Figur, ähnliche Dreiecke). Der Mond würde in $50\\,\\text{cm}$ Entfernung als Scheibe mit <br>$d = 500\\,\\text{mm} \\cdot \\dfrac{3500\\,\\text{km}}{384\\,400\\,\\text{km}} \\approx 4{,}55\\,\\text{mm}$ <br>erscheinen. Da $4{,}55\\,\\text{mm} < 5\\,\\text{mm}$, verdeckt der Gegenstand den Mond. <br><i>Oder mit Verhältnissen:</i> $3500 : 384\\,400 \\approx 0{,}0091 < 0{,}01 = 5 : 500$. <br><small>Vereinfachung: Abstand Erdoberfläche–Mond ≈ Abstand Erde–Mond. Zur Vollständigkeit: a) $u = 2\\pi \\cdot 384\\,400\\,\\text{km} \\approx 2\\,415\\,000\\,\\text{km}$; b) $O = \\pi d^2 \\approx 3{,}8 \\cdot 10^7\\,\\text{km}^2$.</small>",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "LSA-2025-WPA2c",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Realschulabschluss (Klasse 10), schriftliche Abschlussprüfung",
  "jahr": 2025,
  "teil": "Wahlpflichtteil",
  "aufgabe": "Wahlpflichtaufgabe 2 c",
  "be": 4,
  "relevanz": "kern",
  "themen_original": [
   "Strahlensatz / ähnliche Dreiecke (ohne Namensnennung)",
   "Trapezquerschnitt",
   "Anwendung"
  ],
  "thema": "strahlensatz",
  "stufe": 3,
  "titel": "Suezkanal – Tiefgang der „Ever Given“",
  "fokus": "Teilaufgabe c (a: Trigonometrie, b: Kosten)",
  "text": "Wahlpflichtaufgabe 2\nDas Containerschiff „Ever Given“ war im März 2021 im Suezkanal auf Grund gelaufen, hatte sich unter einem Winkel von ca. 52° schräg gestellt und so den Kanal blockiert (siehe Abbildung 1). Während des gesamten Zeitraumes der Blockade mussten viele Schiffe im oder vor dem Suezkanal warten.\na) Der Suezkanal ist ungefähr 313 m breit. Weisen Sie rechnerisch nach, dass das Containerschiff „Ever Given“ etwa 400 m lang ist.\nb) Der Suezkanal verkürzt den Seeweg von Europa nach Indien um etwa 7 000 km. Das Containerschiff „Ever Given“ kann 20 124 Container laden. Es benötigt ca. 3 Liter Treibstoff pro geladenem Container auf einer Strecke von 100 km. Ein Liter Treibstoff kostet 0,26 Euro. Berechnen Sie die zusätzlichen Treibstoffkosten, die entstehen würden, wenn das Schiff von Europa nach Indien nicht durch den Suezkanal fahren würde.\nc) Die Querschnittsfläche des Kanals hat die Form eines Trapezes und beträgt ca. 5 200 m². Die Abbildung 2 zeigt den Querschnitt des Suezkanals inklusive des Schiffs „Ever Given“. Alle Angaben sind in Metern gegeben. Der Tiefgang t eines Schiffs ist die Entfernung von der Wasseroberfläche bis zum tiefsten Punkt des Schiffs (siehe Abbildung 2). Ermitteln Sie den Tiefgang t der „Ever Given“.",
  "tabelle": null,
  "quelle_url": "https://www.bildung-lsa.de/files/216b1e276e2a4350a9302f936e647dde/rsa25_mat_aufgteil2.pdf",
  "quelle_url_alt": null,
  "seite": 5,
  "auswertung_url": "https://www.bildung-lsa.de/files/216b1e276e2a4350a9302f936e647dde/rsa25_mat_ergebnis.pdf",
  "loesung_url": null,
  "quote_original": "2a 68 %, 2b 66 %, 2c 8 % (AFB III), laut Ergebnisbericht 2025",
  "quote": "Teil c: nur 8 % gelöst",
  "quote_wert": 8,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "Die Trapezfläche ($\\tfrac{313+121}{2} \\cdot 24 = 5208 \\approx 5200$) bestätigt nur die Höhe $24\\,\\text{m}$.",
   "Betrachte eine Böschung: Sie springt auf $24\\,\\text{m}$ Höhe um $\\tfrac{313-121}{2} = 96\\,\\text{m}$ zurück.",
   "In Höhe der gestrichelten Linie springt sie um $\\tfrac{193-121}{2} = 36\\,\\text{m}$ zurück. Zwei ähnliche Dreiecke: $\\dfrac{h}{24} = \\dfrac{36}{96}$.",
   "$h$ ist die Höhe über der Sohle. $t = 24 - h$."
  ],
  "checks": [
   {
    "type": "num",
    "fields": [
     {
      "label": "Tiefgang $t =$",
      "ans": 15,
      "unit": "m",
      "wrong": [
       {
        "v": 9,
        "msg": "9 m ist die Höhe der gestrichelten Linie über der Kanalsohle. t wird von der Wasseroberfläche gemessen."
       }
      ]
     }
    ]
   }
  ],
  "gruppe": "Zeichnet das Böschungsdreieck in einer Tabelle nach: Höhe 24 ↔ 96 waagerecht, Höhe h ↔ 36 waagerecht.",
  "pruefungstipp": "Nur 8 % gelöst – die schwerste Aufgabe der Sammlung. Nicht aufgeben: Skizze der Böschung ist der Schlüssel.",
  "hinweis_eigen": null,
  "figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 600 288\" width=\"600\" role=\"img\" aria-label=\"Querschnitt des Suezkanals\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><polygon points=\"30.0,70.0 530.8,70.0 377.2,238.0 183.6,238.0\" fill=\"rgba(116,192,252,.28)\" stroke=\"#212529\" stroke-width=\"2.5\" stroke-linejoin=\"round\" /><polygon points=\"222.0,44.0 342.0,44.0 326.0,175.0 238.0,175.0\" fill=\"rgba(73,80,87,.55)\" stroke=\"#212529\" stroke-width=\"1.8\" stroke-linejoin=\"round\" /><line x1=\"126.0\" y1=\"175.0\" x2=\"434.8\" y2=\"175.0\" stroke=\"#e8590c\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-dasharray=\"7 5\"/><line x1=\"30.0\" y1=\"30.0\" x2=\"530.8\" y2=\"30.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"30.0\" y1=\"25.0\" x2=\"30.0\" y2=\"35.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"530.8\" y1=\"25.0\" x2=\"530.8\" y2=\"35.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><text x=\"280.4\" y=\"19.0\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">313</text><text x=\"280.4\" y=\"254.0\" fill=\"#212529\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">121</text><text x=\"410.4\" y=\"165.0\" fill=\"#e8590c\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">193</text><line x1=\"558.8\" y1=\"70.0\" x2=\"558.8\" y2=\"238.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"563.8\" y1=\"70.0\" x2=\"553.8\" y2=\"70.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"563.8\" y1=\"238.0\" x2=\"553.8\" y2=\"238.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><text x=\"547.8\" y=\"154.0\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">24</text><line x1=\"350.0\" y1=\"70.0\" x2=\"350.0\" y2=\"175.0\" stroke=\"#c2255c\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><text x=\"362.0\" y=\"122.5\" fill=\"#c2255c\" font-size=\"16\" font-weight=\"700\" text-anchor=\"start\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">t</text><text x=\"594\" y=\"280\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">Maße in m – eigene Nachzeichnung, senkrecht überhöht</text></svg>",
  "figur_hinweis": null,
  "loesung_figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 238\" width=\"380\" role=\"img\" aria-label=\"Böschungsdreiecke\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><polygon points=\"40.0,30.0 328.0,30.0 328.0,198.0\" fill=\"rgba(28,126,214,.10)\" stroke=\"#1c7ed6\" stroke-width=\"2.2\" stroke-linejoin=\"round\" /><polygon points=\"220.0,135.0 328.0,135.0 328.0,198.0\" fill=\"rgba(232,89,12,.20)\" stroke=\"#e8590c\" stroke-width=\"2.2\" stroke-linejoin=\"round\" /><text x=\"184.0\" y=\"18.0\" fill=\"#1c7ed6\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">96</text><text x=\"274.0\" y=\"125.0\" fill=\"#e8590c\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">36</text><text x=\"346.0\" y=\"84.0\" fill=\"#1c7ed6\" font-size=\"14\" font-weight=\"700\" text-anchor=\"start\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">24</text><text x=\"346.0\" y=\"166.5\" fill=\"#e8590c\" font-size=\"15\" font-weight=\"700\" text-anchor=\"start\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">h</text><path d=\"M315.0,30.0 L315.0,43.0 L328.0,43.0\" fill=\"none\" stroke=\"#1c7ed6\" stroke-width=\"1.8\"/><circle cx=\"321.5\" cy=\"36.5\" r=\"1.8\" fill=\"#1c7ed6\"/><path d=\"M315.0,135.0 L315.0,148.0 L328.0,148.0\" fill=\"none\" stroke=\"#e8590c\" stroke-width=\"1.8\"/><circle cx=\"321.5\" cy=\"141.5\" r=\"1.8\" fill=\"#e8590c\"/><text x=\"322.0\" y=\"212.0\" fill=\"#868e96\" font-size=\"12\" font-weight=\"700\" text-anchor=\"end\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">Böschungsfuß</text><text x=\"374\" y=\"230\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">linke Böschung: zwei ähnliche Dreiecke (V-Figur)</text></svg>",
  "loesung": "Böschungsrücksprung gesamt: $\\tfrac{313-121}{2} = 96\\,\\text{m}$ auf $24\\,\\text{m}$ Höhe. In Kielhöhe: $\\tfrac{193-121}{2} = 36\\,\\text{m}$. <br>Die beiden Böschungsdreiecke sind ähnlich (gemeinsamer Winkel am Böschungsfuß, je ein rechter Winkel): $\\dfrac{h}{24} = \\dfrac{36}{96}$ ⇒ $h = 9\\,\\text{m}$ über der Sohle. <br>Tiefgang: $t = 24\\,\\text{m} - 9\\,\\text{m} = 15\\,\\text{m}$. <br><small>Zur Vollständigkeit: a) Länge $= \\tfrac{313}{\\sin 52^\\circ} \\approx 397\\,\\text{m} \\approx 400\\,\\text{m}$; b) $20\\,124 \\cdot 3\\,\\text{l} \\cdot 70 \\cdot 0{,}26\\,€ \\approx 1\\,098\\,770\\,€$.</small>",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "SH-2011-H2-B1",
  "land": "SH",
  "bundesland": "Schleswig-Holstein",
  "pruefung": "Mittlerer Schulabschluss (MSA) Mathematik, Heft 2",
  "jahr": 2011,
  "teil": "Komplexaufgabe",
  "aufgabe": "B1 Gittermast (Kern: e)",
  "be": 15,
  "relevanz": "kern",
  "themen_original": [
   "Strahlensatz",
   "Parallelität",
   "Kosinussatz",
   "Trigonometrie"
  ],
  "thema": "strahlensatz",
  "stufe": 3,
  "titel": "Gittermast – warum a ≠ 3c?",
  "fokus": "Kern: e (a–d: Trigonometrie)",
  "text": "B1 Komplexaufgabe – Gittermast\nKonrad ist Auszubildender in einer Firma, die Gittermasten für unterschiedlichste Zwecke herstellt. Die Masten werden hierbei in mehreren Teilen produziert.\nKonrad erhält die folgende (nicht maßstabsgerechte) Zeichnung eines Armes für einen Gittermast. Sein Ausbilder hat ihm die Zeichnung beschriftet und gibt folgende Längen vor:\na = 90 cm; b = 58,2 cm; c = 29,1 cm; d = 110 cm; α = 95,5°\nTipp: Wenn es dir hilft, kannst du in dieser Figur alle gegebenen Größen farbig markieren.\na) Berechne die Länge der Strecke AB. (1 P.)\nb) Berechne die Längen der Strebe x und der Strebe y. (5 P.)\nc) Bestimme, wie groß die Winkel β und γ sind. (4 P.)\nd) Berechne die Länge der Strebe BC. (2 P.)\ne) Begründe, warum a nicht genau dreimal so lang wie c sein kann. (3 P.)",
  "tabelle": null,
  "quelle_url": "https://transparenz.schleswig-holstein.de/dataset/a5085303-444a-4408-a316-50af7a23bbea/resource/639154f0-6c5e-4ca3-ae57-c4144cc5594c/download/2011_msa_mathematik_schlerheft2_geschwrzt.pdf",
  "quelle_url_alt": null,
  "seite": 2,
  "auswertung_url": null,
  "loesung_url": "https://transparenz.schleswig-holstein.de/dataset/a5085303-444a-4408-a316-50af7a23bbea/resource/8bf63fc2-5150-47ae-baa8-9cce4af630be/download/2011_msa_mathematik_korrekturanweisung_geschwrzt.pdf",
  "quote_original": null,
  "quote": null,
  "quote_wert": null,
  "lizenz": "Quelle: MBWK Schleswig-Holstein über das Transparenzportal. Lizenz: CC BY-ND 4.0 (https://creativecommons.org/licenses/by-nd/4.0/deed.de). Aufgabentext unverändert übernommen, Abbildung nicht nachgezeichnet.",
  "tipps": [
   "Stell dir vor, $\\alpha$ wäre $90^\\circ$: Dann wären $a$, $b$, $c$ parallel. Welche Figur entsteht mit Zentrum $B$?",
   "Bei $\\alpha = 90^\\circ$ gäbe der Strahlensatz $a : c = 3d : d = 3$.",
   "Tatsächlich ist $\\alpha > 90^\\circ$ – $a$ ist nicht parallel zu $c$."
  ],
  "checks": [
   {
    "type": "open"
   }
  ],
  "gruppe": null,
  "pruefungstipp": null,
  "hinweis_eigen": null,
  "figur": null,
  "figur_hinweis": "Die Abbildung ist urheberrechtlich geschützt (CC BY-ND 4.0) und wird hier bewusst NICHT nachgezeichnet. Bitte im Original-PDF ansehen (S. 2).",
  "abb_worte": "Stumpfwinkliges Dreieck ABC (nicht maßstabsgerecht): A links unten, B rechts unten, AB waagerecht, in drei gleich lange Abschnitte d = 110 cm geteilt (AB = 330 cm). C liegt links oberhalb von A: AC = a = 90 cm, ∢BAC = α = 95,5° (stumpf, C leicht links von A). Von den Teilungspunkten P1 (bei d) und P2 (bei 2d) gehen senkrechte Streben nach oben bis zur Seite BC: b = 58,2 cm an P1, c = 29,1 cm an P2 (rechte Winkel an AB markiert). Diagonalstreben: y von C nach P1 (Dreieck A-C-P1, y² = a² + d² − 2ad·cos α); x vom oberen Ende von b nach P2 (x² = b² + d²). β bei B, γ bei C markiert.",
  "loesung": null,
  "loesung_offiziell": "Offizielle Korrekturanweisung (Auszug, wörtlich):\na) AB = 3·d = 3·110 = 330 cm.\nb) x² = b² + d²; x ≈ 124,4 cm. y² = a² + d² − 2·a·d·cos 95,5°; y ≈ 148,7 cm.\nc) tan β = c/d = 29,1/110 ≈ 0,2645; β ≈ 14,82°. γ = 180° − 95,5° − β ≈ 69,68°.\nd) BC² = a² + (3d)² − 2a·3d·cos α; BC ≈ 350,28 cm.\ne) „Die Begründung erfolgt z. B. über die Strahlensätze: Wenn α = 90° wäre, dann wären a und c parallel und es würde wegen des Strahlensatzes a = 3·c sein, weil AB = 3·d ist. Es ist aber α > 90° und daher muss dann a länger als 3·c sein, wie man an der Zeichnung sieht.“",
  "loesung_typ": "offiziell (Korrekturanweisung MBWK SH)"
 },
 {
  "id": "LSA-BLF-2023-WPA2a",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Besondere Leistungsfeststellung zum Erwerb des qualifizierten Hauptschulabschlusses (Klasse 9)",
  "jahr": 2023,
  "teil": "Wahlpflichtteil",
  "aufgabe": "Wahlpflichtaufgabe 2 a",
  "be": "Teil",
  "relevanz": "rand",
  "themen_original": [
   "maßstäbliche Zeichnung",
   "Netz"
  ],
  "thema": "zeichnen",
  "stufe": 1,
  "titel": "Netz eines Prismas im Maßstab 1 : 2",
  "fokus": "Teilaufgabe a",
  "text": "Wahlpflichtaufgabe 2 [erreichbare BE: 7]\nGegeben ist ein Prisma mit dreieckiger Grundfläche. Die Körperhöhe des Prismas beträgt 8,0 cm.\nDie Seitenlängen der Grundfläche betragen:\na = b = 5,0 cm\nc = 7,0 cm\na) Zeichnen Sie ein Netz dieses Prismas im Maßstab 1 : 2.",
  "tabelle": null,
  "quelle_url": "https://www.bildung-lsa.de/files/379ed81382ce7246b5b8d7daa349273e/blf23_mat_teil2.pdf",
  "quelle_url_alt": null,
  "seite": null,
  "auswertung_url": null,
  "loesung_url": null,
  "quote_original": null,
  "quote": null,
  "quote_wert": null,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "Alle Längen halbieren: $a = b = 2{,}5\\,\\text{cm}$, $c = 3{,}5\\,\\text{cm}$, Höhe $4\\,\\text{cm}$.",
   "Netz: drei Rechtecke nebeneinander ($2{,}5 \\times 4$, $3{,}5 \\times 4$, $2{,}5 \\times 4$), dazu oben und unten je ein Dreieck."
  ],
  "checks": [
   {
    "type": "open"
   }
  ],
  "gruppe": null,
  "pruefungstipp": null,
  "hinweis_eigen": null,
  "figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 260 278\" width=\"260\" role=\"img\" aria-label=\"Dreiseitiges Prisma\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><polygon points=\"60.0,86.0 186.0,86.0 123.0,50.6\" fill=\"rgba(28,126,214,.12)\" stroke=\"#1c7ed6\" stroke-width=\"2\" stroke-linejoin=\"round\" /><line x1=\"60.0\" y1=\"230.0\" x2=\"186.0\" y2=\"230.0\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"60.0\" y1=\"230.0\" x2=\"60.0\" y2=\"86.0\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"186.0\" y1=\"230.0\" x2=\"186.0\" y2=\"86.0\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"123.0\" y1=\"194.6\" x2=\"123.0\" y2=\"50.6\" stroke=\"#1c7ed6\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-dasharray=\"5 4\"/><line x1=\"60.0\" y1=\"230.0\" x2=\"123.0\" y2=\"194.6\" stroke=\"#1c7ed6\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-dasharray=\"5 4\"/><line x1=\"186.0\" y1=\"230.0\" x2=\"123.0\" y2=\"194.6\" stroke=\"#1c7ed6\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-dasharray=\"5 4\"/><text x=\"123.0\" y=\"246.0\" fill=\"#212529\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">c = 7,0 cm</text><text x=\"200.0\" y=\"158.0\" fill=\"#212529\" font-size=\"12\" font-weight=\"700\" text-anchor=\"start\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">8,0 cm</text><text x=\"67.5\" y=\"58.3\" fill=\"#212529\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">5,0</text><text x=\"178.5\" y=\"58.3\" fill=\"#212529\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">5,0</text><text x=\"254\" y=\"270\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">nicht maßstäblich – eigene Nachzeichnung</text></svg>",
  "figur_hinweis": null,
  "loesung_figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 379 354\" width=\"379\" role=\"img\" aria-label=\"Prismennetz\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><polygon points=\"20.0,110.0 105.0,110.0 105.0,246.0 20.0,246.0\" fill=\"rgba(28,126,214,.10)\" stroke=\"#1c7ed6\" stroke-width=\"2\" stroke-linejoin=\"round\" /><text x=\"62.5\" y=\"178.0\" fill=\"#1c7ed6\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">2,5</text><polygon points=\"105.0,110.0 224.0,110.0 224.0,246.0 105.0,246.0\" fill=\"rgba(28,126,214,.10)\" stroke=\"#1c7ed6\" stroke-width=\"2\" stroke-linejoin=\"round\" /><text x=\"164.5\" y=\"178.0\" fill=\"#1c7ed6\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">3,5</text><polygon points=\"224.0,110.0 309.0,110.0 309.0,246.0 224.0,246.0\" fill=\"rgba(28,126,214,.10)\" stroke=\"#1c7ed6\" stroke-width=\"2\" stroke-linejoin=\"round\" /><text x=\"266.5\" y=\"178.0\" fill=\"#1c7ed6\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">2,5</text><polygon points=\"105.0,110.0 224.0,110.0 164.5,49.3\" fill=\"rgba(232,89,12,.12)\" stroke=\"#e8590c\" stroke-width=\"2\" stroke-linejoin=\"round\" /><polygon points=\"105.0,246.0 224.0,246.0 164.5,306.7\" fill=\"rgba(232,89,12,.12)\" stroke=\"#e8590c\" stroke-width=\"2\" stroke-linejoin=\"round\" /><text x=\"323.0\" y=\"178.0\" fill=\"#212529\" font-size=\"12\" font-weight=\"700\" text-anchor=\"start\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">4 cm</text><text x=\"373\" y=\"346\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">Maße der Zeichnung im Maßstab 1 : 2 (in cm)</text></svg>",
  "loesung": "Maßstab $1 : 2$: zwei Dreiecke mit den Seiten $2{,}5\\,\\text{cm}$, $2{,}5\\,\\text{cm}$, $3{,}5\\,\\text{cm}$ und drei Rechtecke $2{,}5\\,\\text{cm} \\times 4\\,\\text{cm}$, $3{,}5\\,\\text{cm} \\times 4\\,\\text{cm}$, $2{,}5\\,\\text{cm} \\times 4\\,\\text{cm}$, zusammenhängend angeordnet (z. B. wie in der Skizze).",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "LSA-2019-PA3b",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Realschulabschluss (Klasse 10), schriftliche Abschlussprüfung",
  "jahr": 2019,
  "teil": "Pflichtteil 2",
  "aufgabe": "Pflichtaufgabe 3 b",
  "be": "Teil von PA 3",
  "relevanz": "rand",
  "themen_original": [
   "maßstäbliche Darstellung",
   "Zweitafelbild"
  ],
  "thema": "zeichnen",
  "stufe": 2,
  "titel": "Zweitafelbild im Maßstab 1 : 2",
  "fokus": "Teilaufgabe b",
  "text": "b) Stellen Sie den Körper im Maßstab 1 : 2 im Zweitafelbild dar.",
  "tabelle": null,
  "quelle_url": "https://lisa.sachsen-anhalt.de/fileadmin/Bibliothek/Politik_und_Verwaltung/MK/LISA/Unterricht/ZLE/RSA_10/Mathematik/rsa19_mat_ET_Teil2.pdf",
  "quelle_url_alt": null,
  "seite": null,
  "auswertung_url": null,
  "loesung_url": null,
  "quote_original": "51 %",
  "quote": "51 % gelöst",
  "quote_wert": 51,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "Maßstab $1 : 2$: Würfel $4\\,\\text{cm}$, Kegel $d = 4\\,\\text{cm}$, Kegelhöhe $(12 - 8) : 2 = 2\\,\\text{cm}$.",
   "Aufriss (von vorn): Quadrat mit aufgesetztem Dreieck. Grundriss (von oben): Quadrat mit Inkreis und Mittelpunkt."
  ],
  "checks": [
   {
    "type": "open"
   }
  ],
  "gruppe": null,
  "pruefungstipp": "51 % gelöst. Häufiger Fehler: die Kegelhöhe mit 12 cm statt 4 cm angesetzt.",
  "hinweis_eigen": null,
  "figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 330 338\" width=\"330\" role=\"img\" aria-label=\"Würfel mit aufgesetztem Kegel\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><polygon points=\"60.0,280.0 188.0,280.0 188.0,152.0 60.0,152.0\" fill=\"rgba(28,126,214,.10)\" stroke=\"#1c7ed6\" stroke-width=\"2.2\" stroke-linejoin=\"round\" /><line x1=\"188.0\" y1=\"280.0\" x2=\"232.8\" y2=\"235.2\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"188.0\" y1=\"152.0\" x2=\"232.8\" y2=\"107.2\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"60.0\" y1=\"152.0\" x2=\"104.8\" y2=\"107.2\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"232.8\" y1=\"235.2\" x2=\"232.8\" y2=\"107.2\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"232.8\" y1=\"107.2\" x2=\"104.8\" y2=\"107.2\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"60.0\" y1=\"280.0\" x2=\"104.8\" y2=\"235.2\" stroke=\"#1c7ed6\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-dasharray=\"5 4\"/><line x1=\"104.8\" y1=\"235.2\" x2=\"232.8\" y2=\"235.2\" stroke=\"#1c7ed6\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-dasharray=\"5 4\"/><line x1=\"104.8\" y1=\"235.2\" x2=\"104.8\" y2=\"107.2\" stroke=\"#1c7ed6\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-dasharray=\"5 4\"/><path d=\"M82.4,129.6 A64.0,20.5 0 0 1 210.4,129.6\" fill=\"none\" stroke=\"#e8590c\" stroke-width=\"1.4\" stroke-dasharray=\"5 4\"/><path d=\"M82.4,129.6 A64.0,20.5 0 0 0 210.4,129.6\" fill=\"none\" stroke=\"#e8590c\" stroke-width=\"2\"/><line x1=\"82.4\" y1=\"129.6\" x2=\"146.4\" y2=\"65.6\" stroke=\"#e8590c\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"210.4\" y1=\"129.6\" x2=\"146.4\" y2=\"65.6\" stroke=\"#e8590c\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"60.0\" y1=\"276.0\" x2=\"188.0\" y2=\"276.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"60.0\" y1=\"271.0\" x2=\"60.0\" y2=\"281.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"188.0\" y1=\"271.0\" x2=\"188.0\" y2=\"281.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><text x=\"124.0\" y=\"287.0\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">8 cm</text><line x1=\"248.8\" y1=\"235.2\" x2=\"248.8\" y2=\"65.6\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"243.8\" y1=\"235.2\" x2=\"253.8\" y2=\"235.2\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"243.8\" y1=\"65.6\" x2=\"253.8\" y2=\"65.6\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><text x=\"259.8\" y=\"150.4\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">12 cm</text><text x=\"324\" y=\"330\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">nicht maßstäblich – eigene Nachzeichnung</text></svg>",
  "figur_hinweis": "Maße nach dem Aufgabenstamm von PA 3: Würfel a = 8 cm, Kegel mit d = 8 cm, Gesamthöhe 12 cm.",
  "loesung_figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 306\" width=\"340\" role=\"img\" aria-label=\"Zweitafelbild\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><polygon points=\"40.0,150.0 120.0,150.0 120.0,70.0 40.0,70.0\" fill=\"rgba(28,126,214,.1)\" stroke=\"#1c7ed6\" stroke-width=\"2\" stroke-linejoin=\"round\" /><polygon points=\"40.0,70.0 120.0,70.0 80.0,30.0\" fill=\"rgba(232,89,12,.12)\" stroke=\"#e8590c\" stroke-width=\"2\" stroke-linejoin=\"round\" /><line x1=\"10.0\" y1=\"164.0\" x2=\"330.0\" y2=\"164.0\" stroke=\"#868e96\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><text x=\"300.0\" y=\"154.0\" fill=\"#868e96\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">x₁₂</text><polygon points=\"40.0,178.0 120.0,178.0 120.0,258.0 40.0,258.0\" fill=\"rgba(28,126,214,.1)\" stroke=\"#1c7ed6\" stroke-width=\"2\" stroke-linejoin=\"round\" /><circle cx=\"80.0\" cy=\"218.0\" r=\"40.0\" fill=\"rgba(232,89,12,.12)\" stroke=\"#e8590c\" stroke-width=\"2\"/><circle cx=\"80.0\" cy=\"218.0\" r=\"3.5\" fill=\"#e8590c\"/><line x1=\"40.0\" y1=\"150.0\" x2=\"40.0\" y2=\"178.0\" stroke=\"#868e96\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-dasharray=\"3 3\"/><line x1=\"120.0\" y1=\"150.0\" x2=\"120.0\" y2=\"178.0\" stroke=\"#868e96\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-dasharray=\"3 3\"/><text x=\"134.0\" y=\"110.0\" fill=\"#212529\" font-size=\"12\" font-weight=\"700\" text-anchor=\"start\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">4 cm</text><text x=\"134.0\" y=\"50.0\" fill=\"#e8590c\" font-size=\"12\" font-weight=\"700\" text-anchor=\"start\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">Kegel: 2 cm hoch</text><text x=\"134.0\" y=\"218.0\" fill=\"#212529\" font-size=\"12\" font-weight=\"700\" text-anchor=\"start\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">Quadrat 4 cm, Kreis r = 2 cm</text><text x=\"134.0\" y=\"138.0\" fill=\"#868e96\" font-size=\"12\" font-weight=\"700\" text-anchor=\"start\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">Aufriss</text><text x=\"134.0\" y=\"250.0\" fill=\"#868e96\" font-size=\"12\" font-weight=\"700\" text-anchor=\"start\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">Grundriss</text><text x=\"334\" y=\"298\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">Maße für die Zeichnung im Maßstab 1 : 2</text></svg>",
  "loesung": "Aufriss: Quadrat $4\\,\\text{cm} \\times 4\\,\\text{cm}$ mit aufgesetztem gleichschenkligem Dreieck (Basis $4\\,\\text{cm}$, Höhe $2\\,\\text{cm}$). Grundriss: Quadrat $4\\,\\text{cm} \\times 4\\,\\text{cm}$ mit einbeschriebenem Kreis ($r = 2\\,\\text{cm}$), die Kegelspitze ist der Mittelpunkt.",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "LSA-BLF-2024-WPA1a",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Besondere Leistungsfeststellung zum Erwerb des qualifizierten Hauptschulabschlusses (Klasse 9)",
  "jahr": 2024,
  "teil": "Wahlpflichtteil",
  "aufgabe": "Wahlpflichtaufgabe 1 a",
  "be": "Teil",
  "relevanz": "rand",
  "themen_original": [
   "Maßstab",
   "maßstäbliche Zeichnung"
  ],
  "thema": "zeichnen",
  "stufe": 2,
  "titel": "Fallschirm-Bastelvorlage 1 : 100",
  "fokus": "Teilaufgabe a",
  "text": "Die erste Beschreibung eines Fallschirms stammt von Leonardo da Vinci. Dieser Fallschirm hat die Form einer Pyramide mit quadratischer Grundfläche (siehe Abbildung 1). Alle Kantenlängen der Pyramide betragen jeweils 7 m.\nNach dieser Beschreibung wird eine Bastelvorlage im Maßstab 1: 100 erstellt, die aus der Mantelfläche der Pyramide besteht.\na) Zeichnen Sie die Bastelvorlage.",
  "tabelle": null,
  "quelle_url": "https://www.bildung-lsa.de/files/379ed81382ce7246b5b8d7daa349273e/blf24_mat_teil2.pdf",
  "quelle_url_alt": null,
  "seite": null,
  "auswertung_url": null,
  "loesung_url": null,
  "quote_original": null,
  "quote": null,
  "quote_wert": null,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "Alle Kanten sind $7\\,\\text{m} = 700\\,\\text{cm}$ lang. Im Maßstab $1 : 100$: $7\\,\\text{cm}$.",
   "Die Mantelfläche besteht aus vier gleichseitigen Dreiecken (alle Kanten gleich lang!)."
  ],
  "checks": [
   {
    "type": "open"
   }
  ],
  "gruppe": null,
  "pruefungstipp": null,
  "hinweis_eigen": null,
  "figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 311 278\" width=\"311\" role=\"img\" aria-label=\"Pyramidenförmiger Fallschirm\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><polygon points=\"40.0,230.0 194.0,230.0 147.8,64.5\" fill=\"rgba(28,126,214,.12)\" stroke=\"#1c7ed6\" stroke-width=\"2\" stroke-linejoin=\"round\" /><polygon points=\"194.0,230.0 255.6,176.1 147.8,64.5\" fill=\"rgba(28,126,214,.22)\" stroke=\"#1c7ed6\" stroke-width=\"2\" stroke-linejoin=\"round\" /><line x1=\"40.0\" y1=\"230.0\" x2=\"101.6\" y2=\"176.1\" stroke=\"#1c7ed6\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-dasharray=\"5 4\"/><line x1=\"101.6\" y1=\"176.1\" x2=\"255.6\" y2=\"176.1\" stroke=\"#1c7ed6\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-dasharray=\"5 4\"/><line x1=\"101.6\" y1=\"176.1\" x2=\"147.8\" y2=\"64.5\" stroke=\"#1c7ed6\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-dasharray=\"5 4\"/><text x=\"117.0\" y=\"246.0\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">7 m</text><text x=\"192.9\" y=\"147.2\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">7 m</text><text x=\"305\" y=\"270\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">nicht maßstäblich – eigene Nachzeichnung</text></svg>",
  "figur_hinweis": null,
  "loesung_figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 308\" width=\"400\" role=\"img\" aria-label=\"Mantel einer Pyramide\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><polygon points=\"200.0,196.0 54.5,280.0 54.5,112.0\" fill=\"rgba(232,89,12,.12)\" stroke=\"#1c7ed6\" stroke-width=\"2\" stroke-linejoin=\"round\" /><polygon points=\"200.0,196.0 54.5,112.0 200.0,28.0\" fill=\"rgba(28,126,214,.10)\" stroke=\"#1c7ed6\" stroke-width=\"2\" stroke-linejoin=\"round\" /><polygon points=\"200.0,196.0 200.0,28.0 345.5,112.0\" fill=\"rgba(232,89,12,.12)\" stroke=\"#1c7ed6\" stroke-width=\"2\" stroke-linejoin=\"round\" /><polygon points=\"200.0,196.0 345.5,112.0 345.5,280.0\" fill=\"rgba(28,126,214,.10)\" stroke=\"#1c7ed6\" stroke-width=\"2\" stroke-linejoin=\"round\" /><circle cx=\"200.0\" cy=\"196.0\" r=\"3.5\" fill=\"#c2255c\"/><text x=\"200.0\" y=\"212.0\" fill=\"#c2255c\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">Spitze</text><text x=\"200.0\" y=\"14.0\" fill=\"#212529\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">vier gleichseitige Dreiecke, je 7 cm</text><text x=\"394\" y=\"300\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">Maßstab 1 : 100 → Seitenlänge 7 cm</text></svg>",
  "loesung": "Vier gleichseitige Dreiecke mit $7\\,\\text{cm}$ Seitenlänge, die an einer gemeinsamen Spitze fächerförmig aneinanderhängen (Konstruktion mit dem Zirkel).",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "LSA-2025-PA2b",
  "land": "LSA",
  "bundesland": "Sachsen-Anhalt",
  "pruefung": "Realschulabschluss (Klasse 10), schriftliche Abschlussprüfung",
  "jahr": 2025,
  "teil": "Pflichtteil 2",
  "aufgabe": "Pflichtaufgabe 2 b",
  "be": "Teil von PA 2",
  "relevanz": "rand",
  "themen_original": [
   "maßstäbliche Zeichnung",
   "Netz"
  ],
  "thema": "zeichnen",
  "stufe": 2,
  "titel": "Zylindernetz im Maßstab 1 : 5",
  "fokus": "Teilaufgabe b",
  "text": "b) Zeichnen Sie ein Netz des Kreiszylinders im Maßstab 1: 5.",
  "tabelle": null,
  "quelle_url": "https://www.bildung-lsa.de/files/216b1e276e2a4350a9302f936e647dde/rsa25_mat_aufgteil2.pdf",
  "quelle_url_alt": null,
  "seite": null,
  "auswertung_url": "https://www.bildung-lsa.de/files/216b1e276e2a4350a9302f936e647dde/rsa25_mat_ergebnis.pdf",
  "loesung_url": null,
  "quote_original": "50 %",
  "quote": "50 % gelöst",
  "quote_wert": 50,
  "lizenz": "Quelle: Landesinstitut für Schulqualität und Lehrerbildung Sachsen-Anhalt (LISA). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "Maßstab $1 : 5$: $r = 5\\,\\text{cm} : 5 = 1\\,\\text{cm}$, $h = 12\\,\\text{cm} : 5 = 2{,}4\\,\\text{cm}$.",
   "Mantel: Rechteck mit der Länge $u = 2\\pi r = 2\\pi \\cdot 1\\,\\text{cm} \\approx 6{,}3\\,\\text{cm}$."
  ],
  "checks": [
   {
    "type": "num",
    "fields": [
     {
      "label": "Länge des Mantelrechtecks (Zeichnung):",
      "ans": 6.3,
      "unit": "cm",
      "tol": 0.051
     }
    ]
   }
  ],
  "gruppe": null,
  "pruefungstipp": "Erst alle Maße umrechnen und notieren, dann zeichnen.",
  "hinweis_eigen": null,
  "figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 230 248\" width=\"230\" role=\"img\" aria-label=\"Kreiszylinder\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><rect x=\"30\" y=\"40\" width=\"110\" height=\"150\" fill=\"rgba(28,126,214,.08)\"/><line x1=\"30.0\" y1=\"190.0\" x2=\"30.0\" y2=\"40.0\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"140.0\" y1=\"190.0\" x2=\"140.0\" y2=\"40.0\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M30.0,190.0 A55.0,13.0 0 0 1 140.0,190.0\" fill=\"none\" stroke=\"#1c7ed6\" stroke-width=\"1.4\" stroke-dasharray=\"5 4\"/><path d=\"M30.0,190.0 A55.0,13.0 0 0 0 140.0,190.0\" fill=\"none\" stroke=\"#1c7ed6\" stroke-width=\"2\"/><ellipse cx=\"85.0\" cy=\"40.0\" rx=\"55.0\" ry=\"13.0\" fill=\"none\" stroke=\"#1c7ed6\" stroke-width=\"2\"/><line x1=\"85.0\" y1=\"190.0\" x2=\"140.0\" y2=\"190.0\" stroke=\"#e8590c\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><text x=\"112.5\" y=\"178.0\" fill=\"#e8590c\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">r = 5,0 cm</text><circle cx=\"85.0\" cy=\"190.0\" r=\"2.5\" fill=\"#e8590c\"/><line x1=\"160.0\" y1=\"190.0\" x2=\"160.0\" y2=\"40.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"155.0\" y1=\"190.0\" x2=\"165.0\" y2=\"190.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"155.0\" y1=\"40.0\" x2=\"165.0\" y2=\"40.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><text x=\"171.0\" y=\"115.0\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">h = 12,0 cm</text><text x=\"224\" y=\"240\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">nicht maßstäblich – eigene Nachzeichnung</text></svg>",
  "figur_hinweis": null,
  "loesung_figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 298 270\" width=\"298\" role=\"img\" aria-label=\"Zylindernetz\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><polygon points=\"30.0,80.0 218.5,80.0 218.5,152.0 30.0,152.0\" fill=\"rgba(28,126,214,.10)\" stroke=\"#1c7ed6\" stroke-width=\"2\" stroke-linejoin=\"round\" /><circle cx=\"124.24777960769379\" cy=\"50.0\" r=\"30.0\" fill=\"rgba(232,89,12,.12)\" stroke=\"#e8590c\" stroke-width=\"2\"/><circle cx=\"124.24777960769379\" cy=\"182.0\" r=\"30.0\" fill=\"rgba(232,89,12,.12)\" stroke=\"#e8590c\" stroke-width=\"2\"/><line x1=\"30.0\" y1=\"150.0\" x2=\"218.5\" y2=\"150.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"30.0\" y1=\"145.0\" x2=\"30.0\" y2=\"155.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"218.5\" y1=\"145.0\" x2=\"218.5\" y2=\"155.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><text x=\"124.2\" y=\"161.0\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">≈ 6,3 cm</text><line x1=\"230.5\" y1=\"152.0\" x2=\"230.5\" y2=\"80.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"225.5\" y1=\"152.0\" x2=\"235.5\" y2=\"152.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"225.5\" y1=\"80.0\" x2=\"235.5\" y2=\"80.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><text x=\"241.5\" y=\"116.0\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">2,4 cm</text><text x=\"162.2\" y=\"50.0\" fill=\"#e8590c\" font-size=\"12\" font-weight=\"700\" text-anchor=\"start\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">r = 1 cm</text><text x=\"292\" y=\"262\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">Maße der Zeichnung im Maßstab 1 : 5</text></svg>",
  "loesung": "In der Zeichnung: Mantelrechteck $2{,}4\\,\\text{cm}$ hoch und $2\\pi \\cdot 1\\,\\text{cm} \\approx 6{,}3\\,\\text{cm}$ lang, dazu zwei Kreise mit $r = 1\\,\\text{cm}$, die an den langen Rechteckseiten anliegen.",
  "loesung_typ": "eigene Lösung"
 },
 {
  "id": "BB-2021-A4c",
  "land": "BB",
  "bundesland": "Brandenburg",
  "pruefung": "Prüfung am Ende der Jahrgangsstufe 10 (P10) Mathematik",
  "jahr": 2021,
  "teil": "Aufgabe 4",
  "aufgabe": "4 c (Wahlaufgabe *)",
  "be": 5,
  "relevanz": "rand",
  "themen_original": [
   "maßstabsgerechte Zeichnung",
   "Maßstab selbst wählen"
  ],
  "thema": "zeichnen",
  "stufe": 2,
  "titel": "Regentonne abdecken – Draufsicht",
  "fokus": "Teilaufgabe c (Wahlaufgabe)",
  "text": "Aufgabe 4: Regentonne (9 Punkte)\nHerr Gärtner möchte in seinem Garten eine Regentonne aufstellen.\nDie zylinderförmige Regentonne hat folgende Maße: h = 95 cm, r = 29 cm\n[…]\n*c) Herr Gärtner hat eine rechteckige Platte mit den Maßen 55 cm x 80 cm. Damit möchte er seine Regentonne abdecken.\nKann die Platte die Regentonne vollständig bedecken?\nFertigen Sie zum Sachverhalt eine mögliche maßstabsgerechte Zeichnung als Draufsicht (Ansicht von oben) an. Beschriften Sie Ihre Zeichnung.\nGeben Sie den Maßstab Ihrer Zeichnung an.\nMaßstab: ________\nEntscheiden Sie, ob die Platte die Regentonne vollständig bedeckt.",
  "tabelle": null,
  "quelle_url": "https://bildungsserver.berlin-brandenburg.de/fileadmin/bbb/unterricht/pruefungen/pruefungen_am_ende_der_jahrgangsstufe_10/Pruefungsaufgaben_P10_Mathematik/21_P10_Ma_A.pdf",
  "quelle_url_alt": null,
  "seite": null,
  "auswertung_url": null,
  "loesung_url": null,
  "quote_original": null,
  "quote": null,
  "quote_wert": null,
  "lizenz": "Quelle: Bildungsserver Berlin-Brandenburg (Prüfungen am Ende der Jahrgangsstufe 10). Aufgabentext wörtlich zitiert.",
  "tipps": [
   "Der Durchmesser ist entscheidend: $d = 2 \\cdot 29\\,\\text{cm} = 58\\,\\text{cm}$.",
   "Maßstab $1 : 10$ bietet sich an: Kreis $r = 2{,}9\\,\\text{cm}$, Rechteck $5{,}5\\,\\text{cm} \\times 8\\,\\text{cm}$."
  ],
  "checks": [
   {
    "type": "mc",
    "choices": [
     "Nein, die Platte bedeckt die Tonne nicht vollständig.",
     "Ja, die Platte bedeckt die Tonne vollständig."
    ],
    "correct": 0,
    "why": "Die kurze Seite ($55\\,\\text{cm}$) ist kleiner als der Durchmesser ($58\\,\\text{cm}$).",
    "wrongWhy": {
     "1": "Vergleiche die kurze Plattenseite mit dem Durchmesser $2 \\cdot 29\\,\\text{cm}$."
    }
   }
  ],
  "gruppe": null,
  "pruefungstipp": null,
  "hinweis_eigen": null,
  "figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 228\" width=\"240\" role=\"img\" aria-label=\"Regentonne\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><rect x=\"30\" y=\"40\" width=\"120\" height=\"130\" fill=\"rgba(28,126,214,.08)\"/><line x1=\"30.0\" y1=\"170.0\" x2=\"30.0\" y2=\"40.0\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"150.0\" y1=\"170.0\" x2=\"150.0\" y2=\"40.0\" stroke=\"#1c7ed6\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M30.0,170.0 A60.0,13.0 0 0 1 150.0,170.0\" fill=\"none\" stroke=\"#1c7ed6\" stroke-width=\"1.4\" stroke-dasharray=\"5 4\"/><path d=\"M30.0,170.0 A60.0,13.0 0 0 0 150.0,170.0\" fill=\"none\" stroke=\"#1c7ed6\" stroke-width=\"2\"/><ellipse cx=\"90.0\" cy=\"40.0\" rx=\"60.0\" ry=\"13.0\" fill=\"none\" stroke=\"#1c7ed6\" stroke-width=\"2\"/><line x1=\"90.0\" y1=\"170.0\" x2=\"150.0\" y2=\"170.0\" stroke=\"#e8590c\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><text x=\"120.0\" y=\"158.0\" fill=\"#e8590c\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">r = 29 cm</text><circle cx=\"90.0\" cy=\"170.0\" r=\"2.5\" fill=\"#e8590c\"/><line x1=\"170.0\" y1=\"170.0\" x2=\"170.0\" y2=\"40.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"165.0\" y1=\"170.0\" x2=\"175.0\" y2=\"170.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"165.0\" y1=\"40.0\" x2=\"175.0\" y2=\"40.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><text x=\"181.0\" y=\"105.0\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">h = 95 cm</text><text x=\"234\" y=\"220\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">nicht maßstäblich – eigene Nachzeichnung</text></svg>",
  "figur_hinweis": null,
  "loesung_figur": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 318 241\" width=\"318\" role=\"img\" aria-label=\"Draufsicht Platte und Tonne\" style=\"font-family:Inter,sans-serif;max-width:100%;height:auto\"><polygon points=\"30.0,30.0 238.0,30.0 238.0,173.0 30.0,173.0\" fill=\"rgba(134,142,150,.15)\" stroke=\"#212529\" stroke-width=\"2\" stroke-linejoin=\"round\" /><circle cx=\"134\" cy=\"101.5\" r=\"75.39999999999999\" fill=\"rgba(28,126,214,.12)\" stroke=\"#1c7ed6\" stroke-width=\"2.2\"/><circle cx=\"134.0\" cy=\"101.5\" r=\"3.5\" fill=\"#1c7ed6\"/><line x1=\"134.0\" y1=\"101.5\" x2=\"209.4\" y2=\"101.5\" stroke=\"#1c7ed6\" stroke-width=\"2\" stroke-linecap=\"round\"/><text x=\"171.7\" y=\"89.5\" fill=\"#1c7ed6\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">2,9 cm</text><line x1=\"30.0\" y1=\"171.0\" x2=\"238.0\" y2=\"171.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"30.0\" y1=\"166.0\" x2=\"30.0\" y2=\"176.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"238.0\" y1=\"166.0\" x2=\"238.0\" y2=\"176.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><text x=\"134.0\" y=\"182.0\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">8 cm (Platte 80 cm)</text><line x1=\"248.0\" y1=\"173.0\" x2=\"248.0\" y2=\"30.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"243.0\" y1=\"173.0\" x2=\"253.0\" y2=\"173.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"243.0\" y1=\"30.0\" x2=\"253.0\" y2=\"30.0\" stroke=\"#868e96\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><text x=\"259.0\" y=\"101.5\" fill=\"#212529\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">5,5 cm</text><text x=\"134.0\" y=\"18.0\" fill=\"#c2255c\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"middle\" paint-order=\"stroke\" stroke=\"#fff\" stroke-width=\"4\">Tonne ragt oben und unten über die Platte</text><text x=\"312\" y=\"233\" font-size=\"11\" fill=\"#868e96\" text-anchor=\"end\">Draufsicht im Maßstab 1 : 10</text></svg>",
  "loesung": "Zum Beispiel Maßstab $1 : 10$: Kreis mit $r = 2{,}9\\,\\text{cm}$, darüber ein Rechteck $5{,}5\\,\\text{cm} \\times 8\\,\\text{cm}$ (Draufsicht, beschriftet). Die Platte bedeckt die Tonne <b>nicht</b> vollständig, denn die kurze Seite $55\\,\\text{cm}$ ist kleiner als der Durchmesser $58\\,\\text{cm}$.",
  "loesung_typ": "eigene Lösung"
 }
];
