import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterDto} from "../models/register-dto";
import {TokenResponseDto} from "../models/token-response-dto";
import {Api} from "../contants/api";
import {Observable, tap} from "rxjs";
import {JwtService} from "./jwt.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtService
  ) { }

  register(registerDto: RegisterDto): Observable<TokenResponseDto> {
    return this.httpClient.post<TokenResponseDto>(Api.REGISTER_ENDPOINT, registerDto)
      .pipe(
        tap((token: TokenResponseDto) => this.setAuth(token))
      )
  }

  private setAuth(tokenResponse: TokenResponseDto): void {
    this.jwtService.saveToken(tokenResponse.token);
  }
}
