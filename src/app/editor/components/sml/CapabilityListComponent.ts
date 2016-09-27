import { Component, ComponentFactoryResolver, ViewContainerRef, Type } from '@angular/core';
import { CardComponent } from '../basic/CardComponent';
import { ListComponent } from '../basic/ListComponent';
import { AbstractNamedMetadataListComponent } from './AbstractNamedMetadataListComponent';
import { EditorComponent } from '../base/EditorComponent';
import { ChildMetadata } from '../base/TypedModelComponent';
import { Capability } from '../../../model/sml/Capability';
import { CapabilityList } from '../../../model/sml/CapabilityList';
import { NamedSweDataComponentComponent } from './NamedSweDataComponentComponent';
import { NamedSweDataComponent } from '../../../model/sml/NamedSweDataComponent';
import { AbstractDataComponent } from '../../../model/swe/AbstractDataComponent';
import { SweText } from '../../../model/swe/SweText';
import { SweTime } from '../../../model/swe/SweTime';
import { SweCount } from '../../../model/swe/SweCount';
import { SweBoolean } from '../../../model/swe/SweBoolean';
import { SweQuantity } from '../../../model/swe/SweQuantity';
import { SweCategory } from '../../../model/swe/SweCategory';
import { SweTimeRange } from '../../../model/swe/SweTimeRange';
import { SweQuantityRange } from '../../../model/swe/SweQuantityRange';
import { SweDataRecord } from '../../../model/swe/SweDataRecord';
import { SweDataArray } from '../../../model/swe/SweDataArray';

@Component({
  selector: 'sml-capability-list',
  template: require('./CapabilityListComponent.html'),
  styles: [require('../styles/editor-component.scss')]
})
export class CapabilityListComponent extends EditorComponent<CapabilityList> {
  private options = [
    { name: (new SweText()).toString(), type: SweText },
    { name: (new SweTime()).toString(), type: SweTime },
    { name: (new SweCount()).toString(), type: SweCount },
    { name: (new SweBoolean()).toString(), type: SweBoolean },
    { name: (new SweQuantity()).toString(), type: SweQuantity },
    { name: (new SweCategory()).toString(), type: SweCategory },
    { name: (new SweTimeRange()).toString(), type: SweTimeRange },
    { name: (new SweQuantityRange()).toString(), type: SweQuantityRange }
    //{ name: (new SweDataRecord()).toString(), type: SweDataRecord },
    //{ name: (new SweDataArray()).toString(), type: SweDataArray }
  ];

  constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
    super(componentFactoryResolver, viewContainerRef);
  }

  protected createModel(): CapabilityList {
    return new CapabilityList();
  }

  private openNewCapabilityItem(item: Capability) {
    var metadata = new ChildMetadata(NamedSweDataComponentComponent,
      item, this.config.getConfigFor('capabilities'));
    this.openNewChild(metadata);
  }

  private onAddCapability(characteristicType: Type<AbstractDataComponent>): void {
    var newItem = new NamedSweDataComponent();
    newItem.component = new characteristicType();

    this.model.capabilities.push(newItem);
  }

  private onRemoveCapability(index: number): void {
    this.closeChildWithModel(this.model.capabilities[index]);
    this.model.capabilities.splice(index, 1);
  }
}
