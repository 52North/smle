import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { AbstractProcess } from '../model/sml';
import { FetchDescriptionService } from './fetchDescriptionService';
import { SensorMLXmlService } from '../services/SensorMLXmlService';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PublishDescriptionService {

  private description: AbstractProcess;

  constructor(
    private http: Http,
    private fetch: FetchDescriptionService
  ) { }

  setDescription(desc: AbstractProcess): void {
    if (!desc.gmlId) {
      desc.gmlId = 'temp_123';
    }
    if (desc.identifier && !desc.identifier.codeSpace) {
      desc.identifier.codeSpace = 'uniqueID';
    }
    this.description = desc;
  }

  getDescription(): AbstractProcess {
    return this.description;
  }

  hasSosDescription(sosUrl: string, descID: string): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      this.fetch.fetchDescriptionIDs(sosUrl).subscribe((res) => {
        res.forEach((entry) => {
          if (entry === descID) {
            observer.next(true);
            observer.complete();
          }
        });
        observer.next(false);
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  addDescription(sosUrl: string, description: AbstractProcess): Observable<boolean> {
    let body = JSON.stringify({
      'request': 'InsertSensor',
      'service': 'SOS',
      'version': '2.0.0',
      'procedureDescriptionFormat': 'http://www.opengis.net/sensorml/2.0',
      'procedureDescription': new SensorMLXmlService().serialize(description),
      // featureOfInterest auswählbar machen
      'featureOfInterestType': 'http://www.opengis.net/def/samplingFeatureType/OGC-OM/2.0/SF_SamplingPoint',
      // observationType auswählbar machen ???
      'observationType': [
        'http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement',
        'http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_CategoryObservation',
        'http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_CountObservation',
        'http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_TextObservation',
        'http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_TruthObservation',
        'http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_GeometryObservation'
      ],
      // observableProperty auswählbar machen ???
      'observableProperty': [
        'http://www.52north.org/test/observableProperty/9_1',
        'http://www.52north.org/test/observableProperty/9_2',
        'http://www.52north.org/test/observableProperty/9_3',
        'http://www.52north.org/test/observableProperty/9_4',
        'http://www.52north.org/test/observableProperty/9_5',
        'http://www.52north.org/test/observableProperty/9_6'
      ]
    });
    return this.http.post(sosUrl, body, { headers: this.createJsonHeader() })
      .map(this.handleAddDescription)
      .catch(this.handleAddDescriptionError);
  }

  updateDescription(sosUrl: string, descID: string, description: AbstractProcess): Observable<boolean> {
    let body = JSON.stringify({
      'request': 'UpdateSensorDescription',
      'service': 'SOS',
      'version': '2.0.0',
      'procedure': descID,
      'procedureDescriptionFormat': 'http://www.opengis.net/sensorml/2.0',
      'procedureDescription': new SensorMLXmlService().serialize(description)
    });
    return this.http.post(sosUrl, body, { headers: this.createJsonHeader() })
      .map(this.handleAddDescription)
      .catch(this.handleAddDescriptionError);
  }

  private createJsonHeader(): Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  handleAddDescription(res: Response): boolean {
    return true;
  }

  handleAddDescriptionError(error: Response) {
    let json = error.json();
    if (json.exceptions && json.exceptions.length >= -1) {
      let errors: Array<string> = [];
      (json.exceptions as Array<any>).forEach(entry => {
        errors.push(entry.locator);
      });
      return Observable.throw(errors);
    }
    return Observable.throw([this.handleError(error)]);
  }

  private handleError(error: any): string {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return errMsg;
  }
}
