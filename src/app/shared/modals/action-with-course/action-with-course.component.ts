import {Component, Inject} from '@angular/core';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Semester} from "../../../core/models/enums/semester";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatOption, MatSelect} from "@angular/material/select";
import {numberValidator} from "../../../core/validators/number-validator";
import {ActionCourseDto} from "../../../core/models/dtos/action-course-dto";
import {NgIf} from "@angular/common";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {TeacherSelectComponent} from "../../components/teacher-select/teacher-select.component";
import {CkeditorFieldComponent} from "../../components/ckeditor-field/ckeditor-field.component";
import {EmptyValidator} from "../../../core/validators/empty-validator";
import {RadioGroupComponent} from "../../components/radio-group/radio-group.component";
import {getSemesterName} from "../../utils/course-util";
import {RadioButton} from "../../../core/models/radio-button";

@Component({
  selector: 'app-action-with-course',
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
    CkeditorFieldComponent,
    RadioGroupComponent
  ],
  templateUrl: './action-with-course.component.html',
  styleUrl: './action-with-course.component.css'
})
export class ActionWithCourseComponent {
  currentState: ActionCourseDto
  Editor = ClassicEditor
  actionName: string
  title: string
  currentYear = (new Date).getFullYear()
  maxYear = this.currentYear + 6
  radioButtons: RadioButton[] = [{value: Semester.Spring, name: getSemesterName(Semester.Spring)},
    {value: Semester.Autumn, name: getSemesterName(Semester.Autumn)}]

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
    public readonly dialogRef: MatDialogRef<ActionWithCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActionCourseDto
  ) {
    if (data) {
      this.currentState = data;
      this.name.setValue(data.name);
      this.startYear.setValue(data.startYear);
      this.numberOfPeople.setValue(data.maximumStudentsCount);
      this.semester.setValue(data.semester);
      this.requirements.setValue(data.requirements);
      this.annotations.setValue(data.annotations);
      this.mainTeacherId.setValue(data.mainTeacherId);
      this.title = "Редактирование курса"
      this.actionName = "Сохранить"
    } else {
      this.title = "Создание курса"
      this.actionName = "Создать"
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.form.valid) return;

    const dto: ActionCourseDto = {
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

  checkCurrentState(): boolean {
    return !!this.currentState && this.name.value == this.currentState.name &&
      this.startYear.value == this.currentState.startYear &&
      this.numberOfPeople.value == this.currentState.maximumStudentsCount &&
      this.semester.value == this.currentState.semester &&
      this.requirements.value == this.currentState.requirements &&
      this.annotations.value == this.currentState.annotations &&
      this.mainTeacherId.value == this.currentState.mainTeacherId;
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

  protected readonly Semester = Semester;
  protected readonly getSemesterName = getSemesterName;
}
