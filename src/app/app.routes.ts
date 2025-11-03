import { Routes } from '@angular/router';
import { USER_ROUTES } from './user.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home').then(m => m.HomeComponent)
  },
  // Rutas hijas importadas desde user.routes.ts
  {
    path: 'user',
    children: USER_ROUTES
  }
];
