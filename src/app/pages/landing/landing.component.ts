import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) { 

  }

  ngOnInit(): void {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  goToLink(link:any){
    if(link == 'listings')
    window.location.href = 'listings';
    else
      this.router.navigate([link]);
  }
}
