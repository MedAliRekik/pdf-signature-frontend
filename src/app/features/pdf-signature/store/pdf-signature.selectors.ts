import { createSelector } from '@ngrx/store';
import { pdfSignatureFeature } from './pdf-signature.reducer';

export const {
  selectPdfSignatureState,
  selectSelectedFile,
  selectFormValue,
  selectStatus,
  selectSignedPdf,
  selectError
} = pdfSignatureFeature;

export const selectIsLoading = createSelector(selectStatus, status => status === 'loading');
