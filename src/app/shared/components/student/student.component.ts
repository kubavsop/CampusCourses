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
  isTeacherOrAdmin: boolean

  protected readonly getStudentStatusColor = getStudentStatusColor;
  protected readonly getStudentMarkColor = getStudentMarkColor;
  protected readonly getStudentMarkName = getStudentMarkName;
  protected readonly getStudentStatusName = getStudentStatusName;
  protected readonly StudentStatuses = StudentStatuses;

  constructor(
    readonly userService: UserService,
    readonly courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.isTeacherOrAdmin = this.userService.isAdmin() ||this.courseService.userIsTeacher(this.courseDto.teachers, this.userService.getCurrentProfile().email);
  }
}
