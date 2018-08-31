import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuardGuard implements CanActivate {

  constructor(private authService:AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let roles = route.data["roles"] as Array<string>;
      let user = JSON.parse(this.authService.getCurrentUser());
      return user && user.roles.some(r=> roles.includes(r));


  }
}
