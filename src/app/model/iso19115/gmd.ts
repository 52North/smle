
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

/**
 * Telephone numbers for contacting the responsible individual or organisation
 */
export class Phone {
  voice: string[];
  facsimile: string[];
}

/**
 * Information about online sources from which the dataset, specification, or
 * community profile name and extended metadata elements can be obtained.
 */
export class OnlineResource {
  linkage: string;
  protocol: string;
  applicationProfile: string;
  name: string;
  description: string;
  function: OnlineFunction;
}

/**
 * Location of the responsible individual or organisation
 */
export class Address {
  deliveryPoint: string[];
  city: string;
  administrativeArea: string;
  postalCode: string;
  country: string;
  electronicMailAddress: string[];
}

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
}

/**
 * Restrictions and legal prerequisites for accessing and using the dataset.
 */
export class LegalConstraints {
  accessConstraints: Restriction[];
  useConstraints: Restriction[];
  otherConstraints: string[];
}

/**
 * limitation(s) placed upon the access or use of the data
 */
export type Restriction =
  /**
   * exclusive right to the publication, production, or sale of the rights to a
   * literary, dramatic, musical, or artistic work, or to the use of a
   * commercial print or label, granted by law for a specified period of time to
   * an author, composer, artist, distributor
   */
  'copyright' |
  /**
   * government has granted exclusive right to make, sell, use or license an
   * invention or discovery
   */
  'patent' |
  /**
   * produced or sold information awaiting a patent
   */
  'patentPending' |
  /**
   * a name, symbol, or other device identifying a product, officially
   * registered and legally restricted to the use of the owner or manufacturer
   */
  'trademark' |
  /**
   * formal permission to do something
   */
  'license' |
  /**
   * rights to financial benefit from and control of distribution of
   * non-tangible property that is a result of creativity
   */
  'intellectualPropertyRights' |
  /**
   * withheld from general circulation or disclosure
   */
  'restricted' |
  /**
   * limitation not listed
   */
  'otherRestrictions';


/**
 * function performed by the responsible party
 */
export type Role =
  /**
   * party that supplies the resource
   */
  'resourceProvider' |
  /**
   * party that accepts accountability and responsability for the data and
   * ensures appropriate care and maintenance of the resource
   */
  'custodian' |
  /**
   * party who uses the resource
   */
  'user' |
  /**
   * party who created the resource
   */
  'originator' |
  /**
   * party who can be contacted for acquiring knowledge about or acquisition
   * of the resource
   */
  'pointOfContact' |
  /**
   * key party responsible for gathering information and conducting research
   */
  'principalInvestigator' |
  /**
   * party wha has processed the data in a manner such that the resource has
   * been modified
   */
  'processor' |
  /**
   * party who published the resource
   */
  'publisher' |
  /**
   * party who authored the resource
   */
  'author';

/**
 * function performed by the resource
 */
export type OnlineFunction =
  /**
   * online instructions for transferring data from one storage device or system
   * to another
   */
  'download' |
  /**
   * online information about the resource
   */
  'information' |
  /**
   * online instructions for requesting the resource from the provider
   */
  'offlineAccess' |
  /**
   * online order process for obtening the resource
   */
  'order' |
  /**
   * online search interface for seeking out information about the resource
   */
  'search';
