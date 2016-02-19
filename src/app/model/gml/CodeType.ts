
/**
 * gml:CodeType is a generalized type to be used for a term, keyword or name.
 * It adds a XML attribute codeSpace to a term, where the value of the codeSpace
 * attribute (if present) shall indicate a dictionary, thesaurus, classification
 * scheme, authority, or pattern for the term.
 */
export class CodeType {
  constructor(public value: string, public codeSpace: string = null) { }
}
