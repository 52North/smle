import { Component, Type } from '@angular/core';
import { TypedModelComponent, ChildMetadata } from '../base';
import { Capability } from '../../../model/sml/Capability';
import { CapabilityList } from '../../../model/sml/CapabilityList';
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
    SweDataRecord,
    SweDataArray
} from '../../../model/swe';

@Component({
    selector: 'sml-capability-list',
    template: require('./CapabilityListComponent.html'),
    styles: [require('../styles/editor-component.scss')]
})
export class CapabilityListComponent extends TypedModelComponent<CapabilityList> {
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

    protected createModel(): CapabilityList {
        return new CapabilityList();
    }

    protected openNewCapabilityItem(item: Capability) {
        this.openNewChild(
            new ChildMetadata(NamedSweDataComponentComponent, item, this.config.getConfigFor('sml:capabilities'))
        );
    }

    protected onAddCapability(characteristicType: Type<AbstractDataComponent>): void {
        const newItem = new NamedSweDataComponent();
        newItem.component = new characteristicType();
        this.model.capabilities.push(newItem);
    }

    protected onRemoveCapability(index: number): void {
        this.model.capabilities.splice(index, 1);
    }
}
