import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';

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
    SidebarComponent,
    AdminHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
