import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { AbstractProcess } from '../model/sml';
import { SensorMLXmlService } from '../services/SensorMLXmlService';
import { ConfigurationService } from '../services/ConfigurationService';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SosService {

    private sosUrl: string;
    private proxyUrl: string;

    constructor(
        private http: Http,
        private configurationService: ConfigurationService
    ) {
        this.sosUrl = this.configurationService.config.sosUrl;
        this.proxyUrl = this.configurationService.config.proxyUrl;
    }

    public fetchDescriptionIDs(authorized?: boolean, sosUrl?: string): Observable<Array<string>> {
        const body = JSON.stringify({
            request: 'GetCapabilities',
            service: 'SOS',
            sections: [
                'OperationsMetadata'
            ]
        });
        const url = authorized ? this.useProxyUrl(sosUrl) : this.useSosUrl(sosUrl);
        return this.http.post(url, body, {
            headers: this.createJsonHeader(),
            withCredentials: true
        })
            .map(this.extractDescriptionIDs)
            .catch(this.handleError);
    }

    public fetchDescription(descId: string, sosUrl?: string): Observable<string> {
        const body = JSON.stringify({
            request: 'DescribeSensor',
            service: 'SOS',
            version: '2.0.0',
            procedure: descId,
            procedureDescriptionFormat: 'http://www.opengis.net/sensorml/2.0'
        });
        return this.http.post(this.useSosUrl(sosUrl), body, {
            headers: this.createJsonHeader(),
            withCredentials: true
        })
            .map((res) => {
                const json = res.json();
                if (json.exceptions && json.exceptions.length >= -1 && json.exceptions[0].text)
                    throw json.exceptions[0].text;
                return json.procedureDescription.description || json.procedureDescription;
            })
            .catch(this.handleAddDescriptionError);
    }

    public deleteDescription(descId: string, sosUrl?: string): Observable<boolean> {
        const body = JSON.stringify({
            request: 'DeleteSensor',
            service: 'SOS',
            version: '2.0.0',
            procedure: descId
        });
        return this.http.post(this.useProxyUrl(sosUrl), body, {
            headers: this.createJsonHeader(),
            withCredentials: true
        })
            .map((res) => {
                const json = res.json();
                return json.deletedProcedure === descId ? true : false;
            });
    }

    public hasSosDescription(descID: string, sosUrl?: string): Observable<boolean> {
        return new Observable<boolean>((observer: Observer<boolean>) => {
            this.fetchDescriptionIDs(false, this.useSosUrl(sosUrl)).subscribe((res) => {
                if (res) {
                    res.forEach((entry) => {
                        if (entry === descID) {
                            observer.next(true);
                            observer.complete();
                        }
                    });
                }
                observer.next(false);
                observer.complete();
            }, (error) => {
                observer.error(error);
                observer.complete();
            });
        });
    }

    public addDescription(description: AbstractProcess, sosUrl?: string): Observable<boolean> {
        const body = JSON.stringify({
            request: 'InsertSensor',
            service: 'SOS',
            version: '2.0.0',
            procedureId: description.identifier.value,
            procedureDescriptionFormat: 'http://www.opengis.net/sensorml/2.0',
            procedureDescription: new SensorMLXmlService().serialize(description, false),
            // featureOfInterest auswählbar machen
            featureOfInterestType: 'http://www.opengis.net/def/samplingFeatureType/OGC-OM/2.0/SF_SamplingPoint',
            // observationType auswählbar machen ???
            observationType: [
                'http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement'
            ],
            // observableProperty auswählbar machen ???
            observableProperty: [
                'http://www.52north.org/test/observableProperty/9_1']
        });
        return this.http.post(this.useProxyUrl(sosUrl), body, {
            headers: this.createJsonHeader(),
            withCredentials: true
        })
            .map(this.handleAddDescription)
            .catch(this.handleAddDescriptionError);
    }

    public updateDescription(descID: string, description: AbstractProcess, sosUrl?: string): Observable<boolean> {
        const body = JSON.stringify({
            request: 'UpdateSensorDescription',
            service: 'SOS',
            version: '2.0.0',
            procedure: descID,
            procedureDescriptionFormat: 'http://www.opengis.net/sensorml/2.0',
            procedureDescription: new SensorMLXmlService().serialize(description, false)
        });
        return this.http.post(this.useProxyUrl(sosUrl), body, {
            headers: this.createJsonHeader(),
            withCredentials: true
        })
            .map(this.handleAddDescription)
            .catch(this.handleAddDescriptionError);
    }

    public createDescribeSensorUrl(identifier: string): string {
        let url = this.sosUrl;
        url += '?service=SOS';
        url += '&version=2.0.0';
        url += '&request=DescribeSensor';
        url += '&procedureDescriptionFormat=http://www.opengis.net/sensorml/2.0';
        url += '&procedure=' + identifier;
        return url;
    }

    public getIdentifierOfDescribeSensorUrl(describeSensorUrl: string): string {
        const index = describeSensorUrl.indexOf('procedure=');
        return describeSensorUrl.substr(index + 10);
    }

    private createJsonHeader(): Headers {
        return new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
    }

    private extractDescriptionIDs(res: Response): Array<string> {
        const json = res.json();
        return json.operationMetadata.operations.DescribeSensor.parameters.procedure.allowedValues;
    }

    private handleAddDescription(res: Response): boolean {
        const body = res.json();
        if (body.exceptions && body.exceptions.length >= -1 && body.exceptions[0].text) throw body.exceptions[0].text;
        return true;
    }

    private handleAddDescriptionError(error: Response) {
        if (typeof error === 'string') return Observable.throw(error);
        const json = error.json();
        if (json.exceptions && json.exceptions.length >= -1) {
            const errors: Array<string> = [];
            (json.exceptions as Array<any>).forEach((entry) => {
                errors.push(entry.text || entry.locator);
            });
            return Observable.throw(errors);
        }
        return Observable.throw([this.handleError(error)]);
    }

    private handleError(res: Response) {
        if (res.status === 0) return Observable.throw('Could not reach the service!');
    }

    private useSosUrl(sosUrl: string) {
        return sosUrl || this.sosUrl;
    }

    private useProxyUrl(proxyUrl: string) {
        return proxyUrl || this.proxyUrl;
    }

}
