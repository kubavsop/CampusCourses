import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {UserDto} from "../../../core/models/dtos/user-dto";
import {showErrorPopup} from "../../utils/popup";
import {UserService} from "../../../core/services/user.service";
import {Subscription} from "rxjs";
import {FilterUsersPipe} from "../../pipes/filter-users.pipe";

@Component({
  selector: 'app-teacher-select',
  standalone: true,
  imports: [
    MatFormField,
    MatSelectModule,
    ReactiveFormsModule,
    MatOption,
    NgxMatSelectSearchModule,
    FormsModule,
    FilterUsersPipe
  ],
  templateUrl: './teacher-select.component.html',
  styleUrl: './teacher-select.component.css'
})
export class TeacherSelectComponent {
    @Input({required: true}) title: string
    @Input({required: true}) control: FormControl
    users: UserDto[]
    search: string = ""


  constructor(
    private readonly userService: UserService
  ) {
    this.userService.getUsers().subscribe({
        next: (users: UserDto[]) => {
            this.users = users;
        },
        error: (err) => {
          showErrorPopup("Ошибка загрузки пользователей", err);
        }
      }
    );
  }
}
