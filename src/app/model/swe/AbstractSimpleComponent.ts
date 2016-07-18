import {AbstractDataComponent} from './AbstractDataComponent';
import {SweQuality} from './SweQuality';
import {AbstractAllowedValues} from './AbstractAllowedValues';
import {SweNilValue} from './SweNilValue';
import {DisplayName} from '../../decorators/DisplayName';

export abstract class AbstractSimpleComponent extends AbstractDataComponent {
    /**
     * Frame of reference (usually temporal or spatial) with respect to which the
     * value of the component is expressed. A reference frame anchors a value to
     * a real world datum.
     */
    @DisplayName('Reference frame')
    referenceFrame: string;
    /**
     * Specifies the reference axis (refer to gml:axisID). The reference frame
     * URI should also be specified unless it is inherited from parent Vector
     */
    @DisplayName('Axis id')
    axisId: string;

    @DisplayName('Quality')
    quality: SweQuality[] = [];

    @DisplayName('Value')
    value: any;

    @DisplayName('Constraint')
    constraint: AbstractAllowedValues;

    @DisplayName('Nil values')
    nilValues: SweNilValue[] = [];

    toString(fallbackLabel = 'Abstract simple component') {
        return super.toString(fallbackLabel);
    }
}
