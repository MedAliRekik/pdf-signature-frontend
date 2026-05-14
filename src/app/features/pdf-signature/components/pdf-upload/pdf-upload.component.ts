import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pdf-upload',
  standalone: true,
  templateUrl: './pdf-upload.component.html'
})
export class PdfUploadComponent {
  @Input() maxFileSizeBytes = 5 * 1024 * 1024;
  @Output() fileSelected = new EventEmitter<File>();
  @Output() validationError = new EventEmitter<string>();

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      this.validationError.emit('Seuls les fichiers PDF (application/pdf) sont acceptés.');
      input.value = '';
      return;
    }

    if (file.size > this.maxFileSizeBytes) {
      this.validationError.emit(`Le fichier dépasse ${Math.floor(this.maxFileSizeBytes / (1024 * 1024))} Mo.`);
      input.value = '';
      return;
    }

    const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const safeFile = new File([file], safeFileName, { type: file.type });
    this.fileSelected.emit(safeFile);
  }
}
