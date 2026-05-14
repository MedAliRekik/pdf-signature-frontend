import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pdf-signature' },
  {
    path: 'pdf-signature',
    loadChildren: () => import('./features/pdf-signature/pdf-signature.routes').then(m => m.PDF_SIGNATURE_ROUTES)
  }
];
