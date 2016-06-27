import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {ContactList} from '../../../model/sml';
import {ResponsibleParty} from '../../../model/iso';
import {ResponsiblePartyComponent} from '../iso/gmd/ResponsiblePartyComponent';
import {CardComponent} from '../basic/CardComponent';
import {ListComponent} from '../basic/ListComponent';
import {EditorComponent} from '../base/EditorComponent';

@Component({
    selector: 'sml-contact-list',
    template: require('./ContactListComponent.html'),
    styles: [require('../styles/editor-component.scss')],
    directives: [CardComponent, ResponsiblePartyComponent, ListComponent]
})
export class ContactListComponent extends EditorComponent<ContactList> {
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
        this.openNewChild(ResponsiblePartyComponent, model, this.config.getConfigFor('contacts'));
    }
}
