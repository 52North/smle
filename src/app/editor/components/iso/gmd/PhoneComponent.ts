import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Phone } from '@helgoland/sensorml';

import { EditorComponent } from '../../base/EditorComponent';

@Component({
    selector: 'iso-phone',
    templateUrl: './PhoneComponent.html',
    styleUrls: ['../../styles/editor-component.scss']
})
export class PhoneComponent extends EditorComponent<Phone> {

    public title = 'Phone';

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): Phone {
        return new Phone();
    }
}
