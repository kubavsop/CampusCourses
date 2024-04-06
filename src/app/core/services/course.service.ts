import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CourseDto} from "../models/dtos/course-dto";
import {ActionCourseDto} from "../models/dtos/action-course-dto";
import {CourseDetailsDto} from "../models/dtos/course-details-dto";
import {TeacherDto} from "../models/dtos/teacher-dto";
import {EditCourseDto} from "../models/dtos/edit-course-dto";
import {StudentDto} from "../models/dtos/student-dto";
import {CourseStatus} from "../models/enums/course-statuses";
import {EditStatusCourseDto} from "../models/dtos/edit-status-course-dto";

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

  createCourse(dto: ActionCourseDto, groupId: string): Observable<object> {
    return this.httpClient.post(`/groups/${groupId}`, dto);
  }

  getCourseDetails(id: string): Observable<CourseDetailsDto>{
    return this.httpClient.get<CourseDetailsDto>(`/courses/${id}/details`);
  }

  editCourseByAdmin(dto: ActionCourseDto, id: string): Observable<CourseDetailsDto> {
    return this.httpClient.put<CourseDetailsDto>(`/courses/${id}`, dto)
  }

  editCourseByTeacher(dto: EditCourseDto, id: string): Observable<CourseDetailsDto> {
    return this.httpClient.put<CourseDetailsDto>(`/courses/${id}/requirements-and-annotations`, dto);
  }

  deleteCourse(id: string): Observable<object> {
    return this.httpClient.delete(`/courses/${id}`);
  }

  editCourseStatus(dto: EditStatusCourseDto, id:string): Observable<CourseDetailsDto> {
    return this.httpClient.post<CourseDetailsDto>(`/courses/${id}/status`, dto);
  }

  userIsTeacher(teachers: TeacherDto[], userEmail: string): boolean {
    return teachers.find(t => t.email == userEmail) != undefined;
  }

  userIsStudent(students: StudentDto[], userEmail: string): boolean {
    return students.find(s => s.email == userEmail) != undefined;
  }
}
