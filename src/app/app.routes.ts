import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'products',
        loadChildren: () => import('./features/products/products.routes')
          .then(m => m.PRODUCTS_ROUTES)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];
