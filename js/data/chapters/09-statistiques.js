export default {
  id: "statistiques",
  numero: 9,
  titre: "Statistiques descriptives",
  domaine: "Probabilités & Statistiques",
  icone: "📉",
  resume: "Résumés d'une série statistique : moyenne, variance, écart-type.",
  objectifs: [
    "Calculer la moyenne, la variance et l'écart-type d'une série",
    "Comparer deux séries statistiques à l'aide de leurs résumés",
    "Utiliser l'effet d'une transformation affine sur les paramètres",
  ],
  sections: [
    {
      titre: "Moyenne et effectifs",
      html: `<p>Pour une série de valeurs $x_1,\\dots,x_p$ avec effectifs $n_1,\\dots,n_p$ (effectif total $N=\\sum n_i$), la moyenne est :
      $$\\bar x = \\frac{1}{N}\\sum_{i=1}^{p} n_i x_i$$</p>`,
    },
    {
      titre: "Variance et écart-type",
      html: `<p>La <strong>variance</strong> mesure la dispersion des valeurs autour de la moyenne :
      $$V = \\frac{1}{N}\\sum_{i=1}^{p} n_i (x_i-\\bar x)^2$$
      L'<strong>écart-type</strong> $\\sigma = \\sqrt{V}$ s'exprime dans la même unité que les données, ce qui le rend plus facile à interpréter que la variance.</p>
      <p>Plus l'écart-type est grand, plus les valeurs sont dispersées autour de la moyenne.</p>`,
    },
    {
      titre: "Effet d'une transformation affine",
      html: `<p>Si l'on transforme chaque donnée $x_i$ en $y_i = ax_i+b$ :</p>
      <ul>
        <li>$\\bar y = a\\bar x+b$</li>
        <li>$\\sigma_y = |a|\\,\\sigma_x$ (le décalage $b$ n'a aucun effet sur la dispersion)</li>
      </ul>
      <p class="exemple"><strong>Exemple.</strong> Si les notes sur 20 ont pour moyenne $12$ et écart-type $3$, les notes converties sur 100 (multiplication par 5) ont pour moyenne $60$ et écart-type $15$.</p>`,
    },
  ],
  formules: [
    { terme: "Moyenne", expr: "\\bar x = \\dfrac{1}{N}\\sum n_i x_i" },
    { terme: "Variance", expr: "V = \\dfrac{1}{N}\\sum n_i(x_i-\\bar x)^2" },
    { terme: "Écart-type", expr: "\\sigma = \\sqrt{V}" },
    { terme: "Transformation affine — moyenne", expr: "\\overline{ax+b} = a\\bar x+b" },
    { terme: "Transformation affine — écart-type", expr: "\\sigma_{ax+b} = |a|\\sigma_x" },
  ],
  quiz: [
    { type: "num", q: "Série : 2, 4, 6, 8 (effectifs égaux). Calculer la moyenne.", correct: 5, tol: 0.01, expl: "$\\bar x = \\dfrac{2+4+6+8}{4}=\\dfrac{20}{4}=5$." },
    { type: "qcm", q: "L'écart-type d'une série mesure :", choices: ["la valeur centrale", "la dispersion des données autour de la moyenne", "le nombre de données"], correct: 1, expl: "L'écart-type quantifie à quel point les valeurs s'éloignent en moyenne de $\\bar x$." },
    { type: "vf", q: "Si toutes les valeurs d'une série sont identiques, l'écart-type vaut 0.", correct: true, expl: "Si $x_i=\\bar x$ pour tout $i$, alors $V=0$ donc $\\sigma=0$." },
    { type: "num", q: "Une série a pour moyenne $\\bar x = 10$ et écart-type $\\sigma=2$. On applique $y=3x$. Quelle est la nouvelle moyenne ?", correct: 30, tol: 0.01, expl: "$\\bar y = a\\bar x = 3\\times10=30$ (ici $b=0$)." },
    { type: "num", q: "Même série, calculer le nouvel écart-type $\\sigma_y$ (avec $y=3x$).", correct: 6, tol: 0.01, expl: "$\\sigma_y=|a|\\sigma_x=3\\times2=6$." },
    { type: "qcm", q: "Ajouter une constante $b$ à toutes les données :", choices: ["change la moyenne mais pas l'écart-type", "change l'écart-type mais pas la moyenne", "ne change ni l'un ni l'autre"], correct: 0, expl: "Un décalage translate la moyenne ($+b$) mais ne modifie pas la dispersion des données." },
    { type: "vf", q: "Deux séries peuvent avoir la même moyenne mais des écart-types différents.", correct: true, expl: "La moyenne ne dit rien sur la dispersion : deux séries centrées pareil peuvent être plus ou moins étalées." },
    { type: "num", q: "Série : 1, 2, 3 avec effectifs 2, 1, 1 (effectif total 4). Calculer la moyenne.", correct: 1.75, tol: 0.02, expl: "$\\bar x=\\dfrac{2\\times1+1\\times2+1\\times3}{4}=\\dfrac{7}{4}=1{,}75$." },
    { type: "qcm", q: "La variance est toujours :", choices: ["positive ou nulle", "négative", "égale à la moyenne"], correct: 0, expl: "C'est une somme de carrés divisée par un effectif positif : elle est donc toujours $\\ge0$." },
    { type: "num", q: "Une série a une variance $V=16$. Quel est son écart-type ?", correct: 4, tol: 0.01, expl: "$\\sigma=\\sqrt{V}=\\sqrt{16}=4$." },
  ],
};
