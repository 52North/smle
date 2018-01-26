import { Component, ComponentFactoryResolver, ViewContainerRef, OnInit } from '@angular/core';
import { EditorComponent } from '../base/EditorComponent';
import { ValueSetting } from '../../../model/sml/ValueSetting';

@Component({
    selector: 'sml-value-setting',
    templateUrl: './ValueSettingComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class ValueSettingComponent extends EditorComponent<ValueSetting> implements OnInit {

    private selectedType: string;

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
