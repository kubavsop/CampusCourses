import {Component, Input} from '@angular/core';
import {StudentDto} from "../../../core/models/dtos/student-dto";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    NgIf
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  @Input({required: true}) studentDto: StudentDto
}
