import { AbstractSWEIdentifiable } from '../swe/AbstractSWEIdentifiable';
import { DisplayName } from '../../common/decorators/DisplayName';

export abstract class AbstractMetadataList extends AbstractSWEIdentifiable {
    @DisplayName('Definition')
    definition: string;

    toString() {
        return super.toString('Abstract metadata list');
    }
}
