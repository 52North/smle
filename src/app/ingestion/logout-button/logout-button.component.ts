import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent {

  constructor(
    public authService: AuthService,
    protected router: Router
  ) { }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
