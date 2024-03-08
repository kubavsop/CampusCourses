import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterDto} from "../models/dtos/register-dto";
import {TokenResponseDto} from "../models/dtos/token-response-dto";
import {BehaviorSubject, distinctUntilChanged, Observable, tap} from "rxjs";
import {JwtService} from "./jwt.service";
import {UserClaim} from "../models/user-claim";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userClaimsSubject$ = new BehaviorSubject<UserClaim[]>([UserClaim.NOT_AUTH]);
  public userClaims$ = this.userClaimsSubject$
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtService
  ) { }

  register(registerDto: RegisterDto): Observable<TokenResponseDto> {
    return this.httpClient.post<TokenResponseDto>("/registration", registerDto)
      .pipe(
        tap((token: TokenResponseDto) => this.setAuth(token))
      )
  }

  private setAuth(tokenResponse: TokenResponseDto): void {
    this.jwtService.saveToken(tokenResponse.token);
  }
}
