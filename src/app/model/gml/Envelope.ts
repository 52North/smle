import { AbstractReferenced } from './AbstractReferenced';
import { DisplayName } from '../../decorators/DisplayName';

/**
 * Envelope defines an extent using a pair of positions defining opposite
 * corners in arbitrary dimensions. The first direct position is the "lower
 * corner" (a coordinate position consisting of all the minimal ordinates for
 * each dimension for all points within the envelope), the second one the
 * "upper corner" (a coordinate position consisting of all the maximal ordinates
 * for each dimension for all points within the envelope).
 */
export class Envelope extends AbstractReferenced {
    private _coords = new Array<number>(4);

    @DisplayName('Lower corner')
    get lowerCorner() {
        return [this._coords[0], this._coords[2]];
    }

    set lowerCorner(c: [number, number]) {
        this._coords[0] = c[0];
        this._coords[2] = c[1];
    }

    @DisplayName('Upper corner')
    get upperCorner() {
        return [this._coords[1], this._coords[3]];
    }

    set upperCorner(c: [number, number]) {
        this._coords[1] = c[0];
        this._coords[3] = c[1];
    }

    @DisplayName('Coordinates')
    get coordinates(): [number, number, number, number] {
        return [
            this._coords[0],
            this._coords[1],
            this._coords[2],
            this._coords[3]
        ];
    }

    set coordinates(c: [number, number, number, number]) {
        for (let i = 0; i < 4; ++i) {
            this._coords[i] = c[i];
        }
    }

    toString() {
        return 'Envelope';
    }
}
