
import { Phone } from './Phone';
import { Address } from './Address';
import { OnlineResource } from './OnlineResource';

/**
 * Information required enabling contact with the  responsible person and/or
 * organisation
 */
export class Contact {
  phone: Phone;
  address: Address;
  onlineResource: OnlineResource;
  hoursOfService: string;
  contactInstructions: string;
}
