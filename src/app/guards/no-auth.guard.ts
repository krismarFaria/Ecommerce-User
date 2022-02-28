import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private auth: AngularFireAuth,
    private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      let init = localStorage.getItem('init')
    
      return this.auth.authState.pipe(map(auth => {

    
        if(init && auth){
          this.router.navigate(['/tabs/home']);
          return false
        }

        if(!init && !auth){
          this.router.navigate(['init']);
          return false
        }

        if(init && !auth){         
          return true
        }
       
      
      }));



  }
  
}
