import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegexPatterns} from "../../core/validators/regex-patterns";
import {Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {showErrorPopup} from "../../shared/util/popup";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {LoginDto} from "../../core/models/dtos/login-dto";
import {LoadingService} from "../../core/services/loading.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  hidePassword = true
  isLoading: boolean = false
  subscription = new Subscription()

  readonly form = new FormGroup({
      email: new FormControl('gymboss@gachi.com', {validators: [Validators.required, Validators.email],}),
      password: new FormControl('B0yNextD00r', {validators: [Validators.required, Validators.pattern(RegexPatterns.Password)],}),
    }
  )

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.subscription = this.loadingService.loading$.subscribe((flag) => {
      this.isLoading = flag
    });
  }

  submitForm(): void {
    if (!this.form.valid) return;
    let dto: LoginDto = {
      email: this.form.value.email!,
      password: this.form.value.password!,
    }

    this.userService.login(dto)
      .subscribe(
        {
          next: () => this.router.navigate(["/groups"]),
          error: (err) => {
            showErrorPopup('Ошибка входа', err);
          }
        }
      )
  }

  get email() {
    return this.form.controls.email
  }

  get password() {
    return this.form.controls.password
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
