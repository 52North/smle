import { Component, AfterContentInit } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { SweDataRecord } from '../../../model/swe/SweDataRecord';
import { SweText } from '../../../model/swe/SweText';
import { SweTime } from '../../../model/swe/SweTime';
import { SweCount } from '../../../model/swe/SweCount';
import { SweBoolean } from '../../../model/swe/SweBoolean';
import { SweQuantity } from '../../../model/swe/SweQuantity';
import { SweCategory } from '../../../model/swe/SweCategory';
import { SweTimeRange } from '../../../model/swe/SweTimeRange';
import { SweQuantityRange } from '../../../model/swe/SweQuantityRange';
import { SweElementType } from '../../../model/swe/SweElementType';
import { ComponentType } from '../sml/NamedSweDataComponentComponent';

@Component({
    selector: 'swe-element-type',
    template: require('./SweElementTypeComponent.html')
})
export class SweElementTypeComponent extends TypedModelComponent<SweElementType> implements AfterContentInit {
    private typeType: ComponentType;

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

        let type = this.model.type;

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
