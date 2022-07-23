import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AdminComponent } from './admin/admin.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { UsersComponent } from './admin/users/users.component';
import { ProjectComponent } from './admin/project/project.component';
import { projectSearch } from './admin/project/projectSearch.pipe';
import { DepartmentComponent } from './admin/department/department.component';
import { AssignmentComponent } from './admin/assignment/assignment.component';
import { ClientComponent } from './admin/client/client.component';
import { TimeSheetComponent } from './admin/time-sheet/time-sheet.component';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserHeaderComponent } from './user-dashboard/user-header/user-header.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    LoadingSpinnerComponent,
    PageNotFoundComponent,
    AdminComponent,
    AdminNavbarComponent,
    AdminProfileComponent,
    UsersComponent,
    ProjectComponent,
    projectSearch,
    ClientComponent,
    DepartmentComponent,
    TimeSheetComponent,
    AssignmentComponent,
    UserDashboardComponent,
    UserHeaderComponent,
    ProfileComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    FontAwesomeModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],

  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
