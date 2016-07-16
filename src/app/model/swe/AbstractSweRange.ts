
import { AbstractSimpleComponent } from './AbstractSimpleComponent';

export class AbstractSweRange extends AbstractSimpleComponent {
  value: [any, any];

  toString(fallbackLabel = 'Abstract SWE range') {
    return super.toString(fallbackLabel);
  }
}
