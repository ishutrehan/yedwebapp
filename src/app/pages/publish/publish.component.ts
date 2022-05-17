import { Component, OnInit } from '@angular/core';
import { UtilityProvider } from '../../../providers/utilities/utility';
import { ApiProvider } from '../../../providers/auth/auth';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {
 formdata: any = {};
 typesList:any = [];
 type: any;
 checked: any;
 rentalsList:any = [];
 getMetaName: any;
 amenitieslist: any = [];
 options:any =   {};
 displayStyle: any;
 loading: boolean;
 savephoneloader: boolean;
 userPayload:any = {};
 errormessage: any = "";
 successmessage:any  = "";
 featured: any = [];
 gallery: any = [];
 error: any = {};
  constructor(public utility:UtilityProvider, public auth:ApiProvider) {
    this.getTypes();
    this. getRentalTypes();
    this.getAmenities();
    this.displayStyle = "none";
    this.formdata = {
      type: [''],
      purpose: "sale",
      location_tags: [],
      type_of_rental: '',
      image: []
    }
     this.getMetaName = (id, obj) => {
      var name = '';
      obj.forEach(function(item){
        if(item.id == id){
          name =  item.name;
        } 
      });
      return name;
    }
   }

  ngOnInit(): void {
      if(!this.utility.getStorage('isLogin')){
      window.location.href = '';
    }
  
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
    this.formdata.latitude = address.geometry.location.lat();
    this.formdata.longitude = address.geometry.location.lng();
    this.formdata.location = address.formatted_address;

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
  submit() {
      this.loading = true;
    //check if user has phone if not then show phone field popup
    this.auth.userPhoneStatus({})
    .then((result: any) => {

      if (result.phone == true) {
        this.formdata.amenities = [];
        this.amenitieslist.forEach(ammeneties_ => {
          if (ammeneties_.checked) {
            this.formdata.amenities.push(ammeneties_.id);
          }
        });
        var location_tags:any = [];
        this.formdata.location_tags.forEach(function (item) {
          location_tags.push(item.displayValue);
        });
        this.formdata.location_tags = location_tags;
        this.auth.addProperty(this.formdata)
          .then((result: any) => {
            this.loading = false;
            if(result.error){
              this.errormessage = result.message;
            }
          if(result.success){
            this.successmessage = result.message;
            window.location.href = 'myproperties';
          }
              
        }, err => {
            this.loading = false;
        })

      } else {
        
        this.loading = false;
        this.displayStyle = "block";
      }
    }, err => {
      
      this.loading = false;
    });
    setTimeout(() => {
      this.errormessage = "";
      this.successmessage = "";
    }, 3000)
    
  }
  closepopup(){
    this.displayStyle = "none";
  }
  
  savePhone(){
     this.savephoneloader = true;
     this.auth.updateProfile(this.userPayload)
    .then((result: any) => {
      this.savephoneloader = false;
      this.closepopup()

      //console.log("updateProfile is :", result);
    }, err => {
     // console.log("err", err);
      
    })
  }
  onSelect(event) {
    
    this.featured = event.addedFiles;
    this.fileToBase64(this.featured[0])
      .then(result=>{
        const base64String = result;
      this.formdata.featured = base64String;
    });  
    
  }
  onSelectGallery(event){
    this.gallery.push(...event.addedFiles);
    for (let i = 0; i < this.gallery.length; i++) {
      this.fileToBase64(this.gallery[i])
      .then(result=>{
        const base64String = result;
        this.formdata.image.push(base64String);
      });         
    }
  }
  onRemoveFeatured(event){
    this.featured = [];
  }
  onRemoveGallery(event){
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
}
