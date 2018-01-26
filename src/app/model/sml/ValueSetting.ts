import { AbstractSetting } from './AbstractSetting';
import { DisplayName } from '../../common/decorators/DisplayName';

export class ValueSetting extends AbstractSetting {
    @DisplayName('Value')
    value: boolean | number | string | Date;

    toString() {
        return this.value !== null && this.value !== undefined ? this.value.toString() : 'Value setting';
    }
}
