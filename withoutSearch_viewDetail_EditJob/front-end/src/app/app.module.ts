import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AwardListComponent } from './award-list/award-list.component';
import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { EducationListComponent } from './education-list/education-list.component';
import { ExperienceListComponent } from './experience-list/experience-list.component';
import { ExtraCurricularListComponent } from './extra-curricular-list/extra-curricular-list.component';
import { FooterComponent } from './footer/footer.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobSeekerDashboardComponent } from './job-seeker-dashboard/job-seeker-dashboard.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ProfileRecruiterComponent } from './profile-recruiter/profile-recruiter.component';
import { ProfileSeekerComponent } from './profile-seeker/profile-seeker.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { ViewJobComponent } from './view-job/view-job.component';
import { MatButtonModule } from '@angular/material/button';
import { JobBoardComponent } from './job-board/job-board.component';
import { SearchFilterPipe } from './job-board/job-board.component';
import { PostJobComponent } from './post-job/post-job.component';
import { RecruiterDashboardComponent } from './recruiter-dashboard/recruiter-dashboard.component'
import { JobListingService } from './services/job-listing.service';
import { UserService } from './services/user.service';
import { SaveJobService } from './services/save-job.service';
import { JobPostingService } from './services/job-posting.service';
import { RecruiterDetailService } from './services/recruiter-detail.service';
import { HeaderComponent } from './header/header.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ForCadidateComponent } from './for-cadidate/for-cadidate.component';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileRecruiterComponent,
    ProfileSeekerComponent,
    NavBarComponent,
    JobBoardComponent,
    ForCadidateComponent,
    FooterComponent,
    AboutUsComponent,
    SearchFilterPipe,
    HeaderComponent,
    ViewJobComponent,
    JobListComponent,
    RegisterComponent,
    AdminComponent,
    PostJobComponent,
    ExperienceListComponent,
    AwardListComponent,
    SkillListComponent,
    EducationListComponent,
    ExtraCurricularListComponent,
    ProjectListComponent,
    CertificateListComponent,
    PersonalInfoComponent,
    UserSidebarComponent,
    JobSeekerDashboardComponent,
    RecruiterDashboardComponent,
    routingComponents

  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
    MatButtonModule
  ],
  providers: [
    JobListingService,
    UserService,
    SaveJobService,
    JobPostingService,
    RecruiterDetailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
