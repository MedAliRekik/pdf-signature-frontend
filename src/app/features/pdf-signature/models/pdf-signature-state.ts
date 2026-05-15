import { SignaturePosition } from './signature-position.model';

export type PdfSignatureStatus = 'idle' | 'loading' | 'success' | 'error';

export interface PdfSignatureState {
  selectedFile: File | null;
  signerName: string;
  additionalText: string;
  signatures: SignaturePosition[];
  status: PdfSignatureStatus;
  signedPdf: Blob | null;
  error: string | null;
}
