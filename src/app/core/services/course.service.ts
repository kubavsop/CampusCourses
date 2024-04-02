import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CourseDto} from "../models/dtos/course-dto";
import {CreateCourseDto} from "../models/dtos/create-course-dto";
import {CourseDetailsDto} from "../models/dtos/course-details-dto";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  getMyCourses(): Observable<CourseDto[]> {
    return this.httpClient.get<CourseDto[]>("/courses/my");
  }

  getTeachingCourses(): Observable<CourseDto[]> {
    return this.httpClient.get<CourseDto[]>("/courses/teaching");
  }

  createCourse(dto: CreateCourseDto, groupId: string): Observable<object> {
    return this.httpClient.post(`/groups/${groupId}`, dto);
  }

  getCourseDetails(id: string): Observable<CourseDetailsDto>{
    return this.httpClient.get<CourseDetailsDto>(`/courses/${id}/details`);
  }
}
