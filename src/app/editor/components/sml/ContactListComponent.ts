import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {AbstractComponent} from '../base/AbstractComponent';
import {ContactList} from '../../../model/sml';
import {ResponsibleParty} from '../../../model/iso';
import {ResponsiblePartyComponent} from '../iso/gmd/ResponsiblePartyComponent';
import {CardComponent} from '../basic/CardComponent';

@Component({
    selector: 'sml-contact-list',
    template: require('./ContactListComponent.html'),
    host: {'[class.has-child]': 'hasChild'},
    styles: [require('../styles/editor-component.scss')],
    directives: [CardComponent, ResponsiblePartyComponent]
})
export class ContactListComponent extends AbstractComponent<ContactList> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel() {
        return new ContactList();
    }

    public onRemove(index: number): void {
        this.closeChildWithModel(this.model.contacts[index]);
        this.model.contacts.splice(index, 1);
    }

    public onAdd() {
        this.model.contacts.push(new ResponsibleParty());
    }

    private openNewResponsiblePartyItem(model: ResponsibleParty) {
        this.openNewChild(ResponsiblePartyComponent, model);
    }
}
