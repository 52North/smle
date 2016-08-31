import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ConfigurationService {

  private config: Configuration;

  constructor(private http: Http) {
  }

  private fetchConfiguration(): Promise<Configuration> {
    return this.http.get('./config.json').toPromise().then((response: Response) => {
      var data = response.json();
      this.config = data;
      return this.config;
    }).catch(() => {
      console.error('Configuration for smle wasnt found.');
    });
  }

  public getConfiguration(): Promise<Configuration> {
    if (this.config == null) {
      return this.fetchConfiguration();
    } else {
      return Promise.resolve(this.config);
    }
  }
}

export class Configuration {
  public sosUrl: string;
  public proxyUrl: string;
}
