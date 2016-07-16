import {AbstractSWEIdentifiable} from '../swe/AbstractSWEIdentifiable';

export abstract class AbstractMetadataList extends AbstractSWEIdentifiable {
    definition: string;

    toString() {
        return super.toString('Abstract metadata list');
    }
}
