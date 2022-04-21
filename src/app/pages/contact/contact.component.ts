import { Component, OnInit } from '@angular/core';
import { UtilityProvider } from '../../../providers/utilities/utility';
import { ApiProvider } from '../../../providers/auth/auth';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
contactDetails: any;

  constructor(public utility:UtilityProvider, public auth:ApiProvider) {
     this.contactDetails = {}
   }

  ngOnInit(): void {
    this.getContactData();
  }

  getContactData() {
    //this.utility.startLoading();
    this.auth.contact({})
      .then((result: any) => {
        this.contactDetails = result;
       // console.log("contactDetails",this.contactDetails);
      
        //this.utility.stopLoading();
      }, err => {
       // console.log("err", err);
        //this.utility.stopLoading();
      })
  }

}
