import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

// Sur le modèle de l'adminGuard de la diapo 32 :
// il vérifie lui-même la connexion, puis le rôle.
export const etudiantGuard: CanActivateFn = (_, state) => {
  const session = inject(SessionService);
  const router = inject(Router);

  if (!session.estConnecte()) return router.createUrlTree(
    ['/login'], { queryParams: { returnUrl: state.url } }
  );

  return session.estEtudiant()
    ? true : router.parseUrl('/acces-refuse');
};