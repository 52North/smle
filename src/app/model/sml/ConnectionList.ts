import { AbstractSWE } from '../swe/AbstractSWE';
import { Connection } from './Connection';
import { DisplayName } from '../../common/decorators/DisplayName';

export class ConnectionList extends AbstractSWE {
    @DisplayName('Connections')
    connections: Connection[] = [];

    toString() {
        return 'Connection list';
    }
}
