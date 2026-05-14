import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { PdfSignatureService } from '../../../core/services/pdf-signature.service';
import { selectFormValue, selectSelectedFile } from './pdf-signature.selectors';
import { signPdf, signPdfFailure, signPdfSuccess } from './pdf-signature.actions';

@Injectable()
export class PdfSignatureEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly pdfSignatureService = inject(PdfSignatureService);

  readonly signPdf$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signPdf),
      withLatestFrom(this.store.select(selectSelectedFile), this.store.select(selectFormValue)),
      switchMap(([, file, formValue]) => {
        if (!file) {
          return of(signPdfFailure({ error: 'Aucun fichier PDF sélectionné.' }));
        }

        return this.pdfSignatureService.signPdf(file, formValue).pipe(
          map((signedPdf) => signPdfSuccess({ signedPdf })),
          catchError(() => of(signPdfFailure({ error: 'Échec lors de la signature du PDF.' })))
        );
      })
    )
  );
}
