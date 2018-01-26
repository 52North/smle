import { AbstractMetadataList } from './AbstractMetadataList';
import { Term } from './Term';
import { DisplayName } from '../../common/decorators/DisplayName';

export class IdentifierList extends AbstractMetadataList {
    @DisplayName('Identifiers')
    identifiers: Term[] = [];

    toString() {
        return 'Identifier list';
    }

    getLabel() {
        return this.toString();
    }

    getValue() {
        if (this.identifiers.length > 0) {
            return this.identifiers.join(', ');
        }
    }
}
