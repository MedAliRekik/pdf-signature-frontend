import { createFeature, createReducer, on } from '@ngrx/store';
import { PdfSignatureState } from '../models/pdf-signature-state';
import {
  addSignature,
  clearResult,
  clearSignatures,
  removeSignature,
  signPdf,
  signPdfFailure,
  signPdfSuccess,
  updateAdditionalText,
  updateSignaturePosition,
  updateSignerName,
  uploadPdfSelected
} from './pdf-signature.actions';

const initialState: PdfSignatureState = {
  selectedFile: null,
  signerName: '',
  additionalText: '',
  signatures: [],
  status: 'idle' as const,
  signedPdf: null,
  error: null
};

export const pdfSignatureFeature = createFeature({
  name: 'pdfSignature',
  reducer: createReducer(
    initialState,
    on(uploadPdfSelected, (state, { file }) => ({ ...state, selectedFile: file, error: null, signedPdf: null, signatures: [] })),
    on(updateSignerName, (state, { signerName }) => ({
      ...state,
      signerName,
      signatures: state.signatures.map(signature => ({ ...signature, signerName }))
    })),
    on(updateAdditionalText, (state, { additionalText }) => ({ ...state, additionalText })),
    on(addSignature, (state, { signature }) => ({ ...state, signatures: [...state.signatures, signature] })),
    on(updateSignaturePosition, (state, { id, x, y, pageNumber, displayX, displayY }) => ({
      ...state,
      signatures: state.signatures.map(signature => signature.id === id ? { ...signature, x, y, pageNumber, displayX, displayY } : signature)
    })),
    on(removeSignature, (state, { id }) => ({ ...state, signatures: state.signatures.filter(signature => signature.id !== id) })),
    on(clearSignatures, state => ({ ...state, signatures: [] })),
    on(signPdf, state => ({ ...state, status: 'loading' as const, error: null, signedPdf: null })),
    on(signPdfSuccess, (state, { signedPdf }) => ({ ...state, status: 'success' as const, signedPdf })),
    on(signPdfFailure, (state, { error }) => ({ ...state, status: 'error' as const, error })),
    on(clearResult, state => ({ ...state, signedPdf: null, status: 'idle' as const }))
  )
});
