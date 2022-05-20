import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navWidth: any;
  constructor() { 
   
  }
  ngOnInit(): void {
    this.navWidth = "0px";
  }
  
  /* Set the width of the side navigation to 250px */
  openNav= (): void => {
    this.navWidth = "250px";
  }

  /* Set the width of the side navigation to 0 */
  closeNav= (): void => {
    this.navWidth = "0px";
  }
  onActivate(componentReference) {
    this.navWidth = "0px";
  }
  
}
