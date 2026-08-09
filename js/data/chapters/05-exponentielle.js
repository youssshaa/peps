export default {
  id: "exponentielle",
  numero: 5,
  titre: "Fonction exponentielle",
  domaine: "Analyse",
  icone: "🚀",
  resume: "Définition, propriétés algébriques, dérivée et variations de la fonction exponentielle.",
  objectifs: [
    "Connaître la définition et les propriétés de la fonction exponentielle",
    "Utiliser les règles de calcul sur les puissances de $e$",
    "Dériver des expressions faisant intervenir $\\exp$",
    "Résoudre des équations et inéquations avec exponentielle",
  ],
  sections: [
    {
      titre: "Définition",
      html: `<p>La fonction exponentielle, notée $\\exp$ ou $x \\mapsto e^x$, est l'unique fonction dérivable sur $\\mathbb{R}$ telle que :
      $$f' = f \\qquad \\text{et} \\qquad f(0) = 1$$
      On note $e = \\exp(1) \\approx 2{,}718$. Elle est <strong>strictement positive</strong> sur $\\mathbb{R}$.</p>`,
    },
    {
      titre: "Propriétés algébriques",
      html: `<p>Pour tous réels $a, b$ et tout entier $n$ :</p>
      <ul>
        <li>$e^{a+b} = e^a \\times e^b$</li>
        <li>$e^{-a} = \\dfrac{1}{e^a}$</li>
        <li>$e^{a-b} = \\dfrac{e^a}{e^b}$</li>
        <li>$(e^a)^n = e^{na}$</li>
        <li>$e^0 = 1$</li>
      </ul>
      <p class="exemple"><strong>Exemple.</strong> $e^3 \\times e^{-5} = e^{3-5}=e^{-2}=\\dfrac{1}{e^2}$.</p>`,
    },
    {
      titre: "Dérivée et variations",
      html: `<p>La fonction $\\exp$ est égale à sa propre dérivée : $(e^x)' = e^x$. Comme $e^x>0$ pour tout $x$, la fonction exponentielle est <strong>strictement croissante</strong> sur $\\mathbb{R}$.</p>
      <p>Pour une fonction composée $x \\mapsto e^{u(x)}$ : $\\left(e^{u}\\right)' = u' \\times e^{u}$.</p>
      <p class="exemple"><strong>Exemple.</strong> $f(x)=e^{2x+1}$ : $f'(x)=2e^{2x+1}$.</p>`,
    },
    {
      titre: "Équations et inéquations",
      html: `<p>Comme $\\exp$ est strictement croissante, elle est injective : pour tous réels $a,b$,
      $$e^a=e^b \\iff a=b \\qquad \\text{et} \\qquad e^a < e^b \\iff a<b$$
      Cela permet de résoudre des équations en « passant au log » de manière intuitive dès la 1ère, en comparant les exposants.</p>`,
    },
  ],
  formules: [
    { terme: "Propriété fondamentale", expr: "\\exp' = \\exp,\\ \\exp(0)=1" },
    { terme: "Somme d'exposants", expr: "e^{a+b} = e^a\\times e^b" },
    { terme: "Opposé d'exposant", expr: "e^{-a} = \\dfrac{1}{e^a}" },
    { terme: "Dérivée composée", expr: "\\left(e^{u}\\right)' = u'\\,e^{u}" },
    { terme: "Injectivité", expr: "e^a=e^b \\iff a=b" },
  ],
  quiz: [
    { type: "qcm", q: "La fonction exponentielle est strictement :", choices: ["croissante sur $\\mathbb{R}$", "décroissante sur $\\mathbb{R}$", "croissante puis décroissante"], correct: 0, expl: "Comme $e^x>0$ pour tout $x$ et $(e^x)'=e^x$, la fonction est strictement croissante sur tout $\\mathbb{R}$." },
    { type: "qcm", q: "$e^{a+b}$ est égal à :", choices: ["$e^a+e^b$", "$e^a \\times e^b$", "$e^{ab}$"], correct: 1, expl: "Règle de calcul fondamentale de l'exponentielle." },
    { type: "num", q: "Simplifier $e^5 \\times e^{-2}$ sous la forme $e^k$ : donner $k$.", correct: 3, tol: 0.01, expl: "$e^5\\times e^{-2}=e^{5-2}=e^3$." },
    { type: "vf", q: "Pour tout réel $x$, $e^x > 0$.", correct: true, expl: "La fonction exponentielle ne s'annule jamais et reste toujours strictement positive." },
    { type: "qcm", q: "La dérivée de $f(x) = e^{3x}$ est :", choices: ["$e^{3x}$", "$3e^{3x}$", "$3x\\,e^{3x-1}$"], correct: 1, expl: "$\\left(e^{u}\\right)'=u'e^u$ avec $u(x)=3x$, donc $u'(x)=3$." },
    { type: "num", q: "Résoudre $e^{x} = e^{7}$. Quelle est la solution ?", correct: 7, tol: 0.01, expl: "Par injectivité de $\\exp$, $e^x=e^7 \\iff x=7$." },
    { type: "qcm", q: "$\\dfrac{e^{8}}{e^{3}}$ est égal à :", choices: ["$e^{5}$", "$e^{11}$", "$e^{24}$"], correct: 0, expl: "$\\dfrac{e^a}{e^b}=e^{a-b}=e^{8-3}=e^5$." },
    { type: "vf", q: "L'équation $e^x = -3$ admet une solution réelle.", correct: false, expl: "$e^x$ est toujours strictement positif, il ne peut jamais être négatif." },
    { type: "num", q: "Soit $f(x)=e^{-x}$. Calculer $f'(x)$ puis évaluer $f'(0)$.", correct: -1, tol: 0.01, expl: "$f'(x)=-e^{-x}$ (car $u(x)=-x$, $u'(x)=-1$), donc $f'(0)=-1$." },
    { type: "qcm", q: "$(e^{2})^{3}$ est égal à :", choices: ["$e^{5}$", "$e^{6}$", "$e^{8}$"], correct: 1, expl: "$(e^a)^n=e^{na}=e^{2\\times3}=e^6$." },
  ],
};
