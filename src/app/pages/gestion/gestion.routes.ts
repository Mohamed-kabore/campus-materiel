import { Routes } from '@angular/router';
import { GestionListe } from './gestion-liste/gestion-liste';
import { GestionNouveau } from './gestion-nouveau/gestion-nouveau';
import { GestionModifier } from './gestion-modifier/gestion-modifier';

// Routes de l'espace responsable.
// Ce fichier est chargé seulement quand on va sur /gestion (lazy loading)
export const GESTION_ROUTES: Routes = [
  { path: '', component: GestionListe, title: 'Gestion du catalogue' },
  { path: 'nouveau', component: GestionNouveau, title: 'Nouvel équipement' },
  { path: ':id/modifier', component: GestionModifier, title: 'Modifier un équipement' },
];