import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Output } from '../../../model/sml';
import { AbstractInputOrOutputOrParameterComponent } from '../basic/AbstractInputOrOutputOrParameterComponent';

@Component({
    templateUrl: '../basic/AbstractInputOrOutputOrParameterComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class OutputComponent extends AbstractInputOrOutputOrParameterComponent<Output> {

    constructor(
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef
    ) {
        super(componentFactoryResolver, viewContainerRef, Output);
    }

}
