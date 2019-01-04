import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {clone} from 'lodash';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  taskForm:boolean=false;
  isNewTask:boolean;
  desc;
  title;
  token_update;
  newTask:any={};
  editUserTask:boolean=false;
  editedTask:any={};
  editTaskForm:boolean=false;
  restItems: any;
  restItemsUrl = 'https://firestore.googleapis.com/v1beta1/projects/angular-task-e7f39/databases/(default)/documents/tasks';

    constructor(private http: HttpClient) 
    {}

  ngOnInit() {
    this.getRestItems();
  }

  // Read all REST Items
  getRestItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          console.log(this.restItems);
        }
      )
  }

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems() {
    return this.http
      .get<any[]>(this.restItemsUrl)
      .pipe(map(data => data));
  }
  
  // Saves created new Task
  saveTask(form){
      let documents = {
		"fields":{
		"title":{
		"stringValue":form.title, 
		},
		"description":{
		"stringValue":form.description
		}
		}
	}
    console.log(documents);
	this.taskForm=false;
	alert ("Task Created... Wait Few Seconds !!!");
    return this.http.post(this.restItemsUrl, documents)
	.subscribe(result => {
        window.location.reload();
     });
  }
  
  
  showAddTaskForm(){	 
	if(this.restItems.length){
      this.newTask={};
    }
    this.taskForm=true;
    this.isNewTask=true;
  }  
 
  cancelNewTask(){
    this.newTask={};
    this.taskForm=false;
  }
  
  
  // Opens Edit form
  showEditTaskForm(restItems){
	var retVal = confirm("Do you want to update task ?");
    if( retVal == true ) {
		alert ("Please scroll down !!!");
		this.token_update = restItems;
		if(!restItems){
		  this.taskForm=false;
		  return;
		}
		this.editUserTask=true;
		this.editedTask=clone(restItems);
		let copy = JSON.parse(JSON.stringify(this.editedTask));
		this.desc = copy.fields.description.stringValue;
		this.title = copy.fields.title.stringValue;
    } else {
       return false;
    }
  }
  
  cancelEdits(){
    this.editedTask={};
    this.editUserTask=false;
  }
  
  // Updates Selected Task
  updateTask(form) {
	var documents = {
		"fields":{
		"title":{
		"stringValue":form.title, 
		},
		"description":{
		"stringValue":form.description
		}
		}
	}
	var copy = JSON.parse(JSON.stringify(this.token_update));
	var stringVal= copy.name;
	var stringVal = stringVal.split("/");
	var urldel = this.restItemsUrl + '/' + stringVal[6];
	alert ("Task Updated... Wait Few Seconds !!!");
	return this.http.delete(urldel, this.token_update)
	.subscribe(result => {
        return this.http.post(this.restItemsUrl, documents)
	.subscribe(result => {
        window.location.reload();
     });
     })
  }
  
  
  // Deletes Selected Task
  removeTask(restItems){
	var retVal = confirm("Do you really want to delete task ?");
    if( retVal == true ) {
		alert ("Wait Few Seconds !!!");
       	var copy = JSON.parse(JSON.stringify(restItems));
		var stringValue = copy.name;
		var stringValue = stringValue.split("/");
		var urldel = this.restItemsUrl + '/' + stringValue[6];
		console.log(urldel);
		return this.http.delete(urldel, restItems)
		.subscribe(result => {
			window.location.reload();
		 })
    } else {
       return false;
    }
  }
}
