import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  public loggedInUser: UserInfo = null;

  private authUrl: string = 'http://127.0.0.1:8082/auth/github';
  private logOutUrl: string = 'http://127.0.0.1:8082/auth/logout';
  private userInfoUrl: string = 'http://127.0.0.1:8082/auth/info';

  constructor(
    private http: Http
  ) {
    this.getUserInfo();
  }

  public logIn() {
    var popup = window.open(this.authUrl, '_blank', 'width=500, height=500');
    let self = this;
    window.addEventListener('message', event => {
      if (event.origin !== 'http://127.0.0.1:3000') return;
      this.getUserInfo();
      window.removeEventListener('message', null);
    }, true);
  }

  public logOut() {
    this.http.get(this.logOutUrl, { withCredentials: true })
      .map(res => {
        this.loggedInUser = null;
      })
      .catch(this.handleError)
      .subscribe();
  }

  public isLoggedIn(): boolean {
    console.log(this.loggedInUser);
    console.log("isLoggedIn" + this.loggedInUser == null);
    return this.loggedInUser !== null;
  }

  private getUserInfo() {
    this.http.get(this.userInfoUrl, { withCredentials: true })
      .map(res => {
        let json = res.json();
        if (json.user) {
          this.loggedInUser = json.user as UserInfo;
        }
      })
      .catch(this.handleError)
      .subscribe();
  }

  private handleError(res: Response) {
    if (res.status === 0) return Observable.throw('Could not reach the service!');
  }
}

export class UserInfo {
  public username: string;
  public name: string;
  public provider: string;
}
