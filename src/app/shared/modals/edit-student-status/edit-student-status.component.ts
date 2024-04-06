import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogTitle} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-student-status',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogTitle
  ],
  templateUrl: './edit-student-status.component.html',
  styleUrl: './edit-student-status.component.css'
})
export class EditStudentStatusComponent {

}
