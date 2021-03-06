import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  @Input() navWidth: any ;
  title = 'Politique de confidentialit√© | Yedimmobilier';

  constructor(public titleService:Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

}
