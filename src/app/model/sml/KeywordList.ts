import { AbstractMetadataList } from './AbstractMetadataList';
import { DisplayName } from '../../decorators/DisplayName';

export class KeywordList extends AbstractMetadataList {
    /**
     * online dictionary or ontology which defines a collection of possible
     * keywords
     */
    @DisplayName('Code space')
    codeSpace: string;
    /**
     * a short word or phrase that will aid in discovery of this object
     */
    @DisplayName('Keywords')
    keywords: string[] = [];

    toString() {
        return 'Keyword list';
    }

    getLabel() {
        return this.toString();
    }

    getValue() {
        return this.keywords.join(', ');
    }
}
