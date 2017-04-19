import { AbstractSWE } from '../swe/AbstractSWE';
import { DisplayName } from '../../common/decorators/DisplayName';

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
        if (this.label && this.value) {
            return this.label + ': ' + this.value;
        } else if (this.label) {
            return this.label;
        } else {
            return 'Term';
        }
    }
}
