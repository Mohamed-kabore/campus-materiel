import { Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SessionService } from '../../services/session.service';

// Adaptée de la diapo 39 (jour 4) : on n'accepte que nos propres pages
// comme destination de retour, sinon on va au catalogue.
function safeReturn(value: unknown) {
  const allowed = /^\/(catalogue|materiels\/\d+|mes-reservations|gestion(?:\/nouveau|\/\d+\/modifier)?)$/;
  return typeof value === 'string' && allowed.test(value)
    ? value : '/catalogue';
}

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  readonly session = inject(SessionService);
  private readonly router = inject(Router);

  // rempli automatiquement avec ?returnUrl=... dans l'adresse
  readonly returnUrl = input<string>();
  readonly erreur = signal('');

  seConnecter(compteId: number) {
    const message = this.session.connecter(compteId);
    if (message) {
      this.erreur.set(message);
      return;
    }

    // replaceUrl : le bouton Précédent ne ramène pas sur la connexion
    this.router.navigateByUrl(safeReturn(this.returnUrl()), { replaceUrl: true });
  }
}