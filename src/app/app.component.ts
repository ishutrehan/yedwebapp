import { Component } from '@angular/core';
import { ApiProvider } from '../providers/utilities/utility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';
  taskPayload: any;
  allTasks: any;
  loader: any;
  displayError: any;

  constructor(public api: ApiProvider,) { 
    this.taskPayload = {
      "name": null,
      "description": null
    }
    this.getAll();
  }
  
  create() {
    this.loader = true;
    let err = false;
    if(!this.taskPayload.name) err = true;
    if(!this.taskPayload.description) err = true;
    if(!err){
      this.api.create(this.taskPayload)
      .then((result: any) => {
        this.loader = false;
        if(result){
          this.allTasks.push(result)
        }
      }, err => {
        //console.log("err", err);
      })
    }else{
      this.displayError = true;
      this.loader = false;
    }
    
  }
  delete(id: any) {
    if(confirm("Are you sure to delete ")) {
      this.api.deleteItem({id: id})
      .then((result: any) => {
        if(result){
          this.allTasks.forEach((item: any, i: any) => {
            if(item._id == id) this.allTasks.splice(i, 1)
          })
        }
      }, err => {
        //console.log("err", err);
      })
    }
    
  }
  getAll() {
    this.api.getall({})
      .then((result: any) => {
        this.allTasks = result;
      }, err => {
        //console.log("err", err);
      })
  }
  editView(task: any){
    return task.edit = true;
  }
  cancelView(task: any){
    return task.edit = false;
  }
  update(task: any) {
    task.loading = true;
    let updateData = {
      "id" : task._id,
      "name" : task.name,
      "description": task.description
    }
    this.api.updateItem(updateData)
      .then((result: any) => {
        task.edit = false;
        task.loading = false;
      }, err => {
        //console.log("err", err);
      })
  }
}
