import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {showErrorPopup} from "../../shared/utils/popup";
import {confirmPasswordValidator} from "../../core/validators/confirm-password-validator";
import {Subscription} from "rxjs";
import {ConfirmPasswordMatcher} from "../../core/validators/confirm-password-matcher";
import {RegexPatterns} from "../../core/validators/regex-patterns";
import {BirthdayValidator} from "../../core/validators/birthday-validator";
import {RegisterDto} from "../../core/models/dtos/register-dto";
import {LoadingService} from "../../core/services/loading.service";
import {convertToIsoDateString} from "../../shared/utils/date-string-converter";
import {EmptyValidator} from "../../core/validators/empty-validator";

@Component({
  selector: 'app-registration',
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
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit, OnDestroy {
  readonly confirmPasswordMatcher = new ConfirmPasswordMatcher()
  hidePassword = true
  isLoading: boolean = false
  subscription = new Subscription()

  readonly form = new FormGroup({
      fullName: new FormControl('', {validators: [Validators.required, EmptyValidator],}),
      birthday: new FormControl('', {validators: [Validators.required, BirthdayValidator],}),
      email: new FormControl('', {validators: [Validators.required, Validators.email],}),
      password: new FormControl('', {validators: [Validators.required, Validators.pattern(RegexPatterns.Password)],}),
      confirmPassword: new FormControl('')
    },
    {validators: confirmPasswordValidator}
  )

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.subscription = this.loadingService.loading$.subscribe((flag) => {
      this.isLoading = flag;
    });
  }

  submitForm(): void {
    if (!this.form.valid) return;
    let dto: RegisterDto = {
      email: this.form.value.email!,
      password: this.form.value.password!,
      confirmPassword: this.form.value.password!,
      fullName: this.form.value.fullName!,
      birthDate: convertToIsoDateString(this.form.value.birthday!)
    }

    this.userService.register(dto)
      .subscribe(
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

  get birthday() {
    return this.form.controls.birthday
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

