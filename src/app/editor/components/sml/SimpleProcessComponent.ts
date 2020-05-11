import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { SimpleProcess } from '@helgoland/sensorml';

import { EditorComponent } from '../base/EditorComponent';

@Component({
    selector: 'sml-simple-process',
    templateUrl: './SimpleProcessComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class SimpleProcessComponent extends EditorComponent<SimpleProcess> {

    public title = 'Simple Process';

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): SimpleProcess {
        return new SimpleProcess();
    }
}
