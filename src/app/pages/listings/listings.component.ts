import { Component, OnInit } from '@angular/core';
import { UtilityProvider } from '../../../providers/utilities/utility';
import { ApiProvider } from '../../../providers/auth/auth';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  searchParams : any;
  distanceOptions : any;
  currentPayload : any = {};
  offset_value : number;
  sort_name:any = "recent";
  propertyList:any = [];
  constructor(public utility:UtilityProvider, public auth:ApiProvider) {
    this.offset_value = 0;
  }

  ngOnInit(): void {
    this.searchParams = {
      sort_by: "recent",
      distance: ""
    };

    this.distanceOptions = [
      { name: "2km", value: "2" },
      { name: "5km", value: "5" },
      { name: "10km", value: "10" },
      { name: "15km", value: "15" },
      { name: "20km", value: "20" },
      { name: "25km", value: "25" },
      { name: "30km", value: "30" },
      { name: "35km", value: "35" },
      { name: "40km", value: "40" },
      { name: "45km", value: "45" },
      { name: "50km", value: "50" }
    ];
    var payload:any = {};
    payload.sort_by = this.sort_name == 'reset'?"":this.sort_name;
    payload.offset = this.offset_value;
    this.getPropertyList(payload);
  }
  getPropertyList(payload:any ) {
    this.currentPayload = payload;
    
    //console.log("payload is", payload);
    
    //this.utility.startLoading();
    this.auth.getPropertyList(payload)
      .then((result: any) => {
       // console.log("propertyList", result);
        //this.propertyList = [...this.propertyList,...result.properties];
        this.propertyList = result.properties;
        // this.allow_skip = result.next;
        // this.allow_lazy_loading = true;
        // if(this.propertyList.length == 0){
        //   this.showList = false;
        // }else{
        //   this.showList = true;

        // }
        //this.utility.stopLoading();
      }, err => {
        //console.log("err", err);
        if(err[0] == 'error') { //user deleted or session expired
          // this.utility.removeStorage("isLogin");
          // this.utility.removeStorage('refreshToen');
          // this.utility.removeStorage('token');
          // this.utility.showToast('Votre session a expiré ou votre compte est peut-être supprimé');
          // this.navCtrl.setRoot(LandingPage);
        }
       // this.utility.stopLoading();
      })
  }
  SubString(text) {
    return text = text == null ? '' : text.substring(0, 100) + '..';
  }
}
