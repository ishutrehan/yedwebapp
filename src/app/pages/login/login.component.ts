import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UtilityProvider } from '../../../providers/utilities/utility';
import { ApiProvider } from '../../../providers/auth/auth';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "@abacritt/angularx-social-login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userPayload: any;
  loading: boolean;
  errormessage: any = "";
  successmessage:any  = "";
  constructor(private router: Router, public utility:UtilityProvider, public auth:ApiProvider, private authService: SocialAuthService) { 
     this.userPayload = {
      "email": null,
      "password": null,
     }
  }

  ngOnInit(): void {
    if(this.utility.getStorage('isLogin')){
      window.location.href = '';
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  defaultValue(){
    this.userPayload = {
      "email": null,
      "password": null,
     }
  }
  goToLink(link:any){
    this.router.navigate([link]);
  }
  login() {
     this.loading = true;
    this.auth.login(this.userPayload)
      .then((result: any) => {
        this.loading = false;
        if (result.error) {
          this.errormessage = result.message;

        } else {
          localStorage.setItem("isLogin", 'true');
          localStorage.setItem("user_email", result.user.email);
          localStorage.setItem('refreshToen', result.refresh_token);
          localStorage.setItem('token', result.access_token);
          window.location.href = '';
        }
        setTimeout(() => {
          this.errormessage = "";
          this.successmessage = "";
        }, 3000)
      }, err => {
        //console.log("err", err);
      })
      
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((results)=>{
      console.log(results);
    }).catch((errors) => {
      console.log(errors);
    });
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((results)=>{
      console.log(results);
    }).catch((errors) => {
      console.log(errors);
    });;
  }
}
 
