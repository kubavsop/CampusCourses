import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {TeacherDto} from "../../../core/models/dtos/teacher-dto";

@Component({
  selector: 'app-teacher',
  standalone: true,
    imports: [
        MatButton,
        MatCard,
        MatCardActions,
        MatCardContent,
        MatCardTitle,
        NgIf
    ],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {
  @Input({required: true}) teacherDto: TeacherDto
}
