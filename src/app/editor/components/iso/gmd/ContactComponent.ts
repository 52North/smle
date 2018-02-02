import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { Address } from '../../../../model/iso/gmd/Address';
import { Contact } from '../../../../model/iso/gmd/Contact';
import { OnlineResource } from '../../../../model/iso/gmd/OnlineResource';
import { Phone } from '../../../../model/iso/gmd/Phone';
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
