import {
    AllowedTokens,
    AllowedTimes,
    AllowedValues,
    AbstractEncoding,
    EncodedValues
} from '../swe';

import {CodeWithAuthority} from '../gml';

export abstract class AbstractSetting {
    value: any;
    constructor() {
        
    }
}

export class ValueSetting extends AbstractSetting {
    value: boolean | number | string | Date;
    constructor() {
        super();
    }
}

export type Constraint = AllowedTokens | AllowedTimes | AllowedValues;

export class ArrayValueSetting extends AbstractSetting {
    encoding: AbstractEncoding;
    value: EncodedValues;
    constructor() {
        super();
    }
}

export class ConstraintSetting extends AbstractSetting {
    value: Constraint;
    constructor() {
        super();
    }
}

export class ModeSetting extends AbstractSetting {
    value: CodeWithAuthority;
    constructor() {
        super();
    }
}

export class StatusSetting extends AbstractSetting {
    value: Status;
    constructor() {
        super();
    }
}

export enum Status { enabled, disabled }

