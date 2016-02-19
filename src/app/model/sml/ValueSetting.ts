import { AbstractSetting } from './AbstractSetting';

export class ValueSetting extends AbstractSetting {
  value: boolean | number | string | Date;
}
