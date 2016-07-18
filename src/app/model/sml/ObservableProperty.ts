import {AbstractSWEIdentifiable} from '../swe/AbstractSWEIdentifiable';
import {DisplayName} from '../../decorators/DisplayName';

/**
 * A physical property that can be observed and possibly measured (e.g.
 * temperature, color, position). An ObservableProperty has unambiguous
 * definition, but does not have units of measure.
 */
export class ObservableProperty extends AbstractSWEIdentifiable {
    @DisplayName('Definition')
    definition: string;

    toString() {
        return super.toString('Observable property');
    }
}
