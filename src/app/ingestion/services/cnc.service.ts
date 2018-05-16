import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AbstractProcess } from '../../model/sml';
import { SensorMLXmlService } from '../../services/SensorMLXmlService';
import { ingestionConfig } from '../ingestion.config.service';

export interface Stream {
  name: string;
  status: string;
  definition: string;
}

interface StreamsResponse {
  streams: Stream[];
}

const USERNAME = 'cnc-user';
const PASSWORD = 'cnc-non-secure-basic-auth-password';
const STREAMS_ENDPOINT = 'streams/';

@Injectable()
export class CncService {

  constructor(
    private http: HttpClient
  ) { }

  public getStreams(): Observable<Stream[]> {
    return this.http.get<StreamsResponse>(ingestionConfig.cncUrl + STREAMS_ENDPOINT, { headers: this.createBasicAuthHeader() })
      .map(res => res.streams);
  }

  public getStreamDescription(stream: Stream): Observable<AbstractProcess> {
    const headers = this.createBasicAuthHeader().append('Accept', 'application/xml');
    return this.http.get(ingestionConfig.cncUrl + STREAMS_ENDPOINT + stream.name, { headers, responseType: 'text' })
      .map(res => new SensorMLXmlService().deserialize(res));
  }

  public publishDescription(desc: AbstractProcess): Observable<Stream> {
    const body = new SensorMLXmlService().serialize(desc, true);
    const headers = this.createBasicAuthHeader().append('Content-Type', 'application/xml');
    return this.http.post<Stream>(ingestionConfig.cncUrl + STREAMS_ENDPOINT, body, { headers });
  }

  private createBasicAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa(USERNAME + ':' + PASSWORD)
    });
  }

}
