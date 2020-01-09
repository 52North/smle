import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { PhysicalComponent } from '@helgoland/sensorml';

import { EditorComponent } from '../base/EditorComponent';

@Component({
    selector: 'sml-physical-component',
    templateUrl: './PhysicalComponentComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class PhysicalComponentComponent extends EditorComponent<PhysicalComponent> {

    public title = 'Physical Component';

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): PhysicalComponent {
        return new PhysicalComponent();
    }
}
