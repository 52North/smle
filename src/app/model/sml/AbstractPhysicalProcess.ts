import {AbstractProcess} from './AbstractProcess';
import {SpatialFrame} from './SpatialFrame';
import {TemporalFrame} from './TemporalFrame';
import {SweTime} from '../swe/SweTime';
import {Position} from './Position';
import {DisplayName} from '../../decorators/DisplayName';

/**
 * A physical process where the spatial and temporal state of the process is
 * relevant.
 */
export abstract class AbstractPhysicalProcess extends AbstractProcess {
    /**
     * References the physical component or system (e.g. platform) to which to
     * which this component or system is attached.
     */
    @DisplayName('Attached to')
    attachedTo: string;
    /**
     * A spatial reference frame of the physical component itself; this reference
     * frame is absolute and defines the relationship of the reference frame to
     * the physical body of the component; position of the component relates this
     * reference frame to some external reference frame. Note that units are
     * specified in the position so they are not specified as part of the
     * SpatialFrame.
     */
    @DisplayName('Local reference frame')
    localReferenceFrame: SpatialFrame[] = [];
    /**
     * Supports local time reference frames such as "time past mission start".
     * Note that units are handled in timePosition so they are not specified in
     * the TemporalFrame.
     */
    @DisplayName('Local time frame')
    localTimeFrame: TemporalFrame[] = [];
    /**
     * Provides positional information relating the component's spatial reference
     * frame to an external spatial reference frame. Positional information can be
     * given by location, by full body state, by a time-tagged trajectory, or by a
     * measuring or computational process.
     */
    @DisplayName('Position')
    position: Position[] = [];
    /**
     * Provides Time positions typically reference a local time frame to an
     * external time frame. For example, a timer-start-time might be given
     * relative to an "absolute" GPS time.
     */
    @DisplayName('Time position')
    timePosition: SweTime[] = [];

    toString() {
        return 'Abstract physical process';
    }
}
