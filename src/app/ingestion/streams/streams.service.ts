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

@Injectable()
export class StreamService {

  constructor(
    private http: HttpClient
  ) { }

  public getStreams(): Observable<Stream[]> {
    return this.http.get<StreamsResponse>(ingestionConfig.cncUrl, {})
      .map(res => res.streams);
  }

  public getStreamDescription(stream: Stream): Observable<AbstractProcess> {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/xml'
    });
    return this.http.get(ingestionConfig.cncUrl + stream.name, { headers, responseType: 'text' })
      .map(res => new SensorMLXmlService().deserialize(res));
  }

}
