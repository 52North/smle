import { Component, ComponentFactoryResolver, Input, Type, ViewContainerRef } from '@angular/core';

import { EditorComponent } from '../base/EditorComponent';

@Component({
    selector: 'sml-identifier-list',
    templateUrl: './NestedCardComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class NestedCardComponent extends EditorComponent<any> {

    @Input()
    public componentType: Type<any>;

    @Input()
    public title: string;

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): any {
        return null;
    }

}
