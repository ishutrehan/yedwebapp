import { Component, OnInit } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  title = 'A propos | Yedimmobilier';
  constructor(public titleService:Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    
  }

}
