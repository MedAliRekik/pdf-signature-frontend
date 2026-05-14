import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { API_CONFIG } from '../../../../core/config/api.config';
import { PdfPreviewComponent } from '../../components/pdf-preview/pdf-preview.component';
import { PdfUploadComponent } from '../../components/pdf-upload/pdf-upload.component';
import { SignatureActionsComponent } from '../../components/signature-actions/signature-actions.component';
import { SignatureFormComponent } from '../../components/signature-form/signature-form.component';
import { SignatureResultComponent } from '../../components/signature-result/signature-result.component';
import { clearResult, signPdf, signPdfFailure, updateAdditionalText, updateSignaturePosition, updateSignerName, uploadPdfSelected } from '../../store/pdf-signature.actions';
import { additionalText, loading, selectError, selectSelectedFile, selectSignedPdf, signaturePosition, signerName } from '../../store/pdf-signature.selectors';

@Component({ selector: 'app-pdf-signature-page', standalone: true, imports: [AsyncPipe, MatSnackBarModule, PdfUploadComponent, SignatureFormComponent, PdfPreviewComponent, SignatureActionsComponent, SignatureResultComponent], templateUrl: './pdf-signature-page.component.html', styleUrl: './pdf-signature-page.component.scss' })
export class PdfSignaturePageComponent {
  private readonly store = inject(Store);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  readonly maxFileSizeBytes = API_CONFIG.maxPdfFileSizeBytes;
  readonly error$ = this.store.select(selectError);
  readonly loading$ = this.store.select(loading);
  readonly selectedFile$ = this.store.select(selectSelectedFile);
  readonly signerName$ = this.store.select(signerName);
  readonly additionalText$ = this.store.select(additionalText);
  readonly signaturePosition$ = this.store.select(signaturePosition);
  readonly signedPdf$ = this.store.select(selectSignedPdf);

  constructor(){
    this.error$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(error=>{ if(error){ this.snackBar.open(error,'Fermer',{duration:3500});}});
  }
  onFileSelected(file: File): void { this.store.dispatch(uploadPdfSelected({ file })); }
  onValidationError(error: string): void { this.store.dispatch(signPdfFailure({ error })); }
  onSignerNameChange(value: string): void { this.store.dispatch(updateSignerName({ signerName: value })); }
  onAdditionalTextChange(value: string): void { this.store.dispatch(updateAdditionalText({ additionalText: value })); }
  onSignatureMoved(position: { x: number; y: number; pageNumber: number }): void { this.store.dispatch(updateSignaturePosition({ ...position, isPlaced: true })); }
  onSign(): void { this.store.dispatch(signPdf()); }
  clearSignedResult(): void { this.store.dispatch(clearResult()); }
}
