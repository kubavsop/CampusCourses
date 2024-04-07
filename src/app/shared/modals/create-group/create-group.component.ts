import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {EmptyValidator} from "../../../core/validators/empty-validator";

@Component({
  selector: 'app-create-group',
  standalone: true,
  imports: [MatDialogModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})
export class CreateGroupComponent {
  name= new FormControl('', {validators: [Validators.required, EmptyValidator]})
  constructor(
    public readonly dialogRef: MatDialogRef<CreateGroupComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
