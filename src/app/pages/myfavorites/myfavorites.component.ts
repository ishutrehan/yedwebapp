import { Component, OnInit, Input } from '@angular/core';
import { UtilityProvider } from '../../../providers/utilities/utility';
import { ApiProvider } from '../../../providers/auth/auth';
import { PaginationInstance } from 'ngx-pagination/dist/ngx-pagination.module';
import {Router} from '@angular/router';
import { BrowserModule, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-myfavorites',
  templateUrl: './myfavorites.component.html',
  styleUrls: ['./myfavorites.component.css']
})
export class MyfavoritesComponent implements OnInit {
  @Input() navWidth: any ;
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
  dateFormat: any;

public config: PaginationInstance = {
    id: 'server',
    itemsPerPage: 10,
    currentPage: this.page,
    totalItems: this.total
  };
  title = 'Mes-Favoris | Yedimmobilier';

  constructor(public utility:UtilityProvider, public auth:ApiProvider, public router: Router, public titleService:Title) {
    this.titleService.setTitle(this.title);
    this.dateFormat = this.utility.getDateFormat;
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
    return text = text == null ? '' : text.substring(0, 30) + '..';
  }
  SubStringName(text) {
    return text = text == null ? '' : text.substring(0, 10) + '..';
  }
  goToLink(link:any, id = ''){
    this.router.navigate([link, id]); 
  }
}
