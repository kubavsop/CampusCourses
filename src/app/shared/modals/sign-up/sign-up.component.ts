import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogTitle,
    MatDialogClose
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  constructor(
    public readonly dialogRef: MatDialogRef<SignUpComponent>
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
