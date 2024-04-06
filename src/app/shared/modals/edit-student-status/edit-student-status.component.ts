import {Component, Inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {StudentStatuses} from "../../../core/models/enums/student-statuses";
import {StudentStatusAction} from "../../../core/models/enums/student-status-action";

@Component({
  selector: 'app-edit-student-status',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogTitle,
    MatDialogClose
  ],
  templateUrl: './edit-student-status.component.html',
  styleUrl: './edit-student-status.component.css'
})
export class EditStudentStatusComponent implements OnInit {
  action: string

  constructor(
    public readonly dialogRef: MatDialogRef<EditStudentStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentStatusAction
  ) {
  }

  ngOnInit(): void {
    this.action = this.data === StudentStatusAction.Accepted ? "Принять": "Отклонить";
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  protected readonly StudentStatusAction = StudentStatusAction;
}
