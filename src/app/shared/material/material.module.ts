import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatDividerModule,
  MatTooltipModule
];

@NgModule({
  exports: MATERIAL_MODULES
})
export class MaterialModule {}
