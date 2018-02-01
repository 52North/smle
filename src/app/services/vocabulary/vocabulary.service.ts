import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { VocabularyType } from './model';
import { NercVocabularyDecoderService } from './nerc/decoder';
import { VocabularyEntry } from './nerc/model';

@Injectable()
export class VocabularyService {

  private proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  private nercUrl = 'http://vocab.nerc.ac.uk/collection/';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getVocabList(type: VocabularyType): Observable<VocabularyEntry[]> {
    switch (type) {
      case VocabularyType.Identifier:
        return this.getIdentificationList();
      case VocabularyType.Classifier:
        return this.getClassificationList();
      default:
        break;
    }
  }

  public getNarrower(url: string): Observable<VocabularyEntry> {
    return this.requestVocabEntry(url);
  }

  private getIdentificationList(): Observable<VocabularyEntry[]> {
    return this.requestVocabEntries('W07/current/');
  }

  private getClassificationList(): Observable<VocabularyEntry[]> {
    return this.requestVocabEntries('W06/current/');
  }

  private requestVocabEntries(path: string) {
    return this.httpClient
      .get(this.proxyUrl + this.nercUrl + path, { responseType: 'text' })
      .map(res => new NercVocabularyDecoderService().deserialize(res));
  }

  private requestVocabEntry(url: string): Observable<VocabularyEntry> {
    return this.httpClient
      .get(this.proxyUrl + url, { responseType: 'text' })
      .map(res => {
        const list = new NercVocabularyDecoderService().deserialize(res);
        if (list.length === 1) {
          return list[0];
        } else {
          return null;
        }
      });
  }

}
