import { Component, AfterContentInit, Type } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import {
    SweText,
    SweTime,
    SweCount,
    SweBoolean,
    SweQuantity,
    SweCategory,
    SweTimeRange,
    SweQuantityRange,
    SweDataArray,
    SweDataRecord
} from '../../../model/swe';
import { AbstractDataComponent } from '../../../model/swe/AbstractDataComponent';
import { SweElementType } from '../../../model/swe/SweElementType';
import { SweXmlEncoding } from '../../../model/swe/SweXmlEncoding';
import { SweTextEncoding } from '../../../model/swe/SweTextEncoding';
import { SweBinaryEncoding } from '../../../model/swe/SweBinaryEncoding';
import { SweEncoding } from '../../../model/swe/SweEncoding';

@Component({
    selector: 'swe-data-array',
    templateUrl: './SweDataArrayComponent.html'
})
export class SweDataArrayComponent extends TypedModelComponent<SweDataArray> implements AfterContentInit {
    protected options = [
        { name: 'SweText', type: SweText },
        { name: 'SweTime', type: SweTime },
        { name: 'SweCount', type: SweCount },
        { name: 'SweBoolean', type: SweBoolean },
        { name: 'SweQuantity', type: SweQuantity },
        { name: 'SweCategory', type: SweCategory },
        { name: 'SweTimeRange', type: SweTimeRange },
        { name: 'SweQuantityRange', type: SweQuantityRange },
        { name: 'SweDataRecord', type: SweDataRecord },
        { name: 'SweDataArray', type: SweDataArray }
    ];

    protected encodingOptions = [
        { name: 'SweXmlEncoding', type: SweXmlEncoding },
        { name: 'SweTextEncoding', type: SweTextEncoding },
        { name: 'SweBinaryEncoding', type: SweBinaryEncoding }
    ];

    public encodingType: string;

    protected createModel(): SweDataArray {
        return new SweDataArray();
    }

    protected onAddElementType(typeType: Type<AbstractDataComponent>) {
        const newItem = new SweElementType();
        newItem.type = new typeType();

        this.model.elementType = newItem;
    }

    protected removeElementType() {
        this.model.elementType = null;
    }

    protected onAddEncoding(encodingType: Type<SweEncoding>) {
        const newItem = new encodingType();

        this.model.encoding = newItem;
        this.encodingType = this.getEncodingType();
    }

    protected removeEncoding() {
        this.model.encoding = null;
    }

    ngAfterContentInit(): any {
        this.encodingType = this.getEncodingType();
    }

    private getEncodingType(): string {
        const encoding = this.model.encoding;

        if (encoding instanceof SweTextEncoding) {
            return 'text';
        } else if (encoding instanceof SweXmlEncoding) {
            return 'xml';
        } else if (encoding instanceof SweBinaryEncoding) {
            return 'binary';
        }

        return null;
    }
}
