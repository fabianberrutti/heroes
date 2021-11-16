import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToUpperCaseDirective } from '../directives/to-upper-case.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const directives = [
  ToUpperCaseDirective,
];

const formsModules = [
  FormsModule,
  ReactiveFormsModule,
];

const materialModules = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    ...directives,
  ],
  imports: [
    ...materialModules,
    ...formsModules,
  ],
  exports: [
    ...materialModules,
    ...formsModules,
    ...directives,
  ],
})
export class ShareModule { }
