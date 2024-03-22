import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";

@Component({
  selector: 'app-deletion-confirmation',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
  ],
  templateUrl: './deletion-confirmation.component.html',
  styleUrl: './deletion-confirmation.component.css'
})
export class DeletionConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletionConfirmationComponent>
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
