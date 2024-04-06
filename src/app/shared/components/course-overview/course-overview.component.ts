import {Component, Input} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {CourseDetailsDto} from "../../../core/models/dtos/course-details-dto";
import {getCourseStatusColor, getCourseStatusName, getSemesterName} from "../../utils/course-util";
import {UserService} from "../../../core/services/user.service";
import {CourseService} from "../../../core/services/course.service";
import {NgIf} from "@angular/common";
import {DeletionConfirmationComponent} from "../../modals/deletion-confirmation/deletion-confirmation.component";
import {showErrorPopup, showSuccessfulPopup} from "../../utils/popup";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ActionWithCourseComponent} from "../../modals/action-with-course/action-with-course.component";
import {ActionCourseDto} from "../../../core/models/dtos/action-course-dto";
import {EditCourseDto} from "../../../core/models/dtos/edit-course-dto";
import {EditCourseComponent} from "../../modals/edit-course/edit-course.component";
import {EditCourseStatusComponent} from "../../modals/edit-course-status/edit-course-status.component";
import {CourseStatus} from "../../../core/models/enums/course-statuses";
import {SignUpComponent} from "../../modals/sign-up/sign-up.component";

@Component({
  selector: 'app-course-overview',
  standalone: true,
  imports: [
    MatButtonModule,
    NgIf
  ],
  templateUrl: './course-overview.component.html',
  styleUrl: './course-overview.component.css'
})
export class CourseOverviewComponent {
  @Input({required: true}) courseDto: CourseDetailsDto;
  @Input({required: true}) updateCourse: (course: CourseDetailsDto) => void;
  @Input({required: true}) loadCourse: () => void;
  protected readonly getSemesterName = getSemesterName;
  protected readonly getCourseStatusColor = getCourseStatusColor;
  protected readonly getCourseStatusName = getCourseStatusName;

  constructor(
    private readonly router: Router,
    public readonly userService: UserService,
    public readonly courseService: CourseService,
    public readonly dialog: MatDialog
  ) {
  }

  openDeleteCourse(): void {
    const dialogRef = this.dialog.open(DeletionConfirmationComponent, {
      width: '80vw',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseService.deleteCourse(this.courseDto.id).subscribe({
            next: () => {
              showSuccessfulPopup("Курс успешно удален")
              this.router.navigate(["/groups"]);
            },
            error: (err) => {
              showErrorPopup('Ошибка удаления курса', err);
            }
          }
        )
      }
    });
  }

  openEditCourse() {
    if (this.userService.isAdmin()) {
      this.openEditCourseByAdmin();
    } else {
      this.openEditCourseByTeacher();
    }
  }

  openEditCourseStatus() {
    const dialogRef = this.dialog.open(EditCourseStatusComponent, {
      width: '80vw',
      data: this.courseDto.status,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseService.editCourseStatus({status: result}, this.courseDto.id).subscribe({
            next: (dto: CourseDetailsDto) => {
              this.updateCourse(dto);
              showSuccessfulPopup("Статус успешно изменен")
            },
            error: (err) => {
              showErrorPopup('Ошибка изменения статуса', err);
            }
          }
        )
      }
    });
  }

  openSignUp() {
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '80vw',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseService.signUp(this.courseDto.id).subscribe({
            next: () => {
              this.loadCourse();
              showSuccessfulPopup("Успешная запись на курса")
            },
            error: (err) => {
              showErrorPopup('Ошибка записи на курс', err);
            }
          }
        )
      }
    });
  }


  private openEditCourseByTeacher() {
    const dto: EditCourseDto = {
      requirements: this.courseDto.requirements,
      annotations: this.courseDto.annotations,
    }

    const dialogRef = this.dialog.open(EditCourseComponent, {
      width: '80vw',
      data: dto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseService.editCourseByTeacher(result, this.courseDto.id).subscribe({
            next: (dto: CourseDetailsDto) => {
              this.updateCourse(dto);
              showSuccessfulPopup("Курс успешно изменен")
            },
            error: (err) => {
              showErrorPopup('Ошибка изменения курса', err);
            }
          }
        )
      }
    });
  }

  private openEditCourseByAdmin() {
    const dto: ActionCourseDto = {
      name: this.courseDto.name,
      startYear: this.courseDto.startYear,
      maximumStudentsCount: this.courseDto.maximumStudentsCount,
      semester: this.courseDto.semester,
      requirements: this.courseDto.requirements,
      annotations: this.courseDto.annotations,
      mainTeacherId: "ddc025f9-f9b3-41be-12cd-08db2e8acafa" // плохое api, id никак не получить
    }

    const dialogRef = this.dialog.open(ActionWithCourseComponent, {
      width: '80vw',
      data: dto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseService.editCourseByAdmin(result, this.courseDto.id).subscribe({
            next: (dto: CourseDetailsDto) => {
              this.updateCourse(dto);
              showSuccessfulPopup("Курс успешно изменен")
            },
            error: (err) => {
              showErrorPopup('Ошибка изменения курса', err);
            }
          }
        )
      }
    });
  }

  protected readonly CourseStatus = CourseStatus;
}
