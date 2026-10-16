import { Injectable, signal } from '@angular/core';

// Les clés utilisées dans le localStorage (cm = Campus Matériel)
export const CLE_EQUIPEMENTS = 'cm-equipements';
export const CLE_RESERVATIONS = 'cm-reservations';
export const CLE_SESSION = 'cm-session';

@Injectable({ providedIn: 'root' })
export class StockageService {
  // Message affiché à l'utilisateur si le localStorage pose problème
  // null = tout va bien
  readonly erreur = signal<string | null>(null);

  // Lit une donnée enregistrée.
  // Si la clé n'existe pas encore (premier lancement), on part des
  // données initiales du prof et on les enregistre.
  lire<T>(cle: string, donneesInitiales: T): T {
    try {
      const texte = localStorage.getItem(cle);

      // Important : on teste "null" (clé absente) et pas "tableau vide".
      // Un [] enregistré est une vraie donnée, par exemple quand
      // toutes les réservations ont été annulées.
      if (texte === null) {
        const copie = structuredClone(donneesInitiales);
        this.ecrire(cle, copie);
        return copie;
      }

      const valeur = JSON.parse(texte);

      // si on attendait un tableau et qu'on lit autre chose,
      // la donnée est abîmée : on la traite comme une erreur de lecture
      if (Array.isArray(donneesInitiales) && !Array.isArray(valeur)) {
        throw new Error('Donnée enregistrée invalide');
      }

      return valeur as T;
    } catch {
      // données illisibles (JSON cassé) ou localStorage bloqué
      this.erreur.set(
        "Impossible de lire les données enregistrées. L'application repart des données de départ."
      );
      return structuredClone(donneesInitiales);
    }
  }

  // Enregistre une donnée. Renvoie false si l'enregistrement a échoué.
  ecrire(cle: string, valeur: unknown): boolean {
    try {
      localStorage.setItem(cle, JSON.stringify(valeur));
      return true;
    } catch {
      this.erreur.set(
        "Impossible d'enregistrer les données. Vos dernières modifications seront perdues au rechargement."
      );
      return false;
    }
  }

  // Supprime une donnée (servira pour la déconnexion)
  supprimer(cle: string): void {
    try {
      localStorage.removeItem(cle);
    } catch {
      // si ça échoue, il n'y a rien de plus à faire
    }
  }

  // Efface toutes les données de l'application et relance la page :
  // au redémarrage, les services rechargent les données initiales du prof.
  // (extension facultative du sujet : réinitialisation de la démo)
  reinitialiser(): void {
    this.supprimer(CLE_EQUIPEMENTS);
    this.supprimer(CLE_RESERVATIONS);
    this.supprimer(CLE_SESSION);
    window.location.reload();
  }
}