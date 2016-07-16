import { Citation } from './Citation';
import { KeywordType } from './KeywordType';

export class Keywords {
  keywords: string[] = [];
  type: KeywordType;
  thesaurusName: Citation;

  toString() {
    return 'Keywords';
  }
}
