import {SweAnyNumerical} from './SweAnyNumerical';

export class SweCoordinate {
    name: string;
    coordinate: SweAnyNumerical;

    toString() {
        return this.name || 'SWE coordinate';
    }
}
