import { DisplayName } from '../../common/decorators/DisplayName';

export class SweNilValue {
    @DisplayName('Value')
    value: string;

    @DisplayName('Reason')
    reason: string;

    toString() {
        return 'SWE nil value';
    }
}
