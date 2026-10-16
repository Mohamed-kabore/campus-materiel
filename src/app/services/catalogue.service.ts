import { Injectable, inject, signal } from '@angular/core';
import { Equipement, EQUIPEMENTS_INITIAUX } from '../data/donnees-initiales';
import { CLE_EQUIPEMENTS, StockageService } from './stockage.service';
import { ReservationService } from './reservation.service';

// Les données saisies dans le formulaire : un équipement sans son id
export type DonneesEquipement = Omit<Equipement, 'id'>;

@Injectable({ providedIn: 'root' })
export class CatalogueService {
  private readonly stockage = inject(StockageService);
  private readonly reservationService = inject(ReservationService);

  private readonly state = signal<Equipement[]>(
    this.stockage.lire(CLE_EQUIPEMENTS, EQUIPEMENTS_INITIAUX)
  );

  readonly equipements = this.state.asReadonly();

  // Retrouver un équipement par son id (undefined s'il n'existe pas)
  trouver(id: number): Equipement | undefined {
    return this.state().find((e) => e.id === id);
  }

  // Créer un équipement, renvoie l'équipement créé
  ajouter(donnees: DonneesEquipement): Equipement {
    const equipement: Equipement = { id: this.prochainId(), ...donnees };
    this.state.update((liste) => [...liste, equipement]);
    this.sauvegarder();
    return equipement;
  }

  // Modifier un équipement existant (l'id ne change jamais)
  modifier(id: number, donnees: DonneesEquipement): string | null {
    if (!this.trouver(id)) {
      return 'Cet équipement n\'existe pas.';
    }

    this.state.update((liste) =>
      liste.map((e) => (e.id === id ? { id: id, ...donnees } : e))
    );
    this.sauvegarder();
    return null;
  }

  // Supprimer un équipement, interdit s'il est réservé
  supprimer(id: number): string | null {
    if (!this.trouver(id)) {
      return 'Cet équipement n\'existe pas.';
    }

    if (!this.reservationService.estDisponible(id)) {
      return 'Suppression impossible : cet équipement est actuellement réservé par un étudiant.';
    }

    this.state.update((liste) => liste.filter((e) => e.id !== id));
    this.sauvegarder();
    return null;
  }

  // Nouvel id = plus grand id existant + 1
  // (surtout pas length + 1 : après une suppression on pourrait
  // redonner un id déjà utilisé par un autre équipement)
  private prochainId(): number {
    const ids = this.state().map((e) => e.id);
    return Math.max(0, ...ids) + 1;
  }

  private sauvegarder(): void {
    this.stockage.ecrire(CLE_EQUIPEMENTS, this.state());
  }
}