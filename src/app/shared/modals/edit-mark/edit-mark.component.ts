import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {EditMarkModel} from "../../../core/models/edit-mark-model";
import {RadioButton} from "../../../core/models/radio-button";
import {StudentMarks} from "../../../core/models/enums/student-marks";
import {getStudentMarkName} from "../../utils/course-util";
import {FormControl} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {RadioGroupComponent} from "../../components/radio-group/radio-group.component";
import {MarkType} from "../../../core/models/enums/mark-type";

@Component({
  selector: 'app-edit-mark',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    RadioGroupComponent,
    MatDialogClose
  ],
  templateUrl: './edit-mark.component.html',
  styleUrl: './edit-mark.component.css'
})
export class EditMarkComponent {
  title: string
  currentState: StudentMarks
  mark = new FormControl(StudentMarks.NotDefined)
  radioButtons: RadioButton[] = [
    {
      value: StudentMarks.NotDefined,
      name: getStudentMarkName(StudentMarks.NotDefined)
    },
    {
      value: StudentMarks.Passed,
      name: getStudentMarkName(StudentMarks.Passed)
    },
    {
      value: StudentMarks.Failed,
      name: getStudentMarkName(StudentMarks.Failed)
    }
  ]

  constructor(
    public readonly dialogRef: MatDialogRef<EditMarkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditMarkModel
  ) {
    this.mark.setValue(data.mark);
    this.currentState = data.mark
    this.title = data.markType == MarkType.Final ? "\"Финальная аттестация\"" : "\"Промежуточная аттестация\""
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  checkCurrentState() {
    return this.currentState === this.mark.value;
  }
}
