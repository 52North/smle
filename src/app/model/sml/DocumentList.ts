import { AbstractMetadataList } from './AbstractMetadataList';
import { OnlineResource } from '../iso/gmd/OnlineResource';
import { DisplayName } from '../../decorators/DisplayName';

export class DocumentList extends AbstractMetadataList {
    @DisplayName('Documents')
    documents: OnlineResource[] = [];

    toString() {
        return 'Document list';
    }
}
