import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BasicAuthenticationService } from '../service/basic-authentication.service';


export class User {
  constructor(public id: number, public name: string, public password: string, public userName: string, public userTypeId : number, public accountNonExpired, public accountNonLocked, public authorities,public credentialsNonExpired,public enable) {

  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})


export class RegistrationComponent implements OnInit {

  user:User
  confirmPassword
  message
  result
  
  

  constructor(private router: Router,private userService : BasicAuthenticationService) { }

  ngOnInit() {


    if (sessionStorage.getItem("authenticatedUser")) {
      this.router.navigate(["welcome", sessionStorage.getItem("authenticatedUser")])
      this.user = new User(0,"","","",2,true,true,null,true,true)
    }
    else{
      this.user = new User(0,"","","",2,true,true,null,true,true)
    }
  }

  saveUser() {
    console.log("save user", this.user);

    if (this.user.name == " " || this.user.userName == "" || this.user.password == "" || this.confirmPassword == "") {
      this.message = "Cannot be null"

    }
    else {
        this.userService.createUser(this.user).subscribe(response => {
           this.userService.setAuthenticatedUserId(this.user.userName)
            this.router.navigate(["welcome",this.user.name])
        },
          error => {
            this.user = null
            this.result = error
            
            console.log(this.result)
          }
        ) 
    }
  }



}
