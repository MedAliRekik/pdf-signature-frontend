import { createSelector } from '@ngrx/store';
import { pdfSignatureFeature } from './pdf-signature.reducer';

export const { selectPdfSignatureState, selectSelectedFile, selectStatus, selectSignedPdf, selectError } = pdfSignatureFeature;

export const signerName = createSelector(selectPdfSignatureState, state => state.signerName);
export const additionalText = createSelector(selectPdfSignatureState, state => state.additionalText);
export const signatures = createSelector(selectPdfSignatureState, state => state.signatures);
export const loading = createSelector(selectStatus, status => status === 'loading');
export const selectIsSignaturePlaced = createSelector(signatures, currentSignatures => currentSignatures.length > 0);

export const selectSignRequest = createSelector(
  signerName,
  additionalText,
  signatures,
  (currentSignerName, currentAdditionalText, currentSignatures) => ({
    signerName: currentSignerName,
    additionalText: currentAdditionalText,
    signatures: currentSignatures
  })
);
