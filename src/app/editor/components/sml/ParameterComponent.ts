import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Parameter } from '@helgoland/sensorml';

import { AbstractInputOrOutputOrParameterComponent } from '../basic/AbstractInputOrOutputOrParameterComponent';

@Component({
    templateUrl: '../basic/AbstractInputOrOutputOrParameterComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class ParameterComponent extends AbstractInputOrOutputOrParameterComponent<Parameter> {

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef, Parameter);
    }

}
