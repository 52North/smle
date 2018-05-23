import { Component, Type } from '@angular/core';

import { configuration } from '../../../configuration';
import { Characteristic } from '../../../model/sml/Characteristic';
import { CharacteristicList } from '../../../model/sml/CharacteristicList';
import { NamedSweDataComponent } from '../../../model/sml/NamedSweDataComponent';
import {
    SweBoolean,
    SweCategory,
    SweCount,
    SweDataArray,
    SweDataRecord,
    SweQuantity,
    SweQuantityRange,
    SweText,
    SweTime,
    SweTimeRange,
} from '../../../model/swe';
import { AbstractDataComponent } from '../../../model/swe/AbstractDataComponent';
import { VocabularyType } from '../../../services/vocabulary/model';
import { ChildMetadata, ChildMetadataOptions } from '../base/ChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { NamedSweDataComponentComponent } from './NamedSweDataComponentComponent';

@Component({
    selector: 'sml-characteristic-list',
    templateUrl: './CharacteristicListComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class CharacteristicListComponent extends TypedModelComponent<CharacteristicList> {
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

    constructor() {
        super();
    }

    protected createModel(): CharacteristicList {
        return new CharacteristicList();
    }

    protected openNewCharacteristicItem(item: Characteristic) {
        const config = this.config.getConfigFor('sml:characteristic');
        let options: ChildMetadataOptions;
        if (configuration.showCharacteristicVocabularySelection) {
            options = { vocabularyConfig: { type: VocabularyType.Characteristic, navigation: true } };
        }
        this.openNewChild(new ChildMetadata(NamedSweDataComponentComponent, item, config, options));
    }

    protected onAddCharacteristic(characteristicType: Type<AbstractDataComponent>): void {
        const newItem = new NamedSweDataComponent();
        newItem.component = new characteristicType();
        this.model.characteristics.push(newItem);
    }

    protected onRemoveCharacteristic(index: number): void {
        this.model.characteristics.splice(index, 1);
    }
}
