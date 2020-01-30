import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-to-do/list-to-do.component';
import { API_URL } from 'src/app/app.constant';


@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http : HttpClient) { }


  getAllTodoData(userId)
  {
      return this.http.get<Todo[]>(`${API_URL}/users/${userId}/todos`)
  }

  deleteTodo(id)
  {
    return this.http.delete(API_URL+"/users/deletetodos/"+id)
  }


  getTodo(id)
  {
    return this.http.get<Todo>(`${API_URL}/users/todosbyid/${id}`)
  } 

  updateTodo(id,todo:Todo)
  {
    return this.http.put(`${API_URL}/users/updatetodos/${id}`,todo)
  }

  createTodo(todo:Todo)
  {
    return this.http.post(`${API_URL}/users/createtodos`,todo)
  }
 

}


