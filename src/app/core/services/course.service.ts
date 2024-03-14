import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "./loading.service";
import {finalize, Observable} from "rxjs";
import {CourseDto} from "../models/dtos/course-dto";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private readonly httpClient: HttpClient,
  ) {}
  getMyCourses(): Observable<CourseDto[]> {
    return this.httpClient.get<CourseDto[]>(`/courses/my`)
  }
  getTeachingCourses(): Observable<CourseDto[]> {
    return this.httpClient.get<CourseDto[]>(`/courses/teaching`)
  }
}
