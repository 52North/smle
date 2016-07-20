import {AbstractMetadataList} from './AbstractMetadataList';
import {Term} from './Term';
import {DisplayName} from '../../decorators/DisplayName';

export class IdentifierList extends AbstractMetadataList {
    @DisplayName('Identifiers')
    identifiers: Term[] = [];

    toString() {
        return 'Identifier list';
    }
}
