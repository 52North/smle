import {Phone} from './Phone';
import {Address} from './Address';
import {OnlineResource} from './OnlineResource';

/**
 * Information required enabling contact with the  responsible person and/or
 * organisation
 */
export class Contact {
    phone: Phone = new Phone();
    address: Address = new Address();
    onlineResource: OnlineResource = new OnlineResource();
    hoursOfService: string;
    contactInstructions: string;

    toString() {
        return 'Contact';
    }
}
