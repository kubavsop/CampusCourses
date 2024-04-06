import {Component, Input} from '@angular/core';
import {StudentDto} from "../../../core/models/dtos/student-dto";
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {
  getStudentMarkColor,
  getStudentMarkName,
  getStudentStatusColor,
  getStudentStatusName
} from "../../utils/course-util";
import {MatButton} from "@angular/material/button";

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
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  @Input({required: true}) studentDto: StudentDto
  protected readonly getStudentStatusColor = getStudentStatusColor;
  protected readonly getStudentMarkColor = getStudentMarkColor;
  protected readonly getStudentMarkName = getStudentMarkName;
  protected readonly getStudentStatusName = getStudentStatusName;
}
