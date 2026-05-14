import { createAction, props } from '@ngrx/store';

export const uploadPdfSelected = createAction('[PDF Signature] Upload PDF Selected', props<{ file: File | null }>());
export const updateSignerName = createAction('[PDF Signature] Update Signer Name', props<{ signerName: string }>());
export const updateAdditionalText = createAction('[PDF Signature] Update Additional Text', props<{ additionalText: string }>());
export const setSignatureVisible = createAction('[PDF Signature] Set Signature Visible', props<{ visible: boolean }>());
export const updateSignaturePosition = createAction(
  '[PDF Signature] Update Signature Position',
  props<{ x: number; y: number; pageNumber: number; isPlaced: boolean }>()
);
export const signPdf = createAction('[PDF Signature] Sign PDF');
export const signPdfSuccess = createAction('[PDF Signature] Sign PDF Success', props<{ signedPdf: Blob }>());
export const signPdfFailure = createAction('[PDF Signature] Sign PDF Failure', props<{ error: string }>());
export const clearResult = createAction('[PDF Signature] Clear Result');
