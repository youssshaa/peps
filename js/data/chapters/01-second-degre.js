export default {
  id: "second-degre",
  numero: 1,
  titre: "Le second degré",
  domaine: "Algèbre",
  icone: "📐",
  resume: "Forme canonique, discriminant, racines, signe du trinôme et inéquations.",
  objectifs: [
    "Passer d'une forme développée à une forme canonique ou factorisée",
    "Calculer un discriminant et déterminer le nombre de racines",
    "Étudier le signe d'un trinôme du second degré",
    "Résoudre des équations et inéquations du second degré",
  ],
  sections: [
    {
      titre: "Fonction polynôme du second degré",
      html: `<p>Une fonction polynôme du second degré est une fonction $f$ définie sur $\\mathbb{R}$ par
      $$f(x) = ax^2+bx+c$$
      avec $a, b, c$ des réels et $a \\neq 0$. Sa représentation graphique est une <strong>parabole</strong> de sommet
      $S(\\alpha\\,;\\,\\beta)$, tournée vers le haut si $a>0$ et vers le bas si $a<0$.</p>`,
    },
    {
      titre: "Forme canonique",
      html: `<p>Toute fonction du second degré peut s'écrire sous forme canonique :
      $$f(x) = a(x-\\alpha)^2+\\beta \\qquad \\text{avec } \\alpha = -\\dfrac{b}{2a} \\ \\text{ et } \\ \\beta = f(\\alpha)$$</p>
      <p class="exemple"><strong>Exemple.</strong> $f(x)=2x^2-8x+5$. On a $\\alpha = -\\dfrac{-8}{2\\times 2} = 2$ et
      $\\beta = f(2) = 2\\times4-16+5=-3$, donc $f(x) = 2(x-2)^2-3$.</p>`,
    },
    {
      titre: "Discriminant et racines",
      html: `<p>Pour résoudre $ax^2+bx+c=0$, on calcule le <strong>discriminant</strong> $\\Delta = b^2-4ac$.</p>
      <ul>
        <li>Si $\\Delta > 0$ : deux racines distinctes $x_1 = \\dfrac{-b-\\sqrt{\\Delta}}{2a}$ et $x_2=\\dfrac{-b+\\sqrt{\\Delta}}{2a}$.</li>
        <li>Si $\\Delta = 0$ : une racine double $x_0 = \\dfrac{-b}{2a}$.</li>
        <li>Si $\\Delta < 0$ : aucune racine réelle (le trinôme ne s'annule jamais).</li>
      </ul>`,
    },
    {
      titre: "Factorisation, somme et produit",
      html: `<p>Lorsque $\\Delta \\ge 0$, on peut factoriser $f(x)=a(x-x_1)(x-x_2)$ (avec $x_1=x_2$ si $\\Delta=0$).</p>
      <p>Propriété utile : la somme et le produit des racines valent $x_1+x_2 = -\\dfrac{b}{a}$ et $x_1 x_2 = \\dfrac{c}{a}$.</p>`,
    },
    {
      titre: "Signe du trinôme",
      html: `<p>Règle générale : <strong>le trinôme est du signe de $a$ à l'extérieur des racines, et du signe de $-a$ entre les racines</strong> (quand elles existent).</p>
      <ul>
        <li>$\\Delta<0$ : $f(x)$ est toujours du signe de $a$.</li>
        <li>$\\Delta=0$ : $f(x)$ est du signe de $a$ partout sauf en $x_0$ où $f(x_0)=0$.</li>
        <li>$\\Delta>0$ : $f(x)$ change de signe en $x_1$ et $x_2$.</li>
      </ul>
      <p>Cette règle permet de résoudre directement les inéquations du type $ax^2+bx+c \\le 0$.</p>`,
    },
  ],
  formules: [
    { terme: "Forme canonique", expr: "f(x) = a(x-\\alpha)^2+\\beta" },
    { terme: "Abscisse du sommet", expr: "\\alpha = -\\dfrac{b}{2a}" },
    { terme: "Discriminant", expr: "\\Delta = b^2-4ac" },
    { terme: "Racines si Δ > 0", expr: "x_{1,2} = \\dfrac{-b\\pm\\sqrt{\\Delta}}{2a}" },
    { terme: "Racine double si Δ = 0", expr: "x_0 = -\\dfrac{b}{2a}" },
    { terme: "Somme des racines", expr: "x_1+x_2 = -\\dfrac{b}{a}" },
    { terme: "Produit des racines", expr: "x_1 x_2 = \\dfrac{c}{a}" },
  ],
  quiz: [
    { type: "qcm", q: "La courbe de $f(x)=-3x^2+2x-1$ est une parabole tournée vers :", choices: ["le haut", "le bas", "ni l'un ni l'autre"], correct: 1, expl: "Le coefficient $a=-3$ est négatif, donc la parabole est tournée vers le bas." },
    { type: "num", q: "Calculer le discriminant de $2x^2-3x-5=0$.", correct: 49, tol: 0.01, expl: "$\\Delta = (-3)^2-4\\times2\\times(-5)=9+40=49$." },
    { type: "qcm", q: "Une équation du second degré avec $\\Delta<0$ admet :", choices: ["deux solutions réelles", "une solution réelle", "aucune solution réelle"], correct: 2, expl: "Quand $\\Delta<0$, le trinôme ne s'annule jamais sur $\\mathbb{R}$." },
    { type: "num", q: "Résoudre $x^2-5x+6=0$ : donner la plus petite racine.", correct: 2, tol: 0.01, expl: "$\\Delta=25-24=1$, racines $\\dfrac{5\\pm1}{2}$, soit $2$ et $3$." },
    { type: "vf", q: "Pour $f(x)=a(x-\\alpha)^2+\\beta$ avec $a>0$, le minimum de $f$ vaut $\\beta$.", correct: true, expl: "Si $a>0$, $(x-\\alpha)^2\\ge0$ donc $f(x)\\ge\\beta$, avec égalité en $x=\\alpha$." },
    { type: "qcm", q: "La forme canonique de $f(x)=x^2-6x+5$ est :", choices: ["$(x-3)^2-4$", "$(x-3)^2+4$", "$(x+3)^2-4$"], correct: 0, expl: "$\\alpha=3$, $\\beta=f(3)=9-18+5=-4$." },
    { type: "qcm", q: "L'ensemble des solutions de $x^2-4 \\le 0$ est :", choices: ["$[-2\\,;\\,2]$", "$]-\\infty\\,;\\,-2]\\cup[2\\,;\\,+\\infty[$", "$\\emptyset$"], correct: 0, expl: "Les racines sont $-2$ et $2$ ; $a=1>0$ donc le trinôme est négatif entre les racines." },
    { type: "num", q: "Si $x_1$ et $x_2$ sont les racines de $2x^2+6x-1=0$, combien vaut $x_1+x_2$ ?", correct: -3, tol: 0.01, expl: "$x_1+x_2=-\\dfrac{b}{a}=-\\dfrac{6}{2}=-3$." },
    { type: "vf", q: "$f(x)=-2x^2+4x+1$ admet un maximum.", correct: true, expl: "$a=-2<0$ donc la parabole est tournée vers le bas : elle admet un maximum en son sommet." },
    { type: "qcm", q: "Combien de racines réelles a $3x^2-2x+5=0$ ?", choices: ["0", "1", "2"], correct: 0, expl: "$\\Delta=4-60=-56<0$ : pas de racine réelle." },
  ],
};
