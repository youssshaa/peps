export default {
  id: "trigonometrie",
  numero: 7,
  titre: "Trigonométrie",
  domaine: "Géométrie",
  icone: "🎡",
  resume: "Cercle trigonométrique, angles orientés, radians, cosinus et sinus.",
  objectifs: [
    "Convertir des angles entre degrés et radians",
    "Placer un angle sur le cercle trigonométrique",
    "Connaître les valeurs remarquables de cosinus et sinus",
    "Utiliser les formules trigonométriques de base",
  ],
  sections: [
    {
      titre: "Le radian",
      html: `<p>Le radian est une autre unité de mesure d'angle. Un tour complet mesure $2\\pi$ radians (soit $360°$). Conversion :
      $$\\text{angle en radians} = \\text{angle en degrés} \\times \\dfrac{\\pi}{180}$$</p>`,
    },
    {
      titre: "Cercle trigonométrique",
      html: `<p>Le cercle trigonométrique est un cercle de rayon $1$, centré à l'origine, orienté dans le sens direct (sens inverse des aiguilles d'une montre). Pour un angle $x$, le point $M$ associé a pour coordonnées $M(\\cos x\\,;\\,\\sin x)$.</p>
      <p>Valeurs remarquables :</p>
      <table class="tableau-formules">
        <tr><th>$x$</th><td>$0$</td><td>$\\dfrac{\\pi}{6}$</td><td>$\\dfrac{\\pi}{4}$</td><td>$\\dfrac{\\pi}{3}$</td><td>$\\dfrac{\\pi}{2}$</td></tr>
        <tr><th>$\\cos x$</th><td>$1$</td><td>$\\dfrac{\\sqrt3}{2}$</td><td>$\\dfrac{\\sqrt2}{2}$</td><td>$\\dfrac12$</td><td>$0$</td></tr>
        <tr><th>$\\sin x$</th><td>$0$</td><td>$\\dfrac12$</td><td>$\\dfrac{\\sqrt2}{2}$</td><td>$\\dfrac{\\sqrt3}{2}$</td><td>$1$</td></tr>
      </table>`,
    },
    {
      titre: "Propriétés fondamentales",
      html: `<p>Pour tout réel $x$ :
      $$\\cos^2x+\\sin^2x=1 \\qquad -1\\le\\cos x\\le1 \\qquad -1\\le\\sin x\\le1$$
      Périodicité : $\\cos(x+2\\pi)=\\cos x$ et $\\sin(x+2\\pi)=\\sin x$.</p>
      <p>Angles associés :</p>
      <ul>
        <li>$\\cos(-x)=\\cos x$, $\\sin(-x)=-\\sin x$</li>
        <li>$\\cos(\\pi-x)=-\\cos x$, $\\sin(\\pi-x)=\\sin x$</li>
        <li>$\\cos(\\pi+x)=-\\cos x$, $\\sin(\\pi+x)=-\\sin x$</li>
      </ul>`,
    },
  ],
  formules: [
    { terme: "Conversion degrés → radians", expr: "\\text{rad} = \\text{deg}\\times\\dfrac{\\pi}{180}" },
    { terme: "Relation fondamentale", expr: "\\cos^2x+\\sin^2x=1" },
    { terme: "Parité", expr: "\\cos(-x)=\\cos x,\\ \\ \\sin(-x)=-\\sin x" },
    { terme: "Angle supplémentaire", expr: "\\cos(\\pi-x)=-\\cos x,\\ \\ \\sin(\\pi-x)=\\sin x" },
    { terme: "Périodicité", expr: "\\cos(x+2\\pi)=\\cos x" },
  ],
  quiz: [
    { type: "num", q: "Convertir $90°$ en radians (donner la valeur décimale arrondie à 0,01 près, avec $\\pi\\approx3{,}14$).", correct: 1.57, tol: 0.02, expl: "$90\\times\\dfrac{\\pi}{180}=\\dfrac{\\pi}{2}\\approx1{,}57$." },
    { type: "qcm", q: "$\\cos\\left(\\dfrac{\\pi}{3}\\right)$ vaut :", choices: ["$\\dfrac12$", "$\\dfrac{\\sqrt3}{2}$", "$\\dfrac{\\sqrt2}{2}$"], correct: 0, expl: "Valeur remarquable du cours : $\\cos\\left(\\frac{\\pi}{3}\\right)=\\frac12$." },
    { type: "num", q: "Sachant que $\\cos x = 0{,}6$, calculer $\\sin^2 x$.", correct: 0.64, tol: 0.02, expl: "$\\sin^2x=1-\\cos^2x=1-0{,}36=0{,}64$." },
    { type: "qcm", q: "$\\sin\\left(\\dfrac{\\pi}{2}\\right)$ vaut :", choices: ["$0$", "$1$", "$-1$"], correct: 1, expl: "Au sommet du cercle trigonométrique (angle $\\frac{\\pi}{2}$), le sinus vaut $1$." },
    { type: "vf", q: "Pour tout $x$, $\\cos x$ peut prendre la valeur $2$.", correct: false, expl: "Le cosinus est toujours compris entre $-1$ et $1$." },
    { type: "qcm", q: "$\\cos(\\pi + x)$ est égal à :", choices: ["$\\cos x$", "$-\\cos x$", "$\\sin x$"], correct: 1, expl: "Formule des angles associés : $\\cos(\\pi+x) = -\\cos x$." },
    { type: "num", q: "Un tour complet correspond à combien de radians (donner un nombre entier de fois $\\pi$, ex : pour $4\\pi$ répondre 4)", correct: 2, tol: 0.01, expl: "Un tour complet mesure $2\\pi$ radians." },
    { type: "qcm", q: "$\\sin(-x)$ est égal à :", choices: ["$\\sin x$", "$-\\sin x$", "$\\cos x$"], correct: 1, expl: "La fonction sinus est impaire : $\\sin(-x)=-\\sin x$." },
    { type: "num", q: "Convertir $\\dfrac{\\pi}{6}$ radians en degrés.", correct: 30, tol: 0.5, expl: "$\\dfrac{\\pi}{6}\\times\\dfrac{180}{\\pi}=30°$." },
    { type: "qcm", q: "Sur le cercle trigonométrique, le point associé à l'angle $x$ a pour coordonnées :", choices: ["$(\\sin x\\,;\\,\\cos x)$", "$(\\cos x\\,;\\,\\sin x)$", "$(x\\,;\\,\\cos x)$"], correct: 1, expl: "Par définition, $M(\\cos x\\,;\\,\\sin x)$ sur le cercle trigonométrique." },
  ],
};
