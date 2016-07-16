import {AbstractSetting} from './AbstractSetting';

export class ValueSetting extends AbstractSetting {
    value: boolean | number | string | Date;

    toString() {
        return this.value !== null && this.value !== undefined ? this.value.toString() : 'Value setting';
    }
}
