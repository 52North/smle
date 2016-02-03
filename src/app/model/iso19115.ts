export class Contact {
    phone: Phone;
    address: Address;
    onlineResource: OnlineResource;
    hoursOfService: string;
    contactInstructions: string;
    constructor() {}
}

export class Phone {
    voice: string[];
    facsimile: string[];
    constructor() {}
}

export class OnlineResource {
    linkage: string;
    protocol: string;
    applicationProfile: string;
    name: string;
    description: string;
    function: OnlineFunction;
    constructor() {}
}

export class Address {
    deliveryPoint: string[];
    city: string;
    adminstrativeArea: string;
    postalCode: string;
    country: string;
    electronicMailAddress: string[];
    constructor() {}
}

export class ResponsibleParty {
    individualName: string;
    organisationName: string;
    positionName: string;
    contactInfo: Contact;
    role: Role;
    constructor() {}
}

export class LegalConstraints {
    accessConstraints: Restriction[];
    useConstraints: Restriction[];
    otherConstraints: string[];
    constructor() {}
}   

export enum Restriction {}
export enum Role {}
export enum OnlineFunction {}
