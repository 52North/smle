/**
 * Location of the responsible individual or organisation
 */
export class Address {
    deliveryPoint: string[] = [];
    city: string;
    administrativeArea: string;
    postalCode: string;
    country: string;
    electronicMailAddress: string[] = [];

    toString() {
        return 'Address';
    }
}
