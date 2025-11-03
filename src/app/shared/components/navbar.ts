import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <h1>FakeStore</h1>
      </div>
      <ul class="navbar-menu">
        <li>
          <a routerLink="/products" routerLinkActive="active">
            Productos
          </a>
        </li>
        <li>
          <a routerLink="/products/create" routerLinkActive="active">
            Crear Producto
          </a>
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #1976d2;
      color: white;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .navbar-brand h1 {
      margin: 0;
      font-size: 1.5rem;
    }

    .navbar-menu {
      list-style: none;
      display: flex;
      gap: 2rem;
      margin: 0;
      padding: 0;
    }

    .navbar-menu a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .navbar-menu a:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .navbar-menu a.active {
      background-color: rgba(255, 255, 255, 0.2);
      font-weight: bold;
    }
  `]
})
export class NavbarComponent {}
