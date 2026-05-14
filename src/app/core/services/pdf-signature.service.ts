import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { PdfSignatureRequest } from '../../features/pdf-signature/models/pdf-signature-request';

@Injectable({ providedIn: 'root' })
export class PdfSignatureService {
  private readonly endpoint = API_CONFIG.pdfSignUrl;

  constructor(private readonly http: HttpClient) {}

  signPdf(file: File, request: PdfSignatureRequest): Observable<Blob> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));

    return this.http.post(this.endpoint, formData, { responseType: 'blob' });
  }
}
