import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Address, Contact, OnlineResource, Phone } from '@helgoland/sensorml';

import { ChildMetadata } from '../../base/ChildMetadata';
import { EditorComponent } from '../../base/EditorComponent';
import { AddressComponent } from './AddressComponent';
import { OnlineResourceComponent } from './OnlineResourceComponent';
import { PhoneComponent } from './PhoneComponent';

@Component({
    selector: 'iso-contact',
    templateUrl: './ContactComponent.html',
    styleUrls: ['../../styles/editor-component.scss']
})
export class ContactComponent extends EditorComponent<Contact> {

    public title = 'Contact';

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): Contact {
        return new Contact();
    }

    protected openNewPhoneItem(item: Phone) {
        const metadata = new ChildMetadata(PhoneComponent, item, this.config.getConfigFor('phone'));
        this.openNewChild(metadata);
    }

    protected openNewAddressItem(item: Address) {
        const metadata = new ChildMetadata(AddressComponent, item, this.config.getConfigFor('address'));
        this.openNewChild(metadata);
    }

    protected openNewOnlineResourceItem(item: OnlineResource) {
        const metadata = new ChildMetadata(OnlineResourceComponent, item, this.config.getConfigFor('onlineResource'));
        this.openNewChild(metadata);
    }
}
