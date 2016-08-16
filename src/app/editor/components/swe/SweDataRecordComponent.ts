import {Component} from '@angular/core';
import {ChildMetadata, TypedModelComponent} from '../base/TypedModelComponent';
import {AbstractDataComponentComponent} from './AbstractDataComponentComponent';
import {SweDataRecord} from '../../../model/swe/SweDataRecord';
import {SweField} from '../../../model/swe/SweField';
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
import {SweFieldComponent} from '../sml/NamedSweDataComponentComponent';
import {ListComponent} from '../basic/ListComponent';

@Component({
    selector: 'swe-data-record',
    template: require('./SweDataRecordComponent.html'),
    directives: [AbstractDataComponentComponent, ListComponent]
})
export class SweDataRecordComponent extends TypedModelComponent<SweDataRecord> {
    private options = [
        {name: 'SweText', type: SweText},
        {name: 'SweTime', type: SweTime},
        {name: 'SweCount', type: SweCount},
        {name: 'SweBoolean', type: SweBoolean},
        {name: 'SweQuantity', type: SweQuantity},
        {name: 'SweCategory', type: SweCategory},
        {name: 'SweTimeRange', type: SweTimeRange},
        {name: 'SweQuantityRange', type: SweQuantityRange},
        {name: 'SweDataRecord', type: SweDataRecord},
        {name: 'SweDataArray', type: SweDataArray}
    ];

    protected createModel(): SweDataRecord {
        return new SweDataRecord();
    }

    private openNewFieldItem(item: SweField) {
        var metadata = new ChildMetadata(SweFieldComponent, item, this.config.getConfigFor('fields'));
        this.openNewChild(metadata);
    }

    private onAddField(fieldType: ConcreteType<AbstractDataComponent>) {
        var newItem = new SweField();
        newItem.component = new fieldType();

        this.model.fields.push(newItem);
    }

    private onRemoveField(index: number) {
        this.model.fields.splice(index, 1);
    }
}
