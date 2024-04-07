import {Component, Input} from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {CourseDetailsDto} from "../../../core/models/dtos/course-details-dto";
import {MatButton} from "@angular/material/button";
import {NotificationComponent} from "../notification/notification.component";
import {UserService} from "../../../core/services/user.service";
import {CourseService} from "../../../core/services/course.service";
import {MatDialog} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {showErrorPopup, showSuccessfulPopup} from "../../utils/popup";
import {CreateNotificationComponent} from "../../modals/create-notification/create-notification.component";

@Component({
  selector: 'app-course-content',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButton,
    NotificationComponent,
    NgIf
  ],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.css'
})
export class CourseContentComponent {
  @Input({required: true}) courseDto: CourseDetailsDto;
  @Input({required: true}) updateCourse: (course: CourseDetailsDto) => void;
  constructor(
    public readonly userService: UserService,
    public readonly courseService: CourseService,
    public readonly dialog: MatDialog
  ) {
  }

  openCreateNotification() {
    const dialogRef = this.dialog.open(CreateNotificationComponent, {
      width: '80vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseService.createNotification(result, this.courseDto.id).subscribe({
            next: (dto: CourseDetailsDto) => {
              this.updateCourse(dto);
              showSuccessfulPopup("Уведомление успешно создано")
            },
            error: (err) => {
              showErrorPopup('Ошибка создания', err);
            }
          }
        )
      }
    });
  }
}
