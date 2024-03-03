import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./shared/header/header.component";
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "./core/services/user.service";
import {JwtService} from "./core/services/jwt.service";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HttpClientModule],
  providers: [UserService, JwtService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CampusHub';
}
