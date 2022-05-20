import { Component, OnInit } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
title = 'Conditions générales d\'utilisation | Yedimmobilier';

  constructor(public titleService:Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

}
