import { Component } from '@angular/core';
import { ApiProvider } from '../providers/utilities/utility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public api: ApiProvider,) { 
   
  }
  
  
}
