import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent {

  public username: string;
  public password: string;
  public loginfailed = false;

  constructor(
    protected authService: AuthService
  ) { }

  public login() {
    this.authService.login(this.username, this.password).subscribe(
      res => this.loginfailed = false,
      error => this.loginfailed = true
    );
  }

}
