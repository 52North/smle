
import {AbstractSWEIdentifiable} from '../swe';

export class SpatialFrame extends AbstractSWEIdentifiable {
    origin: string;
    axis: string[];
    constructor() {
        super();
    }
}