import { Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { CatalogueService } from '../../services/catalogue.service';
import { ReservationService } from '../../services/reservation.service';
import { CATEGORIES } from '../../data/donnees-initiales';
import { EquipementCard } from '../../components/equipement-card/equipement-card';

@Component({
  selector: 'app-catalogue',
  imports: [ReactiveFormsModule, EquipementCard],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css'
})
export class Catalogue {
  readonly catalogue = inject(CatalogueService);
  readonly reservationService = inject(ReservationService);

  readonly categories = CATEGORIES;

  // les deux champs de recherche (formulaires réactifs)
  readonly rechercheCtrl = new FormControl('', { nonNullable: true });
  readonly categorieCtrl = new FormControl('', { nonNullable: true });

  // on transforme les valeurs des champs en signals
  // (même outil que le filtre de la diapo 15 du jour 4)
  private readonly recherche = toSignal(this.rechercheCtrl.valueChanges, { initialValue: '' });
  private readonly categorie = toSignal(this.categorieCtrl.valueChanges, { initialValue: '' });

  // la liste affichée, recalculée dès qu'un filtre ou le catalogue change
  readonly equipementsFiltres = computed(() => {
    const texte = this.recherche().trim().toLowerCase();
    const categorie = this.categorie();

    return this.catalogue.equipements().filter((e) => {
      const nomOk = e.nom.toLowerCase().includes(texte);
      const categorieOk = categorie === '' || e.categorie === categorie;
      return nomOk && categorieOk;
    });
  });

  // remet les deux champs à zéro
  reinitialiser() {
    this.rechercheCtrl.setValue('');
    this.categorieCtrl.setValue('');
  }
}