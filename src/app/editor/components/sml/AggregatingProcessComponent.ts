import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { AggregatingProcess } from '../../../model/sml';
import { ConnectDescriptionService } from '../../../sos/connect/connect.service';

@Component({
  selector: 'sml-aggregating-process',
  template: require('./AggregatingProcessComponent.html')
})
export class AggregatingProcessComponent extends TypedModelComponent<AggregatingProcess> {

  constructor(
    private connectDescriptionService: ConnectDescriptionService
  ) {
    super();
  }

  protected createModel(): AggregatingProcess {
    return undefined;
  }

  protected changeComponents() {
    this.connectDescriptionService.openComponentsDescription(this.model);
  }
}
