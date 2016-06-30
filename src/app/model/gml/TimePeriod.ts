import { AbstractTime } from './AbstractTime';

/**
 * gml:TimePeriod acts as a one-dimensional geometric primitive that represents
 * an identifiable extent in time.
 */
export class TimePeriod extends AbstractTime{
  begin: Date;
  end: Date;
}
