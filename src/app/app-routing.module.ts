import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { ValidateEmailComponent } from './validate-email/validate-email.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { UserCenterComponent } from './user-center/user-center.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'courses/:id', component: CourseDetailComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'verify/:token', component: ValidateEmailComponent, pathMatch: 'full' },
  { path: 'admin/courses', component: AdminCoursesComponent, pathMatch: 'full' },
  { path: 'people/:username', component: UserCenterComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
