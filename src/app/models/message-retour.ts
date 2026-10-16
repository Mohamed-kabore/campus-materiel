// Message affiché après une action (réserver, annuler, supprimer...)
// erreur = true pour un refus, false pour une confirmation
export interface MessageRetour {
  texte: string;
  erreur: boolean;
}