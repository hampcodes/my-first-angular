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
  `
})
export class MainLayoutComponent {}
