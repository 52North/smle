import { DisplayName } from '../../../common/decorators/DisplayName';
/**
 * Location of the responsible individual or organisation
 */
export class Address {
    @DisplayName('Delivery point')
    deliveryPoint: string[] = [];

    @DisplayName('City')
    city: string;

    @DisplayName('Administrative area')
    administrativeArea: string;

    @DisplayName('Postal code')
    postalCode: string;

    @DisplayName('Country')
    country: string;

    @DisplayName('E-mail')
    electronicMailAddress: string[] = [];

    toString() {
        return 'Address';
    }
}
