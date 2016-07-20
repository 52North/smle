import { SweCount } from './SweCount';
import { SweQuantity } from './SweQuantity';
import { SweTime } from './SweTime';

/**
 * Re-usable group providing a choice of numeric data components
 */
export type SweAnyNumerical = SweCount | SweQuantity | SweTime;
