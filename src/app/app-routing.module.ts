import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllusersComponent } from './admin/allusers/allusers.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MissionsComponent } from './admin/missions/missions.component';
import { ProfilAdminComponent } from './admin/profil-admin/profil-admin.component';
import { SkillsComponent } from './admin/skills/skills.component';
import { DashbordClientComponent } from './client/dashbord-client/dashbord-client.component';
import { AboutComponent } from './user/about/about.component';
import { CategoriesDetailComponent } from './user/categories-detail/categories-detail.component';
import { CategoriesListComponent } from './user/categories-list/categories-list.component';
import { ContactComponent } from './user/contact/contact.component';
import { FAQComponent } from './user/faq/faq.component';
import { FindFreelancerComponent } from './user/find-freelancer/find-freelancer.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { IndexComponent } from './user/index/index.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';

const routes: Routes = [
  {path:'',component:IndexComponent},
  {path:'categorie-list',component:CategoriesListComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'FAQ',component:FAQComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'categorie-detail',component:CategoriesDetailComponent},
  {path:'dashboard-admin',component:DashboardComponent},
  {path:'find-freelancer',component:FindFreelancerComponent},
  { path : 'categories' , component : CategoriesComponent} ,
  {path:'profil-admin',component:ProfilAdminComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'reset/:token', component: ResetPasswordComponent},
  {path:'allusers',component:AllusersComponent},
  {path:'missions',component:MissionsComponent},
  {path:'allskills',component:SkillsComponent},
  {path:'dashbord-client',component:DashbordClientComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
