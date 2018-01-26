import { AbstractSWE } from './AbstractSWE';
import { DisplayName } from '../../common/decorators/DisplayName';

/**
 * Base substitution groups for all SWE Common objects with
 * identification metadata
 */
export abstract class AbstractSWEIdentifiable extends AbstractSWE {
    /**
     * Unique identifier of the data component. It can be used to globally
     * identify a particular component of the dataset, a process input/output
     * or a universal constant
     */
    @DisplayName('Identifier')
    identifier: string;
    /**
     * Textual label for the data component . This is often used for displaying
     * a human readable name for a dataset field or a process input/output
     */
    @DisplayName('Label')
    label: string;
    /**
     * Textual description (i.e. human readable) of the data component usually
     * used to clarify its nature
     */
    @DisplayName('Description')
    description: string;

    toString(fallbackLabel = 'Abstract SWE identifiable') {
        return this.label ? this.label : fallbackLabel;
    }
}
