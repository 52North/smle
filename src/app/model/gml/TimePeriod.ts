import { TimeInstant } from './TimeInstant';

/**
 * gml:TimePeriod acts as a one-dimensional geometric primitive that represents
 * an identifiable extent in time.
 */
export class TimePeriod {
  begin: TimeInstant;
  end: TimeInstant;
}
