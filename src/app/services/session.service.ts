import { Injectable, computed, inject, signal } from '@angular/core';
import { Compte, COMPTES_INITIAUX } from '../data/donnees-initiales';
import { CLE_SESSION, StockageService } from './stockage.service';

// Connexion simulée pour la démonstration.
@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly stockage = inject(StockageService);

  
  private readonly state = signal<Compte | null>(this.restaurer());

  readonly compte = this.state.asReadonly();
  readonly estConnecte = computed(() => this.state() !== null);
  readonly estEtudiant = computed(() => this.state()?.role === 'student');
  readonly estResponsable = computed(() => this.state()?.role === 'manager');

  
  readonly comptesDemo = COMPTES_INITIAUX;

  connecter(compteId: number): string | null {
    const compte = COMPTES_INITIAUX.find((c) => c.id === compteId);
    if (!compte) {
      return 'Ce compte de démonstration n\'existe pas.';
    }

    this.state.set(structuredClone(compte));

    this.stockage.ecrire(CLE_SESSION, compte.id);
    return null;
  }

  deconnecter(): void {
    this.state.set(null);
    this.stockage.supprimer(CLE_SESSION);
  }

  
  private restaurer(): Compte | null {
    try {
      const texte = localStorage.getItem(CLE_SESSION);
      if (texte === null) {
        return null; // personne n'était connecté
      }
      const id = Number(JSON.parse(texte));
      return COMPTES_INITIAUX.find((c) => c.id === id) ?? null;
    } catch {
      return null;
    }
  }
}