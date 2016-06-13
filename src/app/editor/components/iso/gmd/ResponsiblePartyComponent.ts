import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {ResponsibleParty} from '../../../../model/iso/gmd/ResponsibleParty';
import {Contact} from '../../../../model/iso/gmd/Contact';
import {TypedModelComponent} from '../../base/TypedModelComponent';
import {CardComponent} from '../../basic/CardComponent';
import {ContactComponent} from './ContactComponent';

@Component({
    selector: 'iso-responsible-party',
    template: require('./ResponsiblePartyComponent.html'),
    host: {'[class.has-child]': 'hasChild'},
    styles: [require('../../styles/editor-component.scss')],
    directives: [CardComponent, ContactComponent]
})
export class ResponsiblePartyComponent extends TypedModelComponent<ResponsibleParty> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
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

    private openNewContactInfoItem(model: Contact) {
        this.openNewChild(ContactComponent, model, this.config.getConfigFor('contactInfo'));
    }
}
