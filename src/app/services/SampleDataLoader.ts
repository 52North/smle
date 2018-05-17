import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AbstractProcess } from '../model/sml';
import { SensorMLXmlService } from '../services/SensorMLXmlService';

@Injectable()
export class SampleDataLoader {

    constructor(private http: HttpClient) { }

    loadSample(url: string): Observable<AbstractProcess> {
        return this.http.get(url, { responseType: 'text' }).pipe(
            map((response: string) => new SensorMLXmlService().deserialize(response))
        );
    }

}
