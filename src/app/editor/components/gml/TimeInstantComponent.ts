import { Component, ComponentFactoryResolver, Input, ViewContainerRef } from '@angular/core';
import { TimeInstant } from '@helgoland/sensorml';

import { EditorComponent } from '../base/EditorComponent';

@Component({
    selector: 'gml-time-instant',
    templateUrl: './TimeInstantComponent.html'
})
export class TimeInstantComponent extends EditorComponent<TimeInstant> {

    @Input()
    public model: TimeInstant;

    public title = 'Instant';

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel() {
        return undefined;
    }
}
