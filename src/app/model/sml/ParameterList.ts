import { AbstractSWE } from '../swe/AbstractSWE';
import { Parameter } from './Parameter';
import { DisplayName } from '../../decorators/DisplayName';

export class ParameterList extends AbstractSWE {
    @DisplayName('Parameters')
    parameters: Parameter[] = [];

    toString() {
        return 'Parameter list';
    }
}
