export default {
  id: "variables-aleatoires",
  numero: 11,
  titre: "Variables aléatoires & échantillonnage",
  domaine: "Probabilités & Statistiques",
  icone: "🎯",
  resume: "Loi de probabilité, espérance, répétition d'épreuves et intervalle de fluctuation.",
  objectifs: [
    "Déterminer la loi de probabilité d'une variable aléatoire",
    "Calculer une espérance mathématique",
    "Comprendre la répétition d'expériences identiques et indépendantes",
    "Utiliser un intervalle de fluctuation pour une prise de décision",
  ],
  sections: [
    {
      titre: "Variable aléatoire et loi de probabilité",
      html: `<p>Une variable aléatoire $X$ associe un nombre réel à chaque issue d'une expérience aléatoire. Sa <strong>loi de probabilité</strong> donne, pour chaque valeur possible $x_i$, la probabilité $P(X=x_i)$. On a toujours $\\sum_i P(X=x_i)=1$.</p>`,
    },
    {
      titre: "Espérance mathématique",
      html: `<p>L'espérance représente la valeur « moyenne » attendue si l'on répète l'expérience un grand nombre de fois :
      $$E(X) = \\sum_{i} x_i \\times P(X=x_i)$$
      Un jeu est dit <strong>équitable</strong> si son espérance de gain est nulle.</p>
      <p class="exemple"><strong>Exemple.</strong> Un jeu rapporte 10€ avec proba 0,2 et fait perdre 2€ avec proba 0,8 : $E(X)=10\\times0{,}2-2\\times0{,}8=2-1{,}6=0{,}4$€ (le jeu est favorable au joueur).</p>`,
    },
    {
      titre: "Répétition d'expériences identiques et indépendantes",
      html: `<p>Lorsqu'on répète $n$ fois de façon indépendante une même expérience à deux issues (succès/échec, de probabilité $p$ de succès), chaque répétition est représentée par un arbre. La probabilité d'une liste de résultats s'obtient en multipliant les probabilités le long du chemin correspondant.</p>`,
    },
    {
      titre: "Échantillonnage et intervalle de fluctuation",
      html: `<p>Pour une proportion $p$ connue dans une population, et un échantillon de taille $n$ (avec $n\\ge25$ et $np\\ge5$ et $n(1-p)\\ge5$), la fréquence observée $f$ appartient à l'intervalle de fluctuation :
      $$I = \\left[\\,p-1{,}96\\sqrt{\\dfrac{p(1-p)}{n}}\\ ;\\ p+1{,}96\\sqrt{\\dfrac{p(1-p)}{n}}\\,\\right]$$
      avec une probabilité d'environ 95%. Si la fréquence observée $f$ sort de cet intervalle, on <strong>rejette l'hypothèse</strong> que la proportion réelle est $p$.</p>`,
    },
  ],
  formules: [
    { terme: "Somme des probabilités", expr: "\\sum_i P(X=x_i) = 1" },
    { terme: "Espérance", expr: "E(X) = \\sum_i x_i P(X=x_i)" },
    { terme: "Intervalle de fluctuation (95%)", expr: "I = \\left[p-1{,}96\\sqrt{\\tfrac{p(1-p)}{n}}\\,;\\,p+1{,}96\\sqrt{\\tfrac{p(1-p)}{n}}\\right]" },
    { terme: "Conditions de validité", expr: "n\\ge25,\\ np\\ge5,\\ n(1-p)\\ge5" },
  ],
  quiz: [
    { type: "num", q: "$X$ prend les valeurs 1, 2, 3 avec $P(X=1)=0{,}2$, $P(X=2)=0{,}5$. Calculer $P(X=3)$.", correct: 0.3, tol: 0.02, expl: "La somme des probabilités vaut 1 : $P(X=3)=1-0{,}2-0{,}5=0{,}3$." },
    { type: "num", q: "$X$ suit la loi : $P(X=0)=0{,}5$, $P(X=10)=0{,}5$. Calculer $E(X)$.", correct: 5, tol: 0.1, expl: "$E(X)=0\\times0{,}5+10\\times0{,}5=5$." },
    { type: "qcm", q: "Un jeu est dit équitable lorsque :", choices: ["$E(X)=0$", "$E(X)>0$", "$E(X)=1$"], correct: 0, expl: "Un jeu équitable a une espérance de gain nulle : en moyenne, on ne gagne ni ne perd." },
    { type: "vf", q: "L'espérance $E(X)$ est toujours l'une des valeurs possibles de $X$.", correct: false, expl: "Ce n'est pas obligatoire : par exemple l'espérance d'un dé équilibré vaut 3,5, qui n'est pas une valeur possible du dé." },
    { type: "num", q: "Jeu : gain de 5€ avec $p=0{,}4$, perte de 3€ avec $p=0{,}6$. Calculer l'espérance de gain.", correct: 0.2, tol: 0.05, expl: "$E(X)=5\\times0{,}4-3\\times0{,}6=2-1{,}8=0{,}2$€." },
    { type: "qcm", q: "Pour utiliser l'intervalle de fluctuation à 95%, il faut notamment que :", choices: ["$n\\ge25$", "$n\\le25$", "$p=0{,}5$ obligatoirement"], correct: 0, expl: "Les conditions usuelles sont $n\\ge25$, $np\\ge5$ et $n(1-p)\\ge5$." },
    { type: "num", q: "$p=0{,}5$, $n=100$. Calculer la demi-largeur $1{,}96\\sqrt{\\dfrac{p(1-p)}{n}}$ (arrondir à 0,01 près).", correct: 0.098, tol: 0.01, expl: "$1{,}96\\sqrt{\\dfrac{0{,}25}{100}}=1{,}96\\times0{,}05=0{,}098$." },
    { type: "vf", q: "Si la fréquence observée dans un échantillon sort de l'intervalle de fluctuation, on peut rejeter l'hypothèse sur la proportion $p$.", correct: true, expl: "C'est exactement le principe de la prise de décision par intervalle de fluctuation." },
    { type: "qcm", q: "Dans une répétition de $n$ expériences identiques et indépendantes, la probabilité d'une succession de résultats s'obtient en :", choices: ["additionnant les probabilités", "multipliant les probabilités", "les moyennant"], correct: 1, expl: "Comme pour tout chemin d'un arbre pondéré, on multiplie les probabilités des étapes indépendantes." },
    { type: "num", q: "$X$ : $P(X=2)=0{,}3$, $P(X=4)=0{,}3$, $P(X=6)=0{,}4$. Calculer $E(X)$.", correct: 4.2, tol: 0.1, expl: "$E(X)=2\\times0{,}3+4\\times0{,}3+6\\times0{,}4=0{,}6+1{,}2+2{,}4=4{,}2$." },
  ],
};
