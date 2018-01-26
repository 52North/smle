import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ResponsibleParty } from '../../../../model/iso/gmd/ResponsibleParty';
import { Contact } from '../../../../model/iso/gmd/Contact';
import { ContactComponent } from './ContactComponent';
import { EditorComponent, ChildMetadata } from '../../base';

@Component({
    selector: 'iso-responsible-party',
    templateUrl: './ResponsiblePartyComponent.html',
    styleUrls: ['../../styles/editor-component.scss']
})
export class ResponsiblePartyComponent extends EditorComponent<ResponsibleParty> {
    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): ResponsibleParty {
        return new ResponsibleParty();
    }

    onAddContact() {
        this.model.contactInfo = new Contact();
    }

    onRemoveContact() {
        this.closeChildWithModel(this.model.contactInfo);
        this.model.contactInfo = null;
    }

    protected openNewContactInfoItem(item: Contact) {
        const metadata = new ChildMetadata(ContactComponent, item, this.config.getConfigFor('contactInfo'));
        this.openNewChild(metadata);
    }
}
