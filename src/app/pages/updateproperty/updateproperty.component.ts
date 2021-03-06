import { Component, OnInit } from '@angular/core';
import { UtilityProvider } from '../../../providers/utilities/utility';
import { ApiProvider } from '../../../providers/auth/auth';
import {Router, ActivatedRoute} from '@angular/router';
import { BrowserModule, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-updateproperty',
  templateUrl: './updateproperty.component.html',
  styleUrls: ['./updateproperty.component.css']
})
export class UpdatepropertyComponent implements OnInit {
  
  updatedata: any = {};
  typesList:any = [];
  type: any;
  checked: any;
  rentalsList:any = [];
  getMetaName: any;
  amenitieslist: any = [];
  options:any =   {};
  displayStyle: any;
  loading: boolean;
  userPayload:any = {};
  errormessage: any = "";
  successmessage:any  = "";
  featured: any = [];
  featuredImage: any = [];
  gallery: any = [];
  payload:any = {};
  imagesObject:any =[];
  singleItem: any = {};
  showSingle: boolean;
  propertyid: any;
  title = 'Mettre à jour | Yedimmobilier';

  constructor(public utility:UtilityProvider, public auth:ApiProvider, private activatedRoute: ActivatedRoute, public titleService:Title) {
    this.updatedata.gallery = [];
    this.updatedata.type = [];
    this.updatedata.image = [];
    this.getTypes();
    this. getRentalTypes();
    this.getAmenities();
    this.displayStyle = "none";
     this.getMetaName = (id, obj) => {
      var name = '';
      obj.forEach(function(item){
        if(item.id == id){
          name =  item.name;
        } 
      });
      return name;
    }
    this.propertyid = this.activatedRoute.snapshot.params.id ? this.activatedRoute.snapshot.params.id : '';
    if(this.propertyid){      
      this.getProperty(this.propertyid);
      this.showSingle = true;
    }else{
      this.showSingle = false;
    }
    //this.config.currentPage = this.page;
  }
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    if(!this.utility.getStorage('isLogin')){
      window.location.href = '';
    }
  }
  
  getProperty(propertyID){
    this.loading = true;
    let payload = {
      id : propertyID
    };
    this.auth.getProperty(payload)
      .then((result: any) => {
      this.updatedata.id = result.details.id;
      this.updatedata.title = result.details.title;
      this.updatedata.description = result.details.description;
      this.updatedata.purpose = result.details.purpose;
      this.updatedata.price = result.details.price;
      this.updatedata.price_per_month = result.details.price_per_month;
      this.updatedata.type = result.details.type;
      this.updatedata.number_of_bathrooms = result.details.number_of_bathrooms;
      this.updatedata.number_of_bedrooms = result.details.number_of_bedrooms;
      this.updatedata.number_of_rooms = result.details.number_of_rooms;
      this.updatedata.number_of_toilets = result.details.number_of_toilets;
      this.updatedata.area = result.details.area;
      this.updatedata.location = result.details.location;
      this.updatedata.location_tags = result.details.location_tags;
      this.updatedata.featured_image = result.details.featured;
      result.details.image.forEach((image, i) => {
        if(i != 0)
          this.updatedata.gallery.push(image);
      });
      var tags:any =  [];
      result.details.location_tags.forEach(element => {
        tags.push({'displayValue': element})
      });
      this.updatedata.location_tags = tags;
      result.details.amenities.forEach((id)=>{
        this.amenitieslist.forEach((amenity) => {
          if(amenity.id == id) amenity.checked = true;
        });
      });
      if(this.updatedata.price){
        this.updatedata.price = typeof this.updatedata.price == 'string' ? parseInt(this.updatedata.price.replace(/ +/g, "")): this.updatedata.price;
        
      }
      if(this.updatedata.price_per_month){
        this.updatedata.price = typeof this.updatedata.price_per_month == 'string' ? parseInt(this.updatedata.price_per_month.replace(/ +/g, "")): this.updatedata.price_per_month;
      }
        this.loading = false;
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
  handleAddressChange(address) {
    this.updatedata.latitude = address.geometry.location.lat();
    this.updatedata.longitude = address.geometry.location.lng();
    this.updatedata.location = address.formatted_address;

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
  update() {
    this.loading = true;
    this.updatedata.amenities = [];
    this.amenitieslist.forEach(ammeneties_ => {
      if (ammeneties_.checked) {
        this.updatedata.amenities.push(ammeneties_.id);
      }
    });
    var location_tags:any = [];
    this.updatedata.location_tags.forEach(function (item) {
      location_tags.push(item.displayValue);
    });
    this.updatedata.location_tags = location_tags;
    delete this.updatedata.featured_image;
    this.auth.updateProperty(this.updatedata).then((result: any) => {
      if(result.error){
        this.errormessage = result.message;
      }
      if(result.success){
        this.successmessage = result.message;
        window.location.href = 'myproperties';
      }
      this.loading = false;
      }, err => {
    })
    setTimeout(() => {
      this.errormessage = "";
      this.successmessage = "";
    }, 3000)
    
  }
  closepopup(){
  this.displayStyle = "none";

  }
 
  onSelect(event) {
    this.updatedata.featured_image = '';
    this.featured = event.addedFiles;
    this.fileToBase64(this.featured[0])
      .then(result=>{
        const base64String = result;
      this.updatedata.featured = base64String;
    });  
    
  }
  onSelectGallery(event){
    this.gallery.push(...event.addedFiles);
    for (let i = 0; i < this.gallery.length; i++) {
      this.fileToBase64(this.gallery[i])
      .then(result=>{
        const base64String = result;
        this.updatedata.image.push(base64String);
      });         
    }
  }
  onRemoveGallery(i){
    this.updatedata.gallery.splice(i, 1);
  }
  onRemoveImage(event){
    this.gallery.splice(this.gallery.indexOf(event), 1);
  }
  fileToBase64 = (file:File):Promise<string> => {
    return new Promise<string> ((resolve,reject)=> {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result ? reader.result.toString(): '');
      reader.onerror = error => reject(error);
    })
  }
  toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
}
