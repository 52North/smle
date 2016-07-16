import {AbstractSetting} from './AbstractSetting';

export class ModeSetting extends AbstractSetting {
    value: string;

    toString() {
        return this.value && this.value.length ? this.value : 'Mode setting';
    }
}
