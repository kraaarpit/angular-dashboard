import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _isAuthorized: boolean = false;
  constructor(private router: Router) {}

  signup(email, password) {
    this.createCookies('email', email);
    this.createCookies('password', password);
    this.createCookies('isAuthorized', 'true');
    this.isAuthorized = true;
  }

  createCookies(key, value) {
    let cookie = escape(key) + '=' + escape(value) + ';';
    document.cookie = cookie;
  }

  login(email, password) {
    const storedEmail = this.getCookie('email');
    const storedPassword = this.getCookie('password');
    this.isAuthorized = storedEmail === email && storedPassword === password;
    this.createCookies('isAuthorized', 'true');
    return this.isAuthorized;
  }

  getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  get isAuthorized() {
    if (this.getCookie('isAuthorized') === 'true') {
      this.isAuthorized = true;
    }
    return this._isAuthorized;
  }
  set isAuthorized(value) {
    this._isAuthorized = value;
  }

  logout() {
    this.isAuthorized = false;
    this.router.navigate(['login']);
  }
}
