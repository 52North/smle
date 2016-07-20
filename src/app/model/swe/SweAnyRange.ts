import { SweQuantityRange } from './SweQuantityRange';
import { SweTimeRange } from './SweTimeRange';
import { SweCountRange } from './SweCountRange';
import { SweCategoryRange } from './SweCategoryRange';

/**
 * Re-usable group providing a choice of range data components
 */
export type SweAnyRange = SweQuantityRange | SweTimeRange | SweCountRange | SweCategoryRange;
