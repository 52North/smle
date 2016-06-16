import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FetchDescriptionService {

  constructor(
    private http: Http
  ) { }

  fetchDescriptionIDs(sosUrl: string): Observable<Array<string>> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let body = JSON.stringify({
      "request": "GetCapabilities",
      "service": "SOS",
      "sections": [
        "OperationsMetadata"
      ]
    });
    return this.http.post(sosUrl, body, { headers: headers })
      .map((res) => {
        return this.extractData(res);
      })
  }

  private extractData(res: Response): Array<string> {
    let json = res.json();
    return json.operationMetadata.operations.DescribeSensor.parameters.procedure.allowedValues;
  }

  fetchDescription(sosUrl: string, descId: string): Observable<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let body = JSON.stringify({
      "request": "DescribeSensor",
      "service": "SOS",
      "version": "2.0.0",
      "procedure": descId,
      "procedureDescriptionFormat": "http://www.opengis.net/sensorml/2.0"
    });
    return this.http.post(sosUrl, body, { headers: headers })
      .map((res) => {
        let json = res.json();
        return json.procedureDescription.description || json.procedureDescription;
      })
  }

}
