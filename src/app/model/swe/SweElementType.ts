import {AbstractDataComponent} from './AbstractDataComponent';

export class SweElementType {
    name: string;
    type: AbstractDataComponent;

    toString() {
        return this.name || 'SWE element type';
    }
}
