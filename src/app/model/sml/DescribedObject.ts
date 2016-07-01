import { AbstractFeature } from '../gml/AbstractFeature';
import { KeywordList } from './KeywordList';
import { IdentifierList } from './IdentifierList';
import { ClassifierList } from './ClassifierList';
import { AbstractTime } from '../gml/AbstractTime';
import { LegalConstraints } from '../iso/gmd/LegalConstraints';
import { CharacteristicList } from './CharacteristicList';
import { CapabilityList } from './CapabilityList';
import { ContactList } from './ContactList';
import { EventList } from './EventList';
import { DocumentList } from './DocumentList';
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
  validTime: AbstractTime[] = [];
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
