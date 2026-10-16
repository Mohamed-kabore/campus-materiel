import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StockageService } from './services/stockage.service';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly stockage = inject(StockageService);
  readonly session = inject(SessionService);
  private readonly router = inject(Router);

  constructor() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          const titre = document.querySelector<HTMLElement>('main h1');
          titre?.setAttribute('tabindex', '-1');
          titre?.focus();
        });
      }
    });
  }


  allerAuContenu(event: Event) {
    event.preventDefault();
    document.getElementById('contenu')?.focus();
  }

  deconnecter() {
    this.session.deconnecter();
    
    this.router.navigateByUrl('/login');
  }

  reinitialiserDonnees() {
    if (confirm('Toutes les données (catalogue, réservations, session) vont revenir à leur état initial. Continuer ?')) {
      this.stockage.reinitialiser();
    }
  }
}