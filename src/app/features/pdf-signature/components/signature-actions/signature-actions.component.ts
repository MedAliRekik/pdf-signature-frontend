import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-signature-actions', standalone: true, imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule, MatTooltipModule],
  template: `<button mat-raised-button color="accent" [disabled]="disabled || loading" (click)="sign.emit()" matTooltip="Signe le PDF puis télécharge le résultat"><span *ngIf="!loading">Signer et télécharger</span><mat-spinner *ngIf="loading" diameter="20"></mat-spinner></button>`,
  styles: [`button{width:100%;min-height:44px}`]
})
export class SignatureActionsComponent { @Input() disabled = false; @Input() loading = false; @Output() sign = new EventEmitter<void>(); }
