import {Component, Inject} from '@angular/core';
import {FormControl, FormsModule} from "@angular/forms";
import {CourseStatus} from "../../../core/models/enums/course-statuses";
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {RadioGroupComponent} from "../../components/radio-group/radio-group.component";
import {RadioButton} from "../../../core/models/radio-button";
import {getCourseStatusName} from "../../utils/course-util";

@Component({
  selector: 'app-edit-course-status',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatDialogClose,
    RadioGroupComponent
  ],
  templateUrl: './edit-course-status.component.html',
  styleUrl: './edit-course-status.component.css'
})
export class EditCourseStatusComponent {
  currentState: CourseStatus
  group = new FormControl(CourseStatus.Created)
  radioButtons: RadioButton[] = [
    {value: CourseStatus.OpenForAssigning, name: getCourseStatusName(CourseStatus.OpenForAssigning)},
    {value: CourseStatus.Started, name: getCourseStatusName(CourseStatus.Started)},
    {value: CourseStatus.Finished, name: getCourseStatusName(CourseStatus.Finished)}
  ]


  constructor(
    public readonly dialogRef: MatDialogRef<EditCourseStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseStatus
  ) {
    this.currentState = data;
    this.group.setValue(data);
  }

  checkCurrentState(): boolean {
    return this.currentState == this.group.value
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
