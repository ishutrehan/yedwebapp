import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UtilityProvider } from '../../../providers/utilities/utility';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  isLogin: boolean = false;
  constructor(private router: Router, public utility:UtilityProvider) { 

  }

  ngOnInit(): void {
    if(this.utility.getStorage('isLogin')){
      this.isLogin = true;
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    
  }
  goToLink(link:any){
    if(link == 'listings')
    window.location.href = 'listings';
    else
      this.router.navigate([link]);
  }
  
}
