import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {ResponsibleParty} from '../../../../model/iso/gmd/ResponsibleParty';
import {Contact} from '../../../../model/iso/gmd/Contact';
import {AbstractComponent} from '../../base/AbstractComponent';
import {CardHeaderComponent} from '../../basic/CardHeaderComponent';
import {ContactComponent} from './ContactComponent';

@Component({
    selector: 'iso-responsible-party',
    template: require('./ResponsiblePartyComponent.html'),
    host: {'[class.has-child]': 'hasChild'},
    styles: [require('../../styles/editor-component.scss')],
    directives: [CardHeaderComponent, ContactComponent]
})
export class ResponsiblePartyComponent extends AbstractComponent<ResponsibleParty> {
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
        this.openNewChild(ContactComponent, model);
    }
}
