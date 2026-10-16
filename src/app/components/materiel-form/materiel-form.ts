import { Component, OnInit, input, output, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CATEGORIES, Categorie, Equipement } from '../../data/donnees-initiales';
import { DonneesEquipement } from '../../services/catalogue.service';

// Validateur qui vérifie la longueur sans compter les espaces

function longueurMin(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valeur = (control.value ?? '').trim();
    return valeur.length >= min ? null : { tropCourt: { min: min } };
  };
}

// les noms des champs du formulaire
type Champ = 'nom' | 'categorie' | 'description' | 'localisation';

// Formulaire utilisé à la fois pour créer et pour modifier un équipement.

@Component({
  selector: 'app-materiel-form',
  imports: [ReactiveFormsModule],
  templateUrl: './materiel-form.html',
  styleUrl: './materiel-form.css'
})
export class MaterielForm implements OnInit {
  readonly equipement = input<Equipement>();
  readonly libelleBouton = input('Enregistrer');

  // envoie les données validées à la page parente
  readonly enregistrer = output<DonneesEquipement>();

  readonly categories = CATEGORIES;

  // devient true au premier clic sur le bouton d'envoi
  readonly soumis = signal(false);

  readonly formulaire = new FormGroup({
    nom: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, longueurMin(3)],
    }),
    categorie: new FormControl<Categorie | ''>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, longueurMin(10)],
    }),
    localisation: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, longueurMin(1)],
    }),
  });

  // en modification : on remplit les champs avec l'équipement reçu
  ngOnInit() {
    const e = this.equipement();
    if (e) {
      this.formulaire.setValue({
        nom: e.nom,
        categorie: e.categorie,
        description: e.description,
        localisation: e.localisation,
      });
    }
  }

  // on affiche l'erreur d'un champ seulement si l'utilisateur l'a déjà touché ou a essayé d'envoyer 
  afficherErreur(champ: Champ): boolean {
    const control = this.formulaire.controls[champ];
    return control.invalid && (control.touched || this.soumis());
  }

  valider() {
    this.soumis.set(true);

    if (this.formulaire.invalid) {
      // on affiche toutes les erreurs sans vider les champs
      this.formulaire.markAllAsTouched();
      return;
    }

    const valeurs = this.formulaire.getRawValue();
    this.enregistrer.emit({
      nom: valeurs.nom.trim(),
      categorie: valeurs.categorie as Categorie,
      description: valeurs.description.trim(),
      localisation: valeurs.localisation.trim(),
    });
  }
}
