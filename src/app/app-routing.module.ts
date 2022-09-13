import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllusersComponent } from './admin/allusers/allusers.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MissionsComponent } from './admin/missions/missions.component';
import { ProfilAdminComponent } from './admin/profil-admin/profil-admin.component';
import { SkillsComponent } from './admin/skills/skills.component';
import { AddmissionComponent } from './client/addmission/addmission.component';
import { ClientMissionsComponent } from './client/client-missions/client-missions.component';
import { DashbordClientComponent } from './client/dashbord-client/dashbord-client.component';
import { EditProfilClientComponent } from './client/edit-profil-client/edit-profil-client.component';
import { EndedMissionsClientComponent } from './client/ended-missions-client/ended-missions-client.component';
import { MissionRequestsClientComponent } from './client/mission-requests-client/mission-requests-client.component';
import { ToDoMissionsComponent } from './client/to-do-missions/to-do-missions.component';
import { ActiveMissionsFreelancerComponent } from './freelancer/active-missions-freelancer/active-missions-freelancer.component';
import { DashbordFreelancerComponent } from './freelancer/dashbord-freelancer/dashbord-freelancer.component';
import { EndedMissionsFreelancerComponent } from './freelancer/ended-missions-freelancer/ended-missions-freelancer.component';
import { GeneratecontratfreelancerComponent } from './freelancer/generatecontratfreelancer/generatecontratfreelancer.component';
import { GeneratecvComponent } from './freelancer/generatecv/generatecv.component';
import { PostulatedMissionFreelancerComponent } from './freelancer/postulated-mission-freelancer/postulated-mission-freelancer.component';
import { AboutComponent } from './user/about/about.component';
import { CategoriesDetailComponent } from './user/categories-detail/categories-detail.component';
import { CategoriesListComponent } from './user/categories-list/categories-list.component';
import { ContactComponent } from './user/contact/contact.component';
import { FAQComponent } from './user/faq/faq.component';
import { FindFreelancerComponent } from './user/find-freelancer/find-freelancer.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { IndexComponent } from './user/index/index.component';
import { LoginComponent } from './user/login/login.component';
import { MissionComponent } from './user/mission/mission.component';
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
  {path: 'categories' , component : CategoriesComponent} ,
  {path:'profil-admin',component:ProfilAdminComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'reset/:token', component: ResetPasswordComponent},
  {path:'allusers',component:AllusersComponent},
  {path:'missions',component:MissionsComponent},
  {path:'allskills',component:SkillsComponent},
  {path:'dashbord-client',component:DashbordClientComponent},
  {path:'addmission',component:AddmissionComponent},
  {path:"missions-client",component:ClientMissionsComponent},
  {path: 'postulated-missions-client' , component:MissionRequestsClientComponent  },
  {path:'edit-client',   component:EditProfilClientComponent},
  {path: 'active-missions-client' , component:ToDoMissionsComponent},
  {path: 'ended-missions-client' ,component:EndedMissionsClientComponent},
  {path:'dashboard-freelancer',component:DashbordFreelancerComponent},
  {path: 'postulated-missions-freelancer', component: PostulatedMissionFreelancerComponent },
  {path: 'active-missions-freelancer',  component: ActiveMissionsFreelancerComponent },
  {path: 'ended-missions-freelancer',  component: EndedMissionsFreelancerComponent },
  {path: "generatecv/:id",  component: GeneratecvComponent },
  { path: 'generatecontratfreelancer/:id', component: GeneratecontratfreelancerComponent   },
  {path:'mission',component:MissionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
