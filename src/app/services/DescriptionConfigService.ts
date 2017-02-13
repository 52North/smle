import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable, Observer } from 'rxjs';
import { DescriptionConfig } from './config/DescriptionConfig';
import { JSONDescriptionConfig } from './config/JSONDescriptionConfig';
import { TrueDescriptionConfig } from './config/TrueDescriptionConfig';

import { EditorMode } from './EditorMode';

import { BidiMap } from './dynamicGUI/BidiMap';


@Injectable()
export class DescriptionConfigService {

    constructor(private http: Http) {
    }

    public getConfiguration(editorMode: EditorMode): Observable<DescriptionConfig> {
        return new Observable<DescriptionConfig>((observer: Observer<DescriptionConfig>) => {
            switch (editorMode) {
                case EditorMode.Dynamic:
/*                    this.loadConfiguration('./config/description-config.json').then(config => {
                        observer.next(new JSONDescriptionConfig(config, {}, new BidiMap(), true));
                        observer.complete();
                    });*/
                    break;
                default:
                    this.loadConfiguration('./config/description-config.json').then(config => {
                        observer.next(config); observer.complete();
                    });
            }
        });
    }

    private loadConfiguration(location: string): Promise<DescriptionConfig> {
        return this.http.get(location).toPromise().then((response: Response) => {
            try {
                let data = response.json();
          return new JSONDescriptionConfig(data, {}, new BidiMap(), false);
            } catch (error) {
                console.error('error while creating configuration: ' + error);
            }
        }).catch(() => {
            return new TrueDescriptionConfig();
        });
    }

}
