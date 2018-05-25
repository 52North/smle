import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { OnlineResource } from '../../../../model/iso/gmd/OnlineResource';
import { EditorComponent } from '../../base/EditorComponent';

@Component({
    selector: 'iso-online-resource',
    templateUrl: './OnlineResourceComponent.html',
    styleUrls: ['../../styles/editor-component.scss']
})
export class OnlineResourceComponent extends EditorComponent<OnlineResource> {

    public title = 'Online Resource';

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): OnlineResource {
        return new OnlineResource();
    }
}
