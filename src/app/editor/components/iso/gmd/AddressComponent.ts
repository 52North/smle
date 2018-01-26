import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Address } from '../../../../model/iso/gmd/Address';
import { EditorComponent } from '../../base/EditorComponent';

@Component({
    selector: 'iso-address',
    templateUrl: './AddressComponent.html',
    styleUrls: ['../../styles/editor-component.scss']
})
export class AddressComponent extends EditorComponent<Address> {
    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): Address {
        return new Address();
    }
}
