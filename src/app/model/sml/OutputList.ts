import {AbstractSWE} from '../swe/AbstractSWE';
import {Output} from './Output';
import {DisplayName} from '../../decorators/DisplayName';

export class OutputList extends AbstractSWE {
    @DisplayName('Outputs')
    outputs: Output[] = [];

    toString() {
        return 'Output list';
    }
}
