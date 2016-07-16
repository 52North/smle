import {AbstractSetting} from './AbstractSetting';

export class StatusSetting extends AbstractSetting {
    value: Status;

    toString() {
        return this.value && this.value.length ? this.value : 'Status setting';
    }
}

type Status = 'enabled' | 'disabled';
