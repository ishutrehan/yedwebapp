import { Component, OnInit } from '@angular/core';
import { UtilityProvider } from '../../../providers/utilities/utility';
import { ApiProvider } from '../../../providers/auth/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 userPayload: any;
 loading: boolean;
 errormessage: any = "";
 successmessage:any  = "";


  constructor(public utility:UtilityProvider, public auth:ApiProvider) { 
    
    this.getProfile();
    this.userPayload = {
      "email": null,
      "name": null,
      "phone": null   
     }
  }

  ngOnInit(): void {
    
  }
getProfile() {
    this.auth.getPrfile()
      .then((result: any) => {
       // console.log("result is :", result);
        if (result.error) {

        } else {
          this.userPayload = result;
        }
      }, err => {
        if(err[0] == 'error') {
          this.utility.removeStorage("isLogin");
          this.utility.removeStorage('refreshToen');
          this.utility.removeStorage('token');
         window.location.href = '';
        }
       // console.log("err", err);
      })
  }
  updateUserData(){
    delete this.userPayload.email;
    if(!this.userPayload.imageUpdate){      
      this.userPayload.profile_image = null;
     
    }
    this.auth.updateProfile(this.userPayload)
      .then((result: any) => {
        //console.log("updateProfile is :", result);
        if (result.error) {
          this.errormessage = result.message;
        } else {
        this.successmessage = result.message;

        }
      }, err => {
        //console.log("err", err);
      })
  }
}