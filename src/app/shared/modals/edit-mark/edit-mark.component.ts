import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StudentStatuses} from "../../../core/models/enums/student-statuses";

@Component({
  selector: 'app-edit-mark',
  standalone: true,
  imports: [],
  templateUrl: './edit-mark.component.html',
  styleUrl: './edit-mark.component.css'
})
export class EditMarkComponent {
  constructor(
    public readonly dialogRef: MatDialogRef<EditMarkComponent>,

  ) {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
