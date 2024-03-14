import {Component, OnInit} from '@angular/core';
import {GroupComponent} from "../../shared/group/group.component";
import {MatButtonModule} from "@angular/material/button";
import {GroupService} from "../../core/services/group.service";
import {GroupDto} from "../../core/models/dtos/group-dto";
import {NgIf} from "@angular/common";
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [
    GroupComponent,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit {
  initialLoading: boolean = true
  groups: GroupDto[]


  constructor(
    private readonly groupService: GroupService,
    protected readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.groupService.getGroups()
      .subscribe(
        (groups: GroupDto[]) => {
          this.groups = groups
          this.initialLoading = false
        }
      )
  }

}
