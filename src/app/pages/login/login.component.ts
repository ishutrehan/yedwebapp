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
  overlayloader: boolean;
  error : any = {};
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
    if(!this.userPayload.email) this.error.email = true;
    if(!this.userPayload.password) this.error.password = true;
    if(Object.keys(this.error).length) return;

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
      var payload = {
        'is_social': true,
        'role': localStorage.getItem('userRole'),
        'access_token': results.authToken
      }
      this.overlayloader = true;
      this.auth.signUp(payload)
      .then((result: any) => {
        this.loading = false;
        if(result.error){

        }
        if(result.success){
          localStorage.setItem("isLogin", 'true');
          localStorage.setItem("user_email", result.data[0].email);
          localStorage.setItem('refreshToen', result.refresh_token);
          localStorage.setItem('token', result.access_token);
          this.overlayloader = false;
          window.location.href = '';
        }
        setTimeout(() => {
          this.errormessage = "";
          this.successmessage = "";
        }, 3000)
        //this.utility.stopLoading();
      }, err => {
        this.loading = false;
        //console.log("err", err);
        //this.utility.stopLoading();
      })
    }).catch((errors) => {
      console.log(errors);
    });;
  }
}
 
