import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogueService } from '../../services/catalogue.service';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-materiel-detail',
  imports: [RouterLink],
  templateUrl: './materiel-detail.html',
  styleUrl: './materiel-detail.css'
})
export class MaterielDetail {
  private readonly catalogue = inject(CatalogueService);
  readonly reservationService = inject(ReservationService);

  // rempli automatiquement avec le :id de l'adresse (withComponentInputBinding)
  readonly id = input.required<string>();

  // l'équipement correspondant, ou undefined s'il n'existe pas
  readonly equipement = computed(() => {
    // le paramètre arrive en texte : on le convertit et on le vérifie
    const id = Number(this.id());
    if (!Number.isInteger(id)) {
      return undefined;
    }
    return this.catalogue.trouver(id);
  });
}