import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityProvider } from '../../../providers/utilities/utility';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  constructor(private router: Router, public utility:UtilityProvider) { }

  ngOnInit(): void {
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
