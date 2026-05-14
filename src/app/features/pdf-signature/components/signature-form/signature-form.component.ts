import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PdfSignatureRequest } from '../../models/pdf-signature-request';

@Component({ selector: 'app-signature-form', standalone: true, imports: [ReactiveFormsModule], templateUrl: './signature-form.component.html' })
export class SignatureFormComponent implements OnChanges {
  private readonly fb = inject(FormBuilder);
  @Input() initialValue: PdfSignatureRequest | null = null;
  @Input() isLoading = false;
  @Output() formSubmit = new EventEmitter<PdfSignatureRequest>();

  readonly form = this.fb.nonNullable.group({ signerName: ['', [Validators.required, Validators.maxLength(100)]], additionalText: ['', [Validators.maxLength(250)]], pageNumber: [1, [Validators.required, Validators.min(1)]], x: [100, [Validators.required, Validators.min(0)]], y: [150, [Validators.required, Validators.min(0)]] });
  ngOnChanges(changes: SimpleChanges): void { if (changes['initialValue']?.currentValue) this.form.patchValue(changes['initialValue'].currentValue); }
  submit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } this.formSubmit.emit(this.form.getRawValue()); }
}
