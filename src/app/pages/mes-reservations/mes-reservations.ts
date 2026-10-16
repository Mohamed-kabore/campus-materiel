import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { ReservationService } from '../../services/reservation.service';
import { CatalogueService } from '../../services/catalogue.service';
import { MessageRetour } from '../../models/message-retour';

@Component({
  selector: 'app-mes-reservations',
  imports: [RouterLink],
  templateUrl: './mes-reservations.html',
  styleUrl: './mes-reservations.css'
})
export class MesReservations {
  private readonly session = inject(SessionService);
  private readonly reservationService = inject(ReservationService);
  private readonly catalogue = inject(CatalogueService);

  readonly retour = signal<MessageRetour | null>(null);

  // les réservations de l'étudiant connecté, avec l'équipement associé
  readonly lignes = computed(() => {
    const compte = this.session.compte();
    if (!compte) {
      return [];
    }

    return this.reservationService.reservationsDe(compte.id).map((r) => ({
      reservation: r,
      equipement: this.catalogue.trouver(r.equipementId),
    }));
  });

  annuler(reservationId: string, nom: string) {
    const compte = this.session.compte();
    if (!compte) {
      return;
    }
    const erreur = this.reservationService.annuler(reservationId, compte);
    this.retour.set(erreur
      ? { texte: erreur, erreur: true }
      : { texte: `Réservation annulée : ${nom} est de nouveau disponible.`, erreur: false });
  }
}
