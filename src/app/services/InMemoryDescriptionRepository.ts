import {AbstractProcess} from '../model/sml';
import {CodeType} from '../model/gml';
import {Injectable} from '@angular/core';
import {DescriptionRepository} from './DescriptionRepository';
import {SampleDataLoader} from '../services/SampleDataLoader';

@Injectable()
export class InMemoryDescriptionRepository extends DescriptionRepository {
    private _descriptions: { [key: string]: AbstractProcess } = {};

    private _samples: string[] = [
        './examples/physicalComponentInstance.xml',
        './examples/physicalComponentType.xml',
        './examples/physicalSystemInstance.xml',
        './examples/physicalSystemType.xml',
        './examples/lisaInstance.xml'
    ];

    constructor(private dataloader: SampleDataLoader) {
        super();
    }

    getDescriptions(): Promise<Array<string>> {
        let list = this._samples;
        list = list.concat(Object.keys(this._descriptions));
        return Promise.resolve(list);
    }

    getDescription(id: string): Promise<AbstractProcess> {
        if (id.indexOf('/examples') > -1) {
            return this.dataloader.loadSample(id);
        }
        if (!this._descriptions[id]) {
            return Promise.reject<AbstractProcess>(new Error('does not exist'));
        }
        return Promise.resolve(this._descriptions[id]);
    }

    saveDescription(description: AbstractProcess): Promise<string> {
        let id = this._getId(description);
        if (this._descriptions[id]) {
            return Promise.reject<string>(new Error('already saved'));
        }
        this._descriptions[id] = description;
        return Promise.resolve(id);
    }

    updateDescription(description: AbstractProcess): Promise<void> {
        let id = this._getId(description);
        if (!this._descriptions[id]) {
            return Promise.reject(new Error('not yet saved'));
        }
        this._descriptions[id] = description;
        return Promise.resolve();
    }

    private _getId(description: AbstractProcess): string {
        if (description.identifier == null || description.identifier.value == null) {
            description.identifier = new CodeType(Date.now().toString());
        }
        return description.identifier.value;
    }
}
