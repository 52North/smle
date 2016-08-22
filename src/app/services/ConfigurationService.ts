import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Configuration} from './config/Configuration';
import {JSONConfiguration} from './config/JSONConfiguration';
import {TrueConfiguration} from './config/TrueConfiguration';
/**
 * ConfigurationService for the config.json file. The config.json file defines which elements are
 * optional/mandatory. If an element is not configured, then it is mandatory by default.
 */
@Injectable()
export class ConfigurationService {
    constructor(private http: Http) {
    }
/**
 * Returns the configuration which is declared in the config.json file.<p>
 * 
 * @error If there is an error with the config.json file, then all elements are set to be mandatory.
 */
    public getConfiguration(): Promise<Configuration> {
        return this.http.get('./config.json').toPromise().then((response: Response) => {
            var data = response.json();
            return new JSONConfiguration(data);
        }).catch(() => {
            return new TrueConfiguration();
        });
    }
}
