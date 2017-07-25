import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SensorMLXmlService } from '../services/SensorMLXmlService';
import { AbstractProcess } from '../model/sml';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SampleDataLoader {

    constructor(private http: Http) {
    }

    loadSample(url: string): Promise<AbstractProcess> {
        return this.http.get(url).toPromise().then(this.extractProcess);
    }

    private extractProcess(res: Response) {
        const body = res.text();
        return new SensorMLXmlService().deserialize(body);
    }
}
