import { Point } from '../gml/Point';
import { SweText } from '../swe/SweText';
import { SweVector } from '../swe/SweVector';
import { SweDataRecord } from '../swe/SweDataRecord';
import { SweDataArray } from '../swe/SweDataArray';
import { AbstractProcess } from './AbstractProcess';

export type Position = Point
  | SweText
  | SweVector
  | SweDataRecord
  | SweDataArray
  | AbstractProcess;
