import {Component, Input} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CourseDetailsDto} from "../../../core/models/dtos/course-details-dto";
import {MatButton} from "@angular/material/button";
import {TeacherComponent} from "../teacher/teacher.component";
import {StudentComponent} from "../student/student.component";
import {UserService} from "../../../core/services/user.service";
import {CourseService} from "../../../core/services/course.service";
import {NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {SignUpComponent} from "../../modals/sign-up/sign-up.component";
import {showErrorPopup, showSuccessfulPopup} from "../../utils/popup";
import {AddTeacherComponent} from "../../modals/add-teacher/add-teacher.component";

@Component({
  selector: 'app-course-participants',
  standalone: true,
  imports: [
    MatTab,
    MatTabGroup,
    MatButton,
    TeacherComponent,
    StudentComponent,
    NgIf
  ],
  templateUrl: './course-participants.component.html',
  styleUrl: './course-participants.component.css'
})
export class CourseParticipantsComponent {
  @Input({required: true}) courseDto: CourseDetailsDto;
  @Input({required: true}) updateCourse: (course: CourseDetailsDto) => void;

  constructor(
    readonly userService: UserService,
    readonly courseService: CourseService,
    readonly dialog: MatDialog
  ) {
  }

  openAddTeacher() {
    const dialogRef = this.dialog.open(AddTeacherComponent, {
      width: '80vw',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseService.addTeacher({userId: result}, this.courseDto.id).subscribe({
            next: (course: CourseDetailsDto) => {
              this.updateCourse(course);
              showSuccessfulPopup("Успешное добавление")
            },
            error: (err) => {
              showErrorPopup('Ошибка добавления', err);
            }
          }
        )
      }
    });
  }
}
