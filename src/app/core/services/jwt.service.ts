import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  getToken(): string {
    return localStorage["jwtToken"];
  }

  saveToken(token: string): void {
    localStorage["jwtToken"] = token;
  }

  destroyToken(): void {
    localStorage.removeItem("jwtToken");
  }
}
