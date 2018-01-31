import { Component } from '@angular/core';

import { ResponsibleParty } from '../../../model/iso';
import { ContactList } from '../../../model/sml';
import { ChildMetadata } from '../base/ChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { ResponsiblePartyComponent } from '../iso/gmd/ResponsiblePartyComponent';

@Component({
    selector: 'sml-contact-list',
    templateUrl: './ContactListComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class ContactListComponent extends TypedModelComponent<ContactList> {

    protected createModel() {
        return new ContactList();
    }

    protected onRemove(index: number): void {
        this.model.contacts.splice(index, 1);
    }

    protected onAdd() {
        this.model.contacts.push(new ResponsibleParty());
    }

    protected openNewResponsiblePartyItem(item: ResponsibleParty) {
        const metadata = new ChildMetadata(
            ResponsiblePartyComponent,
            item,
            this.config.getConfigFor('sml:contact').getConfigFor('gmd:CI_ResponsibleParty')
        );
        this.openNewChild(metadata);
    }
}
