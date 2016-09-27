import { SweEncoding } from './SweEncoding';
import { DisplayName } from '../../decorators/DisplayName';

/**
 * Parameters of the text encoding method
 */
export class SweTextEncoding extends SweEncoding {
    /**
     * Indicates whether white spaces (i.e. space, tab, CR, LF) should be
     * collapsed with separators when parsing the data stream
     */
    @DisplayName('Collapse whitespace')
    collapseWhiteSpace: boolean = true;
    /**
     * Character used as the decimal separator
     */
    @DisplayName('Decimal separator')
    decimalSeperator: string = '.';
    /**
     * Character sequence used as the token separator (i.e. between two successive
     *  values)
     */
    @DisplayName('Token separator')
    tokenSeperator: string = ';';
    /**
     * Character sequence used as the block separator (i.e. between two successive
     * blocks in the data set. The end of a block is reached once all values from
     * the data tree have been encoded once)
     */
    @DisplayName('Block separator')
    blockSeperator: string = '@@';

    toString() {
        return 'SWE text encoding';
    }
}
