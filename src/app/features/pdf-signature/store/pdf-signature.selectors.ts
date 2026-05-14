import { createSelector } from '@ngrx/store';
import { pdfSignatureFeature } from './pdf-signature.reducer';

export const { selectPdfSignatureState, selectSelectedFile, selectStatus, selectSignedPdf, selectError } = pdfSignatureFeature;

export const signerName = createSelector(selectPdfSignatureState, state => state.signerName);
export const additionalText = createSelector(selectPdfSignatureState, state => state.additionalText);
export const signaturePosition = createSelector(selectPdfSignatureState, state => state.signaturePosition);
export const loading = createSelector(selectStatus, status => status === 'loading');
export const selectIsSignaturePlaced = createSelector(selectPdfSignatureState, state => state.isSignaturePlaced);

export const selectSignRequest = createSelector(
  signerName,
  additionalText,
  signaturePosition,
  (currentSignerName, currentAdditionalText, currentSignaturePosition) => ({
    signerName: currentSignerName,
    additionalText: currentAdditionalText,
    ...currentSignaturePosition
  })
);
