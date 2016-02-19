import { AbstractSetting } from './AbstractSetting';
import { AllowedTokens } from '../swe/AllowedTokens';
import { AllowedTimes } from '../swe/AllowedTimes';
import { AllowedValues } from '../swe/AllowedValues';

export class ConstraintSetting extends AbstractSetting {
  value: AllowedTokens | AllowedTimes | AllowedValues;
}
