import { AbstractAllowedValues } from './AbstractAllowedValues';
import { DisplayName } from '../../common/decorators/DisplayName';

/**
 * Defines permitted values for the component, as an enumerated list of tokens
 * or a regular expression pattern
 */
export class AllowedTokens extends AbstractAllowedValues {
    @DisplayName('Values')
    values: string[] = [];

    @DisplayName('Pattern')
    pattern: string = '';

    toString() {
        return 'Allowed tokens';
    }
}
