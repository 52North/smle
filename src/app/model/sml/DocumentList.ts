import { AbstractMetadataList } from './AbstractMetadataList';
import { OnlineResource } from '../iso/gmd/OnlineResource';

export class DocumentList extends AbstractMetadataList {
  documents: OnlineResource[] = [];

  toString() {
    return 'Document list';
  }
}
