import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {

  private readonly accessToken = 'accessToken';

  constructor(private cookieService: CookieService,
              private router: Router) {
  }

  public canActivate(): boolean {
    const isSessionActive = this.cookieService.check(this.accessToken);
    if (!isSessionActive) {
      this.router.navigate(['/sign-in']);
    }
    return isSessionActive;
  }
}
