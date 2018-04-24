import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AbstractProcess } from '../../model/sml';
import { SensorMLXmlService } from '../../services/SensorMLXmlService';

export interface Stream {
  name: string;
  status: string;
  definition: string;
}

interface StreamsResponse {
  streams: Stream[];
}

const CNC_URL = 'http://oceans.dev.52north.org/cnc/api/streams/';

@Injectable()
export class StreamService {

  constructor(
    private http: HttpClient
  ) { }

  public getStreams(): Observable<Stream[]> {
    return this.http.get<StreamsResponse>(CNC_URL, {})
      .map(res => res.streams);
  }

  public getStreamDescription(stream: Stream): Observable<AbstractProcess> {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/xml'
    });
    return this.http.get(CNC_URL + stream.name, { headers, responseType: 'text' })
      .map(res => new SensorMLXmlService().deserialize(res));
  }

}
