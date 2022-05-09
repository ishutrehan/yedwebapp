import { Component, OnInit } from '@angular/core';
import { UtilityProvider } from '../../../providers/utilities/utility';
import { ApiProvider } from '../../../providers/auth/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userPayload: any;
  loading: boolean;
  errormessage: any = "";
  successmessage:any  = "";
  error = [];
  constructor(public utility:UtilityProvider, public auth:ApiProvider) { 
     this.userPayload = {
      "email": null
     }
  }

  ngOnInit(): void {
  }
  
forgot() {
    if(!this.userPayload.email) this.error['email'] = true;
    if(this.error.length) return;

    var re = /\S+@\S+\.\S+/;
    if(!re.test(this.userPayload.email)){
      this.errormessage="S'il vous plaît, mettez une adresse email valide";
      return;
    }
        this.loading = true;
        this.auth.forgotPassword(this.userPayload)
      .then((result: any) => {
          this.loading = false;
        if(result.error){
          this.errormessage = result.msg;
        }
        setTimeout(() => {
          this.errormessage = "";
          this.successmessage = "";
        }, 3000)
        if(result.success){
            this.successmessage = result.msg;
        }
      }, err => {
        //console.log("err", err);
      })
  }
 }


