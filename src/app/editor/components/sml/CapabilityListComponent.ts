import { Component, Type } from '@angular/core';

import { Capability } from '../../../model/sml/Capability';
import { CapabilityList } from '../../../model/sml/CapabilityList';
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
import { ConfigurationService } from '../../../services/ConfigurationService';
import { VocabularyType } from '../../../services/vocabulary/model';
import { ChildMetadata, ChildMetadataOptions } from '../base/ChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { NamedSweDataComponentComponent } from './NamedSweDataComponentComponent';

@Component({
  selector: 'sml-capability-list',
  templateUrl: './CapabilityListComponent.html',
  styleUrls: ['../styles/editor-component.scss']
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

  constructor(
    private configuration: ConfigurationService
  ) {
    super();
  }


  protected createModel(): CapabilityList {
    return new CapabilityList();
  }

  protected openNewCapabilityItem(item: Capability) {
    const config = this.config.getConfigFor('sml:capabilities');
    this.configuration.getConfig().subscribe(smleConfig => {
      let options: ChildMetadataOptions;
      if (smleConfig.showCapabilityVocabularySelection) {
        options = { vocabularyType: VocabularyType.Capability };
      }
      this.openNewChild(new ChildMetadata(NamedSweDataComponentComponent, item, config, options));
    });
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
