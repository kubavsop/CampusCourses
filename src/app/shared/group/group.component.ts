import {Component, Input, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {UserService} from "../../core/services/user.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgIf],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent {
  @Input({required: true}) title: string
  @Input({required: true}) groupId: string


  constructor(
    protected readonly userService: UserService
  ) {}

}
