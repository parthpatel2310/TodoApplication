import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name=""
  welcomeMessage


  constructor(private route:ActivatedRoute,private welcomeService:WelcomeDataService) { }

  ngOnInit() {
    this.name=this.name + this.route.snapshot.params["name"] 
  
  }


  getWelcomeMessageWithParameter()
  {

      this.welcomeService.executeHelloworldServiceWithPathVariable(this.name).subscribe( response => this.handleSuccessfulResponse(response),error=>this.handleErrorResponse(error)
      
      )
  }

  handleSuccessfulResponse(response)
  {
    this.welcomeMessage=response.message
  }
  
  handleErrorResponse(error)
  {
    this.welcomeMessage = error.error.message
  }  
}
