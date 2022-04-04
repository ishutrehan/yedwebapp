import { Component } from '@angular/core';
import { UtilityProvider } from '../providers/utilities/utility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHeader: boolean
  constructor(public utility: UtilityProvider) { 
   
  }
  ngOnInit(): void {
    this.utility.getStorage('isLogin').then((status: any) => {
      if(status){
        //this.rootPage = HomePage;
      }else{
        this.showHeader = false;
        //this.menuCtrl.enable(false, 'myMenu');
        //this.rootPage = LandingPage;
      }
    });
  }
  
  
}
