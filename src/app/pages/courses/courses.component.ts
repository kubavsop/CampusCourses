import {Component, OnInit} from '@angular/core';
import {CourseComponent} from "../../shared/components/course/course.component";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {CoursesPageSource} from "../../core/models/enums/сourses-page-source";
import {CourseService} from "../../core/services/course.service";
import {showErrorPopup, showSuccessfulPopup} from "../../shared/utils/popup";
import {CourseDto} from "../../core/models/dtos/course-dto";
import {HttpErrorResponse} from "@angular/common/http";
import {GroupService} from "../../core/services/group.service";
import {GroupDto} from "../../core/models/dtos/group-dto";
import {combineLatest} from "rxjs";
import {UserService} from "../../core/services/user.service";
import {ActionWithCourseComponent} from "../../shared/modals/action-with-course/action-with-course.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CourseComponent,
    MatButton,
    NgIf
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  title: string
  id: string
  pageSource: CoursesPageSource
  initialLoading: boolean = true
  courses: CourseDto[]

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly courseService: CourseService,
    private readonly groupService: GroupService,
    protected readonly userService: UserService,
    public readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.pageSource = data['source'];
    });

    this.updateCourse();
  }

  openCreateCourse(){
    const dialogRef = this.dialog.open(ActionWithCourseComponent, {
      width: '80vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseService.createCourse(result, this.id).subscribe({
            next: () => {
              this.updateCourse();
              showSuccessfulPopup("Курс успешно создан")
            },
            error: (err) => {
              showErrorPopup('Ошибка создании курса', err);
            }
          }
        )
      }
    });
  }

  private updateCourse(){
    switch (this.pageSource) {
      case CoursesPageSource.GROUP: {
        this.id = this.activatedRoute.snapshot.params['id'];
        this.loadGroupCourses(this.id);
        break;
      }
      case CoursesPageSource.MY: {
        this.loadMyCourses();
        break;
      }
      case CoursesPageSource.TEACHING: {
        this.loadTeachingCourses();
        break;
      }
    }
  }

  private loadGroupCourses(id: string): void {
    combineLatest([
      this.groupService.getGroups(),
      this.groupService.getGroupCourses(this.id)
    ]).subscribe({
      next: ([groups, courses]: [GroupDto[], CourseDto[]]) => {
        this.title = `Группа - ${groups.find(value => value.id == id)!.name}`;
        this.setCourses(courses);
      },
      error: (err) => {
        this.showCourseLoadingError(err);
      }
    });
  }

  private loadMyCourses(): void {
    this.title = "Мои курсы"
    this.courseService.getMyCourses().subscribe(
      {
        next: (courses: CourseDto[]) => this.setCourses(courses),
        error: (err) => this.showCourseLoadingError(err)
      }
    )
  }

  private loadTeachingCourses(): void {
    this.title = "Преподаваемые курсы"
    this.courseService.getTeachingCourses().subscribe(
      {
        next: (courses: CourseDto[]) => this.setCourses(courses),
        error: (err) => this.showCourseLoadingError(err)
      }
    )
  }

  private setCourses(courses: CourseDto[]): void {
    this.initialLoading = false;
    this.courses = courses;
  }

  private showCourseLoadingError(err: HttpErrorResponse): void {
    showErrorPopup('Ошибка загрузки курсов', err);
  }
}
