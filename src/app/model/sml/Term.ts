import {AbstractSWE} from '../swe/AbstractSWE';

export class Term extends AbstractSWE {
    label: string;
    codeSpace: string;
    definition: string;
    value: string;

    toString() {
        return this.label && this.label.length ? this.label : 'Term';
    }
}
