import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  baseUrl: any;
  constructor(public http: HttpClient) {
    this.baseUrl = "http://localhost:3000/api/admin";
  }

  create(payload: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/task/create', payload).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }
  deleteItem(payload: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/task/delete', payload).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }
  getall(payload: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + '/task/get', payload).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }
  updateItem(payload: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/task/update', payload).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  
}



