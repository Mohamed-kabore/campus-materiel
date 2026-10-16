import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
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

  deconnecter() {
    this.session.deconnecter();
    // un guard ne se relance pas tout seul : on quitte nous-mêmes la page privée
    this.router.navigateByUrl('/login');
  }
}