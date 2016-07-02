import { CodeWithAuthority } from '../gml/CodeWithAuthority';
import { AbstractSWEIdentifiable } from '../swe/AbstractSWEIdentifiable';
import { SweDataComponent } from '../swe/SweDataComponent';
import { KeywordList } from './KeywordList';
import { IdentifierList } from './IdentifierList';
import { ClassifierList } from './ClassifierList';
import { ContactList } from './ContactList';
import { DocumentList } from './DocumentList';
import { Settings } from './Settings';
import { AbstractTime } from '../gml/AbstractTime';

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
  time: AbstractTime = null;
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
