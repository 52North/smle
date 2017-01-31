import { Component, ComponentFactoryResolver, ViewContainerRef, Type } from '@angular/core';
import { EditorComponent } from '../base/EditorComponent';
import { ChildMetadata } from '../base/TypedModelComponent';
import { Characteristic } from '../../../model/sml/Characteristic';
import { CharacteristicList } from '../../../model/sml/CharacteristicList';
import { NamedSweDataComponentComponent } from './NamedSweDataComponentComponent';
import { NamedSweDataComponent } from '../../../model/sml/NamedSweDataComponent';
import { AbstractDataComponent } from '../../../model/swe/AbstractDataComponent';
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

@Component({
    selector: 'sml-characteristic-list',
    template: require('./CharacteristicListComponent.html'),
    styles: [require('../styles/editor-component.scss')]
})
export class CharacteristicListComponent extends EditorComponent<CharacteristicList> {
    protected options = [
        { name: (new SweText()).toString(), type: SweText },
        { name: (new SweTime()).toString(), type: SweTime },
        { name: (new SweCount()).toString(), type: SweCount },
        { name: (new SweBoolean()).toString(), type: SweBoolean },
        { name: (new SweQuantity()).toString(), type: SweQuantity },
        { name: (new SweCategory()).toString(), type: SweCategory },
        { name: (new SweTimeRange()).toString(), type: SweTimeRange },
        { name: (new SweQuantityRange()).toString(), type: SweQuantityRange },
        { name: (new SweDataRecord()).toString(), type: SweDataRecord },
        { name: (new SweDataArray()).toString(), type: SweDataArray }
    ];

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): CharacteristicList {
        return new CharacteristicList();
    }

    protected openNewCharacteristicItem(item: Characteristic) {
        this.openNewChild(
            new ChildMetadata(NamedSweDataComponentComponent, item, this.config.getConfigFor('sml:characteristic'))
        );
    }

    protected onAddCharacteristic(characteristicType: Type<AbstractDataComponent>): void {
        let newItem = new NamedSweDataComponent();
        newItem.component = new characteristicType();
        this.model.characteristics.push(newItem);
    }

    protected onRemoveCharacteristic(index: number): void {
        this.closeChildWithModel(this.model.characteristics[index]);
        this.model.characteristics.splice(index, 1);
    }

}
