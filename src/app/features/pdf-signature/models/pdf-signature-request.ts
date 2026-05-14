export interface PdfSignatureRequest {
  signerName: string;
  additionalText?: string;
  pageNumber: number;
  x: number;
  y: number;
}
