import { Injectable, signal } from '@angular/core';

// Les clés utilisées dans le localStorage (cm = Campus Matériel)
export const CLE_EQUIPEMENTS = 'cm-equipements';
export const CLE_RESERVATIONS = 'cm-reservations';
export const CLE_SESSION = 'cm-session';

@Injectable({ providedIn: 'root' })
export class StockageService {
  
  readonly erreur = signal<string | null>(null);


  lire<T>(cle: string, donneesInitiales: T): T {
    try {
      const texte = localStorage.getItem(cle);
      if (texte === null) {
        const copie = structuredClone(donneesInitiales);
        this.ecrire(cle, copie);
        return copie;
      }

      const valeur = JSON.parse(texte);
      if (Array.isArray(donneesInitiales) && !Array.isArray(valeur)) {
        throw new Error('Donnée enregistrée invalide');
      }

      return valeur as T;
    } catch {
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

  // Supprime une donnée 
  supprimer(cle: string): void {
    try {
      localStorage.removeItem(cle);
    } catch {
    }
  }

  // On efface toutes les données de l'application et relance la page 
  reinitialiser(): void {
    this.supprimer(CLE_EQUIPEMENTS);
    this.supprimer(CLE_RESERVATIONS);
    this.supprimer(CLE_SESSION);
    window.location.reload();
  }
}