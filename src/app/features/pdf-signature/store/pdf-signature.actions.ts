import { createAction, props } from '@ngrx/store';
import { PdfSignatureRequest } from '../models/pdf-signature-request';

export const setFile = createAction('[PDF Signature] Set File', props<{ file: File | null }>());
export const updateForm = createAction('[PDF Signature] Update Form', props<{ formValue: PdfSignatureRequest }>());
export const signPdf = createAction('[PDF Signature] Sign PDF');
export const signPdfSuccess = createAction('[PDF Signature] Sign PDF Success', props<{ signedPdf: Blob }>());
export const signPdfFailure = createAction('[PDF Signature] Sign PDF Failure', props<{ error: string }>());
export const clearResult = createAction('[PDF Signature] Clear Result');
