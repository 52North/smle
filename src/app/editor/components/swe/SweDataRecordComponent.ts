import { Component, Type } from '@angular/core';
import { ChildMetadata, TypedModelComponent } from '../base';
import {
    SweDataRecord,
    SweField,
    SweText,
    SweTime,
    SweCount,
    SweBoolean,
    SweQuantity,
    SweCategory,
    SweTimeRange,
    SweQuantityRange,
    SweDataArray
} from '../../../model/swe';
import { AbstractDataComponent } from '../../../model/swe/AbstractDataComponent';
import { SweFieldComponent } from '../sml/NamedSweDataComponentComponent';

@Component({
    selector: 'swe-data-record',
    template: require('./SweDataRecordComponent.html')
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
        let metadata = new ChildMetadata(SweFieldComponent, item, this.config.getConfigFor('fields'));
        this.openNewChild(metadata);
    }

    protected onAddField(fieldType: Type<AbstractDataComponent>) {
        let newItem = new SweField();
        newItem.component = new fieldType();

        this.model.fields.push(newItem);
    }

    protected onRemoveField(index: number) {
        this.model.fields.splice(index, 1);
    }
}
