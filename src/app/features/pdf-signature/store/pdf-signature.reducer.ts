import { createFeature, createReducer, on } from '@ngrx/store';
import { PdfSignatureState } from '../models/pdf-signature-state';
import {
  clearResult,
  setSignatureVisible,
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
  signaturePosition: { pageNumber: 1, x: 100, y: 100 },
  isSignaturePlaced: false,
  isSignatureVisible: false,
  status: 'idle' as const,
  signedPdf: null,
  error: null
};

export const pdfSignatureFeature = createFeature({
  name: 'pdfSignature',
  reducer: createReducer(
    initialState,
    on(uploadPdfSelected, (state, { file }) => ({ ...state, selectedFile: file, error: null, signedPdf: null, isSignaturePlaced: false, isSignatureVisible: false })),
    on(updateSignerName, (state, { signerName }) => ({ ...state, signerName, isSignatureVisible: signerName.trim().length > 0 ? state.isSignatureVisible : false })),
    on(updateAdditionalText, (state, { additionalText }) => ({ ...state, additionalText })),
    on(setSignatureVisible, (state, { visible }) => ({ ...state, isSignatureVisible: visible, isSignaturePlaced: visible ? state.isSignaturePlaced : false })),
    on(updateSignaturePosition, (state, { x, y, pageNumber, isPlaced }) => ({
      ...state,
      signaturePosition: { x, y, pageNumber },
      isSignaturePlaced: isPlaced
    })),
    on(signPdf, state => ({ ...state, status: 'loading' as const, error: null, signedPdf: null })),
    on(signPdfSuccess, (state, { signedPdf }) => ({ ...state, status: 'success' as const, signedPdf })),
    on(signPdfFailure, (state, { error }) => ({ ...state, status: 'error' as const, error })),
    on(clearResult, state => ({ ...state, signedPdf: null, status: 'idle' as const }))
  )
});
