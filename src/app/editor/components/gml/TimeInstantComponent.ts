import { Component, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { EditorComponent } from '../base/EditorComponent';
import { TimeInstant } from '../../../model/gml/TimeInstant';

@Component({
    selector: 'gml-time-instant',
    templateUrl: './TimeInstantComponent.html'
})
export class TimeInstantComponent extends EditorComponent<TimeInstant> {
    @Input()
    public model: TimeInstant;

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel() {
        return undefined;
    }
}
