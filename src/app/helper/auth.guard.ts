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
    let roles:any[] = route.data['roles']
    if(roles!=null || roles!=undefined){
      let index = roles.indexOf(cred.designation)
      if(index==-1){
        this.router.navigate(['/unauthorize']);
        return false;
      }
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