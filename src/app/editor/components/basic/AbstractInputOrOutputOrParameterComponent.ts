import { ComponentFactoryResolver, ViewContainerRef, AfterContentInit, OnInit } from '@angular/core';
import { EditorComponent } from '../base/EditorComponent';
import { InputOrOutputOrParameter } from '../../../model/sml';
import {
    SweText,
    SweTime,
    SweCount,
    SweBoolean,
    SweQuantity,
    SweCategory,
    SweTimeRange,
    SweQuantityRange,
    SweDataRecord,
    SweDataArray
} from '../../../model/swe';

export enum InputOrOutputOrParameterType {
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

export abstract class AbstractInputOrOutputOrParameterComponent<T extends InputOrOutputOrParameter>
    extends EditorComponent<T> implements AfterContentInit, OnInit {

    protected valueType: InputOrOutputOrParameterType;
    protected title: string;

    constructor(
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef,
        private type
    ) {
        super(componentFactoryResolver, viewContainerRef);
    }

    ngAfterContentInit(): any {
        this.valueType = this.getValueType();
    }

    public ngOnInit() {
        console.log(this.model);
        if (this.model && this.model.value) {
            this.title = this.model.value.toString();
        } else {
            this.title = 'Named Data Component';
        }
    }

    protected createModel(): T {
        return new this.type();
    }

    private getValueType(): InputOrOutputOrParameterType {
        if (!this.model) {
            return InputOrOutputOrParameterType.Unknown;
        }
        let component = (<any>this.model).value;

        if (component instanceof SweText) {
            return InputOrOutputOrParameterType.SweText;
        } else if (component instanceof SweTime) {
            return InputOrOutputOrParameterType.SweTime;
        } else if (component instanceof SweCount) {
            return InputOrOutputOrParameterType.SweCount;
        } else if (component instanceof SweBoolean) {
            return InputOrOutputOrParameterType.SweBoolean;
        } else if (component instanceof SweQuantity) {
            return InputOrOutputOrParameterType.SweQuantity;
        } else if (component instanceof SweCategory) {
            return InputOrOutputOrParameterType.SweCategory;
        } else if (component instanceof SweTimeRange) {
            return InputOrOutputOrParameterType.SweTimeRange;
        } else if (component instanceof SweQuantityRange) {
            return InputOrOutputOrParameterType.SweQuantityRange;
        } else if (component instanceof SweDataRecord) {
            return InputOrOutputOrParameterType.SweDataRecord;
        } else if (component instanceof SweDataArray) {
            return InputOrOutputOrParameterType.SweDataArray;
        } else {
            return InputOrOutputOrParameterType.Unknown;
        }
    }
}
