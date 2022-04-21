import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilityProvider } from '../providers/utilities/utility';
import { ApiProvider } from '../providers/auth/auth';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from './pages/landing/landing.component';
import { ListingsComponent } from './pages/listings/listings.component';
import { HeaderComponent } from './common/header/header.component';
import { JoinComponent } from './pages/join/join.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { TermsComponent } from './pages/terms/terms.component';
import { ContactComponent } from './pages/contact/contact.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { MyfavoritesComponent } from './pages/myfavorites/myfavorites.component';
import { MypropertiesComponent } from './pages/myproperties/myproperties.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { GoogleMapsModule } from '@angular/google-maps';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ListingsComponent,
    HeaderComponent,
    JoinComponent,
    RegisterComponent,
    LoginComponent,
    AboutComponent,
    TermsComponent,
    ContactComponent,
    MyfavoritesComponent,
    MypropertiesComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    IvyCarouselModule,
    GoogleMapsModule
  ],
  providers: [
    ApiProvider,
    UtilityProvider
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
