import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({ selector: 'app-signature-form', standalone: true, imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule], templateUrl: './signature-form.component.html' })
export class SignatureFormComponent implements OnChanges {
  private readonly fb = inject(FormBuilder);
  @Input() signerName = ''; @Input() additionalText = ''; @Input() isLoading = false;
  @Output() signerNameChange = new EventEmitter<string>(); @Output() additionalTextChange = new EventEmitter<string>();
  readonly form = this.fb.nonNullable.group({ signerName: ['', [Validators.required, Validators.maxLength(100)]], additionalText: ['Bon pour accord', [Validators.maxLength(250)]] });
  ngOnChanges(): void { this.form.patchValue({ signerName: this.signerName, additionalText: this.additionalText }, { emitEvent: false }); }
  emitSignerName(): void { this.signerNameChange.emit(this.form.controls.signerName.value); }
  emitAdditionalText(): void { this.additionalTextChange.emit(this.form.controls.additionalText.value); }
}
