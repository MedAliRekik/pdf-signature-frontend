import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-signature-actions',
  standalone: true,
  template: `<button [disabled]="disabled" (click)="sign.emit()">{{ loading ? 'Signature en cours...' : 'Signer et télécharger' }}</button>`,
  styles: [`button{width:100%;padding:.8rem 1rem;border:none;border-radius:10px;background:#2563eb;color:#fff;font-weight:600;cursor:pointer}button:disabled{opacity:.6;cursor:not-allowed}`]
})
export class SignatureActionsComponent {
  @Input() disabled = false;
  @Input() loading = false;
  @Output() sign = new EventEmitter<void>();
}
