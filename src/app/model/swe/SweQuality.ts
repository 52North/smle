import { SweQuantity } from './SweQuantity';
import { SweQuantityRange } from './SweQuantityRange';
import { SweCategory } from './SweCategory';
import { SweText } from './SweText';

/**
 * Provides an indication of the reliability of the parent component value in
 * the form of a decimal number (ex: relative accuracy), a range (ex:
 * bidirectional tolerance), a categorical value (ex: good, bad) or plain
 * textual statement
 */
export type SweQuality = SweQuantity | SweQuantityRange | SweCategory | SweText;
