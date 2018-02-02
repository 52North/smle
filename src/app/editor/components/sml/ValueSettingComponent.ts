import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';

import { ValueSetting } from '../../../model/sml/ValueSetting';
import { EditorComponent } from '../base/EditorComponent';

@Component({
    selector: 'sml-value-setting',
    templateUrl: './ValueSettingComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class ValueSettingComponent extends EditorComponent<ValueSetting> implements OnInit {

    public selectedType: string;

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): ValueSetting {
        return new ValueSetting();
    }

    public ngOnInit() {
        this.selectedType = this.getValueType();
    }

    private getValueType(): any {
        const temp = this.model.value;
        if (temp instanceof Date) {
            return 'date';
        } else if (typeof temp === 'string') {
            return 'string';
        } else if (typeof temp === 'number') {
            return 'number';
        } else if (typeof temp === 'boolean') {
            return 'boolean';
        }
    }
}
