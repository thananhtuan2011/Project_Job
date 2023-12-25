
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AllTitleComponent } from './all-title/all-title.component';
import { BlogComponent } from './blog/blog.component';
import { ActionInsertComponent } from './action-insert/action-insert.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { DetailObDefaultComponent } from './detail-ob-default/detail-ob-default.component';
import { MyJobComponent } from './my-job/my-job.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { JobApplyComponent } from './job-apply/job-apply.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: JobBoardComponent },
  { path: 'my-job', component: MyJobComponent },
  { path: 'contact', component: ContactUsComponent },

  {
    path: 'all-job', component: ForCadidateComponent,
    children: [

      {
        path: '',
        component: DetailObDefaultComponent,

      },

      {
        path: 'detail/:id',
        component: JobDetailComponent,

      },

    ]
  },

  { path: 'blog', component: BlogComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'job-list/:location/:keyword', component: JobListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile-recruiter', component: ProfileRecruiterComponent },
  { path: 'profile', component: ProfileSeekerComponent },
  { path: 'all-skill', component: RecruiterDashboardComponent },
  { path: 'all-title', component: AllTitleComponent },
  { path: 'abount', component: AboutUsComponent },
  { path: 'action', component: ActionInsertComponent },
  { path: 'apply', component: JobApplyComponent },


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
export const routingComponents = [JobApplyComponent, MyJobComponent, ContactUsComponent, DetailObDefaultComponent, JobDetailComponent, AllTitleComponent, ProfileRecruiterComponent, JobBoardComponent, AdminComponent,
  JobListComponent, ProfileSeekerComponent, ViewJobComponent, JobSeekerDashboardComponent, RecruiterDashboardComponent]


