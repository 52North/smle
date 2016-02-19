import { AbstractSWE } from '../swe/AbstractSWE';
import { ValueSetting } from './ValueSetting';
import { ArrayValueSetting } from './ArrayValueSetting';
import { ConstraintSetting } from './ConstraintSetting';
import { ModeSetting } from './ModeSetting';
import { StatusSetting } from './StatusSetting';

export class Settings extends AbstractSWE {
  setValue: ValueSetting[] = [];
  setArrayValue: ArrayValueSetting[] = [];
  setConstraint: ConstraintSetting[] = [];
  setMode: ModeSetting[] = [];
  setStatus: StatusSetting[] = [];
}
