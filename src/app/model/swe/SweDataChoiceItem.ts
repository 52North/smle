import {AbstractDataComponent} from './AbstractDataComponent';

export class SweDataChoiceItem {
    name: string;
    item: AbstractDataComponent;

    toString() {
        return this.name || 'SWE data choice item';
    }
}
