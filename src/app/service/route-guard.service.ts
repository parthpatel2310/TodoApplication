import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HardCodedAuthenticationService } from "./hard-coded-authentication.service";
@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {
  constructor(private router:Router,private hardCodeAuthenticatedService: HardCodedAuthenticationService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.hardCodeAuthenticatedService.isUserLoggedIn()) {
      return true
    }
    this.router.navigate(['login'])
    return false;
  }
}