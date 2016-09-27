import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Contact } from '../../../../model/iso/gmd/Contact';
import { AddressComponent } from './AddressComponent';
import { PhoneComponent } from './PhoneComponent';
import { OnlineResourceComponent } from './OnlineResourceComponent';
import { OnlineResource } from '../../../../model/iso/gmd/OnlineResource';
import { Address } from '../../../../model/iso/gmd/Address';
import { Phone } from '../../../../model/iso/gmd/Phone';
import { EditorComponent } from '../../base/EditorComponent';
import { ChildMetadata } from '../../base/TypedModelComponent';

@Component({
    selector: 'iso-contact',
    template: require('./ContactComponent.html'),
    styles: [require('../../styles/editor-component.scss')]
})
export class ContactComponent extends EditorComponent<Contact> {
    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): Contact {
        return new Contact();
    }

    protected openNewPhoneItem(item: Phone) {
        let metadata = new ChildMetadata(PhoneComponent, item, this.config.getConfigFor('phone'));
        this.openNewChild(metadata);
    }

    protected openNewAddressItem(item: Address) {
        let metadata = new ChildMetadata(AddressComponent, item, this.config.getConfigFor('address'));
        this.openNewChild(metadata);
    }

    protected openNewOnlineResourceItem(item: OnlineResource) {
        let metadata = new ChildMetadata(OnlineResourceComponent, item, this.config.getConfigFor('onlineResource'));
        this.openNewChild(metadata);
    }
}
