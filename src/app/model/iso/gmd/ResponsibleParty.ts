import {Contact} from './Contact';
import {Role} from './Role';

/**
 * Identification of, and means of communication with, person(s) and
 * organisations associated with the dataset
 */
export class ResponsibleParty {
    individualName: string;
    organisationName: string;
    positionName: string;
    contactInfo: Contact;
    role: Role;

    toString() {
        return 'Responsible party';
    }
}
