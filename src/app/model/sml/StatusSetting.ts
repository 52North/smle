import {AbstractSetting} from './AbstractSetting';
import {DisplayName} from '../../decorators/DisplayName';

export class StatusSetting extends AbstractSetting {
    @DisplayName('Value')
    value: Status;

    toString() {
        return this.value && this.value.length ? this.value : 'Status setting';
    }
}

type Status = 'enabled' | 'disabled';
