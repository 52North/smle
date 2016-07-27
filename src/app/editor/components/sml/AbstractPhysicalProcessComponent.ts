import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { AbstractProcessComponent } from './AbstractProcessComponent';
import { AbstractPhysicalProcess } from '../../../model/sml/AbstractPhysicalProcess';
import { PositionListComponent } from '../basic/PositionListComponent';
import { ConnectDescriptionService } from '../../../sos/connect/connect.service';

@Component({
  selector: 'sml-abstract-physical-process',
  template: require('./AbstractPhysicalProcessComponent.html'),
  styles: [require('../styles/editor-component.scss')],
  directives: [AbstractProcessComponent, PositionListComponent]
})
export class AbstractPhysicalProcessComponent extends TypedModelComponent<AbstractPhysicalProcess> {

  constructor(
    private connectDescriptionService: ConnectDescriptionService
  ) {
    super();
  }

  protected createModel(): AbstractPhysicalProcess {
    return undefined;
  }

  protected changeAttachedTo() {
    this.connectDescriptionService.openAttachedToDescription(this.model);
  }

}
