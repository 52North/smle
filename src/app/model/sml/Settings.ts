import {AbstractSWE} from '../swe/AbstractSWE';
import {ValueSetting} from './ValueSetting';
import {ArrayValueSetting} from './ArrayValueSetting';
import {ConstraintSetting} from './ConstraintSetting';
import {ModeSetting} from './ModeSetting';
import {StatusSetting} from './StatusSetting';
import {DisplayName} from '../../decorators/DisplayName';

export class Settings extends AbstractSWE {
    @DisplayName('Set value')
    setValue: ValueSetting[] = [];

    @DisplayName('Set array value')
    setArrayValue: ArrayValueSetting[] = [];

    @DisplayName('Set constraint')
    setConstraint: ConstraintSetting[] = [];

    @DisplayName('Set mode')
    setMode: ModeSetting[] = [];

    @DisplayName('Set status')
    setStatus: StatusSetting[] = [];

    toString() {
        return 'Settings';
    }
}
