import { Component, Type } from '@angular/core';

import {
    SweBoolean,
    SweCategory,
    SweCount,
    SweDataArray,
    SweDataRecord,
    SweField,
    SweQuantity,
    SweQuantityRange,
    SweText,
    SweTime,
    SweTimeRange,
} from '../../../model/swe';
import { AbstractDataComponent } from '../../../model/swe/AbstractDataComponent';
import { ChildMetadata } from '../base/ChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { SweFieldComponent } from '../sml/NamedSweDataComponentComponent';

@Component({
    selector: 'swe-data-record',
    templateUrl: './SweDataRecordComponent.html'
})
export class SweDataRecordComponent extends TypedModelComponent<SweDataRecord> {
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

    protected createModel(): SweDataRecord {
        return new SweDataRecord();
    }

    protected openNewFieldItem(item: SweField) {
        const metadata = new ChildMetadata(SweFieldComponent, item, this.config.getConfigFor('swe:field'));
        this.openNewChild(metadata);
    }

    protected onAddField(fieldType: Type<AbstractDataComponent>) {
        const newItem = new SweField();
        newItem.component = new fieldType();

        this.model.fields.push(newItem);
    }

    protected onRemoveField(index: number) {
        this.model.fields.splice(index, 1);
    }
}
