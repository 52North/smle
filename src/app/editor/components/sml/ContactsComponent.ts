import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {AbstractArrayComponent} from '../base/AbstractArrayComponent';
import {ContactList} from '../../../model/sml';
import {ContactListComponent} from './ContactListComponent';
import {CardComponent} from '../basic/CardComponent';

@Component({
    selector: 'sml-contacts',
    template: require('./ContactsComponent.html'),
    host: {'[class.has-child]': 'hasChild'},
    styles: [require('../styles/editor-component.scss')],
    directives: [CardComponent, ContactListComponent]
})
export class ContactsComponent extends AbstractArrayComponent<ContactList> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel() {
        return new ContactList()[0];
    }

    protected createEntry() {
        return new ContactList();
    }

    private openNewContactListItem(model: ContactList) {
        this.openNewChild(ContactListComponent, model);
    }
}
