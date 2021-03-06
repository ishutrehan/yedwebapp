import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ListingsComponent } from './pages/listings/listings.component';
import { JoinComponent } from './pages/join/join.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { TermsComponent } from './pages/terms/terms.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MyfavoritesComponent } from './pages/myfavorites/myfavorites.component';
import { MypropertiesComponent } from './pages/myproperties/myproperties.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PublishComponent } from './pages/publish/publish.component';
import { UpdatepropertyComponent } from './pages/updateproperty/updateproperty.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { BrowserModule, Title } from '@angular/platform-browser';



const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'listings', component: ListingsComponent },
  { path: 'listings/:id', component: ListingsComponent },
  { path: 'join-us', component: JoinComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'myfavorites', component: MyfavoritesComponent },
  { path: 'myproperties', component: MypropertiesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'publish', component: PublishComponent },
  { path: 'updateproperty/:id', component: UpdatepropertyComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),BrowserModule],
  exports: [RouterModule],
  providers: [
    Title                   //Register the Service
  ],
})
export class AppRoutingModule { }
