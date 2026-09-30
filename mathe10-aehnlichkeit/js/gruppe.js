/* Gruppenarbeit: Kontrollaufgaben der Stationen */
(function(){
window.TASKS_GR = [
 {id:"gr-1", level:"muss", q:"Kontrolle 1: Das Viereck hat die Seiten $3\\,\\text{cm}$, $2\\,\\text{cm}$, $2{,}5\\,\\text{cm}$ und $4\\,\\text{cm}$. Wie groß ist der Umfang des Bildes bei $k = 2$?",
  fields:[{label:"$u' =$", ans:23, unit:"cm", wrong:[{v:11.5,msg:"Das ist der Umfang des Originals – noch mal k."}]}], hints:["$u = 11{,}5\\,\\text{cm}$, $u' = k \\cdot u$"], solution:"$u' = 2 \\cdot 11{,}5\\,\\text{cm} = 23\\,\\text{cm}$"},
 {id:"gr-2", level:"muss", q:"Kontrolle 2: Es ist $\\overline{ZA} = 5\\,\\text{cm}$ und $k = \\tfrac12$. Wie lang ist $\\overline{ZA'}$?",
  fields:[{label:"$\\overline{ZA'} =$", ans:2.5, unit:"cm", wrong:[{v:10,msg:"k = ½ verkleinert: mal ½, nicht mal 2."}]}], hints:["$\\overline{ZA'} = k \\cdot \\overline{ZA}$"], solution:"$\\overline{ZA'} = \\tfrac12 \\cdot 5\\,\\text{cm} = 2{,}5\\,\\text{cm}$"},
 {id:"gr-3", level:"muss", type:"mc", q:"Kontrolle 3: Dreieck 1 hat die Winkel $40^\\circ$ und $60^\\circ$, Dreieck 2 die Winkel $60^\\circ$ und $80^\\circ$. Ähnlich?",
  choices:["Ja – der dritte Winkel von Dreieck 1 ist $80^\\circ$, also stimmen zwei Winkel überein.","Nein – nur ein Winkel ist gleich.","Man kann es ohne Seitenlängen nicht entscheiden."], correct:0,
  why:"$180^\\circ - 40^\\circ - 60^\\circ = 80^\\circ$: Beide haben $60^\\circ$ und $80^\\circ$ → ww.", wrongWhy:{1:"Berechne erst den dritten Winkel von Dreieck 1.",2:"Für ww braucht man keine Seiten."}},
 {id:"gr-4", level:"muss", type:"mc", q:"Kontrolle 4: Dreieck 1: $50^\\circ$ und $70^\\circ$. Dreieck 2: $50^\\circ$ und $65^\\circ$. Ähnlich?",
  choices:["Ja, beide haben $50^\\circ$.","Nein – die Winkel sind $50^\\circ, 70^\\circ, 60^\\circ$ bzw. $50^\\circ, 65^\\circ, 65^\\circ$."], correct:1,
  why:"Nur ein Winkelpaar stimmt überein – das reicht nicht.", wrongWhy:{0:"Ein gleicher Winkel reicht nicht, ww braucht zwei."}},
 {id:"gr-5", level:"soll", q:"Kontrolle 5: Ein $1\\,\\text{m}$ langer Stab wirft einen $1{,}25\\,\\text{m}$ langen Schatten, ein Fahnenmast gleichzeitig einen $10\\,\\text{m}$ langen. Wie hoch ist der Mast?",
  fields:[{label:"Höhe:", ans:8, unit:"m", wrong:[{v:12.5,msg:"Verhältnis verdreht: Höhe : Schatten = 1 : 1,25."}]}], hints:["$\\dfrac{h}{10} = \\dfrac{1}{1{,}25}$"], solution:"$h = 10\\,\\text{m} : 1{,}25 = 8\\,\\text{m}$"},
 {id:"gr-6", level:"soll", q:"Kontrolle 6: Försterdreieck ($45^\\circ$): Abstand zum Baum $14{,}5\\,\\text{m}$, Augenhöhe $1{,}5\\,\\text{m}$. Wie hoch ist der Baum?",
  fields:[{label:"Höhe:", ans:16, unit:"m", wrong:[{v:14.5,msg:"Die Augenhöhe fehlt noch."}]}], hints:["Bei 45° gilt: Höhe über Augenhöhe = Abstand."], solution:"$14{,}5\\,\\text{m} + 1{,}5\\,\\text{m} = 16\\,\\text{m}$"},
 {id:"gr-7", level:"soll", q:"Kontrolle 7: Ein Klassenraum ist $8{,}4\\,\\text{m}$ lang und $6{,}2\\,\\text{m}$ breit. Wie groß ist der Grundriss im Maßstab $1 : 50$?",
  fields:[{label:"Länge:", ans:16.8, unit:"cm"},{label:"Breite:", ans:12.4, unit:"cm"}], hints:["$8{,}4\\,\\text{m} = 840\\,\\text{cm}$","$840 : 50$ und $620 : 50$"], solution:"$840\\,\\text{cm} : 50 = 16{,}8\\,\\text{cm}$ und $620\\,\\text{cm} : 50 = 12{,}4\\,\\text{cm}$"},
 {id:"gr-8", level:"soll", q:"Kontrolle 8: Eine $7{,}5\\,\\text{cm}$ große Spielfigur stellt einen $1{,}80\\,\\text{m}$ großen Menschen dar. Welcher Maßstab ist das?",
  fields:[{label:"Maßstab:", ans:[1,24], ratio:true}], hints:["$1{,}80\\,\\text{m} = 180\\,\\text{cm}$","$7{,}5 : 180$ – durch $7{,}5$ teilen."], solution:"$7{,}5\\,\\text{cm} : 180\\,\\text{cm} = 1 : 24$"}
];
window.PAGE_INIT = function(){
  document.querySelectorAll(".tasks-mini").forEach(box=>{
    const ids = box.dataset.tasks.split(",");
    const h = document.createElement("h4"); h.textContent = "✅ Kontrolle"; box.appendChild(h);
    window.TASKS_GR.filter(t=>ids.indexOf(t.id)>=0).forEach(t=>App.renderTask(Object.assign({num:""}, t), {container:box}));
  });
  document.querySelectorAll(".spoiler").forEach(s=>s.addEventListener("click", ()=>s.classList.add("show")));
  App.math(document.querySelector("main")||document.body);
};
})();
