
import { SweVector } from './SweVector';
import { SweDataRecord } from './SweDataRecord';
import { SweMatrix } from './SweMatrix';
import { SweDataArray } from './SweDataArray';
import { SweText } from './SweText';
import { SweTime } from './SweTime';
import { SweCount } from './SweCount';
import { SweBoolean } from './SweBoolean';
import { SweQuantity } from './SweQuantity';
import { SweCategory } from './SweCategory';
import { SweTimeRange } from './SweTimeRange';
import { SweCountRange } from './SweCountRange';
import { SweQuantityRange } from './SweQuantityRange';
import { SweCategoryRange } from './SweCategoryRange';
import { SweDataChoice } from './SweDataChoice';

export type SweDataComponent =
  SweVector
  | SweDataRecord
  | SweMatrix
  | SweDataArray
  | SweText
  | SweTime
  | SweCount
  | SweBoolean
  | SweQuantity
  | SweCategory
  | SweTimeRange
  | SweCountRange
  | SweQuantityRange
  | SweCategoryRange
  | SweDataChoice;
