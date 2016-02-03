
import { AbstractProcess, Connection } from '../sensorML';

export class AggregateProcess extends AbstractProcess {
    components: AbstractProcess[];
    connections: Connection[];
    constructor() {
        super();
    }
}