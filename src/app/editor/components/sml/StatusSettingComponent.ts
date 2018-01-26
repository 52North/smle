import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';

import { StatusSetting } from '../../../model/sml/StatusSetting';
import { EditorComponent } from '../base/EditorComponent';

@Component({
    selector: 'sml-status-setting',
    templateUrl: './StatusSettingComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class StatusSettingComponent extends EditorComponent<StatusSetting> implements OnInit {

    private valueSelected: boolean;

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    public ngOnInit() {
        this.valueSelected = this.model.value === 'enabled' ? true : false;
    }

    protected createModel(): StatusSetting {
        return new StatusSetting();
    }

    protected updateValue(temp: any) {
        this.model.value = !this.valueSelected ? 'enabled' : 'disabled';
    }
}
