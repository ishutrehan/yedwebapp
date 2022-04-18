import { Component, OnInit } from '@angular/core';
import { UtilityProvider } from '../../../providers/utilities/utility';
import { Router, NavigationEnd, Event } from '@angular/router';
import { ApiProvider } from '../../../providers/auth/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showHeader: boolean;
  profiledetails: any;
  loading: boolean;
  constructor(public utility: UtilityProvider, public router: Router,public auth: ApiProvider) { 
    this.getProfileData()
   }

  ngOnInit(): void {
    if(this.utility.getStorage('isLogin')){
      this.showHeader = true;
    }else{
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd ) {
          if(event.url == '/listings') this.showHeader = true; else this.showHeader = false;
        }
        
      });
      
    }
  }

  getProfileData() {
    this.loading = true;
    //this.utility.startLoading();
    this.auth.getPrfile()
      .then((result: any) => {
        this.profiledetails = result;
         this.loading = false;
       
      }, err => {
       // console.log("err", err);
        //this.utility.stopLoading();
      })
    }
    islogin(){
      if(this.utility.getStorage('isLogin')){
      return true;
    }else{
      return false;
    }
  }

  logout(){
    this.utility.removeStorage('isLogin');
    this.utility.removeStorage('refreshToen');
    window.location.href = '';
  }

}
