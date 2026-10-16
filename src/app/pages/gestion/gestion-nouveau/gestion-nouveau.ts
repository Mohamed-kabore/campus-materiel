import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CatalogueService, DonneesEquipement } from '../../../services/catalogue.service';
import { MaterielForm } from '../../../components/materiel-form/materiel-form';

@Component({
  selector: 'app-gestion-nouveau',
  imports: [RouterLink, MaterielForm],
  templateUrl: './gestion-nouveau.html',
  styleUrl: './gestion-nouveau.css'
})
export class GestionNouveau {
  private readonly catalogue = inject(CatalogueService);
  private readonly router = inject(Router);

  creer(donnees: DonneesEquipement) {
    const e = this.catalogue.ajouter(donnees);

    // retour à la liste, avec un message de confirmation
    this.router.navigate(['/gestion'], {
      state: { retour: { texte: `« ${e.nom} » a été ajouté au catalogue (n° ${e.id}).`, erreur: false } },
    });
  }
}
