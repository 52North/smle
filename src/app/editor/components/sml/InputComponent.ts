import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Input } from '../../../model/sml';
import { AbstractInputOrOutputOrParameterComponent } from '../basic/AbstractInputOrOutputOrParameterComponent';

@Component({
    templateUrl: '../basic/AbstractInputOrOutputOrParameterComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class InputComponent extends AbstractInputOrOutputOrParameterComponent<Input> {

    constructor(
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef
    ) {
        super(componentFactoryResolver, viewContainerRef, Input);
    }

}
