import {Component, OnInit} from '@angular/core';
import {GroupComponent} from "../../shared/group/group.component";
import {MatButtonModule} from "@angular/material/button";
import {GroupService} from "../../core/services/group.service";
import {GroupDto} from "../../core/models/dtos/group-dto";
import {NgIf} from "@angular/common";
import {UserService} from "../../core/services/user.service";
import {showErrorPopup, showPopup, showSuccessfulPopup} from "../../shared/util/popup";
import {MatDialog} from "@angular/material/dialog";
import {CreateGroupComponent} from "../../shared/modals/create-group/create-group.component";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {DeletionConfirmationComponent} from "../../shared/modals/deletion-confirmation/deletion-confirmation.component";
import {EditGroupComponent} from "../../shared/modals/edit-group/edit-group.component";

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
  loading: boolean = true
  groups: GroupDto[]

  constructor(
    private readonly groupService: GroupService,
    public dialog: MatDialog,
    protected readonly userService: UserService
  ) {
    this.openDeleteGroup = this.openDeleteGroup.bind(this);
    this.openEditGroup = this.openEditGroup.bind(this);
  }

  ngOnInit(): void {
    this.updateGroups();
  }

  openCreateGroup(): void {
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '80vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result === 'string') {
        this.groupService.createGroup({name: result}).subscribe({
            next: () => {
              showSuccessfulPopup("Группа успешно создана")
              this.updateGroups()
            },
            error: (err) => {
              showErrorPopup('Ошибка создании группы', err);
            }
          }
        )
      }
    });
  }

  openDeleteGroup(id: string): void {
    const dialogRef = this.dialog.open(DeletionConfirmationComponent, {
      width: '80vw',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupService.deleteGroup(id).subscribe({
            next: () => {
              showSuccessfulPopup("Группа успешно удалена")
              this.updateGroups()
            },
            error: (err) => {
              showErrorPopup('Ошибка удаление группы', err);
            }
          }
        )
      }
    });
  }

  openEditGroup(id: string, name: string): void {
    const dialogRef = this.dialog.open(EditGroupComponent, {
      width: '80vw',
      data: name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result === 'string') {
        this.groupService.editGroup(id, {name: result}).subscribe({
            next: () => {
              showSuccessfulPopup("Группа успешно изменена")
              this.updateGroups()
            },
            error: (err) => {
              showErrorPopup('Ошибка изменения группы', err);
            }
          }
        )
      }
    });
  }

  updateGroups(): void {
    this.groupService.getGroups()
      .subscribe({
          next: (groups: GroupDto[]) => {
            this.groups = groups
            this.loading = false
          },
          error: (err) => {
            showErrorPopup('Ошибка загрузки групп', err);
          }
        }
      );
  }
}
