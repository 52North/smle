import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Output } from '@helgoland/sensorml';

import { AbstractInputOrOutputOrParameterComponent } from '../basic/AbstractInputOrOutputOrParameterComponent';

@Component({
    selector: 'sml-output',
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
