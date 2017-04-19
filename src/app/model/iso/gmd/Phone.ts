import { DisplayName } from '../../../common/decorators/DisplayName';
/**
 * Telephone numbers for contacting the responsible individual or organisation
 */
export class Phone {
    @DisplayName('Voice')
    voice: string[] = [];

    @DisplayName('Fax')
    facsimile: string[] = [];

    toString() {
        return 'Phone';
    }
}
