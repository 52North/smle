import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationService } from '../../services/ConfigurationService';

@Injectable()
export class AuthService {

    public loggedInUser: UserInfo = null;

    public logInChangesEvent: EventEmitter<boolean> = new EventEmitter<boolean>(false);

    private authUrl: string;
    private logOutUrl: string;
    private userInfoUrl: string;
    private oauthCallbackUrl: string;

    constructor(
        private http: Http,
        private configurationService: ConfigurationService
    ) {
        let config = this.configurationService.config;
        this.authUrl = config.authUrl;
        this.logOutUrl = config.logOutUrl;
        this.userInfoUrl = config.userInfoUrl;
        this.oauthCallbackUrl = config.oauthCallbackUrl;
        this.getUserInfo();
    }

    public logIn() {
        window.open(this.authUrl, '_blank');
        let listener = (event) => {
            if (event.origin !== this.oauthCallbackUrl) return;
            window.removeEventListener('message', listener, true);
            this.getUserInfo();
        };
        window.addEventListener('message', listener, true);
    }

    public logOut() {
        this.http.get(this.logOutUrl, { withCredentials: true })
            .map((res) => {
                this.loggedInUser = null;
                this.logInChangesEvent.emit(false);
            })
            .catch(this.handleError)
            .subscribe();
    }

    public isLoggedIn(): boolean {
        return this.loggedInUser !== null;
    }

    private getUserInfo() {
        this.http.get(this.userInfoUrl, { withCredentials: true })
            .map((res) => {
                let json = res.json();
                if (json.user) {
                    this.loggedInUser = json.user as UserInfo;
                    this.logInChangesEvent.emit(true);
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
