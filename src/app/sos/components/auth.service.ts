import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
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
        private http: HttpClient,
        private configurationService: ConfigurationService
    ) {
        this.configurationService.getConfig().subscribe(config => {
            this.authUrl = config.authUrl;
            this.logOutUrl = config.logOutUrl;
            this.userInfoUrl = config.userInfoUrl;
            this.oauthCallbackUrl = config.oauthCallbackUrl;
            this.getUserInfo();
        });
    }

    public logIn() {
        window.open(this.authUrl, '_blank');
        const listener = (event) => {
            if (event.origin !== this.oauthCallbackUrl) { return; }
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
        this.http.get<{ user: UserInfo }>(this.userInfoUrl, { withCredentials: true })
            .map((res) => {
                if (res.user) {
                    this.loggedInUser = res.user as UserInfo;
                    this.logInChangesEvent.emit(true);
                }
            })
            .catch(this.handleError)
            .subscribe();
    }

    private handleError(res: Response) {
        if (res.status === 0) { return Observable.throw('Could not reach the service!'); }
    }
}

export class UserInfo {
    public username: string;
    public name: string;
    public provider: string;
}
