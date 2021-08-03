import { Component, OnInit } from '@angular/core';
import { HardCodedAuthenticationService } from '../service/hard-coded-authentication.service';
import { ActivatedRoute } from '@angular/router';
import {  AUTHENTICATED_USER, AUTHENTICATED_USER_ID  } from '../app.constant';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isAdmin:boolean;
  name:string

  constructor(private route : ActivatedRoute,private hardcodedAuthenitactionService:HardCodedAuthenticationService) { }

  ngOnInit() {
    this.name = sessionStorage.getItem(AUTHENTICATED_USER);
    
    if(this.name != null  && this.name.includes("admin")){
      this.isAdmin = true;
    }

  }

  ngOnDestroy() {
    this.name = null;
  }


}
