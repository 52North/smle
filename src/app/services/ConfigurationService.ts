import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Configuration} from './config/Configuration';
import {JSONConfiguration} from './config/JSONConfiguration';

@Injectable()
export class ConfigurationService {
    constructor(private http: Http) {
    }

    public getConfiguration(): Promise<Configuration> {
        return this.http.get('/config.json').toPromise().then((response: Response) => {
            var data = response.json();
            return new JSONConfiguration(data);
        });
    }
}
