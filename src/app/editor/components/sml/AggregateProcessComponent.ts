import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { AggregateProcess } from '@helgoland/sensorml';

import { EditorComponent } from '../base/EditorComponent';

@Component({
    selector: 'sml-aggregate-process',
    templateUrl: './AggregateProcessComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class AggregateProcessComponent extends EditorComponent<AggregateProcess> {

    public title = 'Aggregate Process';

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): AggregateProcess {
        return new AggregateProcess();
    }
}
