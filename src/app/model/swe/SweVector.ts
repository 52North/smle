import { AbstractDataComponent } from './AbstractDataComponent';
import { SweCoordinate } from './SweCoordinate';
import { DisplayName } from '../../common/decorators/DisplayName';

/**
 * Implementation of a mathematical vector composed of a list of scalar
 * coordinates expressed in the mandatory reference frame.
 */
export class SweVector extends AbstractDataComponent {
    /**
     * Definition of the coordinate provided as a data component with a numerical
     * representation
     */
    @DisplayName('Coordinates')
    coordinates: SweCoordinate[] = [];
    /**
     * Frame of reference (usually spatial) with respect to which the coordinates
     * of this vector are expressed. A reference frame anchors a vector value to
     * a real world datum.
     */
    @DisplayName('Reference frame')
    referenceFrame: string;
    /**
     * Frame of reference whose origin is located by the coordinates of this
     * vector
     */
    @DisplayName('Local frame')
    localFrame: string;

    toString() {
        return super.toString('SWE vector');
    }

    getValue() {
        return toString();
    }
}
