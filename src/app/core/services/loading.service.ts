import { Injectable } from '@angular/core';
import {BehaviorSubject, distinctUntilChanged} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly loadingSubject$ = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loadingSubject$
    .asObservable()
    .pipe(distinctUntilChanged());

  public startLoading(): void {
    this.loadingSubject$.next(true);
  }

  public stopLoading(): void {
    this.loadingSubject$.next(false);
  }
  constructor() { }
}
