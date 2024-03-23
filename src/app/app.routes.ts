import {Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {LoginComponent} from "./pages/login/login.component";
import {GroupsComponent} from "./pages/groups/groups.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {CoursesComponent} from "./pages/courses/courses.component";
import {CoursesPageSource} from "./core/models/enums/сourses-page-source";
import {authGuard} from "./core/guards/auth.guard";
import {notAuthGuard} from "./core/guards/not-auth.guard";
import {CourseDetailsComponent} from "./pages/course-details/course-details.component";

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'registration', component: RegistrationComponent, canActivate: [notAuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [notAuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  {path: 'groups', component: GroupsComponent, canActivate: [authGuard]},
  {path: 'groups/:id', component: CoursesComponent, canActivate: [authGuard],data: {source: CoursesPageSource.GROUP}},
  {path: 'courses/my', component: CoursesComponent, canActivate: [authGuard],data: {source: CoursesPageSource.MY}},
  {path: 'courses/teaching', component: CoursesComponent, canActivate: [authGuard], data: {source: CoursesPageSource.TEACHING}},
  { path: 'courses/:id', component: CourseDetailsComponent, canActivate: [authGuard] }
];
