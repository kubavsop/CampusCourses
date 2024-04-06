import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {TeacherSelectComponent} from "../../components/teacher-select/teacher-select.component";

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [
    MatButton,
    MatCheckbox,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    TeacherSelectComponent,
    MatDialogClose
  ],
  templateUrl: './add-teacher.component.html',
  styleUrl: './add-teacher.component.css'
})
export class AddTeacherComponent {
  teacherId = new FormControl('', {validators: [Validators.required]})

  constructor(
    public readonly dialogRef: MatDialogRef<AddTeacherComponent>
  ) {}


  onNoClick(): void {
    this.dialogRef.close();
  }
}
