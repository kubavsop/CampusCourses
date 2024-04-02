import {Component} from '@angular/core';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Semester} from "../../../core/models/enums/semester";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatOption, MatSelect} from "@angular/material/select";
import {numberValidator} from "../../../core/validators/number-validator";
import {CreateCourseDto} from "../../../core/models/dtos/create-course-dto";
import {NgIf} from "@angular/common";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {TeacherSelectComponent} from "../../components/teacher-select/teacher-select.component";
import Editor from "@ckeditor/ckeditor5-build-classic";
import {CkeditorFieldComponent} from "../../components/ckeditor-field/ckeditor-field.component";
import {EmptyValidator} from "../../../core/validators/empty-validator";

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    MatDialogActions,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatRadioGroup,
    MatRadioButton,
    MatSelect,
    MatOption,
    NgIf,
    NgxMatSelectSearchModule,
    TeacherSelectComponent,
    CkeditorFieldComponent
  ],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent {
  Editor = ClassicEditor
  currentYear = (new Date).getFullYear()
  maxYear = this.currentYear + 6

  readonly form = new FormGroup({
      name: new FormControl('', {validators: [Validators.required, EmptyValidator]}),
      startYear: new FormControl(this.currentYear, {
        validators: [Validators.required, Validators.min(this.currentYear), Validators.max(this.maxYear), numberValidator],
      }),
      numberOfPeople: new FormControl(50, {
        validators: [Validators.required, Validators.min(1), Validators.max(300), numberValidator]
      }),
      semester: new FormControl(Semester.Spring),
      requirements: new FormControl('', {validators: [Validators.required, EmptyValidator]}),
      annotations: new FormControl('', {validators: [Validators.required, EmptyValidator]}),
      mainTeacherId: new FormControl('', {validators: [Validators.required]})
    }
  )

  constructor(
    public readonly dialogRef: MatDialogRef<CreateCourseComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.form.valid) return;

    const dto: CreateCourseDto = {
      name: this.name.value!,
      startYear: this.startYear.value!,
      maximumStudentsCount: this.numberOfPeople.value!,
      semester: this.semester.value!,
      requirements: this.requirements.value!,
      annotations: this.annotations.value!,
      mainTeacherId: this.mainTeacherId.value!
    }

    this.dialogRef.close(dto);
  }

  get name() {
    return this.form.controls.name;
  }

  get startYear() {
    return this.form.controls.startYear;
  }

  get numberOfPeople() {
    return this.form.controls.numberOfPeople;
  }

  get semester() {
    return this.form.controls.semester;
  }

  get requirements() {
    return this.form.controls.requirements
  }

  get annotations() {
    return this.form.controls.annotations
  }

  get mainTeacherId() {
    return this.form.controls.mainTeacherId
  }
}
