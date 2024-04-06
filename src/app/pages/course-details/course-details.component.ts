import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {CourseOverviewComponent} from "../../shared/components/course-overview/course-overview.component";
import {CourseComponent} from "../../shared/components/course/course.component";
import {CourseContentComponent} from "../../shared/components/course-content/course-content.component";
import {CourseParticipantsComponent} from "../../shared/components/course-participants/course-participants.component";
import {CourseService} from "../../core/services/course.service";
import {CourseDetailsDto} from "../../core/models/dtos/course-details-dto";
import {ActivatedRoute} from "@angular/router";
import {showErrorPopup} from "../../shared/utils/popup";

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    MatButton,
    NgIf,
    CourseOverviewComponent,
    CourseComponent,
    CourseContentComponent,
    CourseParticipantsComponent

  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  id: string
  initialLoading: boolean = true
  courseDto: CourseDetailsDto

  constructor(
    private readonly courseService: CourseService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.id = activatedRoute.snapshot.params['id'];
    this.updateCourse = this.updateCourse.bind(this);
  }

  ngOnInit(): void {
    this.updateCourse();
  }


  updateCourse() {
    this.courseService.getCourseDetails(this.id).subscribe(
      {
        next: (course: CourseDetailsDto) => {
          this.courseDto = course;
          this.initialLoading = false;
        },
        error: (err) =>  showErrorPopup('Ошибка загрузки курса', err)
      }
    )
  }
}
