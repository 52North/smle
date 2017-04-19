import { DisplayName } from '../../common/decorators/DisplayName';
/**
 * gml:CodeType is a generalized type to be used for a term, keyword or name.
 * It adds a XML attribute codeSpace to a term, where the value of the codeSpace
 * attribute (if present) shall indicate a dictionary, thesaurus, classification
 * scheme, authority, or pattern for the term.
 */
export class CodeType {
    @DisplayName('Value')
    value: string;

    @DisplayName('Code space')
    codeSpace: string;

    constructor(value: string, codeSpace: string = null) {
        this.value = value;
        this.codeSpace = codeSpace;
    }

    toString() {
        return this.value && this.value.length ? this.value : 'Code type';
    }
}
