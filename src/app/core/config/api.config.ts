import { environment } from '../../../environments/environment';

export const API_ENDPOINTS = {
  pdfSign: `${environment.apiBaseUrl}/api/pdf/sign`
} as const;
