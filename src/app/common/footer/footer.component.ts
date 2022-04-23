import { Component, OnInit } from '@angular/core';
import { ApiProvider } from '../../../providers/auth/auth';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  contactDetails: any;
  constructor(public auth: ApiProvider) {
    this.contactDetails = {
      location: '',
      email: '',
      phone: ''
    }
   }

  ngOnInit(): void {
    this.getContactData();
  }
  getContactData() {
    //this.utility.startLoading();
    this.auth.contact({})
      .then((result: any) => {
        this.contactDetails = result;
      }, err => {
      })
  }
}
