import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { SweBinaryComponent } from '@helgoland/sensorml';

import { EditorComponent } from '../base/EditorComponent';

@Component({
    selector: 'swe-binary-component',
    templateUrl: './SweBinaryComponentComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class SweBinaryComponentComponent extends EditorComponent<SweBinaryComponent> {

    public title = 'Swe Binary Component';

    constructor(
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef
    ) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): SweBinaryComponent {
        return new SweBinaryComponent();
    }
}
