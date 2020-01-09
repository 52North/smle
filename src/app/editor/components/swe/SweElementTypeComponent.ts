import { AfterContentInit, Component } from '@angular/core';
import {
    SweBoolean,
    SweCategory,
    SweCount,
    SweDataRecord,
    SweElementType,
    SweQuantity,
    SweQuantityRange,
    SweText,
    SweTime,
    SweTimeRange
} from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';
import { ComponentType } from '../sml/NamedSweDataComponentComponent';

@Component({
    selector: 'swe-element-type',
    templateUrl: './SweElementTypeComponent.html'
})
export class SweElementTypeComponent extends TypedModelComponent<SweElementType> implements AfterContentInit {

    public typeType: ComponentType;

    ngAfterContentInit(): any {
        this.typeType = this.getTypeType();
    }

    protected createModel(): SweElementType {
        return new SweElementType();
    }

    private getTypeType(): ComponentType {
        if (!this.model) {
            return ComponentType.Unknown;
        }

        const type = this.model.type;

        if (type instanceof SweText) {
            return ComponentType.SweText;
        } else if (type instanceof SweTime) {
            return ComponentType.SweTime;
        } else if (type instanceof SweCount) {
            return ComponentType.SweCount;
        } else if (type instanceof SweBoolean) {
            return ComponentType.SweBoolean;
        } else if (type instanceof SweQuantity) {
            return ComponentType.SweQuantity;
        } else if (type instanceof SweCategory) {
            return ComponentType.SweCategory;
        } else if (type instanceof SweTimeRange) {
            return ComponentType.SweTimeRange;
        } else if (type instanceof SweQuantityRange) {
            return ComponentType.SweQuantityRange;
        } else if (type instanceof SweDataRecord) {
            return ComponentType.SweDataRecord;
            // } else if (type instanceof SweDataArray) {
            //     return ComponentType.SweDataArray;
        } else {
            return ComponentType.Unknown;
        }
    }

}
