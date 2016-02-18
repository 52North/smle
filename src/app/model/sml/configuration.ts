
import { AbstractSWE, SweEncoding, AbstractDataComponent,
  AllowedTimes, AllowedTokens, AllowedValues, EncodedValues } from '../swe';
import { CodeWithAuthority } from '../gml';
import { DescribedObject } from './core';

export abstract class AbstractSetting {
  value: any;
  ref: string;
}

export class ValueSetting extends AbstractSetting {
  value: boolean | number | string | Date;
}

export class ArrayValueSetting extends AbstractSetting {
  encoding: SweEncoding;
  value: EncodedValues;
}

export class ConstraintSetting extends AbstractSetting {
  value: AllowedTokens | AllowedTimes | AllowedValues;
}

export class ModeSetting extends AbstractSetting {
  value: string;
}

export class StatusSetting extends AbstractSetting {
  value: Status;
}

export abstract class AbstractModes extends AbstractSWE { }

export class ModeChoice extends AbstractModes {
  modes: Mode[];
}

export class Mode extends DescribedObject {
  configuration: Settings = null;
}

export class Settings extends AbstractSWE {
  setValue: ValueSetting[] = [];
  setArrayValue: ArrayValueSetting[] = [];
  setConstraint: ConstraintSetting[] = [];
  setMode: ModeSetting[] = [];
  setStatus: StatusSetting[] = [];
}

export type Status = 'enabled' | 'disabled';
