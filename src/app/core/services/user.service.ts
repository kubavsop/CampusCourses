import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterDto} from "../models/dtos/register-dto";
import {TokenResponseDto} from "../models/dtos/token-response-dto";
import {BehaviorSubject, distinctUntilChanged, finalize, Observable, tap} from "rxjs";
import {JwtService} from "./jwt.service";
import {UserRolesDto} from "../models/dtos/user-roles-dto";
import {UserClaim} from "../models/user-claim";
import {ProfileDto} from "../models/dtos/profile-dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userClaimsSubject$ = new BehaviorSubject<UserClaim[]>([UserClaim.NOT_AUTH]);
  private readonly loadingSubject$ = new BehaviorSubject<boolean>(false);
  private readonly profileSubject$ = new BehaviorSubject<ProfileDto | null>(null);

  public readonly userClaim$ = this.userClaimsSubject$
    .asObservable()
    .pipe(distinctUntilChanged());

  public readonly loading$ = this.loadingSubject$
    .asObservable()
    .pipe(distinctUntilChanged());

  public readonly profile$ = this.profileSubject$
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtService
  ) {}

  register(registerDto: RegisterDto): Observable<TokenResponseDto> {
    registerDto.birthDate = new Date("10.05.2012").toISOString();
    this.startLoading();
    return this.httpClient.post<TokenResponseDto>("/registration", registerDto)
      .pipe(
        tap(
          (token: TokenResponseDto) => {
            this.setToken(token);
            this.userClaimsSubject$.next([UserClaim.AUTH]);
          }),
        finalize(() => this.stopLoading())
      );
  }

  getProfile(): Observable<ProfileDto> {
    this.startLoading();
    return this.httpClient.get<ProfileDto>("/profile")
      .pipe(
        tap((profile: ProfileDto) => this.profileSubject$.next(profile)),
        finalize(() => this.stopLoading())
      );
  }

  getRoles(): Observable<UserRolesDto> {
    this.startLoading();
    return this.httpClient.get<UserRolesDto>("/roles")
      .pipe(
        tap((roles: UserRolesDto) => this.userClaimsSubject$.next(this.getClaims(roles))),
        finalize(() => this.stopLoading())
      );
  }

  logout(): Observable<any> {
    this.startLoading();
    return this.httpClient.post("/logout", null)
      .pipe(
        tap(() => this.purgeAuth()),
        finalize(() => this.stopLoading())
      );
  }

  purgeAuth(): void {
    this.jwtService.destroyToken();
    this.profileSubject$.next(null);
    this.userClaimsSubject$.next([UserClaim.NOT_AUTH]);
  }

  private startLoading(): void {
    this.loadingSubject$.next(true);
  }

  private stopLoading(): void {
    this.loadingSubject$.next(false);
  }

  private setToken(tokenResponse: TokenResponseDto): void {
    this.jwtService.saveToken(tokenResponse.token);
  }

  private getClaims(roles: UserRolesDto): UserClaim[] {
    const claims: UserClaim[] = [UserClaim.AUTH];

    if (roles.isTeacher) claims.push(UserClaim.TEACHER);
    if (roles.isStudent) claims.push(UserClaim.STUDENT);
    if (roles.isAdmin) claims.push(UserClaim.ADMIN);

    return claims;
  }
}
