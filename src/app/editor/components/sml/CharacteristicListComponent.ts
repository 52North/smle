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

@Component({
    selector: 'sml-characteristic-list',
    template: require('./CharacteristicListComponent.html'),
    styles: [require('../styles/editor-component.scss')],
    directives: [CardComponent, AbstractNamedMetadataListComponent, ListComponent]
})
export class CharacteristicListComponent extends EditorComponent<CharacteristicList> {
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

    private onAddCharacteristic(): void {
        this.model.characteristics.push(new NamedSweDataComponent());
    }

    private onRemoveCharacteristic(index: number): void {
        this.closeChildWithModel(this.model.characteristics[index]);
        this.model.characteristics.splice(index, 1);
    }
}
