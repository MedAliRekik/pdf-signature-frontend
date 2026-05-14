import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { PdfUploadComponent } from '../../components/pdf-upload/pdf-upload.component';
import { SignatureFormComponent } from '../../components/signature-form/signature-form.component';
import { SignatureResultComponent } from '../../components/signature-result/signature-result.component';
import { PdfSignatureRequest } from '../../models/pdf-signature-request';
import { clearResult, setFile, signPdf, signPdfFailure, updateForm } from '../../store/pdf-signature.actions';
import { selectError, selectFormValue, selectIsLoading, selectSignedPdf } from '../../store/pdf-signature.selectors';

@Component({ selector: 'app-pdf-signature-page', standalone: true, imports: [AsyncPipe, PdfUploadComponent, SignatureFormComponent, SignatureResultComponent], templateUrl: './pdf-signature-page.component.html', styleUrl: './pdf-signature-page.component.scss' })
export class PdfSignaturePageComponent {
  private readonly store = inject(Store);
  readonly maxFileSizeBytes = 5 * 1024 * 1024;
  readonly error$ = this.store.select(selectError);
  readonly isLoading$ = this.store.select(selectIsLoading);
  readonly signedPdf$ = this.store.select(selectSignedPdf);
  readonly formValue$ = this.store.select(selectFormValue);

  onFileSelected(file: File): void { this.store.dispatch(setFile({ file })); }
  onValidationError(error: string): void { this.store.dispatch(signPdfFailure({ error })); }
  onFormSubmit(formValue: PdfSignatureRequest): void { this.store.dispatch(updateForm({ formValue })); this.store.dispatch(signPdf()); }
  clearSignedResult(): void { this.store.dispatch(clearResult()); }
}
