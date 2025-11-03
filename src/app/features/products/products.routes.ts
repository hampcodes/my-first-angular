import { Routes } from '@angular/router';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/product-list')
      .then(m => m.ProductListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/product-create')
      .then(m => m.ProductCreateComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/product-detail')
      .then(m => m.ProductDetailComponent)
  }
];
