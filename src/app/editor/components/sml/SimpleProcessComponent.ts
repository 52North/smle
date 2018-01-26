import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { EditorComponent } from '../base/EditorComponent';
import { SimpleProcess } from '../../../model/sml/SimpleProcess';

@Component({
    selector: 'sml-simple-process',
    templateUrl: './SimpleProcessComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class SimpleProcessComponent extends EditorComponent<SimpleProcess> {
    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): SimpleProcess {
        return new SimpleProcess();
    }
}
