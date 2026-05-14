import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { API_ENDPOINTS } from '../config/api.config';
import { PdfSignatureRequest } from '../../features/pdf-signature/models/pdf-signature-request';

@Injectable({ providedIn: 'root' })
export class PdfSignatureService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = API_ENDPOINTS.pdfSign;

  signPdf(file: File, request: PdfSignatureRequest): Observable<Blob> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));

    return this.http.post(this.endpoint, formData, { responseType: 'blob' }).pipe(
      catchError((error: HttpErrorResponse) => {
        const safeMessage = error.status >= 500
          ? 'Le service de signature est indisponible pour le moment.'
          : 'La requête de signature a échoué. Vérifiez vos informations puis réessayez.';
        return throwError(() => new Error(safeMessage));
      })
    );
  }
}
