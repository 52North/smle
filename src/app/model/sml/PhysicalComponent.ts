import {AbstractPhysicalProcess} from './AbstractPhysicalProcess';
import {ProcessMethod} from './ProcessMethod';
import {DisplayName} from '../../decorators/DisplayName';

/**
 * A PhysicalComponent is a physical process that will not be further divided
 * into smaller components.
 */
export class PhysicalComponent extends AbstractPhysicalProcess {
    /**
     * he method describes (as an algorithm or text) how the process takes the
     * input and, based on the parameter values, generates output values.
     */
    @DisplayName('Method')
    method: ProcessMethod;

    public static get SCHEMA(): string {
        return 'http://schemas.opengis.net/sensorML/2.0/physical_component.xsd';
    }

    public static get NAME(): string {
        return 'PhysicalComponent';
    }

    toString() {
        return 'Physical component';
    }
}
