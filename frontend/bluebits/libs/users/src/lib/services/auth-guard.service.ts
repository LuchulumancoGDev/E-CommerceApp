import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router:Router, private localstorageService:LocalstorageService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const token=this.localstorageService.getToken();
    if(token){
      return true;
    }
    this.router.navigate(['/login']);
    return false;

  }
}
