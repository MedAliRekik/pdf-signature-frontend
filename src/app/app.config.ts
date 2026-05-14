import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { pdfSignatureFeature } from './features/pdf-signature/store/pdf-signature.reducer';
import { PdfSignatureEffects } from './features/pdf-signature/store/pdf-signature.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ [pdfSignatureFeature.name]: pdfSignatureFeature.reducer }),
    provideEffects([PdfSignatureEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
};
