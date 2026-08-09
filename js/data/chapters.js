import c01 from "./chapters/01-second-degre.js";
import c02 from "./chapters/02-suites.js";
import c03 from "./chapters/03-derivation.js";
import c04 from "./chapters/04-variations.js";
import c05 from "./chapters/05-exponentielle.js";
import c06 from "./chapters/06-vecteurs-droites.js";
import c07 from "./chapters/07-trigonometrie.js";
import c08 from "./chapters/08-produit-scalaire.js";
import c09 from "./chapters/09-statistiques.js";
import c10 from "./chapters/10-probabilites-conditionnelles.js";
import c11 from "./chapters/11-variables-aleatoires.js";
import c12 from "./chapters/12-algorithmique.js";

export const CHAPTERS = [c01, c02, c03, c04, c05, c06, c07, c08, c09, c10, c11, c12];

export function getChapter(id) {
  return CHAPTERS.find((c) => c.id === id);
}

export function allQuizQuestions() {
  return CHAPTERS.flatMap((c) => c.quiz.map((q) => ({ ...q, chapterId: c.id, chapterTitre: c.titre })));
}

export function allFlashcards() {
  return CHAPTERS.flatMap((c) =>
    c.formules.map((f, i) => ({
      id: `${c.id}-${i}`,
      chapterId: c.id,
      chapterTitre: c.titre,
      terme: f.terme,
      expr: f.expr,
    }))
  );
}
