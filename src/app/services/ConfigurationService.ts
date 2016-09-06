import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ConfigurationService {

  public config: Configuration;

  constructor(private http: Http) {
    this.config = new Configuration();
    this.config.sosUrl = 'http://localhost:8081/52n-sos-webapp/service';
    this.config.proxyUrl = 'http://localhost:8081/52n-sos-webapp/service';
    //this.fetchConfiguration();
  }

  public fetchConfiguration(): Promise<void> {
    return this.http.get('./config.json').toPromise().then((response: Response) => {
      var data = response.json();
      this.config = data;
    }).catch(() => {
      console.error('Configuration for smle wasnt found.');
    });
  }
}

export class Configuration {
  public sosUrl: string;
  public proxyUrl: string;
  public authUrl: string;
  public logOutUrl: string;
  public userInfoUrl: string;
}
