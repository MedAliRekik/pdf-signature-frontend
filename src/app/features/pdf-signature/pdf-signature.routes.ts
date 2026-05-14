import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { PdfSignaturePageComponent } from './pages/pdf-signature-page/pdf-signature-page.component';
import { PdfSignatureEffects } from './store/pdf-signature.effects';
import { pdfSignatureFeature } from './store/pdf-signature.reducer';

export const PDF_SIGNATURE_ROUTES: Routes = [
  {
    path: '',
    component: PdfSignaturePageComponent,
    providers: [provideState(pdfSignatureFeature), provideEffects(PdfSignatureEffects)]
  }
];
