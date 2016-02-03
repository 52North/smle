
import {AbstractPhysicalProcess,AbstractProcess,Connection} from '../sensorML';

export class PhysicalSystem extends AbstractPhysicalProcess {
    components: AbstractProcess[];
    connections: Connection[];
    constructor() {
        super();
    }
}