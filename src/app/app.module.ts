import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // apply interceptor
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {
  AuthInterceptorService,
  CardComponent,
  CardFluidComponent,
  ConfirmWishDialogComponent,
  ContentAsideComponent,
  ContentComponent,
  ContentFluidComponent,
  ContentMainComponent,
  HeaderComponent,
  InterestsComponent,
  SearchComponent,
  SharedModule,
} from './shared';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { SignupComponent } from './signup/signup.component';
import { ValidateEmailComponent } from './validate-email/validate-email.component';
import { UserCenterComponent } from './user-center/user-center.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseDetailComponent,
    AdminCoursesComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ValidateEmailComponent,
    InterestsComponent,
    SearchComponent,
    ConfirmWishDialogComponent,
    UserCenterComponent,
    CardComponent,
    CardFluidComponent,
    ContentComponent,
    ContentAsideComponent,
    ContentFluidComponent,
    ContentMainComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    SharedModule,
    MatChipsModule,
    MatTableModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,
    FormsModule,
    HammerModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatPaginatorModule,
  ],
  providers: [
    {
      provide: MatDatepickerModule,
    },
    {
      provide: MatNativeDateModule,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
