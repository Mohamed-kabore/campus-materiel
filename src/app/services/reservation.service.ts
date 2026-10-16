import { Injectable, inject, signal } from '@angular/core';
import { Compte, Reservation, RESERVATIONS_INITIALES } from '../data/donnees-initiales';
import { CLE_RESERVATIONS, StockageService } from './stockage.service';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private readonly stockage = inject(StockageService);

  private readonly state = signal<Reservation[]>(
    this.stockage.lire(CLE_RESERVATIONS, RESERVATIONS_INITIALES)
  );

  readonly reservations = this.state.asReadonly();

  estDisponible(equipementId: number): boolean {
    return !this.state().some((r) => r.equipementId === equipementId);
  }

  // La réservation active d'un équipement (undefined s'il est libre)
  reservationDe(equipementId: number): Reservation | undefined {
    return this.state().find((r) => r.equipementId === equipementId);
  }

  // Les réservations d'un étudiant (pour "Mes réservations")
  reservationsDe(etudiantId: number): Reservation[] {
    return this.state().filter((r) => r.etudiantId === etudiantId);
  }

  // Réserver un équipement on renvoie null si tout s'est bien passé, sinon le message d'erreur.

  reserver(equipementId: number, compte: Compte): string | null {
    // seul un étudiant peut réserver
    if (compte.role !== 'student') {
      return 'Seuls les étudiants peuvent réserver du matériel.';
    }

    // un équipement ne peut avoir qu'une seule réservation active
    if (!this.estDisponible(equipementId)) {
      return 'Cet équipement est déjà réservé.';
    }

    const reservation: Reservation = {
      id: crypto.randomUUID(),
      equipementId: equipementId,
      etudiantId: compte.id,
    };

    this.state.update((liste) => [...liste, reservation]);
    this.sauvegarder();
    return null;
  }

  // Annuler une réservation 
  
  annuler(reservationId: string, compte: Compte): string | null {
    const reservation = this.state().find((r) => r.id === reservationId);

    if (!reservation) {
      return 'Cette réservation n\'existe plus.';
    }

    // un étudiant ne peut annuler que SES réservations
    if (reservation.etudiantId !== compte.id) {
      return 'Vous ne pouvez annuler que vos propres réservations.';
    }

    this.state.update((liste) => liste.filter((r) => r.id !== reservationId));
    this.sauvegarder();
    return null;
  }

  private sauvegarder(): void {
    this.stockage.ecrire(CLE_RESERVATIONS, this.state());
  }
}