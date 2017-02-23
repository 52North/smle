import { ComponentFactoryResolver, ViewContainerRef, Component } from '@angular/core';
import { EditorComponent, ChildMetadata } from '../base';
import { DataInterface } from '../../../model/sml/DataInterface';

@Component({
    selector: 'sml-data-interface',
    template: require('./DataInterfaceComponent.html')
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

    protected delegateOpenNewChild(childMetadata: ChildMetadata<any>) {
        this.openAsChild.emit(childMetadata);
    }
}
