import {Component} from '@angular/core';
import {TypedModelComponent} from '../base/TypedModelComponent';
import {AbstractDataComponentComponent} from './AbstractDataComponentComponent';
import {NumberFieldComponent} from '../basic/NumberFieldComponent';
import {SweDataRecord} from '../../../model/swe/SweDataRecord';
import {SweText} from '../../../model/swe/SweText';
import {SweTime} from '../../../model/swe/SweTime';
import {SweCount} from '../../../model/swe/SweCount';
import {SweBoolean} from '../../../model/swe/SweBoolean';
import {SweQuantity} from '../../../model/swe/SweQuantity';
import {SweCategory} from '../../../model/swe/SweCategory';
import {SweTimeRange} from '../../../model/swe/SweTimeRange';
import {SweQuantityRange} from '../../../model/swe/SweQuantityRange';
import {SweDataArray} from '../../../model/swe/SweDataArray';
import {AbstractDataComponent} from '../../../model/swe/AbstractDataComponent';
import {ConcreteType} from '@angular/core/src/facade/lang';
import {SweElementType} from '../../../model/swe/SweElementType';
import {SweElementTypeComponent} from './SweElementTypeComponent';

@Component({
    selector: 'swe-data-array',
    template: require('./SweDataArrayComponent.html'),
    directives: [AbstractDataComponentComponent, NumberFieldComponent, SweElementTypeComponent]
})
export class SweDataArrayComponent extends TypedModelComponent<SweDataArray> {
    private options = [
        {name: 'SweText', type: SweText},
        {name: 'SweTime', type: SweTime},
        {name: 'SweCount', type: SweCount},
        {name: 'SweBoolean', type: SweBoolean},
        {name: 'SweQuantity', type: SweQuantity},
        {name: 'SweCategory', type: SweCategory},
        {name: 'SweTimeRange', type: SweTimeRange},
        {name: 'SweQuantityRange', type: SweQuantityRange},
        {name: 'SweDataRecord', type: SweDataRecord}//,
        //{name: 'SweDataArray', type: SweDataArray}
    ];

    private encodingOptions = [];

    protected createModel(): SweDataArray {
        return new SweDataArray();
    }

    private onAddElementType(typeType: ConcreteType<AbstractDataComponent>) {
        var newItem = new SweElementType();
        newItem.type = new typeType();

        this.model.elementType = newItem;
    }

    private removeElementType() {
        this.model.elementType = null;
    }
}
