import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { PhysicalSystem } from '../../../model/sml/PhysicalSystem';
import { EditorComponent } from '../base/EditorComponent';

@Component({
    selector: 'sml-physical-system',
    templateUrl: './PhysicalSystemComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class PhysicalSystemComponent extends EditorComponent<PhysicalSystem> {
    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): PhysicalSystem {
        return new PhysicalSystem();
    }
}
