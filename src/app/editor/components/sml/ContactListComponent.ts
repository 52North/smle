import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ContactList } from '../../../model/sml';
import { ResponsibleParty } from '../../../model/iso';
import { ResponsiblePartyComponent } from '../iso/gmd/ResponsiblePartyComponent';
import { EditorComponent } from '../base/EditorComponent';
import { ChildMetadata } from '../base/TypedModelComponent';

@Component({
    selector: 'sml-contact-list',
    template: require('./ContactListComponent.html'),
    styles: [require('../styles/editor-component.scss')]
})
export class ContactListComponent extends EditorComponent<ContactList> {
    constructor(
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef
    ) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel() {
        return new ContactList();
    }

    protected onRemove(index: number): void {
        this.closeChildWithModel(this.model.contacts[index]);
        this.model.contacts.splice(index, 1);
    }

    protected onAdd() {
        this.model.contacts.push(new ResponsibleParty());
    }

    protected openNewResponsiblePartyItem(item: ResponsibleParty) {
        let metadata = new ChildMetadata(
            ResponsiblePartyComponent,
            item,
            this.config.getConfigFor('sml:contact').getConfigFor('gmd:CI_ResponsibleParty')
        );
        this.openNewChild(metadata);
    }
}
