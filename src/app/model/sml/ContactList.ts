import { AbstractMetadataList } from './AbstractMetadataList';
import { ResponsibleParty } from '../iso/gmd/ResponsibleParty';


export class ContactList extends AbstractMetadataList {
  contacts: ResponsibleParty[] = [];

  toString() {
    return 'Contact list';
  }
}
