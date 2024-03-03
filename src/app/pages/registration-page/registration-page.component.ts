import {Component} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {provideNativeDateAdapter} from '@angular/material/core';
import {
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {showErrorPopup, showPopup} from "../../shared/util/popup";

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent {
  private readonly passwordMinLength = 6;
  private readonly atLeastOneDigitPattern = /\d/
  hidePassword = true;
  isLoading: boolean = false;

  form = new FormGroup({
      fullName: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true
      }),
      birthDate: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(this.passwordMinLength), Validators.pattern(this.atLeastOneDigitPattern)],
        nonNullable: true
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true
      })
    }
  )

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  submitForm(): void {
    if (!this.form.valid) return;

    let formValue = this.form.getRawValue();
    formValue.birthDate = new Date(formValue.birthDate).toISOString();

    this.userService.register(formValue).subscribe(
      {
        next: () => this.router.navigate(["/groups"]),
        error: (err) => {
          showErrorPopup('Ошибка регистрации', err);
        }
      }
    )
  }

  get fullName() {
    return this.form.controls.fullName
  }

  get birthDay() {
    return this.form.controls.birthDate
  }

  get email() {
    return this.form.controls.email
  }

  get password() {
    return this.form.controls.password
  }

  get confirmPassword() {
    return this.form.controls.confirmPassword
  }
}

