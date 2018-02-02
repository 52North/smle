import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface Configuration {
    showIdentifierVocabularySelection: boolean;
    showClassifierVocabularySelection: boolean;
    showCharacteristicVocabularySelection: boolean;
    showHistoryVocabularySelection: boolean;
    showCapabilityVocabularySelection: boolean;
    showContactVocabularySelection: boolean;
}

@Injectable()
export class ConfigurationService {

    private config: Configuration;

    constructor(
        private http: HttpClient
    ) { }

    public getConfig(): Observable<Configuration> {
        if (this.config) {
            return Observable.of(this.config);
        } else {
            return this.http.get<Configuration>('./assets/configuration.json');
        }
    }
}

