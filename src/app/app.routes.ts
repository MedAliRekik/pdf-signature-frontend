import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'pdf-signature' },
      {
        path: 'pdf-signature',
        loadChildren: () => import('./features/pdf-signature/pdf-signature.routes').then(m => m.PDF_SIGNATURE_ROUTES)
      }
    ]
  }
];
