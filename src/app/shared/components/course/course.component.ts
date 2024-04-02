import {Component, Input, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgClass, NgIf} from "@angular/common";
import {CourseDto} from "../../../core/models/dtos/course-dto";
import {Semester} from "../../../core/models/enums/semester";
import {CourseStatus} from "../../../core/models/enums/course-statuses";
import {Router} from "@angular/router";
import {getCourseStatusColor, getCourseStatusName, getSemesterName} from "../../utils/course-util";

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
export class CourseComponent {
  @Input({required: true}) courseDto: CourseDto

  constructor(
    private readonly router: Router
  ) {
  }

  navigateToCourseDetails() {
    this.router.navigate([`/courses/${this.courseDto.id}`]);
  }

  protected readonly getCourseStatusName = getCourseStatusName;
  protected readonly getSemesterName = getSemesterName;
  protected readonly getCourseStatusColor = getCourseStatusColor;
}
