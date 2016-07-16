import {Phone} from './Phone';
import {Address} from './Address';
import {OnlineResource} from './OnlineResource';
import {DisplayName} from '../../../decorators/DisplayName';

/**
 * Information required enabling contact with the  responsible person and/or
 * organisation
 */
export class Contact {
    @DisplayName('Phone')
    phone: Phone = new Phone();

    @DisplayName('Address')
    address: Address = new Address();

    @DisplayName('Online resource')
    onlineResource: OnlineResource = new OnlineResource();

    @DisplayName('Hours of service')
    hoursOfService: string;

    @DisplayName('Contact instructions')
    contactInstructions: string;

    toString() {
        return 'Contact';
    }
}
