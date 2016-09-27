import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { TextFieldComponent } from '../basic/TextFieldComponent';
import { CardComponent } from '../basic/CardComponent';
import { SweBinaryComponent } from '../../../model/swe/SweBinaryComponent';
import { EditorComponent } from '../base/EditorComponent';
import { NumberFieldComponent } from '../basic/NumberFieldComponent';
import { AbstractSWEComponent } from './AbstractSWEComponent';

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
