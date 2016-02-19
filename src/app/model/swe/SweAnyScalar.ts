import { SweBoolean } from './SweBoolean';
import { SweCount } from './SweCount';
import { SweQuantity } from './SweQuantity';
import { SweTime } from './SweTime';
import { SweCategory } from './SweCategory';
import { SweText } from './SweText';

/**
 * Re-usable group providing a choice of scalar data components
 */
export type SweAnyScalar = SweBoolean | SweCount | SweQuantity | SweTime | SweCategory | SweText;
