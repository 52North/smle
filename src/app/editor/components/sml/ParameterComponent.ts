import { Component, ComponentFactoryResolver, ViewContainerRef, AfterContentInit, OnInit } from '@angular/core';
import { EditorComponent } from '../base/EditorComponent';
import { InputOrOutputOrParameter } from '../../../model/sml/InputOrOutputOrParameter';
import { Parameter } from '../../../model/sml/Parameter';
import { SweText } from '../../../model/swe/SweText';
import { SweTime } from '../../../model/swe/SweTime';
import { SweCount } from '../../../model/swe/SweCount';
import { SweBoolean } from '../../../model/swe/SweBoolean';
import { SweQuantity } from '../../../model/swe/SweQuantity';
import { SweCategory } from '../../../model/swe/SweCategory';
import { SweTimeRange } from '../../../model/swe/SweTimeRange';
import { SweQuantityRange } from '../../../model/swe/SweQuantityRange';
import { SweDataRecord } from '../../../model/swe/SweDataRecord';
import { SweDataArray } from '../../../model/swe/SweDataArray';

export enum ValueType {
    Unknown = 0,
    SweText = 1,
    SweTime = 2,
    SweCount = 3,
    SweBoolean = 4,
    SweQuantity = 5,
    SweCategory = 6,
    SweTimeRange = 7,
    SweQuantityRange = 8,
    SweDataRecord = 9,
    SweDataArray = 10
}

export abstract class AbstractInputOrOutputOrParameterComponent
    extends EditorComponent<InputOrOutputOrParameter> implements AfterContentInit {

    protected valueType: ValueType;
    protected title: string;

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    ngAfterContentInit(): any {
        this.valueType = this.getValueType();
    }

    protected createModel(): InputOrOutputOrParameter {
        return undefined;
    }

    private getValueType(): ValueType {
        if (!this.model) {
            return ValueType.Unknown;
        }

        let component = (<any>this.model).value;

        if (component instanceof SweText) {
            return ValueType.SweText;
        } else if (component instanceof SweTime) {
            return ValueType.SweTime;
        } else if (component instanceof SweCount) {
            return ValueType.SweCount;
        } else if (component instanceof SweBoolean) {
            return ValueType.SweBoolean;
        } else if (component instanceof SweQuantity) {
            return ValueType.SweQuantity;
        } else if (component instanceof SweCategory) {
            return ValueType.SweCategory;
        } else if (component instanceof SweTimeRange) {
            return ValueType.SweTimeRange;
        } else if (component instanceof SweQuantityRange) {
            return ValueType.SweQuantityRange;
        } else if (component instanceof SweDataRecord) {
            return ValueType.SweDataRecord;
        } else if (component instanceof SweDataArray) {
            return ValueType.SweDataArray;
        } else {
            return ValueType.Unknown;
        }
    }
}

@Component({
    selector: 'sml-named-swe-data-component',
    template: require('./ParameterComponent.html'),
    styles: [require('../styles/editor-component.scss')]
})
export class ParameterComponent extends AbstractInputOrOutputOrParameterComponent
    implements OnInit {

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    public ngOnInit() {
        console.log(this.model);
        if (this.model && this.model.value) {
            this.title = this.model.value.toString();
        } else {
            this.title = 'Named Data Component';
        }
    }

    protected createModel(): Parameter {
        return new Parameter();
    }
}
