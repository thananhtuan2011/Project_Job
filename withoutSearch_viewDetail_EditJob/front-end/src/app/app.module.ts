import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { AllTitleComponent } from './all-title/all-title.component';
import { BlogComponent } from './blog/blog.component';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { ActionInsertComponent } from './action-insert/action-insert.component';
// import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
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
    routingComponents,
    AllTitleComponent,
    BlogComponent,
    ActionInsertComponent

  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatMenuModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // PerfectScrollbarModule,
    MatSliderModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    AsyncPipe,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    MatCheckboxModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatChipsModule,
    MatAutocompleteModule,
  ],
  providers: [
    // {
    //   provide: PERFECT_SCROLLBAR_CONFIG,
    //   useValue: PERFECT_SCROLLBAR_CONFIG
    // },
    JobListingService,
    UserService,
    SaveJobService,
    JobPostingService,
    RecruiterDetailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
