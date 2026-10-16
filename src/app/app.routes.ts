import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Catalogue } from './pages/catalogue/catalogue';
import { MaterielDetail } from './pages/materiel-detail/materiel-detail';
import { MesReservations } from './pages/mes-reservations/mes-reservations';
import { AccesRefuse } from './pages/acces-refuse/acces-refuse';
import { NotFound } from './pages/not-found/not-found';
import { SessionService } from './services/session.service';
import { authGuard } from './guards/auth.guard';
import { etudiantGuard } from './guards/etudiant.guard';
import { responsableGuard } from './guards/responsable.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => inject(SessionService).estConnecte() ? '/catalogue' : '/login',
  },

  // pages publiques
  { path: 'login', component: Login, title: 'Connexion' },
  { path: 'acces-refuse', component: AccesRefuse, title: 'Accès refusé' },

  // pages pour tout utilisateur connecté
  { path: 'catalogue', component: Catalogue, title: 'Catalogue', canActivate: [authGuard] },
  { path: 'materiels/:id', component: MaterielDetail, title: 'Fiche matériel', canActivate: [authGuard] },

  // page réservée aux étudiants
  { path: 'mes-reservations', component: MesReservations, title: 'Mes réservations', canActivate: [etudiantGuard] },


  { path: 'gestion', canActivateChild: [responsableGuard],
    loadChildren: () => import('./pages/gestion/gestion.routes')
      .then(m => m.GESTION_ROUTES)
  },

  { path: '**', component: NotFound, title: 'Page introuvable' },
];