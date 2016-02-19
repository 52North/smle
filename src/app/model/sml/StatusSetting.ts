import { AbstractSetting } from './AbstractSetting';

export class StatusSetting extends AbstractSetting {
  value: Status;
}

type Status = 'enabled' | 'disabled';
