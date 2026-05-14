import { PdfSignatureRequest } from './pdf-signature-request';

export type PdfSignatureStatus = 'idle' | 'loading' | 'success' | 'error';

export interface PdfSignatureState {
  selectedFile: File | null;
  signerName: string;
  additionalText: string;
  signaturePosition: Pick<PdfSignatureRequest, 'x' | 'y' | 'pageNumber'>;
  isSignaturePlaced: boolean;
  status: PdfSignatureStatus;
  signedPdf: Blob | null;
  error: string | null;
}
