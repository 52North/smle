
import { AbstractSWE, AbstractEncoding, AbstractDataComponent,
AllowedTimes, AllowedTokens, AllowedValues, EncodedValues } from '../swe';
import { CodeWithAuthority } from '../gml';
import { DescribedObject } from './core';

export abstract class AbstractSetting {
  value: any;
}

export class ValueSetting extends AbstractSetting {
  value: boolean | number | string | Date;
}

export class ArrayValueSetting extends AbstractSetting {
  encoding: AbstractEncoding;
  value: EncodedValues;
}

export class ConstraintSetting extends AbstractSetting {
  value: AllowedTokens | AllowedTimes | AllowedValues;
}

export class ModeSetting extends AbstractSetting {
  value: CodeWithAuthority;
}

export enum Status { enabled, disabled }

export class StatusSetting extends AbstractSetting {
  value: Status;
}


export class Mode extends DescribedObject {
  configuration: AbstractSetting[];
}

export class AbstractMode extends AbstractSWE {
}


