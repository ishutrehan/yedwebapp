import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityProvider } from '../../../providers/utilities/utility';
import { BrowserModule, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {
  @Input() navWidth: any ;
  title = 'Rejoignez-nous | Yedimmobilier';

  constructor(private router: Router, public utility:UtilityProvider, public titleService:Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    if(this.utility.getStorage('isLogin')){
      window.location.href = '';
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  goToLink(link:any, userRole = ''){
    localStorage.setItem('userRole', userRole);
    if(link == 'listings')
      this.router.navigate([link, '']);
    else
      this.router.navigate([link]);
  }
}
