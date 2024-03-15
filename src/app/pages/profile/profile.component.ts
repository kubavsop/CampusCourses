import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {Subscription} from "rxjs";
import {BirthdayValidator} from "../../core/validators/birthday-validator";
import {UserService} from "../../core/services/user.service";
import {LoadingService} from "../../core/services/loading.service";
import {showErrorPopup} from "../../shared/util/popup";
import {EditProfileDto} from "../../core/models/dtos/edit-profile-dto";
import {ProfileDto} from "../../core/models/dtos/profile-dto";
import {NgIf} from "@angular/common";
import moment from "moment";
import {convertToIsoDateString} from "../../shared/util/date-string-converter";

@Component({
  selector: 'app-profile',
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
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  isLoading: boolean = false
  initialLoading: boolean = true
  subscription = new Subscription()
  currentState: EditProfileDto

  readonly form = new FormGroup({
      fullName: new FormControl('', {validators: [Validators.required]}),
      birthDate: new FormControl('', {validators: [Validators.required, BirthdayValidator]}),
      email: new FormControl({value: '', disabled: true}, {validators: [Validators.required, Validators.email]})
    }
  )

  constructor(
    private readonly userService: UserService,
    private readonly loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.subscription = this.loadingService.loading$.subscribe((flag) => {
      this.isLoading = flag;
    });

    this.userService.getProfile().subscribe(
      {
        next: (profileDto: ProfileDto) => {

          this.form.setValue({
            fullName: profileDto.fullName,
            birthDate: profileDto.birthDate,
            email: profileDto.email
          });

          this.currentState = {
            birthDate: profileDto.birthDate,
            fullName: profileDto.fullName
          }

          this.initialLoading = false;
        },
      }
    )
  }

  submitForm(): void {
    if (!this.isFormValid()) return;

    const birthday = convertToIsoDateString(this.form.value.birthDate!);

    let dto: EditProfileDto = {
      fullName: this.form.value.fullName!,
      birthDate: birthday
    }

    this.userService.editProfile(dto)
      .subscribe(
        {
          next: () => {
            this.currentState = {
              birthDate: birthday,
              fullName: this.form.value.fullName!
            }
          },
          error: (err) => {
            showErrorPopup('Ошибка изменения профиля', err);
          }
        }
      )
  }

  isFormValid(): boolean {
    if (this.form.value.birthDate == null) return false;
    return this.form.valid && !this.isLoading && (this.currentState.fullName !== this.form.value.fullName || !this.compareDates(this.currentState.birthDate, this.form.value.birthDate));
  }

  compareDates(first: string, second: string): boolean {

    const firstDate = new Date(first);
    const secondDate = new Date(second);

    return firstDate.getFullYear() === secondDate.getFullYear() && firstDate.getMonth() === secondDate.getMonth() && firstDate.getDate() === secondDate.getDate();
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
