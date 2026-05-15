export interface PdfSignaturePositionRequest {
  id: string;
  signerName: string;
  pageNumber: number;
  x: number;
  y: number;
  displayX: number;
  displayY: number;
}

export interface PdfSignatureRequest {
  signerName: string;
  additionalText?: string;
  signatures: PdfSignaturePositionRequest[];
}
