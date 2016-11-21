import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { DescriptionConfig } from './config/DescriptionConfig';
import { JSONDescriptionConfig } from './config/JSONDescriptionConfig';
import { TrueDescriptionConfig } from './config/TrueDescriptionConfig';
import { BidiMap } from './DynamicGUIService';

@Injectable()
export class DescriptionConfigService {
    constructor(private http: Http) {
    }

    public getConfiguration(): Promise<DescriptionConfig> {
        return this.http.get('./description-config.json').toPromise().then((response: Response) => {
            var data = response.json();
            return new JSONDescriptionConfig(data, {}, new BidiMap(), false);
        }).catch(() => {
            return new TrueDescriptionConfig();
        });
    }
}
