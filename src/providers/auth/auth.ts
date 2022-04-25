import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityProvider } from '../../providers/utilities/utility';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class ApiProvider {
  baseUrl: any;
  constructor(public http: HttpClient, public utility: UtilityProvider) {
    this.baseUrl = "https://yedimmobilier.com/api";
  }
  // get property listing
  getPropertyList(val) {
    
    return new Promise((resolve, reject) => {
      var token = this.utility.getStorage('refreshToen');
      if (token) {
        this.getHeaders()
          .then((tokens: any) => {
            if(!tokens) return reject(['error']);
            let headers = new HttpHeaders({
              'Authorization': tokens
            });
            return this.http.post(this.baseUrl + '/property/search', val, { headers: headers }).subscribe(data => {
              resolve(data);
            }, err => {
              reject(err);
              // console.log("ERER:", err);
            });
          });

      } else {
        return this.http.post(this.baseUrl + '/property/search', val).subscribe(data => {
          resolve(data);
        }, err => {
          reject(err);
          //console.log("ERER:", err);
        });
      }
    });
  }
  // Signup Api  
  signUp(payload) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/user/register', payload).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
       // console.log("ERER:", err);
      });
    });
  }
  // login Api  
  login(payload) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/user/login', payload).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
       // console.log("ERER:", err);
      });
    });
  }
  // contact us Api  
  contact(payload) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/user/webcontact', payload).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
        //console.log("ERER:", err);
      });
    });
  }
  getProperty(payload) {
    return new Promise((resolve, reject) => {
      this.getHeaders()
        .then((token: any) => {
          if(!token) return reject(['error']);
          let headers = new HttpHeaders({
            'Authorization': token
          });
          this.http.post(this.baseUrl + '/property/getproperty', payload, { headers: headers }).subscribe(data => {
            resolve(data);
          }, err => {
            reject(err);
          });
        });
    });
  }
  // get profile 
  getPrfile() {
    return new Promise((resolve, reject) => {
      this.getHeaders()
        .then((token: any) => {
          if(!token) return reject(['error']);
          let headers = new HttpHeaders({
            'Authorization': token
          });
          return this.http.get(this.baseUrl + '/user/getprofile', { headers: headers }).subscribe(data => {
            resolve(data);
          }, err => {
            reject(err);
           // console.log("ERER:", err);
          });
        });
    });
  }
  // like/dislike us Api  
  favourite(payload) {
    return new Promise((resolve, reject) => {
      this.getHeaders()
        .then((token: any) => {
          if(!token) return reject(['error']);
          let headers = new HttpHeaders({
            'Authorization': token
          });
          this.http.post(this.baseUrl + '/user/togglefav', payload, { headers: headers }).subscribe(data => {
            resolve(data);
          }, err => {
            reject(err);
           // console.log("ERER:", err);
          });
        });
    });
  }
  // fav Api  
  getUserFav(payload) {
    return new Promise((resolve, reject) => {
      this.getHeaders()
        .then((token: any) => {
          if(!token) return reject(['error']);
          let headers = new HttpHeaders({
            'Authorization': token
          });
          this.http.post(this.baseUrl + '/user/fav', payload, { headers: headers }).subscribe(data => {
            resolve(data);
          }, err => {
            reject(err);
            //console.log("ERER:", err);
          });
        });
    });
  }
  //get my properties API
  getMyProperties(payload) {
    return new Promise((resolve, reject) => {
      this.getHeaders()
        .then((token: any) => {
          if(!token) return reject(['error']);
          let headers = new HttpHeaders({
            'Authorization': token
          });
          this.http.post(this.baseUrl + '/user/properties', payload, { headers: headers }).subscribe(data => {
            resolve(data);
          }, err => {
            reject(err);
            //console.log("ERER:", err);
          });
        });
    });
  }
  // get types 
  getTypes() {
    return new Promise((resolve, reject) => {
     return this.http.get(this.baseUrl + '/property/types').subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
   }
    // get rentals 
  getRentals() {
    return new Promise((resolve, reject) => {
     
      return this.http.get(this.baseUrl + '/property/rentaltypes').subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }
  // add property  Api  
  addProperty(payload) {
    return new Promise((resolve, reject) => {
      this.getHeaders()
        .then((token: any) => {
          if(!token) return reject(['error']);
          let headers = new HttpHeaders({
            'Authorization': token
          });
          this.http.post(this.baseUrl + '/property/add', payload, { headers: headers }).subscribe(data => {
            resolve(data);
          }, err => {
            reject(err);
           // console.log("ERER:", err);
          });
        });
    });
  }
  // status us Api  
  userPhoneStatus(payload) {
    return new Promise((resolve, reject) => {
      this.getHeaders()
        .then((token: any) => {
          if(!token) return reject(['error']);
          let headers = new HttpHeaders({
            'Authorization': token
          });
          this.http.post(this.baseUrl + '/user/checkphone', payload, { headers: headers }).subscribe(data => {
            resolve(data);
          }, err => {
            reject(err);
           // console.log("ERER:", err);
          });
        });
    });
  }
  // delete property api  
  deleteProperty(payload) {
    return new Promise((resolve, reject) => {
      this.getHeaders()
        .then((token: any) => {
          if(!token) return reject(['error']);
          let headers = new HttpHeaders({
            'Authorization': token
          });
          this.http.post(this.baseUrl + '/property/delete', payload, { headers: headers }).subscribe(data => {
            resolve(data);
          }, err => {
            reject(err);
            //console.log("ERER:", err);
          });
        });
    });
  }

  // get amenities 
  getAmenities() {
    return new Promise((resolve, reject) => {
      // this.getHeaders()
      //   .then((token: any) => {
      //     let headers = new HttpHeaders({
      //       'Authorization': token
      //     });
      return this.http.get(this.baseUrl + '/property/amenities',).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
       // console.log("ERER:", err);
      });
    });
    // });
  }
  // update profile  Api  
  updateProfile(payload) {
    return new Promise((resolve, reject) => {
      this.getHeaders()
        .then((token: any) => {
          if(!token) return reject(['error']);
          let headers = new HttpHeaders({
            'Authorization': token
          });
          this.http.post(this.baseUrl + '/user/update', payload, { headers: headers }).subscribe(data => {
            resolve(data);
          }, err => {
            reject(err);
           // console.log("ERER:", err);
          });
        });
    });
  }
  //update propery API
  updateProperty(payload) {
    return new Promise((resolve, reject) => {
      this.getHeaders()
        .then((token: any) => {
          if(!token) return reject(['error']);
          let headers = new HttpHeaders({
            'Authorization': token
          });
          this.http.post(this.baseUrl + '/property/update', payload, { headers: headers }).subscribe(data => {
            resolve(data);
          }, err => {
            reject(err);
           // console.log("ERER:", err);
          });
        });
    });
  }
  generateToken() {
    if(this.utility.getStorage('user_email')){
      var useremail = this.utility.getStorage('user_email');
       return new Promise((resolve, reject) => {
         this.http.post(this.baseUrl + '/user/getRefreshToken', {email : useremail }).subscribe((data: any) => {

          var body = {
            'refresh_token': data.refresh_token
          }
          return this.http.post(this.baseUrl + '/user/refresh', body).subscribe(data => {
              resolve(data);
            }, err => {
            // console.log("ERER:", err);
            });
        }, err => {;
         // console.log("ERER:", err);
        });
       })
      
      
    }else{
      return new Promise((resolve, reject) => {
       
          reject();
      });
    };

  }
  getHeaders() {
    return new Promise((resolve, reject) => {
      this.generateToken()
        .then((token: any) => {   
          resolve(token.access_token);   

        }, err => {
        })
    });

  }
}