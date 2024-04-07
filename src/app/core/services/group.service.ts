import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "./loading.service";
import {finalize, Observable} from "rxjs";
import {GroupDto} from "../models/dtos/group-dto";
import {CourseDto} from "../models/dtos/course-dto";
import {CreateGroupDto} from "../models/dtos/create-group-dto";
import {EditGroupDto} from "../models/dtos/edit-group-dto";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  getGroups(): Observable<GroupDto[]> {
    return this.httpClient.get<GroupDto[]>("/groups")
  }

  getGroupCourses(id: string): Observable<CourseDto[]> {
    return this.httpClient.get<CourseDto[]>(`/groups/${id}`)
  }

  createGroup(dto: CreateGroupDto): Observable<object> {
    return this.httpClient.post("/groups", dto)
  }

  deleteGroup(id: string): Observable<object> {
    return this.httpClient.delete(`/groups/${id}`)
  }

  editGroup(id: string, dto: EditGroupDto): Observable<object> {
    return this.httpClient.put(`/groups/${id}`, dto);
  }
}
