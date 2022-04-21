import { Component, OnInit } from '@angular/core';
import { UtilityProvider } from '../../../providers/utilities/utility';
import { ApiProvider } from '../../../providers/auth/auth';
import { PaginationInstance } from 'ngx-pagination/dist/ngx-pagination.module';


@Component({
  selector: 'app-myfavorites',
  templateUrl: './myfavorites.component.html',
  styleUrls: ['./myfavorites.component.css']
})
export class MyfavoritesComponent implements OnInit {
  searchParams : any;
  distanceOptions : any;
  currentPayload : any = {};
  offset_value : number;
  sort_name:any = "recent";
  propertyList:any = [];
  loading: boolean;
  overlay: boolean;
  placeholderCount: any;
  page: number = 1;
  total: number = 50;
  payload: any;
public config: PaginationInstance = {
    id: 'server',
    itemsPerPage: 10,
    currentPage: this.page,
    totalItems: this.total
  };
  constructor(public utility:UtilityProvider, public auth:ApiProvider) {
    
    this.offset_value = 0;
    this.placeholderCount = 10;
    this.getFavlist();
   }

  ngOnInit(): void {
    if(!this.utility.getStorage('isLogin')){
      window.location.href = '';
    }
  }
onPageChange(number: number) {
    this.config.currentPage = number;
    this.offset_value = (number - 1) * this.config.itemsPerPage; 
    this.payload.offset = this.offset_value;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  onPageBoundsCorrection(number: number) {
    this.config.currentPage = number;
  }
  showIcon(){
      if(this.utility.getStorage('isLogin')){
      return true;
    }else{
      return false;
    }
  }
  likeDislike(property, i) {
    var payload = {
      "property_id": parseInt(property.id),
    }
    this.overlay = true;
    this.auth.favourite(payload)
      .then((result: any) => {
        this.overlay = false;
        property.favorite = property.favorite == true?false:true;
        this.propertyList.splice(i, 1);
        //property.favorite = property.favorite == true?false:true;

      }, err => {
        //console.log("err", err);
      })
  }

getFavlist() {
    //this.utility.startLoading();
    /*var payload = {
      'offset' :this.offset_value
    };*/
    this.loading = true;
    this.auth.getUserFav({})
      .then((result: any) => {
        this.loading = false;
       // console.log("propertyList", result);
        this.propertyList = result.properties;
        this.config.totalItems = result.totalResults
       // this.utility.stopLoading();
      }, err => {
        //console.log("err", err);
        if(err[0] == 'error') {
          this.utility.removeStorage("isLogin");
          this.utility.removeStorage('refreshToen');
          this.utility.removeStorage('token');
          //this.utility.showToast('Votre session a expiré ou votre compte est peut-être supprimé');
          //this.navCtrl.push(LandingPage);
        }
        //this.utility.stopLoading();
      })
  }
  
  
  SubString(text) {
    return text = text == null ? '' : text.substring(0, 100) + '..';
  }
}
