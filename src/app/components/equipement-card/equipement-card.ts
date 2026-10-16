import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Equipement } from '../../data/donnees-initiales';

// Carte qui affiche un équipement dans le catalogue.
// Elle ne connaît pas les services : la page parente lui donne
// les infos (input) et la carte lui renvoie les demandes (output).
@Component({
  selector: 'app-equipement-card',
  imports: [RouterLink],
  templateUrl: './equipement-card.html',
  styleUrl: './equipement-card.css'
})
export class EquipementCard {
  readonly equipement = input.required<Equipement>();
  readonly disponible = input.required<boolean>();
  // false par défaut : seul un étudiant verra le bouton
  readonly peutReserver = input(false);

  // envoie l'id de l'équipement au parent
  readonly reserver = output<number>();

  demanderReservation() {
    this.reserver.emit(this.equipement().id);
  }
}