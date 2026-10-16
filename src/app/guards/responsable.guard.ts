import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

// Même logique que etudiantGuard, pour le rôle responsable
export const responsableGuard: CanActivateFn = (_, state) => {
  const session = inject(SessionService);
  const router = inject(Router);

  if (!session.estConnecte()) return router.createUrlTree(
    ['/login'], { queryParams: { returnUrl: state.url } }
  );

  return session.estResponsable()
    ? true : router.parseUrl('/acces-refuse');
};