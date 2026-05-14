import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-signature-result',
  standalone: true,
  templateUrl: './signature-result.component.html'
})
export class SignatureResultComponent {
  @Input() signedPdf: Blob | null = null;
  @Output() clear = new EventEmitter<void>();

  download(): void {
    if (!this.signedPdf) return;
    const url = URL.createObjectURL(this.signedPdf);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'signed-document.pdf';
    anchor.click();
    URL.revokeObjectURL(url);
    this.clear.emit();
  }
}
