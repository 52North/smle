import { AbstractSWE } from './AbstractSWE';
import { DisplayName } from '../../common/decorators/DisplayName';

export class AbstractAllowedValues extends AbstractSWE {
    @DisplayName('Values')
    values: any[];

    toString() {
        return 'Abstract allowed values';
    }
}
