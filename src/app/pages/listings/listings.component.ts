import { Component, OnInit } from '@angular/core';
import { UtilityProvider } from '../../../providers/utilities/utility';
import { ApiProvider } from '../../../providers/auth/auth';
import { PaginationInstance } from 'ngx-pagination/dist/ngx-pagination.module';
import {Router, ActivatedRoute} from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


export interface MarkerOptions { 
  center: object;
  zoom: string;
}

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  searchParams : any = {};
  distanceOptions : any;
  currentPayload : any = {};
  offset_value : any;
  sort_name:any = "recent";
  propertyList:any = [];
  loading: boolean;
  placeholderCount: any;
  page: any = 1;
  total: number = 50;
  typesList:any = [];
  rentalsList:any = [];
  propertyid: any;
  singleItem: any = {};
  showSingle: boolean;
  imagesObject: any = [];
  dateFormat: any;
  public config: PaginationInstance = {
    id: 'server',
    itemsPerPage: 10,
    currentPage: this.page,
    totalItems: this.total,
  };
  dropdownSettings:IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true
  };
  dropdownSettingsSingle:IDropdownSettings = {
    singleSelection: true,
    idField: 'value',
    textField: 'name',
    closeDropDownOnSelection: true,
    allowSearchFilter: true
  };
  payload:any = {};
  options:any =   {};
  displayStyle: any;
  selectedTypes:any = [];
  selectedRentals: any = [];
  selectedDistance:any = [];
  constructor(public utility:UtilityProvider, public auth:ApiProvider, private router: Router, private activatedRoute: ActivatedRoute) {
    this.dateFormat = this.utility.getDateFormat;
    this.offset_value = 0;
    this.displayStyle = 'none';
    this.placeholderCount = 10;
    this.getTypes(); 
    this.getRentalTypes();
    this.propertyid = this.activatedRoute.snapshot.params.id ? this.activatedRoute.snapshot.params.id : '';
    if(this.propertyid){      
      this.getProperty(this.propertyid);
      this.showSingle = true;
    }else{
      this.showSingle = false;
    }
    this.config.currentPage = this.page;
  }

  ngOnInit(): void {
    this.searchParams = {
      sort_by: "recent",
      distance: "",
      purpose: "",
      user_role: "",
      location: '',
      name: '',
      location_tags: '',
      surface_min: '',
      surface_max: '',
      price_min: '',
      price_max: '',
      number_of_bedrooms: '',
      number_of_bathrooms: ''
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
 
    this.payload.sort_by = this.searchParams.sort_by == 'reset'?"": this.searchParams.sort_by;
    this.payload.offset = this.offset_value;
    this.getPropertyList(this.payload);
   
  }
  onPageChange(number: number) {
    this.config.currentPage = number;
    this.offset_value = (number - 1) * this.config.itemsPerPage
     
    this.payload.offset = this.offset_value;
    this.getPropertyList(this.payload);
  }

  onPageBoundsCorrection(number: number) {
    this.config.currentPage = number;
  }
  resetForm(){
    this.searchParams = {
      sort_by: "recent",
      distance: "",
      types: [],
      purpose: "",
      user_role: "",
      rentals: [],
      location: '',
      name: '',
      location_tags: '',
      surface_min: '',
      surface_max: '',
      price_min: '',
      price_max: '',
      number_of_bedrooms: '',
      number_of_bathrooms: ''
    };
    this.selectedRentals = [];
    this.selectedTypes = [];
    this.getPropertyList(this.searchParams);
  }
  getPropertyList(payload:any ) {
    this.loading = true;   
    this.currentPayload = payload;
    this.searchParams.types = [];
    this.searchParams.rentals = [];
    this.selectedTypes.forEach(type => {
      this.searchParams.types.push(type.id)
    });
    this.selectedRentals.forEach(rental => {
      this.searchParams.rentals.push(rental.id)
    });
    this.selectedDistance.forEach(distance => {
      this.searchParams.distance = distance.value;
    });

    // this.activatedRoute.queryParams
    //   .subscribe(params => {
    //     for(let i in this.searchParams){
    //       if(i == 'types'){
    //         this.selectedTypes = this.typesList.filter((type) =>{
    //           return params[i].includes(type.id);
    //         });
    //       }else{
    //         this.searchParams[i] = params[i] ? params[i]: this.searchParams[i]
    //       }
    //     }
    //   }
    // );
    // params.sort_by = this.searchParams.sort_by ? this.searchParams.sort_by : 'recent';
    // params.location = this.searchParams.location ? this.searchParams.location : '';
    // params.purpose = this.searchParams.purpose ? this.searchParams.purpose : '';
    // params.user_role = this.searchParams.user_role ? this.searchParams.user_role : '';
    // params.type = this.searchParams.type ? this.searchParams.type : '';
    // params.name = this.searchParams.name ? this.searchParams.name : '';
    // params.location_tags = this.searchParams.location_tags ? this.searchParams.location_tags : '';
    // params.surface_min = this.searchParams.surface_min ? this.searchParams.surface_min : '';
    // params.surface_max = this.searchParams.surface_max ? this.searchParams.surface_max : '';
    // params.price_min = this.searchParams.price_min ? this.searchParams.price_min : '';
    // params.price_max = this.searchParams.price_max ? this.searchParams.price_max : '';
    this.router.navigate(
      ['/listings'],
      { queryParams: this.searchParams }
    );
    this.auth.getPropertyList(payload)
      .then((result: any) => {
        this.config.totalItems = result.totalResults;
        this.propertyList = result.properties;
        this.loading = false;
      }, err => {
        //console.log("err", err);
        if(err[0] == 'error') { 
        }
      })
  }
  getProperty(propertyID){
    this.loading = true;
    let payload = {
      id : propertyID
    };
    this.auth.getProperty(payload)
      .then((result: any) => {
        this.singleItem = result.details;
        if(this.singleItem.image){
          this.singleItem.image.forEach((image) => {
            this.imagesObject.push({
                  path: image.url
              });
          });
        }
        this.loading = false;
    })
  }
  showIcon(){
    if(this.utility.getStorage('isLogin')){
      return true;
    }else{
      return false;
    }
  }
 likeDislike(property) {
    var payload = {
      "property_id": parseInt(property.id),
    }
    property.favorite = property.favorite == true?false:true;
    this.auth.favourite(payload)
      .then((result: any) => {

      }, err => {
        //console.log("err", err);
      })
  }
  getRentalTypes(){
    this.auth.getRentals()
    .then((type: any) => {
      //console.log("rental types",type)
    type.forEach(checkbox_ => {
        checkbox_.checked = false;
    });
    this.rentalsList = type;
    }, err => {
    })
  }
  handleAddressChange(address) {
    this.searchParams.latitude = address.geometry.location.lat();
    this.searchParams.longitude = address.geometry.location.lng();

  }
  SubString(text) {
    return text = text == null ? '' : text.substring(0, 30) + '..';
  }
  SubStringName(text) {
    return text = text == null ? '' : text.substring(0, 10) + '..';
  }
  getTypes(){
    this.auth.getTypes()
    .then((type: any) => {
    type.forEach(checkbox_ => {
        checkbox_.checked = false;
    });
    this.typesList = type;
      
    }, err => {
    })
  }
  goToLink(link:any, id = ''){
    this.router.navigate([link, id]); 
  }
  cancelpopup(){
    this.displayStyle = "none";
  }
  startDelete(){
    this.displayStyle = "block";
  }
  async deleteProperty(property_id) {
    var payload = {
      "property_id": parseInt(property_id)
    }
    this.loading = true;
    this.auth.deleteProperty(payload)
    .then((result: any) => {
    this.loading = false;

      window.location.href = 'myproperties';
    }, err => {
      //console.log("err", err);
    })
  }
}
