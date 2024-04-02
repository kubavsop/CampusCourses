import {Component, Input} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {CourseDetailsDto} from "../../../core/models/dtos/course-details-dto";
import {getCourseStatusColor, getCourseStatusName, getSemesterName} from "../../utils/course-util";

@Component({
  selector: 'app-course-overview',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './course-overview.component.html',
  styleUrl: './course-overview.component.css'
})
export class CourseOverviewComponent {
  @Input({required: true}) courseDto: CourseDetailsDto;
  protected readonly getSemesterName = getSemesterName;
  protected readonly getCourseStatusColor = getCourseStatusColor;
  protected readonly getCourseStatusName = getCourseStatusName;
}
