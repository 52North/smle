import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { FeatureProperty } from '../../../model/sml/FeatureProperty';
import { EditorComponent } from '../base/EditorComponent';

@Component({
    templateUrl: './FeaturePropertyComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class FeaturePropertyComponent extends EditorComponent<FeatureProperty> {

    constructor(
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef
    ) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): FeatureProperty {
        return new FeatureProperty();
    }

}
