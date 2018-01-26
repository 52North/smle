import { AbstractSetting } from './AbstractSetting';
import { AllowedTokens } from '../swe/AllowedTokens';
import { AllowedTimes } from '../swe/AllowedTimes';
import { AllowedValues } from '../swe/AllowedValues';
import { DisplayName } from '../../common/decorators/DisplayName';

export class ConstraintSetting extends AbstractSetting {
    @DisplayName('Value')
    value: AllowedTokens | AllowedTimes | AllowedValues;

    toString() {
        return 'Constraint setting';
    }
}
