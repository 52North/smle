import {AbstractSWEIdentifiable} from '../swe/AbstractSWEIdentifiable';
import {DisplayName} from '../../decorators/DisplayName';

/**
 * A general temporal frame such as a mission start time or timer start time.
 */
export class TemporalFrame extends AbstractSWEIdentifiable {
    /**
     * The origin should just describe context of the start of time (e.g. start of
     * local timer).
     */
    @DisplayName('Origin')
    origin: string;

    toString() {
        return super.toString('Temporal frame');
    }
}
