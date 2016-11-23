import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { DescriptionConfig } from './config/DescriptionConfig';
import { JSONDescriptionConfig } from './config/JSONDescriptionConfig';
import { TrueDescriptionConfig } from './config/TrueDescriptionConfig';
import { DynamicDescriptionConfig } from './config/DynamicDescriptionConfig';
import { BidiMap } from './DynamicGUIService';

@Injectable()
export class DescriptionConfigService {

    constructor(private http: Http) {
    }

    public getConfiguration(useDynamic: boolean): Promise<DescriptionConfig> {
        return this.http.get('./description-config.json').toPromise().then((response: Response) => {
            let data = response.json();
            if (useDynamic)
                return new DynamicDescriptionConfig(data, {}, new BidiMap(), false);
            return new JSONDescriptionConfig(data);
        }).catch(() => {
            return new TrueDescriptionConfig();
        });
    }

}
