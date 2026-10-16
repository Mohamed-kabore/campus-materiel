import { Component, inject, signal } from '@angular/core';
import { CatalogueService } from '../../services/catalogue.service';
import { ReservationService } from '../../services/reservation.service';
import { COMPTES_INITIAUX } from '../../data/donnees-initiales';

// PAGE DE TEST PROVISOIRE (étape 2), remplacée à l'étape 3
@Component({
  selector: 'app-catalogue',
  imports: [],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css'
})
export class Catalogue {
  readonly catalogue = inject(CatalogueService);
  readonly reservationService = inject(ReservationService);
  readonly message = signal('');

  // on teste avec les comptes du prof, la vraie session arrive à l'étape 4
  private readonly alice = COMPTES_INITIAUX[0];
  private readonly yanis = COMPTES_INITIAUX[1];
  private readonly camille = COMPTES_INITIAUX[2];

  aliceReserve() {
    this.message.set(this.reservationService.reserver(101, this.alice) ?? 'Alice a réservé le 101');
  }

  yanisReserve() {
    this.message.set(this.reservationService.reserver(101, this.yanis) ?? 'Yanis a réservé le 101');
  }

  camilleSupprime() {
    this.message.set(this.catalogue.supprimer(101) ?? 'Le 101 a été supprimé');
  }

  aliceAnnule() {
    const reservation = this.reservationService.reservationDe(101);
    if (!reservation) {
      this.message.set('Le 101 n\'est pas réservé');
      return;
    }
    this.message.set(this.reservationService.annuler(reservation.id, this.alice) ?? 'Alice a annulé');
  }
}