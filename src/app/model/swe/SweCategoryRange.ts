import { AbstractSweRange } from './AbstractSweRange';
import { AllowedTokens } from './AllowedTokens';
import { DisplayName } from '../../common/decorators/DisplayName';

/**
 * Pair of categorical values used to specify a range in an ordinal
 * reference system (specified by the code space)
 */
export class SweCategoryRange extends AbstractSweRange {
    /**
     * Value is a pair of tokens separated by a space (if tokens contain spaces,
     * they must be espaced by using XML entities). It is optional, to enable
     * structure to act as a schema for values provided using other encodings
     */
    @DisplayName('Value')
    value: [string, string];
    /**
     * Name of the dictionary defining an ordered set of values with respect to
     * which the range is expressed (ordinal reference system)
     */
    @DisplayName('Code space')
    codeSpace: string;

    @DisplayName('Constraint')
    constraint: AllowedTokens;

    toString() {
        return super.toString('SWE category range');
    }
}
