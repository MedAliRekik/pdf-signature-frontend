import { PdfSignatureRequest } from './pdf-signature-request';

export type PdfSignatureStatus = 'idle' | 'loading' | 'success' | 'error';

export interface PdfSignatureState {
  selectedFile: File | null;
  formValue: PdfSignatureRequest;
  status: PdfSignatureStatus;
  signedPdf: Blob | null;
  error: string | null;
}
