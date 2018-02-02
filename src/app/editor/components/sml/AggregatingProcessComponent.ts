import { Component } from '@angular/core';

import { AggregatingProcess } from '../../../model/sml';
import { ConnectDescriptionService } from '../../../sos/connect/connect.service';
import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
  selector: 'sml-aggregating-process',
  templateUrl: './AggregatingProcessComponent.html'
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
