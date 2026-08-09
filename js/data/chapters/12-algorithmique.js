export default {
  id: "algorithmique",
  numero: 12,
  titre: "Algorithmique & Python",
  domaine: "Transversal",
  icone: "💻",
  resume: "Variables, boucles, fonctions et algorithmes classiques utilisés dans tout le programme.",
  objectifs: [
    "Lire et compléter un programme Python simple",
    "Utiliser une boucle `for` ou `while` pour calculer des termes de suite",
    "Écrire une fonction Python et l'appeler",
    "Comprendre les algorithmes classiques du programme (seuil, dichotomie)",
  ],
  sections: [
    {
      titre: "Variables et affectation",
      html: `<p>En Python, une variable stocke une valeur avec le symbole <code>=</code> (affectation, à ne pas confondre avec l'égalité mathématique) :</p>
      <pre><code>n = 5
u = 2 * n + 1   # u vaut 11</code></pre>`,
    },
    {
      titre: "Boucle for : répéter un nombre connu de fois",
      html: `<p>Pour calculer les termes d'une suite définie par récurrence, on utilise souvent une boucle <code>for</code> :</p>
      <pre><code>u = 1
for i in range(10):
    u = u * 2      # u devient u_1, u_2, ... u_10
print(u)</code></pre>
      <p><code>range(10)</code> répète le bloc <strong>10 fois</strong> (de $i=0$ à $i=9$).</p>`,
    },
    {
      titre: "Boucle while : répéter jusqu'à une condition (seuil)",
      html: `<p>Pour chercher le premier rang $n$ à partir duquel une suite dépasse un seuil, on utilise une boucle <code>while</code> :</p>
      <pre><code>u = 1
n = 0
while u < 1000:
    u = u * 2
    n = n + 1
print(n)   # premier rang où u dépasse 1000</code></pre>`,
    },
    {
      titre: "Fonctions",
      html: `<p>Une fonction Python regroupe des instructions réutilisables :</p>
      <pre><code>def carre(x):
    return x * x

print(carre(5))   # affiche 25</code></pre>`,
    },
    {
      titre: "Algorithme de dichotomie",
      html: `<p>La dichotomie permet d'approcher une solution d'équation $f(x)=0$ en réduisant à chaque étape de moitié un intervalle $[a\\,;\\,b]$ contenant la solution, en testant le signe de $f$ au milieu de l'intervalle.</p>`,
    },
  ],
  formules: [
    { terme: "Boucle bornée", expr: "\\texttt{for i in range(n):}" },
    { terme: "Boucle conditionnelle", expr: "\\texttt{while condition:}" },
    { terme: "Définir une fonction", expr: "\\texttt{def f(x): return ...}" },
    { terme: "Affectation", expr: "\\texttt{variable = valeur}" },
  ],
  quiz: [
    { type: "qcm", q: "Que fait <code>range(5)</code> dans une boucle <code>for</code> ?", choices: ["répète 5 fois", "répète 4 fois", "répète jusqu'à ce que la variable atteigne 5"], correct: 0, expl: "<code>range(5)</code> génère les entiers 0,1,2,3,4 : la boucle s'exécute donc 5 fois." },
    { type: "num", q: "Que vaut <code>u</code> après ce code : <code>u = 3</code> puis <code>for i in range(4): u = u + 2</code> ?", correct: 11, tol: 0.01, expl: "On ajoute 2 quatre fois : $3+2+2+2+2=11$." },
    { type: "qcm", q: "Une boucle <code>while</code> s'arrête lorsque :", choices: ["un nombre fixé d'itérations est atteint", "sa condition devient fausse", "elle rencontre un <code>return</code>"], correct: 1, expl: "Contrairement à <code>for</code>, une boucle <code>while</code> tourne tant que sa condition reste vraie." },
    { type: "vf", q: "En Python, le symbole <code>=</code> teste une égalité (comme en mathématiques).", correct: false, expl: "<code>=</code> est une affectation ; le test d'égalité s'écrit <code>==</code>." },
    { type: "num", q: "Combien de tours de boucle exécute <code>while u &lt; 20: u = u * 2</code> en partant de <code>u = 1</code> ?", correct: 5, tol: 0.01, expl: "1→2→4→8→16→32 : la condition devient fausse après le 5e doublement (32≥20)." },
    { type: "qcm", q: "Une fonction Python se définit avec le mot-clé :", choices: ["<code>function</code>", "<code>def</code>", "<code>func</code>"], correct: 1, expl: "En Python, on utilise <code>def nom_fonction(paramètres):</code>." },
    { type: "num", q: "Que renvoie <code>carre(4)</code> avec <code>def carre(x): return x*x</code> ?", correct: 16, tol: 0.01, expl: "$4\\times4=16$." },
    { type: "qcm", q: "L'algorithme de dichotomie sert à :", choices: ["trier une liste", "approcher une solution d'équation $f(x)=0$", "calculer une espérance"], correct: 1, expl: "La dichotomie encadre de plus en plus finement une solution en coupant l'intervalle en deux à chaque étape." },
    { type: "vf", q: "Dans <code>for i in range(n)</code>, la variable <code>i</code> commence à 1.", correct: false, expl: "En Python, <code>range(n)</code> commence à 0 et va jusqu'à $n-1$." },
    { type: "qcm", q: "Pour calculer le terme $u_{20}$ d'une suite définie par récurrence, l'outil le plus adapté est :", choices: ["une boucle", "une seule ligne de calcul", "une inéquation"], correct: 0, expl: "On répète le calcul $u_{n+1}=f(u_n)$ vingt fois grâce à une boucle." },
  ],
};
