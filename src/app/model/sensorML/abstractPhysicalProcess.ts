

import {
    SpatialFrame,
    TemporalFrame,
    PositionUnion,
    Time,
    AbstractProcess
} from '../sensorML';

export abstract class AbstractPhysicalProcess extends AbstractProcess {
    attachedTo: AbstractPhysicalProcess;
    localReferenceFrame: SpatialFrame[];
    localTimeFrame: TemporalFrame[];
    position: PositionUnion[];
    timePosition: Time[];
    constructor() {
        super();
    }
}