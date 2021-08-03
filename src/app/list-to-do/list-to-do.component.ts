import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { User } from '../registration/registration.component';

import { BasicAuthenticationService } from '../service/basic-authentication.service';


export class Todo
{
  constructor(public id:number,public userId:number,public description:string,public status:boolean,public targetDate : String)
  {
    
  }

}

@Component({
  selector: 'app-list-to-do',
  templateUrl: './list-to-do.component.html',
  styleUrls: ['./list-to-do.component.css']
})
export class ListToDoComponent implements OnInit {

  todos = [] ;
  result:String ;
  user:User

  constructor(private todoService : TodoDataService,private router:Router,private basicAuthService : BasicAuthenticationService) { }

  ngOnInit() {
    this.refreshTodos()
  }

  refreshTodos()
  {
    let username = this.basicAuthService.getAuthenticatedUser()
    this.basicAuthService.getUserByUsername(username).subscribe(
      response=>{
          
          this.user= response
          
          this.todoService.getAllTodoData(this.user.id).subscribe(
            response=>{
            this.todos=response;
            }
          )
      }
    )
 
  }

  deleteTodo(id:number)
  {
    this.todoService.deleteTodo(id).subscribe(response=>
      {
        this.result="Record Deleted Successfully"
        this.refreshTodos()
      },
      error=>
      {
        this.result = "Try Again Later"
      }
      
    )

  }



  updateTodo(id:number)
  {
    this.router.navigate([`todo/${id}`])
  }

  addTodo()
  {
    
     this.router.navigate(["todo"])
  }





}



  

