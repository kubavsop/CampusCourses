import {Component, Input} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CourseDetailsDto} from "../../../core/models/dtos/course-details-dto";
import {MatButton} from "@angular/material/button";
import {TeacherComponent} from "../teacher/teacher.component";
import {StudentComponent} from "../student/student.component";

@Component({
  selector: 'app-course-participants',
  standalone: true,
  imports: [
    MatTab,
    MatTabGroup,
    MatButton,
    TeacherComponent,
    StudentComponent
  ],
  templateUrl: './course-participants.component.html',
  styleUrl: './course-participants.component.css'
})
export class CourseParticipantsComponent {
  @Input({required: true}) courseDto: CourseDetailsDto;
}
