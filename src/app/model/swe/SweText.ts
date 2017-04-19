import { AbstractSimpleComponent } from './AbstractSimpleComponent';
import { AllowedTokens } from './AllowedTokens';
import { DisplayName } from '../../common/decorators/DisplayName';

/**
 * Free text component used to store comments or any other type of textual
 * statement
 */
export class SweText extends AbstractSimpleComponent {
    /**
     * Value is optional, to enable structure to act as a schema for values
     * provided using other encodings
     */
    @DisplayName('Value')
    value: string;

    @DisplayName('Constraint')
    constraint: AllowedTokens = new AllowedTokens();

    toString() {
        return 'Text Component';
    }

    getValue() {
        if (this.value) {
            return this.value;
        }
    }

}
