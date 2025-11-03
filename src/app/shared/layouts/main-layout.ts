import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <div class="main-layout">
      <app-navbar></app-navbar>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
      <footer class="footer">
        <p>&copy; 2025 FakeStore App - Powered by HampCode</p>
      </footer>
    </div>
  `,
  styles: [`
    .main-layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .content {
      flex: 1;
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
    }

    .footer {
      background-color: #f5f5f5;
      padding: 1.5rem;
      text-align: center;
      color: #666;
      border-top: 1px solid #ddd;
    }

    .footer p {
      margin: 0;
    }
  `]
})
export class MainLayoutComponent {}
