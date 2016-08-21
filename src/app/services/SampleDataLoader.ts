import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {SensorMLXmlService} from '../services/SensorMLXmlService';
import {AbstractProcess} from '../model/sml';
import 'rxjs/add/operator/toPromise';

/**
 * This class loads example SensorML XML files, deserializes them and returns them as AbstractProcess.
 */
@Injectable()
export class SampleDataLoader {

    constructor(private http: Http) {
    }
    
    /**
     * The method loads SensorML XML files by their @url and deserializes them. <p>
     * @url path to the XML file <br>
     * @return AbstractProcess
     */
    loadSample(url: string): Promise<AbstractProcess> {
        return this.http.get(url).toPromise().then(this.extractProcess);
    }

    private extractProcess(res: Response) {
        let body = res.text();
        return new SensorMLXmlService().deserialize(body);
    }
}
