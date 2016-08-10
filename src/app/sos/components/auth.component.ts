import { Component, OnInit } from '@angular/core';
import { AuthService, UserInfo } from './auth.service';

@Component({
  selector: 'proxy-authentication',
  providers: [AuthService],
  template: require('./auth.template.html')
})
export class AuthComponent implements OnInit {

  private isUserLoggedIn: boolean = false;
  private user: UserInfo = null;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  protected logIn() {
    this.authService.logIn();
  }

  protected logOut() {
    this.authService.logOut().subscribe(res => {
      this.user = null;
    })
  }

  private getUser() {
    this.authService.getUserInfo().subscribe(res => {
      this.user = res;
    });
  }

}
