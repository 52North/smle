import { AbstractProcess } from './AbstractProcess';
import { AggregatingProcess } from './AggregatingProcess';
import { ComponentList } from './ComponentList';
import { ConnectionList } from './ConnectionList';
import { DisplayName } from '../../common/decorators/DisplayName';

/**
 * A process that consist of a collection of linked component processes
 * resulting in a specified output.
 */
export class AggregateProcess extends AbstractProcess implements AggregatingProcess {
    @DisplayName('Components')
    components: ComponentList = new ComponentList();

    @DisplayName('Connections')
    connections: ConnectionList = new ConnectionList();

    public static get SCHEMA(): string {
        return 'http://schemas.opengis.net/sensorML/2.0/aggregate_process.xsd';
    }

    public static get NAME(): string {
        return 'AggregateProcess';
    }

    toString() {
        return 'Aggregate process';
    }
}
