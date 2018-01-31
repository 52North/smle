import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';

import { StatusSetting } from '../../../model/sml/StatusSetting';
import { EditorComponent } from '../base/EditorComponent';

@Component({
    selector: 'sml-status-setting',
    templateUrl: './StatusSettingComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class StatusSettingComponent extends EditorComponent<StatusSetting> implements OnInit {

    public valueSelected: boolean;

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    public ngOnInit() {
        this.valueSelected = this.model.value === 'enabled' ? true : false;
    }

    public updateValue(temp: any) {
        this.model.value = !this.valueSelected ? 'enabled' : 'disabled';
    }

    protected createModel(): StatusSetting {
        return new StatusSetting();
    }

}
