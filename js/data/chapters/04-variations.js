export default {
  id: "variations",
  numero: 4,
  titre: "Étude des variations d'une fonction",
  domaine: "Analyse",
  icone: "📊",
  resume: "Tableaux de variation, extremums et applications de la dérivée à l'étude de fonctions.",
  objectifs: [
    "Dresser un tableau de variation à partir du signe de la dérivée",
    "Déterminer les extremums d'une fonction sur un intervalle",
    "Comparer deux fonctions ou résoudre un problème d'optimisation",
  ],
  sections: [
    {
      titre: "Méthode générale",
      html: `<p>Pour étudier les variations d'une fonction $f$ dérivable sur un intervalle $I$ :</p>
      <ol>
        <li>Calculer $f'(x)$ ;</li>
        <li>Étudier le signe de $f'(x)$ sur $I$ (souvent via un second degré ou un produit) ;</li>
        <li>En déduire le tableau de variations : $f$ croissante là où $f'\\ge0$, décroissante là où $f'\\le0$.</li>
      </ol>`,
    },
    {
      titre: "Extremums",
      html: `<p>Si $f'$ s'annule <strong>en changeant de signe</strong> en $x_0$, alors $f$ admet un extremum local en $x_0$ :</p>
      <ul>
        <li>maximum si $f'$ passe de $+$ à $-$ ;</li>
        <li>minimum si $f'$ passe de $-$ à $+$.</li>
      </ul>
      <p>Attention : si $f'(x_0)=0$ sans changement de signe (par exemple $f(x)=x^3$ en $0$), il n'y a pas d'extremum.</p>`,
    },
    {
      titre: "Fonctions de référence",
      html: `<p>Quelques variations à connaître par cœur :</p>
      <ul>
        <li>$x \\mapsto x^2$ : décroissante sur $]-\\infty\\,;\\,0]$, croissante sur $[0\\,;\\,+\\infty[$.</li>
        <li>$x \\mapsto \\sqrt{x}$ : croissante sur $[0\\,;\\,+\\infty[$.</li>
        <li>$x \\mapsto \\dfrac{1}{x}$ : décroissante sur $]-\\infty\\,;\\,0[$ et sur $]0\\,;\\,+\\infty[$.</li>
        <li>$x \\mapsto x^3$ : croissante sur $\\mathbb{R}$.</li>
      </ul>`,
    },
    {
      titre: "Problèmes d'optimisation",
      html: `<p>De nombreux problèmes concrets (aire maximale, coût minimal...) se ramènent à l'étude des variations d'une fonction : on modélise la grandeur à optimiser par une fonction $f(x)$, on étudie son signe de dérivée, puis on lit l'extremum dans le tableau de variations.</p>`,
    },
  ],
  formules: [
    { terme: "Critère de croissance", expr: "f'(x) \\ge 0 \\iff f \\text{ croissante}" },
    { terme: "Critère de décroissance", expr: "f'(x) \\le 0 \\iff f \\text{ décroissante}" },
    { terme: "Extremum local", expr: "f'(x_0)=0 \\text{ et } f' \\text{ change de signe}" },
  ],
  quiz: [
    { type: "qcm", q: "Soit $f(x)=x^2-4x+3$. Sur quel intervalle $f$ est-elle décroissante ?", choices: ["$]-\\infty\\,;\\,2]$", "$[2\\,;\\,+\\infty[$", "$\\mathbb{R}$"], correct: 0, expl: "$f'(x)=2x-4$, négative pour $x\\le2$ : $f$ décroît sur $]-\\infty\\,;\\,2]$." },
    { type: "num", q: "$f(x)=x^2-4x+3$ admet un minimum en $x=$ ?", correct: 2, tol: 0.01, expl: "$f'(x)=2x-4=0 \\Rightarrow x=2$, et $f'$ passe de − à + : minimum en $x=2$." },
    { type: "vf", q: "Si $f'(x_0)=0$ mais que $f'$ ne change pas de signe autour de $x_0$, alors $f$ admet un extremum en $x_0$.", correct: false, expl: "Sans changement de signe, il n'y a pas d'extremum (exemple : $f(x)=x^3$ en $0$)." },
    { type: "qcm", q: "La fonction $x \\mapsto \\dfrac{1}{x}$ est :", choices: ["croissante sur $]0\\,;\\,+\\infty[$", "décroissante sur $]0\\,;\\,+\\infty[$", "constante"], correct: 1, expl: "Sa dérivée $-\\dfrac{1}{x^2}$ est strictement négative sur $]0\\,;\\,+\\infty[$." },
    { type: "num", q: "On veut maximiser l'aire $A(x)=x(10-x)$ pour $x\\in[0\\,;\\,10]$. Pour quelle valeur de $x$ l'aire est-elle maximale ?", correct: 5, tol: 0.01, expl: "$A'(x)=10-2x=0 \\Rightarrow x=5$, et $A'$ passe de + à − : maximum en $x=5$." },
    { type: "qcm", q: "Un tableau de variations indique $f'(x)<0$ sur $]2\\,;\\,5[$. On en déduit que $f$ est :", choices: ["croissante sur $]2\\,;\\,5[$", "décroissante sur $]2\\,;\\,5[$", "constante sur $]2\\,;\\,5[$"], correct: 1, expl: "Une dérivée strictement négative signifie que $f$ est strictement décroissante." },
    { type: "num", q: "$f(x)=x^3-3x$. Calculer $f'(x)$ puis résoudre $f'(x)=0$ : donner la solution positive.", correct: 1, tol: 0.01, expl: "$f'(x)=3x^2-3=3(x-1)(x+1)$, nulle en $x=-1$ et $x=1$." },
    { type: "vf", q: "Une fonction peut être décroissante sur $]-\\infty\\,;\\,0[$ et sur $]0\\,;\\,+\\infty[$ sans être décroissante sur $\\mathbb{R}$ tout entier.", correct: true, expl: "C'est le cas de $x\\mapsto\\dfrac1x$ : décroissante sur chaque intervalle, mais pas globalement (elle change de signe en 0)." },
    { type: "qcm", q: "Pour trouver le minimum d'une fonction sur $[a\\,;\\,b]$, il faut aussi penser à comparer :", choices: ["seulement les extremums locaux", "les extremums locaux ET les valeurs aux bornes $a$ et $b$", "seulement $f(a)$ et $f(b)$"], correct: 1, expl: "Le minimum global peut être atteint à un bord de l'intervalle plutôt qu'en un extremum local." },
    { type: "num", q: "$f(x)=-2x^2+8x+1$. En quelle valeur de $x$ le maximum est-il atteint ?", correct: 2, tol: 0.01, expl: "$f'(x)=-4x+8=0 \\Rightarrow x=2$." },
  ],
};
