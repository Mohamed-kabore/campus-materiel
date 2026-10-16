import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';


export const authGuard: CanActivateFn = (_, state) => {
  const session = inject(SessionService);
  const router = inject(Router);

  return session.estConnecte() ? true : router.createUrlTree(
    ['/login'], { queryParams: { returnUrl: state.url } }
  );
};