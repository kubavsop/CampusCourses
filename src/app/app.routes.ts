import {Routes} from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {RegistrationPageComponent} from "./pages/registration-page/registration-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {GroupsPageComponent} from "./pages/groups-page/groups-page.component";

export const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'registration', component: RegistrationPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'groups', component: GroupsPageComponent}
];
