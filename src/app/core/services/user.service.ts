import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterDto} from "../models/dtos/register-dto";
import {TokenResponseDto} from "../models/dtos/token-response-dto";
import {BehaviorSubject, distinctUntilChanged, Observable, tap} from "rxjs";
import {JwtService} from "./jwt.service";
import {UserRolesDto} from "../models/dtos/user-roles-dto";
import {UserClaim} from "../models/user-claim";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userClaimsSubject$ = new BehaviorSubject<UserClaim[]>([UserClaim.NOT_AUTH]);
  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  public userClaim$ = this.userClaimsSubject$
    .asObservable()
    .pipe(distinctUntilChanged());
  public loading$ = this.loadingSubject$
    .asObservable()
    .pipe(distinctUntilChanged());


  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtService
  ) {}

  register(registerDto: RegisterDto): Observable<TokenResponseDto> {
    registerDto.birthDate = new Date("10.05.2012").toISOString();
    return this.httpClient.post<TokenResponseDto>("/registration", registerDto)
      .pipe(
        tap((token: TokenResponseDto) => {
          this.setAuth(token)
          this.userClaimsSubject$.next([UserClaim.AUTH])
        })
      )
  }

  updateRoles() {
    this.httpClient.get<UserRolesDto>("/roles").subscribe(
      (roles: UserRolesDto) => this.userClaimsSubject$.next(this.getClaims(roles)),
    )
  }

  private setAuth(tokenResponse: TokenResponseDto): void {
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
