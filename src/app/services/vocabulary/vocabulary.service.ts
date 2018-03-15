import { Observable } from 'rxjs/Observable';

import { VocabularyEntry, VocabularyType } from './model';

export abstract class VocabularyService {

  public abstract getVocabList(type: VocabularyType): Observable<VocabularyEntry[]>;

  public abstract getNarrower(url: string): Observable<VocabularyEntry>;

  public abstract searchVocabEntries(type: VocabularyType, searchTerm: string): Observable<VocabularyEntry[]>;

}
