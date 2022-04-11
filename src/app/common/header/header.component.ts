import { Component, OnInit } from '@angular/core';
import { UtilityProvider } from '../../../providers/utilities/utility';
import { Router, NavigationEnd, Event } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showHeader: boolean;
  constructor(public utility: UtilityProvider, public router: Router) { }

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

}
