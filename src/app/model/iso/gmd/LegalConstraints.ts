import {Restriction} from './Restriction';

/**
 * Restrictions and legal prerequisites for accessing and using the dataset.
 */
export class LegalConstraints {
    accessConstraints: Restriction[];
    useConstraints: Restriction[];
    otherConstraints: string[];

    toString() {
        return 'Legal constraints';
    }
}
