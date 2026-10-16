import { Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SessionService } from '../../services/session.service';

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

  
  readonly returnUrl = input<string>();
  readonly erreur = signal('');

  seConnecter(compteId: number) {
    const message = this.session.connecter(compteId);
    if (message) {
      this.erreur.set(message);
      return;
    }
    this.router.navigateByUrl(safeReturn(this.returnUrl()), { replaceUrl: true });
  }
}