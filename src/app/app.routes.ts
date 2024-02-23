import {Routes} from '@angular/router';
import {MainPageComponent} from "./pages/main/main-page.component";
import {RegistrationPageComponent} from "./pages/registration/registration-page.component";
import {LoginPageComponent} from "./pages/login/login-page.component";

export const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'registration', component: RegistrationPageComponent},
  {path: 'login', component: LoginPageComponent},
];
