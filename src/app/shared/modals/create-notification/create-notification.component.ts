import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {EmptyValidator} from "../../../core/validators/empty-validator";
import {NotificationDto} from "../../../core/models/dtos/notification-dto";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-create-notification',
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
    MatCheckbox
  ],
  templateUrl: './create-notification.component.html',
  styleUrl: './create-notification.component.css'
})
export class CreateNotificationComponent {
  text = new FormControl('', {validators: [Validators.required, EmptyValidator]})
  isImportant: boolean

  constructor(
    public readonly dialogRef: MatDialogRef<CreateNotificationComponent>
  ) {}

  onSubmit(){
    if (!this.text.valid) return;

    const dto: NotificationDto = {
      text: this.text.value!,
      isImportant: this.isImportant
    }

    this.dialogRef.close(dto)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
