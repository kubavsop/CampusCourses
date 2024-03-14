import {Component, Input} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {CourseDto} from "../../core/models/dtos/course-dto";
import {Semester} from "../../core/models/enums/semester";
import {CourseStatus} from "../../core/models/enums/course-statuses";

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgIf
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  @Input({required: true}) courseDto: CourseDto
  statusColor: string = "black"

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
        this.statusColor = "#ff4081"
        return "Создан";
      case CourseStatus.OpenForAssigning:
        this.statusColor = "#8BC34A";
        return "Открыт для записи";
      case CourseStatus.Started:
        this.statusColor = "#3f51b5"
        return "В процессе обучения";
      case CourseStatus.Finished:
        this.statusColor = "#f44336"
        return "Закрыт";
      default:
        return "Неизвестный";
    }
  }
}
