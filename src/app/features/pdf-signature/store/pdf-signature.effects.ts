import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { PdfSignatureService } from '../../../core/services/pdf-signature.service';
import { selectIsSignaturePlaced, selectSelectedFile, selectSignRequest } from './pdf-signature.selectors';
import { signPdf, signPdfFailure, signPdfSuccess } from './pdf-signature.actions';

@Injectable()
export class PdfSignatureEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly pdfSignatureService = inject(PdfSignatureService);

  readonly signPdf$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signPdf),
      withLatestFrom(
        this.store.select(selectSelectedFile),
        this.store.select(selectSignRequest),
        this.store.select(selectIsSignaturePlaced)
      ),
      switchMap(([, file, request, isPlaced]) => {
        if (!file) return of(signPdfFailure({ error: 'Veuillez importer un fichier PDF.' }));
        if (!request.signerName.trim()) return of(signPdfFailure({ error: 'Le nom du signataire est obligatoire.' }));
        if (!isPlaced) return of(signPdfFailure({ error: 'Positionnez la signature sur le PDF avant de signer.' }));

        return this.pdfSignatureService.signPdf(file, request).pipe(
          map(signedPdf => signPdfSuccess({ signedPdf })),
          catchError(() => of(signPdfFailure({ error: 'Échec lors de la signature du PDF.' })))
        );
      })
    )
  );
}
