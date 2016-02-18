export * from './swe/basicTypes';
export * from './swe/blockComponents';
export * from './swe/recordComponents';
export * from './swe/simpleComponents';
export * from './swe/simpleEncodings';
export * from './swe/choiceComponents';
export * from './swe/advancedEncodings';

import { SweDataArray, SweMatrix } from './swe/blockComponents';
import { SweVector, SweDataRecord } from './swe/recordComponents';
import { SweText, SweTime, SweCount, SweBoolean, SweQuantity, SweCategory } from './swe/simpleComponents';
import { SweTimeRange, SweCountRange, SweQuantityRange, SweCategoryRange } from './swe/simpleComponents';
import { SweDataChoice } from './swe/choiceComponents';

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


export interface SweDataComponentVisitor<T> {
  visitSweVector(component: SweVector): T;
  visitSweDataRecord(component: SweDataRecord): T;
  visitSweDataArray(component: SweDataArray): T;
  visitSweDataChoice(component: SweDataChoice): T;
  visitSweQuantityRange(component: SweQuantityRange): T;
  visitSweTimeRange(component: SweTimeRange): T;
  visitSweCountRange(component: SweCountRange): T;
  visitSweCategoryRange(component: SweCategoryRange): T;
  visitSweBoolean(component: SweBoolean): T;
  visitSweCount(component: SweCount): T;
  visitSweQuantity(component: SweQuantity): T;
  visitSweTime(component: SweTime): T;
  visitSweCategory(component: SweCategory): T;
  visitSweText(component: SweText): T;
  visitSweMatrix(component: SweMatrix): T;
}

export function visitComponent<T>(component: SweDataComponent, visitor: SweDataComponentVisitor<T>): T {
  if (component instanceof SweVector) {
    return visitor.visitSweVector(component);
  }
  if (component instanceof SweDataRecord) {
    return visitor.visitSweDataRecord(component);
  }
  if (component instanceof SweMatrix) {
    return visitor.visitSweMatrix(component);
  }
  if (component instanceof SweDataArray) {
    return visitor.visitSweDataArray(component);
  }
  if (component instanceof SweDataChoice) {
    return visitor.visitSweDataChoice(component);
  }
  if (component instanceof SweQuantityRange) {
    return visitor.visitSweQuantityRange(component);
  }
  if (component instanceof SweTimeRange) {
    return visitor.visitSweTimeRange(component);
  }
  if (component instanceof SweCountRange) {
    return visitor.visitSweCountRange(component);
  }
  if (component instanceof SweCategoryRange) {
    return visitor.visitSweCategoryRange(component);
  }
  if (component instanceof SweBoolean) {
    return visitor.visitSweBoolean(component);
  }
  if (component instanceof SweCount) {
    return visitor.visitSweCount(component);
  }
  if (component instanceof SweQuantity) {
    return visitor.visitSweQuantity(component);
  }
  if (component instanceof SweTime) {
    return visitor.visitSweTime(component);
  }
  if (component instanceof SweCategory) {
    return visitor.visitSweCategory(component);
  }
  if (component instanceof SweText) {
    return visitor.visitSweText(component);
  }
  throw new Error('Unsupported SWE data component');
}
