
import { AbstractGML } from './AbstractGML';
import { Referenced } from './Referenced';

export class AbstractGeometry extends AbstractGML implements Referenced {
  srsName: string;
  srsDimension: number;
  axisLabels: string[];
  uomLabels: string[];
}
