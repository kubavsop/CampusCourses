import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterDto} from "../models/dtos/register-dto";
import {TokenResponseDto} from "../models/dtos/token-response-dto";
import {BehaviorSubject, distinctUntilChanged, finalize, Observable, tap} from "rxjs";
import {JwtService} from "./jwt.service";
import {UserRolesDto} from "../models/dtos/user-roles-dto";
import {UserClaim} from "../models/user-claim";
import {ProfileDto} from "../models/dtos/profile-dto";
import {LoginDto} from "../models/dtos/login-dto";
import {LoadingService} from "./loading.service";
import {EditProfileDto} from "../models/dtos/edit-profile-dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userClaimsSubject$ = new BehaviorSubject<UserClaim[]>([UserClaim.NOT_AUTH]);
  private readonly profileSubject$ = new BehaviorSubject<ProfileDto | null>(null);

  public readonly userClaim$ = this.userClaimsSubject$
    .asObservable()
    .pipe(distinctUntilChanged());

  public readonly profile$ = this.profileSubject$
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(
    private readonly httpClient: HttpClient,
    private readonly jwtService: JwtService,
    private readonly loadingService: LoadingService
  ) {}

  register(registerDto: RegisterDto): Observable<TokenResponseDto> {
    this.loadingService.startLoading();
    return this.httpClient.post<TokenResponseDto>("/registration", registerDto)
      .pipe(
        tap(
          (token: TokenResponseDto) => {
            this.setToken(token);
            this.userClaimsSubject$.next([UserClaim.AUTH]);
            this.updateProfile();
          }),
        finalize(() => {
          this.loadingService.stopLoading()
        })
      );
  }

  login(loginDto: LoginDto): Observable<TokenResponseDto> {
    this.loadingService.startLoading();
    return this.httpClient.post<TokenResponseDto>("/login", loginDto)
      .pipe(
        tap(
          (token: TokenResponseDto) => {
            this.setToken(token);
            this.updateRoles();
            this.updateProfile();
          }),
        finalize(() => {
          this.loadingService.stopLoading()
        })
      )
  }

  getProfile(): Observable<ProfileDto> {
    this.loadingService.startLoading();
    return this.httpClient.get<ProfileDto>("/profile")
      .pipe(
        tap((profile: ProfileDto) => this.profileSubject$.next(profile)),
        finalize(() => this.loadingService.stopLoading())
      );
  }

  editProfile(dto: EditProfileDto): Observable<object> {
    this.loadingService.startLoading();
    return this.httpClient.put("/profile", dto)
      .pipe(
        finalize(() => this.loadingService.stopLoading())
      );
  }

  getRoles(): Observable<UserRolesDto> {
    this.loadingService.startLoading();
    return this.httpClient.get<UserRolesDto>("/roles")
      .pipe(
        tap((roles: UserRolesDto) => this.userClaimsSubject$.next(this.getClaims(roles))),
        finalize(() => this.loadingService.stopLoading())
      );
  }

  logout(): Observable<object> {
    this.loadingService.startLoading();
    return this.httpClient.post("/logout", null)
      .pipe(
        tap(() => this.purgeAuth()),
        finalize(() => this.loadingService.stopLoading())
      );
  }

  purgeAuth(): void {
    this.jwtService.destroyToken();
    this.profileSubject$.next(null);
    this.userClaimsSubject$.next([UserClaim.NOT_AUTH]);
  }

  private updateProfile(): void {
    this.getProfile().subscribe();
  }

  private updateRoles(): void {
    this.getRoles().subscribe();
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
