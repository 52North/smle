import { AbstractSetting } from './AbstractSetting';
import { DisplayName } from '../../common/decorators/DisplayName';

export class ModeSetting extends AbstractSetting {
    @DisplayName('Value')
    value: string;

    toString() {
        return this.value && this.value.length ? this.value : 'Mode setting';
    }
}
