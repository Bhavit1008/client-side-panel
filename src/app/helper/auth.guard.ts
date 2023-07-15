import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('Auth guard is called ::' ,localStorage.getItem('cred'))
    var cred = JSON.parse(localStorage.getItem('cred') || '{}')
    if(cred==null || cred == undefined){
      this.router.navigate(['/login']);
      localStorage.clear();
      return false;
    }
    var currentDate = new Date();
    var ttlDate = cred.ttl
    if(currentDate.getTime() > ttlDate){
      this.router.navigate(['/login']);
      localStorage.clear();
      return false;
    }
    if (cred.isLoginSuccessful !='yes') {
      this.router.navigate(['/login']);
      localStorage.clear();
      return false;
    }
    console.log('logged in');
    return true;
    
  }
}