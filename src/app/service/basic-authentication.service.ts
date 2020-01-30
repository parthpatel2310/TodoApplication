import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL, AUTHENTICATED_USER, TOKEN, AUTHENTICATED_USER_ID } from '../app.constant';
import { User } from '../registration/registration.component';



@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  user:User

  constructor(private http: HttpClient) { }


  executeJWTAuthenticationService(username, password) {
    return this.http.post<any>(`${API_URL}/authenticate`, {
      username, password
    }).pipe(map(
      data => {
        sessionStorage.setItem(AUTHENTICATED_USER, username)
        sessionStorage.setItem(TOKEN, "Bearer " + data.token);
        return data
      }
    ))
    //console.log("Welcome Service")
  }

  createUser(user: User) {
    return this.http.post<any>(`${API_URL}/users/createusers`, user).pipe(map(
      data => {
        sessionStorage.setItem(AUTHENTICATED_USER, user.username)
        sessionStorage.setItem(TOKEN, "Bearer " + data.token);
        return data
      }
    ))
  }

 

  getUserByUsername(username) {

    return this.http.get<User>(`${API_URL}/users/getuserdetails/${username}`)
  }

    setAuthenticatedUserId(username) {

    this.getUserByUsername(username).subscribe(
      response=>
      {
        this.user = response
        sessionStorage.setItem(AUTHENTICATED_USER_ID,this.user.id.toString());
      }
    )
    
  }

  getAuthenticatedUserId() {
    if (this.getAuthenticatedUser())

      return sessionStorage.getItem(AUTHENTICATED_USER_ID)
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN)
  }


  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }

}


