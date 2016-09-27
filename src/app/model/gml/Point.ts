import { AbstractGeometricPrimitive } from './AbstractGeometricPrimitive';
import { DisplayName } from '../../decorators/DisplayName';

export class Point extends AbstractGeometricPrimitive {
    @DisplayName('X')
    x: number;

    @DisplayName('Y')
    y: number;

    toString() {
        if ((this.x || this.x === 0) && (this.y || this.y === 0)) {
            return '(' + this.x + ';' + this.y + ')';
        }

        return 'Point';
    }
}
