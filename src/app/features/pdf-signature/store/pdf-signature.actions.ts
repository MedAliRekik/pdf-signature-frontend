import { createAction, props } from '@ngrx/store';

export const uploadPdfSelected = createAction('[PDF Signature] Upload PDF Selected', props<{ file: File | null }>());
export const updateSignerName = createAction('[PDF Signature] Update Signer Name', props<{ signerName: string }>());
export const updateAdditionalText = createAction('[PDF Signature] Update Additional Text', props<{ additionalText: string }>());
export const addSignature = createAction('[PDF Signature] Add Signature', props<{ signature: { id: string; signerName: string; pageNumber: number; x: number; y: number; displayX: number; displayY: number } }>());
export const updateSignaturePosition = createAction(
  '[PDF Signature] Update Signature Position',
  props<{ id: string; x: number; y: number; pageNumber: number; displayX: number; displayY: number }>()
);
export const removeSignature = createAction('[PDF Signature] Remove Signature', props<{ id: string }>());
export const clearSignatures = createAction('[PDF Signature] Clear Signatures');
export const signPdf = createAction('[PDF Signature] Sign PDF');
export const signPdfSuccess = createAction('[PDF Signature] Sign PDF Success', props<{ signedPdf: Blob }>());
export const signPdfFailure = createAction('[PDF Signature] Sign PDF Failure', props<{ error: string }>());
export const clearResult = createAction('[PDF Signature] Clear Result');
