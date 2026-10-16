import { Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CatalogueService, DonneesEquipement } from '../../../services/catalogue.service';
import { MaterielForm } from '../../../components/materiel-form/materiel-form';

@Component({
  selector: 'app-gestion-modifier',
  imports: [RouterLink, MaterielForm],
  templateUrl: './gestion-modifier.html',
  styleUrl: './gestion-modifier.css'
})
export class GestionModifier {
  private readonly catalogue = inject(CatalogueService);
  private readonly router = inject(Router);

  
  readonly id = input.required<string>();
  readonly erreur = signal('');

  
  readonly equipement = computed(() => {
    const id = Number(this.id());
    if (!Number.isInteger(id)) {
      return undefined;
    }
    return this.catalogue.trouver(id);
  });

  modifier(donnees: DonneesEquipement) {
    const e = this.equipement();
    if (!e) {
      return;
    }

    const message = this.catalogue.modifier(e.id, donnees);
    if (message) {
      this.erreur.set(message);
      return;
    }

    this.router.navigate(['/gestion'], {
      state: { retour: { texte: `La fiche « ${donnees.nom} » a été modifiée.`, erreur: false } },
    });
  }
}
