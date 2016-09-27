import { AbstractSWE } from '../swe/AbstractSWE';
import { DisplayName } from '../../decorators/DisplayName';

export class Term extends AbstractSWE {
    @DisplayName('Label')
    label: string;

    @DisplayName('Code space')
    codeSpace: string;

    @DisplayName('Definition')
    definition: string;

    @DisplayName('Value')
    value: string;

    toString() {
        return this.label && this.label.length ? this.label : 'Term';
    }
}
