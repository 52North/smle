
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

export class Keywords {
  keywords: string[] = [];
  type: KeywordType;
  thesaurusName: Citation;
}

export class Citation {
  title: string;
  alternateTitle: string[];
  date: IsoDate;
  edition: string;
  editionDate: Date;
  identifier: Identifier;
  citedResponsibleParty: ResponsibleParty[];
  presentationForm: PresentationForm[];
  series: Series;
  otherCitationDetais: string;
  collectiveTitle: string;
  isbn: string;
  issn: string;
}

export class Identifier {
  authority: Citation;
  code: string;
}

export class Series {
  name: string;
  issueIdentification: string;
  page: string;
}


export class IsoDate {
  type: DateType;
  date: Date;
}
/**
 * identification of when a given event occurred
 */
export type DateType =
  /**
   * date identifies when the resource was brought into existence
   */
  'creation' |
  /**
   * date identifies when the resource was issued
   */
  'publication' |
  /**
   * date identifies when the resource was examined or re-examined and imporved or amended
   */
  'revision';


/**
 * mode in which the data is represented
 */
export type PresentationForm =
  /**
   * digital representation of a primarily textual item (can contain illustrations also)
   */
  'documentDigital' |
  /**
   * representation of a primarily textual item (can contain illustrations also)
   * on paper, photograhic material, or other media
   */
  'imageDigital' |
  /**
   * likeness of natural or man-made features, objects, and activities acquired
   * through the sensing of visual or any other segment of the electromagnetic
   * spectrum by sensors, such as thermal infrared, and high resolution radar
   * and stored in digital format
   */
  'documentHardcopy' |
  /**
   * likeness of natural or man-made features, objects, and activities acquired
   * through the sensing of visual or any other segment of the electromagnetic
   * spectrum by sensors, such as thermal infrared, and high resolution radar
   * and reproduced on paper, photographic material, or other media for use
   * directly by the human user
   */
  'imageHardcopy' |
  /**
   * map represented in raster or vector form
   */
  'mapDigital' |
  /**
   * map printed on paper, photographic material, or other media for use
   * directly by the human user
   */
  'mapHardcopy' |
  /**
   * multi-dimensional digital representation of a feature, process, etc.
   */
  'modelDigital' |
  /**
   * 3-dimensional, physical model
   */
  'modelHardcopy' |
  /**
   * vertical cross-section in digital form
   */
  'profileDigital' |
  /**
   * vertical cross-section printed on paper, etc.
   */
  'profileHardcopy' |
  /**
   * digital representation of facts or figures systematically displayed,
   * especially in columns
   */
  'tableDigital' |
  /**
   * representation of facts or figures systematically displayed, especially
   * in columns, printed onpapers, photographic material, or other media
   */
  'tableHardcopy' |
  /**
   * digital video recording
   */
  'videoDigital' |
  /**
   * video recording on film
   */
  'videoHardcopy';

/**
 * methods used to group similar keywords
 */
export type KeywordType =
  /**
   * keyword identifies a branch of instruction or specialized learning
   */
  'discipline' |
  /**
   * keyword identifies a location
   */
  'place' |
  /**
   * keyword identifies the layer(s) of any deposited substance
   */
  'stratum' |
  /**
   * keyword identifies a time period related to the dataset
   */
  'temporal' |
  /**
   * keyword identifies a particular subject or topic
   */
  'theme';

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
