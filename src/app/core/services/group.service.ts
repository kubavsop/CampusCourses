import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "./loading.service";
import {finalize, Observable} from "rxjs";
import {GroupDto} from "../models/dtos/group-dto";
import {CourseDto} from "../models/dtos/course-dto";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  getGroups(): Observable<GroupDto[]> {
    return this.httpClient.get<GroupDto[]>("/groups")
  }
  getGroupCourses(id: string): Observable<CourseDto[]> {
    return this.httpClient.get<CourseDto[]>(`/groups/${id}`)
  }
}
