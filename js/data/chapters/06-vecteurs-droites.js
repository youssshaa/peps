export default {
  id: "vecteurs-droites",
  numero: 6,
  titre: "Vecteurs, droites et repérage",
  domaine: "Géométrie",
  icone: "➡️",
  resume: "Coordonnées de vecteurs, colinéarité, équations de droites dans le plan.",
  objectifs: [
    "Calculer les coordonnées d'un vecteur et effectuer des opérations vectorielles",
    "Déterminer si deux vecteurs sont colinéaires",
    "Trouver une équation cartésienne ou un vecteur directeur d'une droite",
    "Étudier le parallélisme de deux droites",
  ],
  sections: [
    {
      titre: "Coordonnées d'un vecteur",
      html: `<p>Dans un repère $(O\\,;\\,\\vec{i},\\vec{j})$, si $A(x_A\\,;\\,y_A)$ et $B(x_B\\,;\\,y_B)$, alors :
      $$\\vec{AB}\\begin{pmatrix}x_B-x_A \\\\ y_B-y_A\\end{pmatrix}$$
      Norme (longueur) : $\\|\\vec{AB}\\| = \\sqrt{(x_B-x_A)^2+(y_B-y_A)^2} = AB$.</p>`,
    },
    {
      titre: "Opérations sur les vecteurs",
      html: `<p>Si $\\vec{u}\\begin{pmatrix}x\\\\y\\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix}x'\\\\y'\\end{pmatrix}$ :
      $$\\vec{u}+\\vec{v}\\begin{pmatrix}x+x'\\\\y+y'\\end{pmatrix} \\qquad k\\vec{u}\\begin{pmatrix}kx\\\\ky\\end{pmatrix}$$
      Milieu de $[AB]$ : $I\\left(\\dfrac{x_A+x_B}{2}\\,;\\,\\dfrac{y_A+y_B}{2}\\right)$.</p>`,
    },
    {
      titre: "Colinéarité",
      html: `<p>Deux vecteurs $\\vec{u}\\begin{pmatrix}x\\\\y\\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix}x'\\\\y'\\end{pmatrix}$ sont <strong>colinéaires</strong> si et seulement si :
      $$xy'-x'y = 0$$
      La colinéarité sert à montrer que trois points sont alignés ou que deux droites sont parallèles.</p>`,
    },
    {
      titre: "Équation cartésienne d'une droite",
      html: `<p>Toute droite du plan admet une équation cartésienne $ax+by+c=0$ (avec $(a,b)\\neq(0,0)$), et le vecteur $\\vec{u}\\begin{pmatrix}-b\\\\a\\end{pmatrix}$ est un <strong>vecteur directeur</strong> de cette droite.</p>
      <p>Deux droites de vecteurs directeurs $\\vec{u}$ et $\\vec{v}$ sont <strong>parallèles</strong> si et seulement si $\\vec{u}$ et $\\vec{v}$ sont colinéaires.</p>
      <p class="exemple"><strong>Exemple.</strong> La droite $2x-3y+6=0$ admet le vecteur directeur $\\vec{u}\\begin{pmatrix}3\\\\2\\end{pmatrix}$.</p>`,
    },
  ],
  formules: [
    { terme: "Coordonnées de $\\vec{AB}$", expr: "\\vec{AB}\\begin{pmatrix}x_B-x_A\\\\y_B-y_A\\end{pmatrix}" },
    { terme: "Norme (distance)", expr: "AB = \\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}" },
    { terme: "Milieu de [AB]", expr: "I\\left(\\dfrac{x_A+x_B}{2}\\,;\\,\\dfrac{y_A+y_B}{2}\\right)" },
    { terme: "Colinéarité", expr: "\\vec{u},\\vec{v} \\text{ colinéaires} \\iff xy'-x'y=0" },
    { terme: "Vecteur directeur de $ax+by+c=0$", expr: "\\vec{u}\\begin{pmatrix}-b\\\\a\\end{pmatrix}" },
  ],
  quiz: [
    { type: "qcm", q: "$A(1\\,;\\,2)$ et $B(4\\,;\\,6)$. Les coordonnées de $\\vec{AB}$ sont :", choices: ["$(3\\,;\\,4)$", "$(5\\,;\\,8)$", "$(4\\,;\\,6)$"], correct: 0, expl: "$\\vec{AB}(x_B-x_A\\,;\\,y_B-y_A)=(4-1\\,;\\,6-2)=(3\\,;\\,4)$." },
    { type: "num", q: "Avec $A(1\\,;\\,2)$ et $B(4\\,;\\,6)$, calculer la distance $AB$.", correct: 5, tol: 0.01, expl: "$AB=\\sqrt{3^2+4^2}=\\sqrt{25}=5$." },
    { type: "qcm", q: "Les vecteurs $\\vec{u}(2\\,;\\,4)$ et $\\vec{v}(1\\,;\\,2)$ sont :", choices: ["colinéaires", "non colinéaires", "orthogonaux"], correct: 0, expl: "$xy'-x'y = 2\\times2-1\\times4=0$ : ils sont colinéaires." },
    { type: "num", q: "Milieu de $[AB]$ avec $A(2\\,;\\,-1)$ et $B(6\\,;\\,5)$ : donner l'abscisse du milieu.", correct: 4, tol: 0.01, expl: "$x_I=\\dfrac{2+6}{2}=4$." },
    { type: "vf", q: "Un vecteur directeur de la droite $3x-y+1=0$ est $(1\\,;\\,3)$.", correct: true, expl: "Pour $ax+by+c=0$ avec $a=3, b=-1$, un vecteur directeur est $(-b\\,;\\,a)=(1\\,;\\,3)$." },
    { type: "qcm", q: "Deux droites de vecteurs directeurs colinéaires sont :", choices: ["perpendiculaires", "parallèles", "sécantes"], correct: 1, expl: "La colinéarité des vecteurs directeurs caractérise le parallélisme des droites." },
    { type: "num", q: "$\\vec{u}(3\\,;\\,-2)$ et $\\vec{v}(x\\,;\\,4)$ sont colinéaires. Trouver $x$.", correct: -6, tol: 0.01, expl: "$3\\times4-x\\times(-2)=0 \\Rightarrow 12+2x=0 \\Rightarrow x=-6$." },
    { type: "qcm", q: "Pour montrer que 3 points $A, B, C$ sont alignés, on peut montrer que :", choices: ["$\\vec{AB}$ et $\\vec{AC}$ sont colinéaires", "$AB=AC$", "$\\vec{AB} \\perp \\vec{AC}$"], correct: 0, expl: "Trois points sont alignés si et seulement si deux vecteurs qu'ils forment sont colinéaires." },
    { type: "num", q: "Soit $\\vec{u}(6\\,;\\,8)$. Calculer sa norme $\\|\\vec{u}\\|$.", correct: 10, tol: 0.01, expl: "$\\|\\vec{u}\\|=\\sqrt{6^2+8^2}=\\sqrt{100}=10$." },
    { type: "vf", q: "La droite d'équation $x=5$ admet $(0\\,;\\,1)$ comme vecteur directeur.", correct: true, expl: "$x-5=0$ correspond à $a=1,b=0$ : vecteur directeur $(-b\\,;\\,a)=(0\\,;\\,1)$, une droite verticale." },
  ],
};
