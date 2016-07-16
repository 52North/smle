import { AbstractAllowedValues } from './AbstractAllowedValues';

export class AbstractNumericAllowedValues extends AbstractAllowedValues {
  significantFigures: number;

  toString() {
    return 'Abstract numeric allowed values';
  }
}
