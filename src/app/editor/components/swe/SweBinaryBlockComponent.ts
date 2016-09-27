import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { SweBinaryBlock } from '../../../model/swe/SweBinaryBlock';
import { EditorComponent } from '../base/EditorComponent';

@Component({
    selector: 'swe-binary-block',
    template: require('./SweBinaryBlockComponent.html'),
    styles: [require('../styles/editor-component.scss')]
})
export class SweBinaryBlockComponent extends EditorComponent<SweBinaryBlock> {
    constructor(
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef
    ) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): SweBinaryBlock {
        return new SweBinaryBlock();
    }
}
