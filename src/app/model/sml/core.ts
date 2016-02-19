import {
  AbstractSWE,
  AbstractSWEIdentifiable,
  SweDataStream,
  SweDataRecord,
  SweDataComponent
} from '../swe';

import {
  AbstractFeature,
  AbstractGML,
  CodeWithAuthority,
  Time
} from '../gml';

import {
  ResponsibleParty,
  OnlineResource,
  LegalConstraints
} from '../iso';

import {
  AbstractModes,
  Settings
} from './configuration';

export class Term extends AbstractSWE {
  label: string;
  codeSpace: string;
  definition: string;
  value: string;
}

/**
 * A feature with generic metadata which further clarifies the object and
 * supports object discovery.
 */
export abstract class DescribedObject extends AbstractFeature {
  /**
   * A property that allows one to extend a document using a schema in a
   * different namespace from the current schema.
   */
  extension: any[] = [];
  /**
   * A tag that identifies the language (e.g. english, french, etc.) for the
   * overall document using a two-letters code as defined by ISO 639-1.
   */
  language: string;
  /**
   * Short keywords describing the context of this document to aid in discovery.
   */
  keywords: KeywordList[] = [];
  /**
   * Identifiers useful for discovery of the process (e.g. short name, mission
   * id, wing id, serial number, etc.)
   */
  identification: IdentifierList[] = [];
  /**
   * Classifiers useful for discovery of the process (e.g. process type, sensor
   * type, intended application, etc.)
   */
  classification: ClassifierList[] = [];
  /**
   * The time instance or time range during which this instance description
   * is valid.
   */
  validTime: Time[] = [];
  /**
   * Overall security tagging of process description; individual tagging of
   * properties can be done using extension element.
   */
  securityConstraints: any[] = [];
  /**
   * Legal constraints applied to this description (e.g. copyrights, legal
   * use, etc.)
   */
  legalConstraints: LegalConstraints[] = [];
  /**
   * Useful properties of this process that do not further qualify the output
   * values (e.g. component dimensions, battery life, operational limits, etc).
   */
  characteristics: CharacteristicList[] = [];
  /**
   * Properties that further clarify or quantify the output of the process (e.g.
   * dynamic range, sensitivity, threshold, etc.). These can assist in the
   * discovery of processes that meet particular requirements.
   */
  capabilities: CapabilityList[] = [];
  /**
   * Persons or responsible parties that are relevant to this process (e.g.
   * designer, manufacturer, expert, etc.)
   */
  contacts: ContactList[] = [];
  /**
   * Additional external online documentation of relevance to this process (e.g.
   * user's guides, product manuals, specification sheets, images, technical
   * papers, etc.)
   */
  documentation: DocumentList[] = [];
  /**
   * A collection of time-tagged events relevant to this process.
   */
  history: EventList[] = [];
}

/**
 * The DataInterface description provides information sufficient for
 * "plug-and-play" access to and parsing of the data stream or file at the
 * particular IO port.
 */
export class DataInterface extends AbstractSWEIdentifiable {
  /**
   * The definition of the digital data components and encoding accessed
   * through the data interface.
   */
  data: SweDataStream;
  /**
   * A set of property values that define the type and configuration of a data
   * interface (e.g. the port settings of an RS232 interface).
   */
  interfaceParameters: SweDataRecord;
}

/**
 * A physical property that can be observed and possibly measured (e.g.
 * temperature, color, position). An ObservableProperty has unambiguous
 * definition, but does not have units of measure.
 */
export class ObservableProperty extends AbstractSWEIdentifiable {
  definition: string;
}

/**
 * The general base model for any process.
 */
export abstract class AbstractProcess extends DescribedObject {
  /**
   * An optional property that allows one to reference the process instance in
   * an online ontology or dictionary. The value of the property must be a
   * resolvable URI.
   */
  definition: string;
  /**
   * A reference to a base process from which this process inherits properties
   * and constraints (e.g. original equipment manufacturer's model description,
   * generic equation, etc.). The uniqueID of the referenced process must be
   * provided using the xlink:title attribute while the URL to the process
   * description must be provided by the xlink:href attribute.
   */
  typeOf: string = null;
  /**
   * Value settings that further constrain the properties of the base process.
   */
  configuration: Settings;
  /**
   * A collection of features relevant to a process (e.g. the Gulf of Mexico,
   * the White House, the set of all Fibonacci Numbers, etc.); can also support
   * a sampling feature. The primary purpose of the Features of Interest is to
   * support discovery.
   */
  featureOfInterest: FeatureList = new FeatureList();
  /**
   * The list of data components (and their properties and semantics) that the
   * process will accept as input; In the standard linear equation y=mx+b; x is
   * the input, m and b are the parameters, and y is the output.
   */
  inputs: InputList = new InputList();
  /**
   * The list of data components (and their properties and semantics) that the
   * process will accept as parameters; In the standard linear equation y=mx+b;
   * x is the input, m and b are the parameters, and y is the output.
   */
  outputs: OutputList = new OutputList();
  /**
   * The list of data components (and their properties and semantics) that the
   * process will accept as parameters; In the standard linear equation y=mx+b;
   * x is the input, m and b are the parameters, and y is the output.
   */
  parameters: ParameterList = new ParameterList();
  /**
   * A collection of parameters that can be set at once through the selection of
   * a particular predefined mode.
   */
  modes: AbstractModes[] = [];
}


/**
 * A time tagged Event with description and relevant property values.
 */
export class Event extends AbstractSWEIdentifiable {
  definition: CodeWithAuthority;
  /**
   * keywords useful for discovery of the event
   */
  keywords: KeywordList[] = [];
  /**
   * Identifiers relevant to the event
   */
  identification: IdentifierList[] = [];
  /**
   * Type of event (useful for discovery)
   */
  classification: ClassifierList[] = [];
  /**
   * Persons or parties relevant to this event
   */
  contacts: ContactList[] = [];
  /**
   * Additional documentation relevant to this event
   */
  documentation: DocumentList[] = [];
  /**
   * DateTime of the event
   */
  time: Time = null;
  /**
   * Properties of interest to the event (e.g. calibration values, condition
   * category, error codes, etc)
   */
  properties: SweDataComponent[] = [];
  /**
   * Configuration settings adjusted during event
   */
  configuration: Settings;
}

export abstract class AbstractMetadataList extends AbstractSWEIdentifiable {
  definition: string;
}

export abstract class AbstractNamedMetadataList extends AbstractMetadataList {
  name: string;
}

export class KeywordList extends AbstractMetadataList {
  /**
   * online dictionary or ontology which defines a collection of possible
   * keywords
   */
  codeSpace: string;
  /**
   * a short word or phrase that will aid in discovery of this object
   */
  keywords: string[] = [];
}


export class ClassifierList extends AbstractMetadataList {
  classifiers: Term[] = [];
}

export class IdentifierList extends AbstractMetadataList {
  identifiers: Term[] = [];
}

export class CharacteristicList extends AbstractNamedMetadataList {
  characteristics: Characteristic[] = [];
}

export class FeatureList extends AbstractMetadataList {
  features: AbstractFeature[] = [];
}

export class CapabilityList extends AbstractNamedMetadataList {
  capabilities: Capabilitiy[] = [];
}

export class DocumentList extends AbstractMetadataList {
  documents: OnlineResource[] = [];
}

export class ContactList extends AbstractMetadataList {
  contacts: ResponsibleParty[] = [];
}

export class EventList extends AbstractMetadataList {
  events: Event[] = [];
}

export class NamedSweDataComponent {
  name: string;
  component: SweDataComponent;
}

export type Capabilitiy = NamedSweDataComponent;
export type Characteristic = NamedSweDataComponent;

export class InputList extends AbstractSWE {
  inputs: Input[] = [];
}

export class OutputList extends AbstractSWE {
  outputs: Output[] = [];
}

export class ParameterList extends AbstractSWE {
  parameters: Parameter[] = [];
}

export class InputOrOutputOrParameter {
  name: string;
  value: SweDataComponent | ObservableProperty | DataInterface;
}

export type Input = InputOrOutputOrParameter;
export type Output = InputOrOutputOrParameter;
export type Parameter = InputOrOutputOrParameter;