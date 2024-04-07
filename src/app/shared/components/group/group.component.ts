import {Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {UserService} from "../../../core/services/user.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

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
  @Input({required: true}) deleteGroup: (id: string) => void
  @Input({required: true}) editGroup: (id: string, name: string) => void

  constructor(
    protected readonly userService: UserService,
    private readonly router: Router
  ) {}

  navigateToGroupCourses() {
    this.router.navigate([`/groups/${this.groupId}`]);
  }
}
