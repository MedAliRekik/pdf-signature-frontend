import { createFeature, createReducer, on } from '@ngrx/store';
import { PdfSignatureState } from '../models/pdf-signature-state';
import { clearResult, setFile, signPdf, signPdfFailure, signPdfSuccess, updateForm } from './pdf-signature.actions';

const initialState: PdfSignatureState = {
  selectedFile: null,
  formValue: { signerName: '', additionalText: '', pageNumber: 1, x: 100, y: 150 },
  status: 'idle',
  signedPdf: null,
  error: null
};

export const pdfSignatureFeature = createFeature({
  name: 'pdfSignature',
  reducer: createReducer(
    initialState,
    on(setFile, (state, { file }) => ({ ...state, selectedFile: file, error: null })),
    on(updateForm, (state, { formValue }) => ({ ...state, formValue })),
    on(signPdf, state => ({ ...state, status: 'loading' as const, error: null, signedPdf: null })),
    on(signPdfSuccess, (state, { signedPdf }) => ({ ...state, status: 'success' as const, signedPdf })),
    on(signPdfFailure, (state, { error }) => ({ ...state, status: 'error' as const, error })),
    on(clearResult, state => ({ ...state, signedPdf: null, status: 'idle' as const }))
  )
});
