import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NercVocabularyDecoderService } from './nerc/decoder';
import { VocabularyEntry } from './nerc/model';

@Injectable()
export class VocabularyService {

  private proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  private nercUrl = 'http://vocab.nerc.ac.uk/collection/';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getIdentificationList(): Observable<VocabularyEntry[]> {
    return this.httpClient
      .get(this.proxyUrl + this.nercUrl + 'W07/current/', { responseType: 'text' })
      .map(res => {
        return new NercVocabularyDecoderService().deserialize(res);
      });
  }

}
