import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {EmptyValidator} from "../../../core/validators/empty-validator";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {EditCourseDto} from "../../../core/models/dtos/edit-course-dto";
import {CkeditorFieldComponent} from "../../components/ckeditor-field/ckeditor-field.component";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [
    FormsModule,
    CkeditorFieldComponent,
    MatError,
    ReactiveFormsModule,
    MatDialogContent,
    MatButton,
    MatDialogActions,
    MatDialogTitle
  ],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent {
  currentState: EditCourseDto
  readonly form = new FormGroup({
      requirements: new FormControl('', {validators: [Validators.required, EmptyValidator]}),
      annotations: new FormControl('', {validators: [Validators.required, EmptyValidator]})
    }
  )

  constructor(
    public readonly dialogRef: MatDialogRef<EditCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditCourseDto
  ) {
    this.currentState = data;
    this.requirements.setValue(data.requirements);
    this.annotations.setValue(data.annotations);
  }


  onSubmit(): void {
    if (!this.form.valid) return;

    const dto: EditCourseDto = {
      requirements: this.requirements.value!,
      annotations: this.annotations.value!,
    }

    this.dialogRef.close(dto);
  }

  checkCurrentState() {
    return this.currentState.annotations == this.annotations.value && this.currentState.requirements == this.requirements.value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get requirements() {
    return this.form.controls.requirements
  }

  get annotations() {
    return this.form.controls.annotations
  }
}
