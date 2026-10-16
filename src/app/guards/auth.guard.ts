import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

// Même structure que l'authGuard de la diapo 31 (jour 4),
// sans attente : ici la session est déjà connue au démarrage.
export const authGuard: CanActivateFn = (_, state) => {
  const session = inject(SessionService);
  const router = inject(Router);

  // pas connecté : direction la connexion, en retenant la page demandée
  return session.estConnecte() ? true : router.createUrlTree(
    ['/login'], { queryParams: { returnUrl: state.url } }
  );
};