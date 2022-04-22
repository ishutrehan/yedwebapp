import { Component, OnInit } from '@angular/core';
import { UtilityProvider } from '../../../providers/utilities/utility';
import { ApiProvider } from '../../../providers/auth/auth';

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
  constructor(public utility:UtilityProvider, public auth:ApiProvider) { 
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
