import {AbstractMetadataList} from './AbstractMetadataList';

export abstract class AbstractNamedMetadataList extends AbstractMetadataList {
    name: string;

    toString(fallbackName = 'Abstract named metadata list') {
        if (this.name && this.name.length) {
            return this.name;
        }

        return fallbackName;
    }
}
