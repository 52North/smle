import {Referenced} from './Referenced';

export abstract class AbstractReferenced implements Referenced {
    srsName: string;
    srsDimension: number;
    axisLabels: string[];
    uomLabels: string[];

    toString() {
        return 'Abstract referenced';
    }
}
