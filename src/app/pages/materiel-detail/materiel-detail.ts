import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogueService } from '../../services/catalogue.service';
import { ReservationService } from '../../services/reservation.service';
import { SessionService } from '../../services/session.service';
import { MessageRetour } from '../../models/message-retour';

@Component({
  selector: 'app-materiel-detail',
  imports: [RouterLink],
  templateUrl: './materiel-detail.html',
  styleUrl: './materiel-detail.css'
})
export class MaterielDetail {
  private readonly catalogue = inject(CatalogueService);
  readonly reservationService = inject(ReservationService);
  readonly session = inject(SessionService);

  readonly id = input.required<string>();
  readonly retour = signal<MessageRetour | null>(null);

  // l'équipement correspondant, ou undefined s'il n'existe pas
  readonly equipement = computed(() => {
    const id = Number(this.id());
    if (!Number.isInteger(id)) {
      return undefined;
    }
    return this.catalogue.trouver(id);
  });

  // la réservation active de cet équipement (undefined s'il est libre)
  readonly reservation = computed(() => {
    const e = this.equipement();
    return e ? this.reservationService.reservationDe(e.id) : undefined;
  });

  // vrai si c'est l'étudiant connecté qui a réservé cet équipement
  readonly reserveParMoi = computed(() => {
    const r = this.reservation();
    const compte = this.session.compte();
    return r !== undefined && compte !== null && r.etudiantId === compte.id;
  });

  reserver(equipementId: number) {
    const compte = this.session.compte();
    if (!compte) {
      return;
    }

    const erreur = this.reservationService.reserver(equipementId, compte);
    this.retour.set(erreur
      ? { texte: erreur, erreur: true }
      : { texte: 'Réservation confirmée. Vous la retrouverez dans « Mes réservations ».', erreur: false });
  }
}
