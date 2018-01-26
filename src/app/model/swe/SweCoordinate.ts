import { SweAnyNumerical } from './SweAnyNumerical';
import { DisplayName } from '../../common/decorators/DisplayName';

export class SweCoordinate {
    @DisplayName('Name')
    name: string;

    @DisplayName('Coordinate')
    coordinate: SweAnyNumerical;

    toString() {
        return this.name || 'SWE coordinate';
    }
}
