import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {CardComponent} from '../basic/CardComponent';
import {ListComponent} from '../basic/ListComponent';
import {AbstractNamedMetadataListComponent} from './AbstractNamedMetadataListComponent';
import {EditorComponent} from '../base/EditorComponent';
import {ChildMetadata} from '../base/TypedModelComponent';
import {Characteristic} from '../../../model/sml/Characteristic';
import {CharacteristicList} from '../../../model/sml/CharacteristicList';
import {NamedSweDataComponentComponent} from './NamedSweDataComponentComponent';
import {NamedSweDataComponent} from '../../../model/sml/NamedSweDataComponent';
import {ConcreteType} from '@angular/core/src/facade/lang';
import {AbstractDataComponent} from '../../../model/swe/AbstractDataComponent';
import {SweText} from '../../../model/swe/SweText';
import {SweTime} from '../../../model/swe/SweTime';
import {SweCount} from '../../../model/swe/SweCount';
import {SweBoolean} from '../../../model/swe/SweBoolean';
import {SweQuantity} from '../../../model/swe/SweQuantity';
import {SweCategory} from '../../../model/swe/SweCategory';
import {SweTimeRange} from '../../../model/swe/SweTimeRange';
import {SweQuantityRange} from '../../../model/swe/SweQuantityRange';
import {SweDataRecord} from '../../../model/swe/SweDataRecord';
import {SweDataArray} from '../../../model/swe/SweDataArray';

@Component({
    selector: 'sml-characteristic-list',
    template: require('./CharacteristicListComponent.html'),
    styles: [require('../styles/editor-component.scss')],
    directives: [CardComponent, AbstractNamedMetadataListComponent, ListComponent]
})
export class CharacteristicListComponent extends EditorComponent<CharacteristicList> {
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

    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): CharacteristicList {
        return new CharacteristicList();
    }

    private openNewCharacteristicItem(item: Characteristic) {
        var metadata = new ChildMetadata(NamedSweDataComponentComponent,
            item, this.config.getConfigFor('characteristics'));
        this.openNewChild(metadata);
    }

    private onAddCharacteristic(characteristicType: ConcreteType<AbstractDataComponent>): void {
        var newItem = new NamedSweDataComponent();
        newItem.component = new characteristicType();

        this.model.characteristics.push(newItem);
    }

    private onRemoveCharacteristic(index: number): void {
        this.closeChildWithModel(this.model.characteristics[index]);
        this.model.characteristics.splice(index, 1);
    }
}
