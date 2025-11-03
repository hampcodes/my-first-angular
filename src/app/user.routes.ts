import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./home').then(m => m.HomeComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./user-profile').then(m => m.UserProfileComponent)
  }
];
