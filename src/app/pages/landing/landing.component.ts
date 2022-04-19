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
  }
  goToLink(link:any){
    if(link == 'listings')
      this.router.navigate([link, '']);
    else
      this.router.navigate([link]);
  }
}
