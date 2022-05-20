import { Component, OnInit } from '@angular/core';
import { UtilityProvider } from '../../../providers/utilities/utility';
import { ApiProvider } from '../../../providers/auth/auth';
import { BrowserModule, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 userPayload: any;
 loading: boolean;
 errormessage: any = "";
 successmessage:any  = "";
 error : any = {};
 title = 'S\'inscrire | Yedimmobilier';

  constructor(public utility:UtilityProvider, public auth:ApiProvider, public titleService:Title) { 
    var userrole = localStorage.getItem('userRole') ? localStorage.getItem('userRole') : 'individual';

    this.userPayload = {
      "email": null,
      "password": null,
      "name": null,
      "role": userrole,
      "phone": null,
      "is_social": false
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    if(this.utility.getStorage('isLogin')){
      window.location.href = '';
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  defaultValue(){
    this.userPayload = {
      "email": null,
      "password": null,
      "name": null,
      "role": null,
      "phone": null,
      "is_social": false

    }
  }
signUp(){
      if(!this.userPayload.phone) this.error.phone = true;
      if(!this.userPayload.name) this.error.name = true;
      if(!this.userPayload.email) this.error.email = true;
      if(!this.userPayload.password) this.error.password = true;
      if(Object.keys(this.error).length) return;
   // this.utility.startLoading();
   this.loading = true;
    this.auth.signUp(this.userPayload)
      .then((result: any) => {
        this.loading = false;
        //console.log("signUp:",result);
        if(result.error){
          this.errormessage = result.message;
         // this.utility.showToast(result.message, 60000);
        }
        if(result.success){
            this.successmessage = result.message;

           // this.utility.showToast(result.message);
            this.defaultValue();
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

  }


}
