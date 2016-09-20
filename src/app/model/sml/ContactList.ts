import {AbstractMetadataList} from './AbstractMetadataList';
import {ResponsibleParty} from '../iso/gmd/ResponsibleParty';
import {DisplayName} from '../../decorators/DisplayName';

export class ContactList extends AbstractMetadataList {
    @DisplayName('Contacts')
    contacts: ResponsibleParty[] = [];

    toString() {
        return 'Contact list';
    }

    getLabel() {
        return this.toString();
    }

    getValue() {
        if (this.contacts.length > 0) {
            return this.contacts.join(', ');
        }
    }
}
