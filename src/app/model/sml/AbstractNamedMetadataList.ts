import { AbstractMetadataList } from './AbstractMetadataList';
import { DisplayName } from '../../common/decorators/DisplayName';

export abstract class AbstractNamedMetadataList extends AbstractMetadataList {
    @DisplayName('Name')
    name: string;

    toString(fallbackName = 'Abstract named metadata list') {
        if (this.name && this.name.length) {
            return this.name;
        }

        return fallbackName;
    }
}
