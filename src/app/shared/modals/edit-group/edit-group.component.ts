import {Component, Inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {EmptyValidator} from "../../../core/validators/empty-validator";

@Component({
  selector: 'app-edit-group',
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
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './edit-group.component.html',
  styleUrl: './edit-group.component.css'
})
export class EditGroupComponent {
  currentState: string
  name = new FormControl('', {validators: [Validators.required, EmptyValidator]})

  constructor(
    public readonly dialogRef: MatDialogRef<EditGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.currentState = data;
    this.name.setValue(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkCurrentState(): boolean {
    return this.currentState == this.name.value;
  }
}
