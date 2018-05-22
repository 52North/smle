import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AbstractProcess } from '../../model/sml';
import { SensorMLXmlService } from '../../services/SensorMLXmlService';
import { ingestionConfig } from '../ingestion.config.service';

export interface Stream {
  name: string;
  status: string;
  definition: string;
}

export enum DeployStatus {
  deployed = 'deployed',
  undeployed = 'undeployed'
}

interface StreamsResponse {
  streams: Stream[];
}

const STREAMS_ENDPOINT = 'streams/';

@Injectable()
export class CncService {

  private basicAuthToken: string;

  constructor(
    private http: HttpClient
  ) { }

  public tryBasicAuth(username: string, password: string): Observable<boolean> {
    const token = 'Basic ' + btoa(username + ':' + password);
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get(ingestionConfig.cncUrl, { headers }).pipe(
      map(res => {
        this.basicAuthToken = token;
        return true;
      }));
  }

  public clearToken(): void {
    this.basicAuthToken = '';
  }

  public getStreams(): Observable<Stream[]> {
    return this.http.get<StreamsResponse>(ingestionConfig.cncUrl + STREAMS_ENDPOINT, { headers: this.createBasicAuthHeader() }).pipe(
      map(res => res.streams));
  }

  public getStreamDescription(id: string): Observable<AbstractProcess> {
    const headers = this.createBasicAuthHeader().append('Accept', 'application/xml');
    return this.http.get(ingestionConfig.cncUrl + STREAMS_ENDPOINT + id, { headers, responseType: 'text' }).pipe(
      map(res => new SensorMLXmlService().deserialize(res)));
  }

  public publishDescription(desc: AbstractProcess): Observable<Stream> {
    const body = new SensorMLXmlService().serialize(desc, true);
    const headers = this.createBasicAuthHeader().append('Content-Type', 'application/xml');
    return this.http.post<Stream>(ingestionConfig.cncUrl + STREAMS_ENDPOINT, body, { headers });
  }

  public deleteDescription(id: string): Observable<void> {
    const headers = this.createBasicAuthHeader();
    return this.http.delete<void>(ingestionConfig.cncUrl + STREAMS_ENDPOINT + id, { headers });
  }

  public updateDescription(id: string, desc: AbstractProcess): Observable<Stream> {
    const body = new SensorMLXmlService().serialize(desc, true);
    const headers = this.createBasicAuthHeader().append('Content-Type', 'application/xml');
    return this.http.put<Stream>(ingestionConfig.cncUrl + STREAMS_ENDPOINT + id, body, { headers });
  }

  public setDeployStatusDescription(id: string, deployStatus: DeployStatus): Observable<void> {
    const headers = this.createBasicAuthHeader();
    return this.http.put<void>(ingestionConfig.cncUrl + STREAMS_ENDPOINT + id, { status: deployStatus }, { headers });
  }

  private createBasicAuthHeader(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': this.basicAuthToken });
  }

}
