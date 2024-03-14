import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "./loading.service";
import {finalize, Observable} from "rxjs";
import {GroupDto} from "../models/dtos/group-dto";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly loadingService: LoadingService
  ) {
  }

  getGroups(): Observable<GroupDto[]> {
    this.loadingService.startLoading();
    return this.httpClient.get<GroupDto[]>("/groups")
      .pipe(
        finalize(() => this.loadingService.stopLoading())
      );
  }
}
