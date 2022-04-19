import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilityProvider {
  constructor() {
    console.log('Hello UtilityProvider Provider') 
    console.log('Hello UtilityProvider Provider');
  }


  // For set data inside the local Storage
  setStorage(key: any, value:any) {
    localStorage.setItem(key, value);

  }
  // For get data from local Storage
  getStorage(key:any) {
    if(localStorage.getItem(key)){
      return localStorage.getItem(key);
    }else{
      return false;
    }
  }

  removeStorage(key:any) {
    localStorage.removeItem(key);
  }


  getDateFormat(date:any){
    
    const d = new Date(date);
    let day = d.getDate();
    let year = d.getFullYear();
    let month = ("0" + (d.getMonth() + 1)).slice(-2);
    var monthObj = {
      "01" : "janvier", 
      "02" : "février", 
      "03" : "mars",
      "04" : "avril",
      "05" : "mai",
      "06" : "juin",
      "07" : "juillet",
      "08" : "août",
      "09" : "septembre", 
      "10" : "octobre",
      "11" : "novembre",
      "12" : "décembre"
    };
    return day + ' ' + monthObj[month] + ' ' + year;
  }

}




