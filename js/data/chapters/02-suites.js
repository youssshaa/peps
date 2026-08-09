export default {
  id: "suites",
  numero: 2,
  titre: "Suites numériques",
  domaine: "Algèbre",
  icone: "🔢",
  resume: "Sens de variation, suites arithmétiques et géométriques, modélisation.",
  objectifs: [
    "Calculer des termes d'une suite définie explicitement ou par récurrence",
    "Étudier le sens de variation d'une suite",
    "Reconnaître et manipuler une suite arithmétique ou géométrique",
    "Modéliser une situation concrète par une suite",
  ],
  sections: [
    {
      titre: "Généralités",
      html: `<p>Une suite $(u_n)$ associe à chaque entier $n$ un réel $u_n$. Elle peut être définie :</p>
      <ul>
        <li><strong>explicitement</strong> : $u_n = f(n)$, par exemple $u_n = 3n-1$ ;</li>
        <li><strong>par récurrence</strong> : on donne $u_0$ (ou $u_1$) et une relation $u_{n+1}=f(u_n)$.</li>
      </ul>`,
    },
    {
      titre: "Sens de variation",
      html: `<p>$(u_n)$ est <strong>croissante</strong> si pour tout $n$, $u_{n+1}\\ge u_n$ ; <strong>décroissante</strong> si $u_{n+1}\\le u_n$.
      En pratique on étudie le signe de $u_{n+1}-u_n$, ou si $u_n>0$ pour tout $n$, on compare $\\dfrac{u_{n+1}}{u_n}$ à $1$.</p>`,
    },
    {
      titre: "Suites arithmétiques",
      html: `<p>$(u_n)$ est arithmétique de raison $r$ si $u_{n+1}=u_n+r$ pour tout $n$. On passe d'un terme à l'autre en <strong>ajoutant</strong> $r$.</p>
      <p>Terme général : $u_n = u_0 + nr$ (ou $u_n = u_p+(n-p)r$).</p>
      <p>Somme des $n+1$ premiers termes : $u_0+u_1+\\dots+u_n = (n+1)\\times\\dfrac{u_0+u_n}{2}$.</p>
      <p class="exemple"><strong>Exemple.</strong> $u_0=5$, $r=3$ : $u_n = 5+3n$, donc $u_{10}=35$.</p>`,
    },
    {
      titre: "Suites géométriques",
      html: `<p>$(u_n)$ est géométrique de raison $q$ si $u_{n+1}=u_n\\times q$ pour tout $n$. On passe d'un terme à l'autre en <strong>multipliant</strong> par $q$.</p>
      <p>Terme général : $u_n = u_0 \\times q^n$.</p>
      <p>Somme des $n+1$ premiers termes (si $q\\neq1$) : $u_0+u_1+\\dots+u_n = u_0\\times\\dfrac{1-q^{n+1}}{1-q}$.</p>
      <p class="exemple"><strong>Exemple.</strong> $u_0=2$, $q=3$ : $u_n=2\\times3^n$, donc $u_4=162$.</p>`,
    },
    {
      titre: "Sens de variation d'une suite géométrique",
      html: `<p>Si $u_0>0$ : $(u_n)$ est croissante si $q>1$, constante si $q=1$, décroissante si $0<q<1$.
      Si $0<q<1$ et $u_0>0$, on dit que la suite est géométrique <strong>décroissante</strong> et tend vers $0$.</p>`,
    },
  ],
  formules: [
    { terme: "Arithmétique — terme général", expr: "u_n = u_0+nr" },
    { terme: "Arithmétique — somme", expr: "\\sum_{k=0}^{n} u_k = (n+1)\\times\\dfrac{u_0+u_n}{2}" },
    { terme: "Géométrique — terme général", expr: "u_n = u_0\\times q^n" },
    { terme: "Géométrique — somme", expr: "\\sum_{k=0}^{n} u_k = u_0\\times\\dfrac{1-q^{n+1}}{1-q}" },
    { terme: "Test de croissance (récurrence)", expr: "u_{n+1}-u_n \\ge 0 \\iff \\text{croissante}" },
  ],
  quiz: [
    { type: "num", q: "Soit $(u_n)$ arithmétique avec $u_0=4$ et $r=5$. Calculer $u_6$.", correct: 34, tol: 0.01, expl: "$u_6=u_0+6r=4+30=34$." },
    { type: "num", q: "Soit $(u_n)$ géométrique avec $u_0=3$ et $q=2$. Calculer $u_5$.", correct: 96, tol: 0.01, expl: "$u_5=3\\times2^5=3\\times32=96$." },
    { type: "qcm", q: "Une suite $(u_n)$ vérifie $u_{n+1}=u_n-2$. Elle est :", choices: ["arithmétique de raison $-2$", "géométrique de raison $-2$", "ni l'un ni l'autre"], correct: 0, expl: "On ajoute une constante $-2$ à chaque étape : c'est arithmétique." },
    { type: "qcm", q: "Une suite $(u_n)$ vérifie $u_{n+1}=0{,}5\\,u_n$ avec $u_0=10$. Elle est :", choices: ["croissante", "décroissante", "constante"], correct: 1, expl: "$u_0>0$ et $0<q=0{,}5<1$ : la suite est géométrique décroissante." },
    { type: "num", q: "Calculer la somme $1+2+3+\\dots+100$.", correct: 5050, tol: 0.5, expl: "Suite arithmétique $u_0=1,r=1$ : somme $=100\\times\\dfrac{1+100}{2}=5050$." },
    { type: "vf", q: "Si $(u_n)$ est définie par $u_{n+1}=u_n^2$ et $u_0=2$, alors $(u_n)$ est arithmétique.", correct: false, expl: "La relation n'est pas de la forme $u_{n+1}=u_n+r$ : elle n'est ni arithmétique ni géométrique." },
    { type: "qcm", q: "Pour une suite géométrique de raison $q=1$, la suite est :", choices: ["strictement croissante", "strictement décroissante", "constante"], correct: 2, expl: "Multiplier par $1$ ne change pas la valeur : la suite est constante." },
    { type: "num", q: "$(u_n)$ arithmétique avec $u_3=10$ et $r=4$. Calculer $u_0$.", correct: -2, tol: 0.01, expl: "$u_3=u_0+3r \\Rightarrow 10=u_0+12 \\Rightarrow u_0=-2$." },
    { type: "qcm", q: "Une suite modélisant un capital augmentant de 3% par an est :", choices: ["arithmétique de raison 1,03", "géométrique de raison 1,03", "géométrique de raison 0,03"], correct: 1, expl: "Une augmentation de 3% correspond à une multiplication par $1{,}03$ à chaque étape." },
    { type: "num", q: "$(u_n)$ géométrique, $u_0=5$, $q=0{,}5$. Calculer $u_1+u_2$ (arrondir si besoin).", correct: 3.75, tol: 0.05, expl: "$u_1=2{,}5$ et $u_2=1{,}25$, donc $u_1+u_2=3{,}75$." },
  ],
};
