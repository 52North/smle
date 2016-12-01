import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Parameter } from '../../../model/sml/Parameter';
import { AbstractInputOrOutputOrParameterComponent } from '../basic/AbstractInputOrOutputOrParameterComponent';

@Component({
    template: require('../basic/AbstractInputOrOutputOrParameterComponent.html'),
    styles: [require('../styles/editor-component.scss')]
})
export class ParameterComponent extends AbstractInputOrOutputOrParameterComponent<Parameter> {

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef, Parameter);
    }

}
