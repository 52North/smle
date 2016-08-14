import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {CardComponent} from '../basic/CardComponent';
import {ListComponent} from '../basic/ListComponent';
import {AbstractNamedMetadataListComponent} from './AbstractNamedMetadataListComponent';
import {EditorComponent} from '../base/EditorComponent';
import {ChildMetadata} from '../base/TypedModelComponent';
import {Capability} from '../../../model/sml/Capability';
import {CapabilityList} from '../../../model/sml/CapabilityList';
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
    selector: 'sml-capability-list',
    template: require('./CapabilityListComponent.html'),
    styles: [require('../styles/editor-component.scss')],
    directives: [CardComponent, AbstractNamedMetadataListComponent, ListComponent]
})
export class CapabilityListComponent extends EditorComponent<CapabilityList> {
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

    protected createModel(): CapabilityList {
        return new CapabilityList();
    }

    private openNewCapabilityItem(item: Capability) {
        var metadata = new ChildMetadata(NamedSweDataComponentComponent,
            item, this.config.getConfigFor('capabilities'));
        this.openNewChild(metadata);
    }

    private onAddCapability(characteristicType: ConcreteType<AbstractDataComponent>): void {
        var newItem = new NamedSweDataComponent();
        newItem.component = new characteristicType();

        this.model.capabilities.push(newItem);
    }

    private onRemoveCapability(index: number): void {
        this.closeChildWithModel(this.model.capabilities[index]);
        this.model.capabilities.splice(index, 1);
    }
}
