import {AbstractDataComponent} from './AbstractDataComponent';

export class SweField {
    name: string;
    component: AbstractDataComponent;

    toString() {
        return this.name || 'SWE field';
    }
}
