import { ProcessMethodProcess } from './ProcessMethodProcess';
import { ProcessMethod } from './ProcessMethod';
import { AbstractProcess } from './AbstractProcess';
import { DisplayName } from '../../common/decorators/DisplayName';

export class SimpleProcess extends AbstractProcess implements ProcessMethodProcess {
    @DisplayName('Method')
    method: ProcessMethod;

    public static get SCHEMA(): string {
        return 'http://schemas.opengis.net/sensorML/2.0/simple_process.xsd';
    }

    public static get NAME(): string {
        return 'SimpleProcess';
    }

    toString() {
        return 'Simple process';
    }
}
