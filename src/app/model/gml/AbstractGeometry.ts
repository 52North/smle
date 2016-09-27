import { AbstractGML } from './AbstractGML';
import { Referenced } from './Referenced';
import { DisplayName } from '../../decorators/DisplayName';

export class AbstractGeometry extends AbstractGML implements Referenced {
    @DisplayName('SRS name')
    srsName: string;

    @DisplayName('SRS dimension')
    srsDimension: number;

    @DisplayName('Axis labels')
    axisLabels: string[];

    @DisplayName('Unit of measure labels')
    uomLabels: string[];

    toString() {
        return 'Abstract geometry';
    }
}
