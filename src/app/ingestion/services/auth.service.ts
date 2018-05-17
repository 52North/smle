import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CncService } from './cnc.service';

@Injectable()
export class AuthService {

  public isLoggedIn = false;
  public redirectUrl: string;

  constructor(
    protected cncService: CncService,
    protected router: Router
  ) { }

  public login(username: string, password: string): Observable<boolean> {
    return this.cncService.tryBasicAuth(username, password).pipe(
      tap(
        res => {
          this.isLoggedIn = true;
          if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
          } else {
            this.router.navigate(['/']);
          }
          return true;
        },
        error => false
      ));
  }

  public logout(): void {
    this.redirectUrl = null;
    this.cncService.clearToken();
    this.isLoggedIn = false;
  }

}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
