import { AbstractMetadataList } from './AbstractMetadataList';

export class KeywordList extends AbstractMetadataList {
  /**
   * online dictionary or ontology which defines a collection of possible
   * keywords
   */
  codeSpace: string;
  /**
   * a short word or phrase that will aid in discovery of this object
   */
  keywords: string[] = [];

  toString() {
    return 'Keyword list';
  }
}
