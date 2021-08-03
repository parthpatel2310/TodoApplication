import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { User } from '../registration/registration.component';

import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users = [];

  constructor(private basicAuthenicationService:BasicAuthenticationService) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList(){
    this.basicAuthenicationService.getAllUserData().subscribe(
      response=>{
      this.users=response;
      console.log(this.users);
      }
      
    )
  }

}
