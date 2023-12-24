
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { JobBoardComponent } from './job-board/job-board.component';
import { AdminComponent } from './admin/admin.component';
import { JobListComponent } from './job-list/job-list.component';
import { LoginComponent } from './login/login.component';
import { ProfileRecruiterComponent } from './profile-recruiter/profile-recruiter.component';
import { ProfileSeekerComponent } from './profile-seeker/profile-seeker.component';
import { RecruiterDashboardComponent } from './recruiter-dashboard/recruiter-dashboard.component';
import { JobSeekerDashboardComponent } from './job-seeker-dashboard/job-seeker-dashboard.component';
import { ViewJobComponent } from './view-job/view-job.component';
import { PostJobComponent } from './post-job/post-job.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ForCadidateComponent } from './for-cadidate/for-cadidate.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: JobBoardComponent },
  { path: 'for-candidate', component: ForCadidateComponent },

  { path: 'admin', component: AdminComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'job-list/:location/:keyword', component: JobListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile-recruiter', component: ProfileRecruiterComponent },
  { path: 'profile-seeker', component: ProfileSeekerComponent },
  { path: 'dashboard-recruiter', component: RecruiterDashboardComponent },
  { path: 'abount', component: AboutUsComponent },
  { path: 'dashboard-seeker', component: JobSeekerDashboardComponent },
  { path: 'job-list/:location/:keyword/view-job/:jobId', component: ViewJobComponent },
  { path: 'dashboard-seeker/view-job/:jobId', component: ViewJobComponent },
  { path: 'dashboard-recruiter/view-job/:jobId', component: ViewJobComponent },
  { path: 'post', component: PostJobComponent },
  { path: '**', component: JobBoardComponent } // last
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [RegisterComponent, ProfileRecruiterComponent, JobBoardComponent, AdminComponent,
  JobListComponent, ProfileSeekerComponent, ViewJobComponent, JobSeekerDashboardComponent, RecruiterDashboardComponent]


