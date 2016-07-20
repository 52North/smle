import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { AbstractProcessComponent } from './AbstractProcessComponent';
import { AbstractPhysicalProcess } from '../../../model/sml/AbstractPhysicalProcess';
import { PositionListComponent } from '../basic/PositionListComponent';
import { EditorService } from '../../../services/EditorService';
import { ConnectDescriptionService } from '../../../sos/connect/connect.service';

@Component({
  selector: 'sml-abstract-physical-process',
  template: require('./AbstractPhysicalProcessComponent.html'),
  directives: [AbstractProcessComponent, PositionListComponent]
})
export class AbstractPhysicalProcessComponent extends TypedModelComponent<AbstractPhysicalProcess> {

  constructor(
    private editorService: EditorService,
    private connectDescriptionService: ConnectDescriptionService
  ) {
    super();
  }

  protected createModel(): AbstractPhysicalProcess {
    return undefined;
  }

  protected changeAttachedTo() {
    // TODO check if description is registered in SOS (maybe save a SOS connection in editorService)
    this.connectDescriptionService.openAttachedToDescription(this.model);
  }

}
