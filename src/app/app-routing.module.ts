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


const routes: Routes = [
  { path: '', component: localStorage.getItem('isLogin') ? ListingsComponent : LandingComponent },
  { path: 'listings/:id', component: ListingsComponent },
  { path: 'join-us', component: JoinComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'myfavorites', component: MyfavoritesComponent },
  { path: 'myproperties', component: MypropertiesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
