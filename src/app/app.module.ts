import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './user/index/index.component';
import { CategoriesListComponent } from './user/categories-list/categories-list.component';
import { NavbarUserComponent } from './user/navbar-user/navbar-user.component';
import { LoaderComponent } from './user/loader/loader.component';
import { FooterUserComponent } from './user/footer-user/footer-user.component';
import { AboutComponent } from './user/about/about.component';
import { ContactComponent } from './user/contact/contact.component';
import { FAQComponent } from './user/faq/faq.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { CategoriesDetailComponent } from './user/categories-detail/categories-detail.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FindFreelancerComponent } from './user/find-freelancer/find-freelancer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfilAdminComponent } from './admin/profil-admin/profil-admin.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { AllusersComponent } from './admin/allusers/allusers.component';
import { MissionsComponent } from './admin/missions/missions.component';
import { SkillsComponent } from './admin/skills/skills.component';
import { DashbordClientComponent } from './client/dashbord-client/dashbord-client.component';
import { ClientHeaderComponent } from './client/client-header/client-header.component';
import { AddmissionComponent } from './client/addmission/addmission.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    CategoriesListComponent,
    NavbarUserComponent,
    LoaderComponent,
    FooterUserComponent,
    AboutComponent,
    ContactComponent,
    FAQComponent,
    LoginComponent,
    RegisterComponent,
    CategoriesDetailComponent,
    DashboardComponent,

    FindFreelancerComponent,
     AdminHeaderComponent,
     CategoriesComponent,
     ProfilAdminComponent,
     ForgotPasswordComponent,
     ResetPasswordComponent,
     AllusersComponent,
     MissionsComponent,
     SkillsComponent,
     DashbordClientComponent,
     ClientHeaderComponent,
     AddmissionComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    MDBBootstrapModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot()

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
