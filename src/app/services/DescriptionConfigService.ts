import 'rxjs/add/operator/toPromise';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { DescriptionConfig } from './config/DescriptionConfig';
import { DynamicGUIDescriptionConfig } from './config/DynamicGUIDescriptionConfig';
import { JSONDescriptionConfig } from './config/JSONDescriptionConfig';
import { TrueDescriptionConfig } from './config/TrueDescriptionConfig';
import { BidiMap } from './dynamicGUI/BidiMap';
import { EditorMode } from './EditorMode';

@Injectable()
export class DescriptionConfigService {

    constructor(private http: HttpClient) { }

    public getConfiguration(editorMode: EditorMode): Observable<DescriptionConfig> {
        return new Observable<DescriptionConfig>((observer: Observer<DescriptionConfig>) => {
            switch (editorMode) {
                case EditorMode.Dynamic:
                    this.loadConfiguration('./config/description-config.json').subscribe(
                        (config) => { observer.next(new DynamicGUIDescriptionConfig(config, {}, new BidiMap(), true)); },
                        (error) => { observer.next(new TrueDescriptionConfig()); },
                        () => observer.complete()
                    );
                    break;
                default:
                    this.loadConfiguration('./config/description-config.json').subscribe(
                        (config) => { observer.next(config); observer.complete(); },
                        (error) => { observer.next(new TrueDescriptionConfig()); },
                        () => observer.complete()
                    );
            }
        });
    }

    private loadConfiguration(location: string): Observable<DescriptionConfig> {
        return this.http.get(location).map(response => {
            try {
                return new JSONDescriptionConfig(response);
            } catch (error) {
                console.error('error while creating configuration: ' + error);
            }
        });
    }
}
