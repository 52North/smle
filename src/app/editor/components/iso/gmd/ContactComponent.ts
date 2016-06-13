import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {Contact} from '../../../../model/iso/gmd/Contact';
import {TypedModelComponent}  from '../../base/TypedModelComponent';
import {AddressComponent} from './AddressComponent';
import {PhoneComponent} from './PhoneComponent';
import {OnlineResourceComponent} from './OnlineResourceComponent';
import {CardComponent} from '../../basic/CardComponent';
import {OnlineResource} from '../../../../model/iso/gmd/OnlineResource';
import {Address} from '../../../../model/iso/gmd/Address';
import {Phone} from '../../../../model/iso/gmd/Phone';

@Component({
    selector: 'iso-contact',
    template: require('./ContactComponent.html'),
    host: {'[class.has-child]': 'hasChild'},
    styles: [require('../../styles/editor-component.scss')],
    directives: [CardComponent, AddressComponent, PhoneComponent, OnlineResourceComponent]
})
export class ContactComponent extends TypedModelComponent<Contact> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): Contact {
        return new Contact();
    }

    private openNewPhoneItem(model: Phone) {
        this.openNewChild(PhoneComponent, model, this.config.getConfigFor('phone'));
    }

    private openNewAddressItem(model: Address) {
        this.openNewChild(AddressComponent, model, this.config.getConfigFor('address'));
    }

    private openNewOnlineResourceItem(model: OnlineResource) {
        this.openNewChild(OnlineResourceComponent, model, this.config.getConfigFor('onlineResource'));
    }
}
