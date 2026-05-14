import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FILE_CONSTRAINTS } from '../../../../core/constants/file.constants';

@Component({ selector: 'app-pdf-upload', standalone: true, imports: [MatCardModule, MatButtonModule, MatIconModule], templateUrl: './pdf-upload.component.html' })
export class PdfUploadComponent {
  @Input() maxFileSizeBytes = FILE_CONSTRAINTS.maxPdfFileSizeBytes;
  @Output() fileSelected = new EventEmitter<File>();
  @Output() validationError = new EventEmitter<string>();

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (file.type !== FILE_CONSTRAINTS.allowedMimeType) {
      this.validationError.emit('Format invalide : seuls les fichiers PDF (application/pdf) sont autorisés.');
      input.value = '';
      return;
    }

    if (file.size > this.maxFileSizeBytes) {
      this.validationError.emit(`Fichier trop volumineux : maximum ${Math.floor(this.maxFileSizeBytes / (1024 * 1024))} Mo.`);
      input.value = '';
      return;
    }

    this.fileSelected.emit(new File([file], file.name.replace(/[^a-zA-Z0-9._-]/g, '_'), { type: file.type }));
  }
}
