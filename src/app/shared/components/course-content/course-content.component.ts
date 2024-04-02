import {Component, Input} from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {CourseDetailsDto} from "../../../core/models/dtos/course-details-dto";

@Component({
  selector: 'app-course-content',
  standalone: true,
  imports: [
    MatTabsModule
  ],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.css'
})
export class CourseContentComponent {
  @Input({required: true}) courseDto: CourseDetailsDto;
}
