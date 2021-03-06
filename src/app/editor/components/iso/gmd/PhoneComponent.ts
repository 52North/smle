import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Phone } from '../../../../model/iso/gmd/Phone';
import { EditorComponent } from '../../base/EditorComponent';

@Component({
    selector: 'iso-phone',
    templateUrl: './PhoneComponent.html',
    styleUrls: ['../../styles/editor-component.scss']
})
export class PhoneComponent extends EditorComponent<Phone> {
    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): Phone {
        return new Phone();
    }
}
