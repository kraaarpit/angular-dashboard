import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanLoad {
  constructor(private loginService: LoginService, private router: Router) {}

  canLoad() {
    if (this.loginService.isAuthorized) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
