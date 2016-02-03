
import {AbstractSetting,DescribedObject} from '../sensorML';
import { AbstractSWE } from '../swe';

export class Mode extends DescribedObject {
    configuration: AbstractSetting[];
    constructor() {
        super();
    }
}

export class AbstractMode extends AbstractSWE {
    constructor() {
        super();
    }
}