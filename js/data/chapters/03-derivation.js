export default {
  id: "derivation",
  numero: 3,
  titre: "Dérivation",
  domaine: "Analyse",
  icone: "📈",
  resume: "Nombre dérivé, tangente, fonction dérivée et formules de dérivation.",
  objectifs: [
    "Interpréter le nombre dérivé comme coefficient directeur de la tangente",
    "Déterminer l'équation d'une tangente en un point",
    "Calculer la dérivée d'une fonction usuelle ou composée simple",
    "Utiliser la dérivée pour étudier les variations d'une fonction",
  ],
  sections: [
    {
      titre: "Nombre dérivé et tangente",
      html: `<p>Le nombre dérivé de $f$ en $a$, noté $f'(a)$, est la limite du taux d'accroissement :
      $$f'(a) = \\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$$
      Il représente le <strong>coefficient directeur de la tangente</strong> à la courbe de $f$ au point d'abscisse $a$.</p>
      <p>Équation de la tangente au point $A(a\\,;\\,f(a))$ :
      $$y = f'(a)(x-a)+f(a)$$</p>`,
    },
    {
      titre: "Fonction dérivée",
      html: `<p>Si $f'(x)$ existe pour tout $x$ d'un intervalle, on définit la <strong>fonction dérivée</strong> $f'$. Dérivées des fonctions usuelles :</p>
      <table class="tableau-formules">
        <tr><th>$f(x)$</th><th>$f'(x)$</th></tr>
        <tr><td>$k$ (constante)</td><td>$0$</td></tr>
        <tr><td>$x$</td><td>$1$</td></tr>
        <tr><td>$x^n$</td><td>$nx^{n-1}$</td></tr>
        <tr><td>$\\dfrac{1}{x}$</td><td>$-\\dfrac{1}{x^2}$</td></tr>
        <tr><td>$\\sqrt{x}$</td><td>$\\dfrac{1}{2\\sqrt{x}}$</td></tr>
      </table>`,
    },
    {
      titre: "Opérations sur les dérivées",
      html: `<p>Pour $u$ et $v$ dérivables et $k$ une constante :</p>
      <ul>
        <li>$(u+v)' = u'+v'$</li>
        <li>$(ku)' = ku'$</li>
        <li>$(uv)' = u'v+uv'$</li>
        <li>$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v-uv'}{v^2}$ (avec $v\\neq0$)</li>
        <li>$(u^n)' = n u' u^{n-1}$</li>
      </ul>
      <p class="exemple"><strong>Exemple.</strong> $f(x)=(2x+1)(x-3)$ : avec $u=2x+1,\\ v=x-3$, $f'(x)=2(x-3)+(2x+1)\\times1=4x-5$.</p>`,
    },
    {
      titre: "Dérivée et variations",
      html: `<p>Sur un intervalle : si $f'(x) \\ge 0$ alors $f$ est croissante ; si $f'(x)\\le0$ alors $f$ est décroissante ; si $f'(x)=0$ en un point où $f'$ change de signe, $f$ admet un extremum local en ce point.</p>`,
    },
  ],
  formules: [
    { terme: "Nombre dérivé", expr: "f'(a) = \\lim_{h\\to0}\\dfrac{f(a+h)-f(a)}{h}" },
    { terme: "Équation de la tangente", expr: "y = f'(a)(x-a)+f(a)" },
    { terme: "Dérivée de $x^n$", expr: "(x^n)' = nx^{n-1}" },
    { terme: "Dérivée d'un produit", expr: "(uv)' = u'v+uv'" },
    { terme: "Dérivée d'un quotient", expr: "\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v-uv'}{v^2}" },
    { terme: "Dérivée de $\\sqrt{x}$", expr: "(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}" },
  ],
  quiz: [
    { type: "qcm", q: "Le nombre dérivé $f'(a)$ correspond graphiquement :", choices: ["à l'ordonnée du point $A$", "au coefficient directeur de la tangente en $A$", "à l'aire sous la courbe"], correct: 1, expl: "$f'(a)$ est la pente de la tangente à la courbe au point d'abscisse $a$." },
    { type: "num", q: "Calculer $f'(x)$ pour $f(x)=3x^2-5x+7$, puis évaluer $f'(1)$.", correct: 1, tol: 0.01, expl: "$f'(x)=6x-5$, donc $f'(1)=6-5=1$." },
    { type: "qcm", q: "La dérivée de $f(x)=\\dfrac{1}{x}$ est :", choices: ["$\\dfrac{1}{x^2}$", "$-\\dfrac{1}{x^2}$", "$-\\dfrac{1}{x}$"], correct: 1, expl: "Formule du cours : $\\left(\\dfrac1x\\right)'=-\\dfrac{1}{x^2}$." },
    { type: "num", q: "Soit $f(x)=x^3$. Donner l'équation réduite de la tangente en $a=1$ sous la forme $y=mx+p$ : quelle est la valeur de $m$ ?", correct: 3, tol: 0.01, expl: "$f'(x)=3x^2$, donc $f'(1)=3$ : le coefficient directeur est $3$." },
    { type: "vf", q: "Si $f'(x) \\ge 0$ sur un intervalle $I$, alors $f$ est décroissante sur $I$.", correct: false, expl: "Une dérivée positive ou nulle indique au contraire que $f$ est croissante sur $I$." },
    { type: "qcm", q: "Pour $f(x) = (x-2)(x+5)$, la dérivée $f'(x)$ vaut :", choices: ["$2x+3$", "$2x-3$", "$x+3$"], correct: 0, expl: "$f(x)=x^2+3x-10$ donc $f'(x)=2x+3$." },
    { type: "num", q: "Si $f'(2)=0$ et $f'$ change de signe de + à − en $x=2$, quelle est la nature de l'extremum ? (répondre 1 pour maximum, 2 pour minimum)", correct: 1, tol: 0.01, expl: "Si $f'$ passe de positif à négatif, $f$ passe de croissante à décroissante : c'est un maximum local." },
    { type: "qcm", q: "La dérivée d'une fonction constante $f(x)=7$ est :", choices: ["$7$", "$0$", "$x$"], correct: 1, expl: "La dérivée d'une constante est toujours nulle." },
    { type: "num", q: "Calculer $f'(x)$ pour $f(x)=5x^4$, puis évaluer $f'(1)$.", correct: 20, tol: 0.01, expl: "$f'(x)=20x^3$, donc $f'(1)=20$." },
    { type: "qcm", q: "La tangente à la courbe de $f$ en $a$ passe par le point de coordonnées :", choices: ["$(a\\,;\\,f'(a))$", "$(a\\,;\\,f(a))$", "$(0\\,;\\,f(a))$"], correct: 1, expl: "La tangente touche la courbe précisément au point $(a\\,;\\,f(a))$." },
  ],
};
