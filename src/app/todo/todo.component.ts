import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-to-do/list-to-do.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  id: number
  todo: Todo
  message
  result

  constructor(private todoService: TodoDataService, private route: ActivatedRoute, private router: Router,private basicAuthService:BasicAuthenticationService) { }

  ngOnInit() {
    if (this.route.snapshot.params["id"]) {
    this.id = this.route.snapshot.params["id"]
    this.todo = new Todo(this.id,0," ", false,"")
  
      this.todoService.getTodo(this.id).subscribe(
        response => {
          this.todo = response
        }
      )
    }
    else{
      this.todo = new Todo(0, 0,"", false,"")
    }

  }

  saveTodo() {

    if(this.todo.description == " " || this.todo.description.length == 0 )
    {
    
        this.message="Description cannot be empty"
        this.router.navigate(["/todo"])
    }
    else if (this.id) {
      this.todoService.updateTodo(this.id, this.todo).subscribe(response => {
        this.result = "Record Updated Successfully"
        this.router.navigate(["/todos"])
      },
        error => {
          this.result = "Try Again Later"
        }
      )
    }
    else {

      this.todo.userId=+this.basicAuthService.getAuthenticatedUserId();
      console.log(this.todo);
      this.todoService.createTodo(this.todo).subscribe(response => {
        this.result = "Record Created Successfully"
        this.router.navigate(["/todos"])
      },
        error => {
          this.result = "Try Again Later"
        }
      )
    }

  }

}
