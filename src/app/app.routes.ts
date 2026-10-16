import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Catalogue } from './pages/catalogue/catalogue';
import { MaterielDetail } from './pages/materiel-detail/materiel-detail';
import { MesReservations } from './pages/mes-reservations/mes-reservations';
import { AccesRefuse } from './pages/acces-refuse/acces-refuse';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  // pour l'instant on envoie vers le catalogue,
  // à l'étape 4 la redirection dépendra de la session
  { path: '', redirectTo: 'catalogue', pathMatch: 'full' },

  // pages publiques
  { path: 'login', component: Login, title: 'Connexion' },
  { path: 'acces-refuse', component: AccesRefuse, title: 'Accès refusé' },

  // pages privées (les guards seront ajoutés à l'étape 4)
  { path: 'catalogue', component: Catalogue, title: 'Catalogue' },
  { path: 'materiels/:id', component: MaterielDetail, title: 'Fiche matériel' },
  { path: 'mes-reservations', component: MesReservations, title: 'Mes réservations' },

  // espace responsable chargé à la demande (diapo 43 du jour 4)
  { path: 'gestion',
    loadChildren: () => import('./pages/gestion/gestion.routes')
      .then(m => m.GESTION_ROUTES)
  },

  // toujours en dernier : toutes les adresses inconnues
  { path: '**', component: NotFound, title: 'Page introuvable' },
];