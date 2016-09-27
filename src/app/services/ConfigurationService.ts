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
    public test: string;
}
