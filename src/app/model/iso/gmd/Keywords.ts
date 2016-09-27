import { Citation } from './Citation';
import { KeywordType } from './KeywordType';
import { DisplayName } from '../../../decorators/DisplayName';

export class Keywords {
    @DisplayName('Keywords')
    keywords: string[] = [];

    @DisplayName('Type')
    type: KeywordType;

    @DisplayName('Thesaurus name')
    thesaurusName: Citation;

    toString() {
        return 'Keywords';
    }
}
