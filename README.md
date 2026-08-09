# MathPrem — Réviser les maths de Première

Un site de révision statique (HTML/CSS/JS, aucun build requis) pour les élèves de
Première suivant la spécialité mathématiques du système français. Il couvre les
12 chapitres du programme, avec cours, quiz, jeux et un mode quiz en groupe façon
Kahoot.

## Fonctionnalités

- **12 chapitres complets** : Second degré, Suites, Dérivation, Étude de
  fonctions, Exponentielle, Vecteurs & droites, Trigonométrie, Produit
  scalaire, Statistiques, Probabilités conditionnelles, Variables aléatoires
  & échantillonnage, Algorithmique.
- **Pour chaque chapitre** : une fiche de cours illustrée d'exemples, une
  fiche de formules (flashcards), un quiz d'entraînement auto-corrigé et un
  test chronométré avec correction détaillée.
- **Jeux de révision** : flashcards (toutes matières ou par chapitre), un
  memory des formules, et un Chrono Quiz (20 questions, 20s chacune, tout le
  programme mélangé).
- **Quiz en groupe façon Kahoot** :
  - *Mode Buzzer* — un seul écran/vidéoprojecteur, 2 à 6 équipes, buzzer et
    classement en direct. Fonctionne entièrement hors-ligne.
  - *Mode en ligne (bêta)* — chaque joueur rejoint depuis son propre appareil
    via un code de salle, connexion directe entre navigateurs par WebRTC
    (librairie [PeerJS](https://peerjs.com/)), sans backend ni compte à créer.
    Nécessite une connexion internet correcte des deux côtés ; si le réseau
    (Wi-Fi d'établissement scolaire, pare-feu...) bloque WebRTC, le mode
    Buzzer reste la solution de repli fiable.
- **Progression enregistrée localement** (`localStorage`) : XP, séries de
  bonnes réponses par chapitre, meilleurs scores aux tests, streak de jours
  d'utilisation. Rien n'est envoyé à un serveur.

## Stack technique

Pas de framework ni d'étape de build : HTML, CSS et JavaScript (modules ES)
purs, servis tels quels. Dépendances externes chargées par CDN :

- [KaTeX](https://katex.org/) pour l'affichage des formules mathématiques.
- [PeerJS](https://peerjs.com/) pour la connexion WebRTC du mode en ligne.
- Google Fonts (Poppins/Inter) pour la typographie.

## Développement local

Comme il n'y a pas de build, un simple serveur statique suffit :

```bash
python3 -m http.server 8080
# puis ouvrir http://localhost:8080
```

## Structure du projet

```
index.html            Coquille de l'application (SPA à routage par hash)
css/styles.css         Toute la feuille de style
js/main.js              Point d'entrée, déclare les routes
js/lib/                 Routeur, moteur de quiz, stockage local, utilitaires UI
js/data/chapters/       Un fichier par chapitre (cours, formules, banque de quiz)
js/views/                Une vue par section (accueil, chapitre, jeux, quiz en groupe, progression)
```

## Déploiement

Le site est déployé sur GitHub Pages via `.github/workflows/deploy.yml` à
chaque push sur la branche `claude/french-math-study-site-ypgrt0`.
