import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { AggregatingProcess } from '../../../model/sml';

@Component({
  selector: 'sml-aggregating-process',
  template: require('./AggregatingProcessComponent.html'),
  directives: []
})
export class AggregatingProcessComponent extends TypedModelComponent<AggregatingProcess> {
  protected createModel(): AggregatingProcess {
    return undefined;
  }
}
