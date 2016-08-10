import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private authUrl: string = 'http://127.0.0.1:8082/auth/wp';
  private logOutUrl: string = 'http://127.0.0.1:8082/auth/logout';
  private userInfoUrl: string = 'http://127.0.0.1:8082/auth/info';

  public logInChangedEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private http: Http
  ) { }

  public getUserInfo(): Observable<UserInfo> {
    return this.http.get(this.userInfoUrl, { withCredentials: true })
      .map(this.extractUserInfo)
      .catch(this.handleError);
  }

  public logIn() {
    this.logInChangedEmitter.emit(true);
    var popup = window.open(this.authUrl, '_blank', 'width=500, height=500');
    let self = this;
    window.addEventListener('message', event => {
      if (event.origin !== 'http://127.0.0.1:3000') return;
      this.logInChangedEmitter.emit(true);
      window.removeEventListener('message', null);
    }, true);
  }

  public logOut(): Observable<boolean> {
    return this.http.get(this.logOutUrl, { withCredentials: true })
      .map(res => {
        this.logInChangedEmitter.emit(false);
        return true;
      })
      .catch(this.handleError);
  }

  private extractUserInfo(res: Response): UserInfo {
    let json = res.json();
    if (json.user) return json.user as UserInfo;
    return null;
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
