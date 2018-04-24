import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { DataInterface } from '../../../model/sml/DataInterface';
import { ChildMetadata } from '../base/ChildMetadata';
import { EditorComponent } from '../base/EditorComponent';

@Component({
    selector: 'sml-data-interface',
    templateUrl: './DataInterfaceComponent.html'
})
export class DataInterfaceComponent extends EditorComponent<DataInterface> {

    constructor(
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef
    ) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): DataInterface {
        return new DataInterface();
    }

    public delegateOpenNewChild(childMetadata: ChildMetadata<any>) {
        this.openAsChild.emit(childMetadata);
    }
}
