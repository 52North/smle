import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { SweBinaryComponent } from '../../../model/swe/SweBinaryComponent';
import { EditorComponent } from '../base/EditorComponent';

@Component({
    selector: 'swe-binary-component',
    template: require('./SweBinaryComponentComponent.html'),
    styles: [require('../styles/editor-component.scss')]
})
export class SweBinaryComponentComponent extends EditorComponent<SweBinaryComponent> {
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
