export default {
  id: "probabilites-conditionnelles",
  numero: 10,
  titre: "Probabilités conditionnelles",
  domaine: "Probabilités & Statistiques",
  icone: "🎲",
  resume: "Probabilité conditionnelle, indépendance, arbres pondérés et formule des probabilités totales.",
  objectifs: [
    "Calculer une probabilité conditionnelle",
    "Construire et utiliser un arbre pondéré",
    "Reconnaître deux événements indépendants",
    "Appliquer la formule des probabilités totales",
  ],
  sections: [
    {
      titre: "Probabilité conditionnelle",
      html: `<p>Soit $A$ et $B$ deux événements avec $P(A)\\neq0$. La probabilité de $B$ <strong>sachant $A$</strong> est :
      $$P_A(B) = \\frac{P(A\\cap B)}{P(A)}$$
      On en déduit la formule des probabilités composées : $P(A\\cap B) = P(A)\\times P_A(B)$.</p>`,
    },
    {
      titre: "Arbre pondéré",
      html: `<p>Un arbre pondéré représente une succession d'expériences. Règles :</p>
      <ul>
        <li>La somme des probabilités sur les branches issues d'un même nœud vaut $1$.</li>
        <li>La probabilité d'un chemin est le <strong>produit</strong> des probabilités le long des branches.</li>
        <li>La probabilité d'un événement est la <strong>somme</strong> des probabilités des chemins qui y mènent.</li>
      </ul>`,
    },
    {
      titre: "Formule des probabilités totales",
      html: `<p>Si $A_1, A_2, \\dots, A_n$ forment une <strong>partition</strong> de l'univers (événements disjoints dont l'union est l'univers, chacun de probabilité non nulle), alors pour tout événement $B$ :
      $$P(B) = \\sum_{i=1}^{n} P(A_i)\\times P_{A_i}(B)$$
      Cas particulier très fréquent avec $A$ et $\\bar A$ : $P(B) = P(A)\\times P_A(B) + P(\\bar A)\\times P_{\\bar A}(B)$.</p>`,
    },
    {
      titre: "Indépendance",
      html: `<p>Deux événements $A$ et $B$ sont <strong>indépendants</strong> si le fait que $A$ soit réalisé ne change pas la probabilité de $B$ :
      $$A \\text{ et } B \\text{ indépendants} \\iff P(A\\cap B) = P(A)\\times P(B) \\iff P_A(B) = P(B)$$</p>`,
    },
  ],
  formules: [
    { terme: "Probabilité conditionnelle", expr: "P_A(B) = \\dfrac{P(A\\cap B)}{P(A)}" },
    { terme: "Probabilités composées", expr: "P(A\\cap B) = P(A)\\times P_A(B)" },
    { terme: "Probabilités totales (cas $A,\\bar A$)", expr: "P(B) = P(A)P_A(B)+P(\\bar A)P_{\\bar A}(B)" },
    { terme: "Indépendance", expr: "P(A\\cap B) = P(A)\\times P(B)" },
  ],
  quiz: [
    { type: "num", q: "$P(A)=0{,}4$ et $P(A\\cap B)=0{,\\,}12$. Calculer $P_A(B)$.", correct: 0.3, tol: 0.02, expl: "$P_A(B)=\\dfrac{P(A\\cap B)}{P(A)}=\\dfrac{0{,}12}{0{,}4}=0{,}3$." },
    { type: "qcm", q: "Dans un arbre pondéré, la probabilité d'un chemin s'obtient en :", choices: ["additionnant les probabilités des branches", "multipliant les probabilités des branches", "prenant la plus grande probabilité du chemin"], correct: 1, expl: "On multiplie les probabilités le long d'un même chemin." },
    { type: "vf", q: "La somme des probabilités des branches issues d'un même nœud d'un arbre vaut toujours 1.", correct: true, expl: "C'est une propriété fondamentale des arbres de probabilité : elles forment une partition." },
    { type: "num", q: "$P(A)=0{,}6$, $P_A(B)=0{,}5$, $P(\\bar A)=0{,}4$, $P_{\\bar A}(B)=0{,}25$. Calculer $P(B)$.", correct: 0.4, tol: 0.02, expl: "$P(B)=0{,}6\\times0{,}5+0{,}4\\times0{,}25=0{,}3+0{,}1=0{,}4$." },
    { type: "qcm", q: "$A$ et $B$ sont indépendants si et seulement si :", choices: ["$P(A\\cap B)=0$", "$P(A\\cap B)=P(A)\\times P(B)$", "$P(A)=P(B)$"], correct: 1, expl: "C'est la définition mathématique de l'indépendance de deux événements." },
    { type: "num", q: "On tire deux cartes avec remise dans un jeu où $P(\\text{as})=\\dfrac{1}{13}$. Ces tirages étant indépendants, calculer $P(\\text{as puis as})$ (arrondir à 0,01 près).", correct: 0.01, tol: 0.005, expl: "$P=\\dfrac{1}{13}\\times\\dfrac{1}{13}=\\dfrac{1}{169}\\approx0{,}0059\\approx0{,}01$." },
    { type: "vf", q: "Si $A$ et $B$ sont incompatibles (disjoints) et tous deux de probabilité non nulle, alors ils sont indépendants.", correct: false, expl: "Au contraire : si $A$ est réalisé, $B$ ne peut pas l'être, donc $P_A(B)=0\\neq P(B)$ en général : ils ne sont pas indépendants." },
    { type: "qcm", q: "$P_A(B)$ se lit :", choices: ["probabilité de $A$ et $B$", "probabilité de $B$ sachant $A$", "probabilité de $A$ sachant $B$"], correct: 1, expl: "La notation $P_A(B)$ désigne la probabilité conditionnelle de $B$ sachant que $A$ est réalisé." },
    { type: "num", q: "$P(A)=0{,}3$ et $P(A\\cap B)=0{,}18$. En déduire $P_A(B)$.", correct: 0.6, tol: 0.02, expl: "$P_A(B)=\\dfrac{0{,}18}{0{,}3}=0{,}6$." },
    { type: "qcm", q: "Une partition de l'univers est formée d'événements :", choices: ["indépendants deux à deux", "disjoints, dont l'union est l'univers", "de même probabilité"], correct: 1, expl: "Une partition regroupe des événements deux à deux incompatibles dont la réunion forme l'univers entier." },
  ],
};
