import { Contact } from './Contact';
import { Role } from './Role';
import { DisplayName } from '../../../common/decorators/DisplayName';

/**
 * Identification of, and means of communication with, person(s) and
 * organisations associated with the dataset
 */
export class ResponsibleParty {
    @DisplayName('Individual name')
    individualName: string;

    @DisplayName('Organisation name')
    organisationName: string;

    @DisplayName('Position name')
    positionName: string;

    @DisplayName('Contact info')
    contactInfo: Contact;

    @DisplayName('Role')
    role: Role;

    toString() {
        return 'Responsible party';
    }

    getLabel() {
        if (this.individualName) {
            return this.individualName;
        } else {
            return this.toString();
        }
    }

    getValue() {
        if (this.organisationName) {
            return this.organisationName;
        }
    }
}
