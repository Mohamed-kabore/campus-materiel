import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogueService } from '../../../services/catalogue.service';
import { ReservationService } from '../../../services/reservation.service';
import { Equipement } from '../../../data/donnees-initiales';
import { MessageRetour } from '../../../models/message-retour';

@Component({
  selector: 'app-gestion-liste',
  imports: [RouterLink],
  templateUrl: './gestion-liste.html',
  styleUrl: './gestion-liste.css'
})
export class GestionListe {
  readonly catalogue = inject(CatalogueService);
  readonly reservationService = inject(ReservationService);

  // message éventuel transmis par la page de création ou de modification
  readonly retour = signal<MessageRetour | null>(history.state?.retour ?? null);

  supprimer(e: Equipement) {
    // si l'équipement est libre, on demande confirmation.
    // s'il est réservé, pas besoin : le service va refuser et expliquer.
    if (this.reservationService.estDisponible(e.id)
        && !confirm(`Supprimer définitivement « ${e.nom} » du catalogue ?`)) {
      return;
    }

    const erreur = this.catalogue.supprimer(e.id);
    this.retour.set(erreur
      ? { texte: erreur, erreur: true }
      : { texte: `« ${e.nom} » a été supprimé du catalogue.`, erreur: false });
  }
}
