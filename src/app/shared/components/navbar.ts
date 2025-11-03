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
  `
})
export class NavbarComponent {}
