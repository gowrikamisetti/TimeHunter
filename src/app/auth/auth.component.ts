import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';


import { AuthService } from '../shared/auth.service';



@Injectable({

  providedIn: 'root'

})

export class AuthGuards implements CanActivate {



  constructor(private router: Router, private service: AuthService) { }




  canActivate(

    route: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // if (this.service.isAdmin()) {

    //   console.log("guard", this.service.isAdmin())

    //   return true;

    // }

    this.router.navigate(['/not-auth'])

    return false;

  }



}