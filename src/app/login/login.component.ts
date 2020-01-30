import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardCodedAuthenticationService } from '../service/hard-coded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "admin"
  password = ""
  errorMsg="invalid credentials"
  invalidLogin=false

  constructor(private router:Router,private basicAuthenticationService:BasicAuthenticationService) { }

  ngOnInit() {

      if(this.basicAuthenticationService.isUserLoggedIn())
      {
        this.router.navigate(["welcome",sessionStorage.getItem("authenticatedUser")])
      }
  }

 

  

  handleJWTBasicAuthLogin()
  {
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username,this.password).subscribe(
      data =>
      {
        this.basicAuthenticationService.setAuthenticatedUserId(this.username)
        this.router.navigate(["welcome",this.username])
      },
      error=>
      {
          this.invalidLogin=true
      }
      
    )
  
  }

}
