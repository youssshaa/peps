export default {
  id: "produit-scalaire",
  numero: 8,
  titre: "Produit scalaire",
  domaine: "Géométrie",
  icone: "🧭",
  resume: "Définitions, expressions du produit scalaire et applications (orthogonalité, Al-Kashi).",
  objectifs: [
    "Calculer un produit scalaire avec différentes formules",
    "Démontrer l'orthogonalité de deux vecteurs",
    "Utiliser le produit scalaire pour calculer un angle ou une longueur",
    "Appliquer la formule d'Al-Kashi dans un triangle",
  ],
  sections: [
    {
      titre: "Définitions du produit scalaire",
      html: `<p>Le produit scalaire de deux vecteurs $\\vec{u}$ et $\\vec{v}$, noté $\\vec{u}\\cdot\\vec{v}$, peut se calculer de plusieurs façons :</p>
      <ul>
        <li><strong>Avec les coordonnées</strong> : si $\\vec{u}(x\\,;\\,y)$ et $\\vec{v}(x'\\,;\\,y')$, $\\vec{u}\\cdot\\vec{v}=xx'+yy'$.</li>
        <li><strong>Avec les normes et l'angle</strong> : $\\vec{u}\\cdot\\vec{v}=\\|\\vec{u}\\|\\times\\|\\vec{v}\\|\\times\\cos(\\vec{u},\\vec{v})$.</li>
        <li><strong>Avec les normes (identité de polarisation)</strong> : $\\vec{u}\\cdot\\vec{v}=\\dfrac12\\left(\\|\\vec{u}+\\vec{v}\\|^2-\\|\\vec{u}\\|^2-\\|\\vec{v}\\|^2\\right)$.</li>
      </ul>`,
    },
    {
      titre: "Orthogonalité",
      html: `<p>Deux vecteurs $\\vec{u}$ et $\\vec{v}$ sont <strong>orthogonaux</strong> si et seulement si $\\vec{u}\\cdot\\vec{v}=0$. C'est la méthode la plus rapide pour démontrer que deux droites sont perpendiculaires en géométrie repérée.</p>
      <p class="exemple"><strong>Exemple.</strong> $\\vec{u}(2\\,;\\,3)$ et $\\vec{v}(-3\\,;\\,2)$ : $\\vec{u}\\cdot\\vec{v}=2\\times(-3)+3\\times2=-6+6=0$, donc $\\vec{u}\\perp\\vec{v}$.</p>`,
    },
    {
      titre: "Propriétés",
      html: `<p>Le produit scalaire est symétrique et bilinéaire :</p>
      <ul>
        <li>$\\vec{u}\\cdot\\vec{v}=\\vec{v}\\cdot\\vec{u}$</li>
        <li>$\\vec{u}\\cdot(\\vec{v}+\\vec{w})=\\vec{u}\\cdot\\vec{v}+\\vec{u}\\cdot\\vec{w}$</li>
        <li>$\\vec{u}\\cdot\\vec{u}=\\|\\vec{u}\\|^2$</li>
      </ul>`,
    },
    {
      titre: "Formule d'Al-Kashi",
      html: `<p>Dans un triangle $ABC$, avec $a=BC$, $b=AC$, $c=AB$ :
      $$a^2 = b^2+c^2-2bc\\cos(\\widehat{A})$$
      Cette formule généralise le théorème de Pythagore (elle redonne Pythagore quand $\\widehat A = 90°$).</p>`,
    },
  ],
  formules: [
    { terme: "Produit scalaire (coordonnées)", expr: "\\vec{u}\\cdot\\vec{v} = xx'+yy'" },
    { terme: "Produit scalaire (angle)", expr: "\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\|\\,\\|\\vec{v}\\|\\cos(\\vec u,\\vec v)" },
    { terme: "Orthogonalité", expr: "\\vec{u}\\perp\\vec{v} \\iff \\vec{u}\\cdot\\vec{v}=0" },
    { terme: "Norme au carré", expr: "\\vec{u}\\cdot\\vec{u} = \\|\\vec{u}\\|^2" },
    { terme: "Al-Kashi", expr: "a^2 = b^2+c^2-2bc\\cos(\\widehat A)" },
  ],
  quiz: [
    { type: "num", q: "$\\vec{u}(3\\,;\\,4)$ et $\\vec{v}(2\\,;\\,-1)$. Calculer $\\vec{u}\\cdot\\vec{v}$.", correct: 2, tol: 0.01, expl: "$\\vec{u}\\cdot\\vec{v}=3\\times2+4\\times(-1)=6-4=2$." },
    { type: "qcm", q: "Si $\\vec{u}\\cdot\\vec{v}=0$ avec $\\vec u,\\vec v$ non nuls, alors :", choices: ["$\\vec u$ et $\\vec v$ sont colinéaires", "$\\vec u$ et $\\vec v$ sont orthogonaux", "$\\vec u=\\vec v$"], correct: 1, expl: "Un produit scalaire nul (vecteurs non nuls) caractérise l'orthogonalité." },
    { type: "vf", q: "$\\vec{u}(1\\,;\\,2)$ et $\\vec{v}(-2\\,;\\,1)$ sont orthogonaux.", correct: true, expl: "$\\vec u\\cdot\\vec v = 1\\times(-2)+2\\times1=-2+2=0$." },
    { type: "num", q: "Calculer $\\vec u \\cdot \\vec u$ pour $\\vec u(3\\,;\\,4)$.", correct: 25, tol: 0.01, expl: "$\\vec u\\cdot\\vec u=\\|\\vec u\\|^2=3^2+4^2=25$." },
    { type: "qcm", q: "Dans un triangle rectangle en $A$, la formule d'Al-Kashi redonne :", choices: ["le théorème de Thalès", "le théorème de Pythagore", "la formule d'Euler"], correct: 1, expl: "Quand $\\widehat A=90°$, $\\cos(\\widehat A)=0$ et $a^2=b^2+c^2$ : c'est Pythagore." },
    { type: "num", q: "Triangle $ABC$ avec $b=5$, $c=7$, $\\widehat A=60°$ (donc $\\cos\\widehat A=0{,}5$). Calculer $a^2$.", correct: 39, tol: 0.5, expl: "$a^2=5^2+7^2-2\\times5\\times7\\times0{,}5=25+49-35=39$." },
    { type: "qcm", q: "Le produit scalaire $\\vec u\\cdot(\\vec v+\\vec w)$ est égal à :", choices: ["$\\vec u\\cdot\\vec v+\\vec u\\cdot\\vec w$", "$\\vec u\\cdot\\vec v\\times\\vec u\\cdot\\vec w$", "$2\\vec u\\cdot\\vec v$"], correct: 0, expl: "Le produit scalaire est bilinéaire (distributif sur l'addition vectorielle)." },
    { type: "vf", q: "Le produit scalaire de deux vecteurs peut être négatif.", correct: true, expl: "Si l'angle entre les deux vecteurs est obtus, $\\cos$ est négatif, donc le produit scalaire l'est aussi." },
    { type: "num", q: "$\\vec u(x\\,;\\,3)$ et $\\vec v(2\\,;\\,-6)$ sont orthogonaux. Trouver $x$.", correct: 9, tol: 0.01, expl: "$2x-18=0 \\Rightarrow x=9$." },
    { type: "qcm", q: "$\\vec u\\cdot\\vec v = \\|\\vec u\\|\\|\\vec v\\|\\cos(\\vec u,\\vec v)$. Si $\\vec u$ et $\\vec v$ sont colinéaires de même sens, $\\cos(\\vec u,\\vec v)$ vaut :", choices: ["$0$", "$1$", "$-1$"], correct: 1, expl: "L'angle entre deux vecteurs colinéaires de même sens est $0$, et $\\cos(0)=1$." },
  ],
};
