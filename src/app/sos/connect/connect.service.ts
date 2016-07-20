import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { AbstractProcess, AbstractPhysicalProcess, AggregatingProcess } from '../../model/sml';


@Injectable()
export class ConnectDescriptionService {

  description: AbstractProcess;
  childDescriptions: Array<AbstractPhysicalProcess>;
  attachedTo: boolean;

  constructor(
    private http: Http,
    private router: Router
  ) { }

  public openAttachedToDescription(desc: AbstractPhysicalProcess) {
    this.attachedTo = true;
    this.childDescriptions = [];
    this.childDescriptions.push(desc);
    this.openView(desc);
  }

  public openConnectDescriptions(desc: AbstractProcess) {
    this.attachedTo = false;
    this.openView(desc);
  }

  private openView(desc: AbstractProcess) {
    this.router.navigate(['/connect']);
  }

  public connectDescriptions(childDesc: Array<AbstractPhysicalProcess>, parentDesc: AggregatingProcess) {
    debugger;
    //
  }

  /*
  fetchDescriptionIDs(sosUrl: string): Observable<Array<string>> {
    let body = JSON.stringify({
      'request': 'GetCapabilities',
      'service': 'SOS',
      'sections': [
        'OperationsMetadata'
      ]
    });
    return this.http.post(sosUrl, body, { headers: this.createHeader() })
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response): Array<string> {
    let json = res.json();
    return json.operationMetadata.operations.DescribeSensor.parameters.procedure.allowedValues;
  }

  private handleError(res: Response) {
    if (res.status === 0) return Observable.throw('Could not reach the service!');
  }

  fetchDescription(sosUrl: string, descId: string): Observable<any> {
    let body = JSON.stringify({
      'request': 'DescribeSensor',
      'service': 'SOS',
      'version': '2.0.0',
      'procedure': descId,
      'procedureDescriptionFormat': 'http://www.opengis.net/sensorml/2.0'
    });
    return this.http.post(sosUrl, body, { headers: this.createHeader() })
      .map((res) => {
        let json = res.json();
        return json.procedureDescription.description || json.procedureDescription;
      });
  }

  private createHeader(): Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }
  */

}
