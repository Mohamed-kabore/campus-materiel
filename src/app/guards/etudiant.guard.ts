import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

export const etudiantGuard: CanActivateFn = (_, state) => {
  const session = inject(SessionService);
  const router = inject(Router);

  if (!session.estConnecte()) return router.createUrlTree(
    ['/login'], { queryParams: { returnUrl: state.url } }
  );

  return session.estEtudiant()
    ? true : router.parseUrl('/acces-refuse');
};