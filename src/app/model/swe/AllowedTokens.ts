import { DisplayName } from '../../common/decorators/DisplayName';
import { AbstractAllowedValues } from './AbstractAllowedValues';

/**
 * Defines permitted values for the component, as an enumerated list of tokens
 * or a regular expression pattern
 */
export class AllowedTokens extends AbstractAllowedValues {
    @DisplayName('Values')
    values: string[] = [];

    @DisplayName('Pattern')
    pattern = '';

    toString() {
        return 'Allowed tokens';
    }
}
