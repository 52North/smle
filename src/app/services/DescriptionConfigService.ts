import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { DescriptionConfig } from './config/DescriptionConfig';
import { JSONDescriptionConfig } from './config/JSONDescriptionConfig';
import { TrueDescriptionConfig } from './config/TrueDescriptionConfig';

export enum ConfigType {
    Default = 0,
    Tasking = 1
}

@Injectable()
export class DescriptionConfigService {

    constructor(private http: Http) {
    }

    public getConfiguration(configType: ConfigType): Promise<DescriptionConfig> {
        switch (configType) {
            case ConfigType.Tasking:
                return this.loadConfiguration('./config/tasking-config.json');
            default:
                return this.loadConfiguration('./config/description-config.json');
        }
    }

    private loadConfiguration(location: string): Promise<DescriptionConfig> {
        return this.http.get(location).toPromise().then((response: Response) => {
            try {
                let data = response.json();
                return new JSONDescriptionConfig(data);
            } catch (error) {
                console.error('error while creating configuration: ' + error);
            }
        }).catch(() => {
            return new TrueDescriptionConfig();
        });
    }
}
