import {Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {RegistrationPageComponent} from "./pages/registration-page/registration-page.component";
import {LoginComponent} from "./pages/login/login.component";
import {GroupsComponent} from "./pages/groups/groups.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {CoursesComponent} from "./pages/courses/courses.component";

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'registration', component: RegistrationPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'groups', component: GroupsComponent},
  {path: 'courses/my', component: CoursesComponent},
  {path: 'courses/teaching', component: CoursesComponent}
];
