import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Equipement } from '../../data/donnees-initiales';

// Carte qui affiche un équipement dans le catalogue.
// Elle ne connaît pas les services : c'est la page parente
// qui lui donne l'équipement et sa disponibilité.
@Component({
  selector: 'app-equipement-card',
  imports: [RouterLink],
  templateUrl: './equipement-card.html',
  styleUrl: './equipement-card.css'
})
export class EquipementCard {
  readonly equipement = input.required<Equipement>();
  readonly disponible = input.required<boolean>();
}