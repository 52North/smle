import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { ModeSetting } from '../../../model/sml/ModeSetting';
import { EditorComponent } from '../base/EditorComponent';

@Component({
    selector: 'sml-mode-setting',
    templateUrl: './ModeSettingComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class ModeSettingComponent extends EditorComponent<ModeSetting> {

    public title = 'Mode setting';

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): ModeSetting {
        return new ModeSetting();
    }
}
