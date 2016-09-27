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
import { DisplayName } from '../../decorators/DisplayName';

/**
 * A time tagged Event with description and relevant property values.
 */
export class Event extends AbstractSWEIdentifiable {
    @DisplayName('Definition')
    definition: CodeWithAuthority;
    /**
     * keywords useful for discovery of the event
     */
    @DisplayName('Keywords')
    keywords: KeywordList[] = [];
    /**
     * Identifiers relevant to the event
     */
    @DisplayName('Identification')
    identification: IdentifierList[] = [];
    /**
     * Type of event (useful for discovery)
     */
    @DisplayName('Classification')
    classification: ClassifierList[] = [];
    /**
     * Persons or parties relevant to this event
     */
    @DisplayName('Contacts')
    contacts: ContactList[] = [];
    /**
     * Additional documentation relevant to this event
     */
    @DisplayName('Documentation')
    documentation: DocumentList[] = [];
    /**
     * DateTime of the event
     */
    @DisplayName('Time')
    time: AbstractTime = null;
    /**
     * Properties of interest to the event (e.g. calibration values, condition
     * category, error codes, etc)
     */
    @DisplayName('Properties')
    properties: SweDataComponent[] = [];
    /**
     * Configuration settings adjusted during event
     */
    @DisplayName('Configuration')
    configuration: Settings;

    toString() {
        return super.toString('Event');
    }
}
