import {ProcessMethod} from './processMethod';
import {AbstractPhysicalProcess} from './abstractPhysicalProcess';

export class PhysicalComponent extends AbstractPhysicalProcess {
    method: ProcessMethod;
    constructor() {
        super();
    }
}