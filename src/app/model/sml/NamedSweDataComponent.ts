import {AbstractDataComponent} from '../swe';

export class NamedSweDataComponent {
    name: string;
    component: AbstractDataComponent;

    toString() {
        return this.name || 'Named SWE data component';
    }
}
