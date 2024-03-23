import {Component, Input, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgClass, NgIf} from "@angular/common";
import {CourseDto} from "../../core/models/dtos/course-dto";
import {Semester} from "../../core/models/enums/semester";
import {CourseStatus} from "../../core/models/enums/course-statuses";
import {Router} from "@angular/router";

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgIf,
    NgClass
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
  @Input({required: true}) courseDto: CourseDto
  statusColor: string

  constructor(
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    switch (this.courseDto.status) {
      case CourseStatus.Created:
        this.statusColor = "#ff4081"
        break;
      case CourseStatus.OpenForAssigning:
        this.statusColor = "#8BC34A";
        break;
      case CourseStatus.Started:
        this.statusColor = "#3f51b5"
        break;
      case CourseStatus.Finished:
        this.statusColor = "#f44336"
        break;
    }
  }

  navigateToCourseDetails() {
    this.router.navigate([`/courses/${this.courseDto.id}`]);
  }

  getSemesterName(semester: Semester): string {
    switch (semester) {
      case Semester.Autumn:
        return "Осенний";
      case Semester.Spring:
        return "Весенний";
      default:
        return "Неизвестный";
    }
  }

  getCourseStatusName(courseStatus: CourseStatus): string {
    switch (courseStatus) {
      case CourseStatus.Created:
        return "Создан";
      case CourseStatus.OpenForAssigning:
        return "Открыт для записи";
      case CourseStatus.Started:
        return "В процессе обучения";
      case CourseStatus.Finished:
        return "Закрыт";
      default:
        return "Неизвестный";
    }
  }
}
