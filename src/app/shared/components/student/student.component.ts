import {Component, Input, OnInit} from '@angular/core';
import {StudentDto} from "../../../core/models/dtos/student-dto";
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {NgClass, NgIf} from "@angular/common";
import {
  getStudentMarkColor,
  getStudentMarkName,
  getStudentStatusColor,
  getStudentStatusName
} from "../../utils/course-util";
import {MatButton} from "@angular/material/button";
import {StudentStatuses} from "../../../core/models/enums/student-statuses";
import {UserService} from "../../../core/services/user.service";
import {CourseService} from "../../../core/services/course.service";
import {CourseDetailsDto} from "../../../core/models/dtos/course-details-dto";
import {StudentStatusAction} from "../../../core/models/enums/student-status-action";
import {showErrorPopup, showSuccessfulPopup} from "../../utils/popup";
import {EditStudentStatusComponent} from "../../modals/edit-student-status/edit-student-status.component";
import {MatDialog} from "@angular/material/dialog";
import {EditMarkModel} from "../../../core/models/edit-mark-model";
import {MarkType} from "../../../core/models/enums/mark-type";
import {EditMarkComponent} from "../../modals/edit-mark/edit-mark.component";

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    NgIf,
    MatButton,
    MatCardActions,
    NgClass,
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {
  @Input({required: true}) studentDto: StudentDto
  @Input({required: true}) courseDto: CourseDetailsDto
  @Input({required: true}) updateCourse: (course: CourseDetailsDto) => void;
  isTeacherOrAdmin: boolean

  protected readonly getStudentStatusColor = getStudentStatusColor;
  protected readonly getStudentMarkColor = getStudentMarkColor;
  protected readonly getStudentMarkName = getStudentMarkName;
  protected readonly getStudentStatusName = getStudentStatusName;
  protected readonly StudentStatuses = StudentStatuses;

  constructor(
    readonly userService: UserService,
    readonly courseService: CourseService,
    readonly dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.isTeacherOrAdmin = this.userService.isAdmin() || this.courseService.userIsTeacher(this.courseDto.teachers, this.userService.getCurrentProfile().email);
  }

  openAcceptStudent(): void {
    this.openEditStatus(StudentStatusAction.Accepted);
  }

  openRejectStudent(): void {
    this.openEditStatus(StudentStatusAction.Declined);
  }

  private openEditStatus(action: StudentStatusAction) {
    const dialogRef = this.dialog.open(EditStudentStatusComponent, {
      width: '80vw',
      autoFocus: false,
      data: action
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseService.editStudentStatus(
          {status: action === StudentStatusAction.Accepted ? StudentStatuses.Accepted : StudentStatuses.Declined},
          this.courseDto.id, this.studentDto.id
        ).subscribe({
            next: (course: CourseDetailsDto) => {
              this.updateCourse(course);
              showSuccessfulPopup("Статус успешно изменен")
            },
            error: (err) => {
              showErrorPopup('Ошибка изменения статуса ', err);
            }
          }
        )
      }
    });
  }

  openEditMark(markType: MarkType) {
    if (!this.isTeacherOrAdmin) return;

    const model: EditMarkModel = {
      studentName: this.studentDto.name,
      markType: markType,
      mark: markType == MarkType.Final ? this.studentDto.finalResult : this.studentDto.midtermResult
    }

    const dialogRef = this.dialog.open(EditMarkComponent, {
      width: '80vw',
      autoFocus: false,
      data: model
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseService.editMark(
          {mark: result, markType: markType},
          this.courseDto.id, this.studentDto.id
        ).subscribe({
            next: (course: CourseDetailsDto) => {
              this.updateCourse(course);
              showSuccessfulPopup("Оценка изменена")
            },
            error: (err) => {
              showErrorPopup('Ошибка изменения оценки ', err);
            }
          }
        )
      }
    });

  }

  protected readonly MarkType = MarkType;
}
