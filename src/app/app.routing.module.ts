import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ForgotPasswordComponent } from "./login/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./login/verify-email/verify-email.component";
import { AdminComponent } from "./admin/admin.component";
import { AdminProfileComponent } from "./admin/admin-profile/admin-profile.component";
import { ProjectComponent } from "./admin/project/project.component";
import { UsersComponent } from "./admin/users/users.component";
import { AssignmentComponent } from "./admin/assignment/assignment.component";
import { ClientComponent } from "./admin/client/client.component";
import { DepartmentComponent } from "./admin/department/department.component";
import { TimeSheetComponent } from "./admin/time-sheet/time-sheet.component";
import { ProfileComponent } from "./profile/profile.component";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'Profile', component: AdminProfileComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'users', component: UsersComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'timesheet', component: TimeSheetComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'assignment', component: AssignmentComponent },
  { path: 'client', component: ClientComponent },
  { path: 'userDashboard', component: UserDashboardComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
