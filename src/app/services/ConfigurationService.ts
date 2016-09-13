import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ConfigurationService {

  public config: Configuration;

  constructor(
    @Inject('smle.config') config: any
  ) {
    this.config = config as Configuration;
  }
}

export class Configuration {
  public sosUrl: string;
  public proxyUrl: string;
  public authUrl: string;
  public logOutUrl: string;
  public userInfoUrl: string;
  public templatesUrl: string;
}
