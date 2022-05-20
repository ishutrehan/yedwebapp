import { Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import { UtilityProvider } from '../../../providers/utilities/utility';
import { BrowserModule, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  @Input() navWidth: any ;
  isLogin: boolean = false;
  title = 'Yedimmobilier | Maisons et Appartements à vendre et à louer';

  constructor(private router: Router, public utility:UtilityProvider, public titleService:Title) { 

  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
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
