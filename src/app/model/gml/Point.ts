import {AbstractGeometricPrimitive} from './AbstractGeometricPrimitive';

export class Point extends AbstractGeometricPrimitive {
    x: number;
    y: number;

    toString() {
        if ((this.x || this.x === 0) && (this.y || this.y === 0)) {
            return '(' + this.x + ';' + this.y + ')';
        }

        return 'Point';
    }
}
