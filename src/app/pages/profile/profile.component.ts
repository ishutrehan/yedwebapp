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
 defaultprofileimage = '../../../assets/images/logo-person.png';

  constructor(public utility:UtilityProvider, public auth:ApiProvider) { 
    
    this.getProfile();
    this.userPayload = {
      "email": null,
      "name": null,
      "phone": null   
     }
  }

  ngOnInit(): void {
    if(!this.utility.getStorage('isLogin')){
      window.location.href = '';
    }
  }
  onchange(event){
    
    var file = event.target.files[0];
    var reader = new FileReader();
    var base64String:any = '' ;
      
    reader.onload =  () =>  {
        base64String = reader.result;
            //.replace(/^.+,/, "");
        if(base64String){
          this.userPayload.imageUpdate = true;
          this.userPayload.profile_image = base64String;
        }else{
          this.userPayload.imageUpdate = false;
        }
        this.updateUserData();
    }
    reader.readAsDataURL(file);
  }
getProfile() {
    this.auth.getPrfile()
      .then((result: any) => {
       // console.log("result is :", result);
        if (result.error) {

        } else {
          this.userPayload = result;
          
          if(!this.userPayload.profile_image){
            this.userPayload.profile_image = this.defaultprofileimage;
          }
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
