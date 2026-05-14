import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PdfSignatureRequest } from '../../features/pdf-signature/models/pdf-signature-request';

@Injectable({
  providedIn: 'root'
})
export class PdfSignatureService {

  private readonly apiUrl = 'http://localhost:8080/api/pdf/sign';

  constructor(private readonly http: HttpClient) {}

  signPdf(file: File, request: PdfSignatureRequest): Observable<Blob> {
    const formData = new FormData();

    formData.append('file', file);
    formData.append(
      'request',
      new Blob([JSON.stringify(request)], { type: 'application/json' })
    );

    return this.http.post(this.apiUrl, formData, {
      responseType: 'blob'
    });
  }
}
