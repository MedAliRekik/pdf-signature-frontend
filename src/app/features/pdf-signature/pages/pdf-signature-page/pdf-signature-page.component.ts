import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PdfSignatureService } from '../../../../core/services/pdf-signature.service';
import { PdfSignatureRequest } from '../../models/pdf-signature-request';

@Component({
  selector: 'app-pdf-signature-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pdf-signature-page.component.html',
  styleUrl: './pdf-signature-page.component.scss'
})
export class PdfSignaturePageComponent {
  selectedFile: File | null = null;

  signerName = '';
  additionalText = '';
  pageNumber = 1;
  x = 100;
  y = 150;

  isLoading = false;
  errorMessage = '';

  constructor(private readonly pdfSignatureService: PdfSignatureService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.selectedFile = input.files[0];
  }

  signPdf(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Veuillez sélectionner un fichier PDF.';
      return;
    }

    if (!this.signerName.trim()) {
      this.errorMessage = 'Veuillez saisir le nom du signataire.';
      return;
    }

    const request: PdfSignatureRequest = {
      signerName: this.signerName,
      additionalText: this.additionalText,
      pageNumber: this.pageNumber,
      x: this.x,
      y: this.y
    };

    this.isLoading = true;
    this.errorMessage = '';

    this.pdfSignatureService.signPdf(this.selectedFile, request).subscribe({
      next: (blob: Blob) => {
        this.downloadPdf(blob);
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la signature du PDF.';
        this.isLoading = false;
      }
    });
  }

  private downloadPdf(blob: Blob): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'signed-document.pdf';
    link.click();

    window.URL.revokeObjectURL(url);
  }
}
