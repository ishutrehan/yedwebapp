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
  generateToken() {
    if(this.utility.getStorage('refreshToken')){
      var token = this.utility.getStorage('refreshToen');
      var body = {
        'refresh_token': token
      }
      return new Promise((resolve, reject) => {
        this.http.post(this.baseUrl + '/user/refresh', body).subscribe(data => {
          resolve(data);
        }, err => {
          reject(err);
         // console.log("ERER:", err);
        });
      });
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