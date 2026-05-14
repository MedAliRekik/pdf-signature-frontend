import { AsyncPipe, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { FILE_CONSTRAINTS } from '../../../../core/constants/file.constants';
import { PdfPreviewComponent } from '../../components/pdf-preview/pdf-preview.component';
import { PdfUploadComponent } from '../../components/pdf-upload/pdf-upload.component';
import { SignatureActionsComponent } from '../../components/signature-actions/signature-actions.component';
import { SignatureFormComponent } from '../../components/signature-form/signature-form.component';
import { SignatureResultComponent } from '../../components/signature-result/signature-result.component';
import { clearResult, setSignatureVisible, signPdf, signPdfFailure, updateAdditionalText, updateSignaturePosition, updateSignerName, uploadPdfSelected } from '../../store/pdf-signature.actions';
import { additionalText, loading, selectError, selectIsSignaturePlaced, selectIsSignatureVisible, selectSelectedFile, selectSignedPdf, signaturePosition, signerName } from '../../store/pdf-signature.selectors';

@Component({ selector: 'app-pdf-signature-page', standalone: true, imports: [AsyncPipe, NgIf, MatSnackBarModule, MatCardModule, MatButtonModule, MatIconModule, PdfUploadComponent, SignatureFormComponent, PdfPreviewComponent, SignatureActionsComponent, SignatureResultComponent], templateUrl: './pdf-signature-page.component.html', styleUrl: './pdf-signature-page.component.scss' })
export class PdfSignaturePageComponent {
  private readonly store = inject(Store);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  readonly maxFileSizeBytes = FILE_CONSTRAINTS.maxPdfFileSizeBytes;
  readonly error$ = this.store.select(selectError);
  readonly loading$ = this.store.select(loading);
  readonly selectedFile$ = this.store.select(selectSelectedFile);
  readonly signerName$ = this.store.select(signerName);
  readonly additionalText$ = this.store.select(additionalText);
  readonly signaturePosition$ = this.store.select(signaturePosition);
  readonly isSignatureVisible$ = this.store.select(selectIsSignatureVisible);
  readonly isSignaturePlaced$ = this.store.select(selectIsSignaturePlaced);
  readonly signedPdf$ = this.store.select(selectSignedPdf);

  constructor() {
    this.error$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((error: string | null) => { if (error) this.snackBar.open(error, 'Fermer', { duration: 4000 }); });
    this.signedPdf$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((pdf: Blob | null) => { if (pdf) this.snackBar.open('PDF signé prêt au téléchargement.', 'OK', { duration: 3000 }); });
  }

  onFileSelected(file: File): void { this.store.dispatch(uploadPdfSelected({ file })); }
  onValidationError(error: string): void { this.store.dispatch(signPdfFailure({ error })); }
  onSignerNameChange(value: string): void { this.store.dispatch(updateSignerName({ signerName: value })); }
  onAdditionalTextChange(value: string): void { this.store.dispatch(updateAdditionalText({ additionalText: value })); }
  onAddSignature(): void {
    this.store.dispatch(updateSignaturePosition({ pageNumber: 1, x: 100, y: 100, isPlaced: true }));
    this.store.dispatch(setSignatureVisible({ visible: true }));
  }
  onSignatureMoved(position: { x: number; y: number; pageNumber: number }): void { this.store.dispatch(updateSignaturePosition({ ...position, isPlaced: true })); }
  onSign(): void { this.store.dispatch(signPdf()); }
  clearSignedResult(): void { this.store.dispatch(clearResult()); }
}
