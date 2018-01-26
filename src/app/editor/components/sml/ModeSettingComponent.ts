import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { EditorComponent } from '../base/EditorComponent';
import { ModeSetting } from '../../../model/sml/ModeSetting';

@Component({
    selector: 'sml-mode-setting',
    templateUrl: './ModeSettingComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class ModeSettingComponent extends EditorComponent<ModeSetting> {

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): ModeSetting {
        return new ModeSetting();
    }
}
