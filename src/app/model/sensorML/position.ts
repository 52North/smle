

import {AbstractProcess} from '../sensorML';

export type PositionUnion = string|GM_Point|Vector|DataRecord|DataArray|AbstractProcess;

export class GM_Point {
    constructor() {}
}

export class Vector {
    constructor() {}   
}
export class DataArray {
    constructor() {}
}
export class DataRecord {
    constructor() {}
}


