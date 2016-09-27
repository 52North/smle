import { Restriction } from './Restriction';
import { DisplayName } from '../../../decorators/DisplayName';

/**
 * Restrictions and legal prerequisites for accessing and using the dataset.
 */
export class LegalConstraints {
    @DisplayName('Access constraints')
    accessConstraints: Restriction[];

    @DisplayName('Use constraints')
    useConstraints: Restriction[];

    @DisplayName('Other constraints')
    otherConstraints: string[];

    toString() {
        return 'Legal constraints';
    }
}
