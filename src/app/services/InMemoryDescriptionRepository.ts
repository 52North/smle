import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError as observableThrowError } from 'rxjs';

import { CodeType } from '../model/gml';
import { AbstractProcess } from '../model/sml';
import { SampleDataLoader } from '../services/SampleDataLoader';
import { DescriptionRepository } from './DescriptionRepository';

@Injectable()
export class InMemoryDescriptionRepository extends DescriptionRepository {
    private _descriptions: { [key: string]: AbstractProcess } = {};

    private _samples: string[] = [
        'physicalComponentInstance',
        'physicalComponentType',
        'physicalSystemInstance',
        'physicalSystemType',
        'lisaInstance',
        'lisaInstance_standardConform',
        'physicalSystemInstance_standardConform'
    ];

    constructor(private dataloader: SampleDataLoader) {
        super();
    }

    getDescriptions(): Observable<Array<string>> {
        let list = this._samples;
        list = list.concat(Object.keys(this._descriptions));
        return observableOf(list);
    }

    getDescription(id: string): Observable<AbstractProcess> {
        if (this._samples.indexOf(id) > -1) {
            return this.dataloader.loadSample('./examples/' + id + '.xml');
        }
        if (!this._descriptions[id]) {
            return observableThrowError(new Error('does not exist'));
        }
        return observableOf(this._descriptions[id]);
    }

    saveDescription(description: AbstractProcess): Observable<void> {
        const id = this._getId(description);
        if (this._descriptions[id]) {
            return observableThrowError(new Error('already saved'));
        }
        this._descriptions[id] = description;
        return observableOf();
    }

    updateDescription(description: AbstractProcess): Observable<void> {
        const id = this._getId(description);
        if (!this._descriptions[id]) {
            return observableThrowError(new Error('not yet saved'));
        }
        this._descriptions[id] = description;
        return observableOf();
    }

    private _getId(description: AbstractProcess): string {
        if (description.identifier == null || description.identifier.value == null) {
            description.identifier = new CodeType(Date.now().toString());
        }
        return description.identifier.value;
    }
}
