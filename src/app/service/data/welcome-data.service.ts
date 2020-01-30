import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export class HelloWorldBean {
  constructor(public message: string) {

  }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http: HttpClient) { }





  executeHelloworldServiceWithPathVariable(name) {
    // let basicAuthHeaderString = this.createBasicAuthentionHeader()
    // let headers = new HttpHeaders({
    //   Authorization : basicAuthHeaderString
    // })
    return this.http.get<HelloWorldBean>(`http://localhost:8080/helloWorld/${name}`)
   
  }

  createBasicAuthentionHeader()
  {
    // let username="admin"
    // let password="admin"
    // let basicAuthHeaderString = 'Basic '+window.btoa(username+':'+password)
    // return basicAuthHeaderString
  }

}
