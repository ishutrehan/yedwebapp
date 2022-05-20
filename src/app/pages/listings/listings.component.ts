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
  amenitieslist: any = []
  useremail: any;
  displayMode:any = 'grid';
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
    selectAllText: 'Tout sélectionner',
    unSelectAllText: 'Tout déselectionner',
    allowSearchFilter: true,
    searchPlaceholderText: 'Recherche'
  };
  dropdownSettingsSingle:IDropdownSettings = {
    singleSelection: true,
    idField: 'value',
    textField: 'name',
    closeDropDownOnSelection: true,
    allowSearchFilter: true,
    searchPlaceholderText: 'Recherche'
  };
  payload:any = {};
  options:any =   {};
  displayStyle: any;
  selectedTypes:any = [];
  selectedRentals: any = [];
  selectedDistance:any = [];
  mapOptions: google.maps.MapOptions = {
    center: { lat: 38.9987208, lng: -77.2538699 },
    zoom : 15
 }
 marker = {
  position: { lat: 38.9987208, lng: -77.2538699 },
}
deleteloader: boolean;

constructor(public utility:UtilityProvider, public auth:ApiProvider, private router: Router, private activatedRoute: ActivatedRoute) {
  
  if(this.utility.getStorage('user_email')) this.useremail = this.utility.getStorage('user_email');
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
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.getAmenities();
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
    
    let element = document.getElementById('result-row');
    if(element) element.scrollIntoView();
    this.config.currentPage = number;
    this.offset_value = (number - 1) * this.config.itemsPerPage
    
    this.payload = this.searchParams;
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
      type: [],
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
    this.searchParams.type = [];
    this.searchParams.rentals = [];
    this.searchParams.distance = "";
    this.selectedTypes.forEach(type => {
      this.searchParams.type.push(type.id)
    });
    this.selectedRentals.forEach(rental => {
      this.searchParams.rentals.push(rental.id)
    });
    this.selectedDistance.forEach(distance => {
      this.searchParams.distance = distance.value;
    });
    
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
        this.mapAmenities();
        this.mapType();
        if(this.mapOptions && this.mapOptions.center){
          this.mapOptions.center.lat = parseFloat(this.singleItem.latitude);
          this.mapOptions.center.lng = parseFloat(this.singleItem.longitude);
          this.marker.position.lat = parseFloat(this.singleItem.latitude);
          this.marker.position.lng = parseFloat(this.singleItem.longitude);
        }
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
    document.body.scrollTop = document.documentElement.scrollTop = 0;
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
    this.deleteloader = true;
    this.auth.deleteProperty(payload)
    .then((result: any) => {
    this.deleteloader = false;

      window.location.href = 'myproperties';
    }, err => {
      //console.log("err", err);
    })
  }
  getAmenities() {

    this.auth.getAmenities()
      .then((type: any) => {
      type.forEach(checkbox_ => {
          checkbox_.checked = false;
      });
      this.amenitieslist = type;
        
      }, err => {
      })
    }
  mapAmenities() {
    this.amenitieslist.forEach(ammenety => {
      let i = this.singleItem.amenities.findIndex(ammeneties_ => ammeneties_ == ammenety.id);
      if (i != -1) {
        this.singleItem.amenities[i] = { 'id': ammenety.id, 'name': ammenety.name };
      }
    });
  }

  mapType() {
    this.typesList.forEach(type => {
      let i = this.singleItem.type.findIndex(type_ => type_ == type.id);
      if (i != -1) {
        this.singleItem.type[i] = { 'id': type.id, 'name': type.name };
      }
    });

  }
  onDisplayModeChange(mode= 'grid') {
  this.displayMode = mode
}
}
