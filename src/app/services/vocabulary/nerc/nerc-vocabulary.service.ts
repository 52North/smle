import { Injectable } from '@angular/core';
import { HttpService } from '@helgoland/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observer } from 'rxjs/Observer';

import { VocabularyEntry, VocabularyType } from '../model';
import { VocabularyService } from '../vocabulary.service';
import { NercVocabularyDecoderService } from './decoder';
import { NercSparqlResponse } from './model';

@Injectable()
export class NercVocabularyService implements VocabularyService {

  private proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  private nercUrl = 'http://vocab.nerc.ac.uk/collection/';
  private sparqlUrl = 'http://vocab.nerc.ac.uk/sparql/sparql';

  constructor(
    private httpService: HttpService
  ) { }

  public getVocabList(type: VocabularyType): Observable<VocabularyEntry[]> {
    switch (type) {
      case VocabularyType.Identifier:
        return this.getIdentificationList();
      case VocabularyType.Classifier:
        return this.getClassificationList();
      case VocabularyType.Characteristic:
        return this.getCharacteristicList();
      case VocabularyType.Capability:
        return this.getCapabilityList();
      case VocabularyType.Contact:
        return this.getContactList();
      case VocabularyType.HistoryEvent:
        return this.getHistoryEventList();
      default:
        return Observable.of([]);
    }
  }

  public getNarrower(url: string): Observable<VocabularyEntry> {
    return this.requestVocabEntry(url);
  }

  public searchVocabEntries(type: VocabularyType, searchTerm: string): Observable<VocabularyEntry[]> {
    switch (type) {
      case VocabularyType.Identifier:
        return this.searchIdentificationEntries();
      case VocabularyType.Classifier:
        return this.searchClassificationEntries(searchTerm);
      case VocabularyType.Characteristic:
        return this.searchCharacteristicEntries();
      case VocabularyType.Capability:
        return this.searchCapabilityEntries();
      case VocabularyType.Contact:
        return this.searchContactEntries();
      case VocabularyType.HistoryEvent:
        return this.searchHistoryEventEntries();
      default:
        return Observable.of([]);
    }
  }

  private searchIdentificationEntries(): Observable<VocabularyEntry[]> {
    throw new Error('Method not implemented.');
  }

  private searchHistoryEventEntries(): Observable<VocabularyEntry[]> {
    throw new Error('Method not implemented.');
  }

  private searchContactEntries(): Observable<VocabularyEntry[]> {
    throw new Error('Method not implemented.');
  }

  private searchCapabilityEntries(): Observable<VocabularyEntry[]> {
    throw new Error('Method not implemented.');
  }

  private searchCharacteristicEntries(): Observable<VocabularyEntry[]> {
    throw new Error('Method not implemented.');
  }

  private searchClassificationEntries(searchTerm: string): Observable<VocabularyEntry[]> {
    return new Observable<VocabularyEntry[]>((observer: Observer<VocabularyEntry[]>) => {
      // Open Questions:
      //    - How can I search on specific collections (e.g. http://vocab.nerc.ac.uk/collection/W06/current/ )
      //    - How can I group a result list when I search with the narrower parameter
      this.httpService.client()
        .get<NercSparqlResponse>(this.sparqlUrl, {
          params: {
            query: 'BASE <http://vocab.nerc.ac.uk/collection/> ' +
              'PREFIX dc:<http://purl.org/dc/elements/1.1/> ' +
              'PREFIX skos:<http://www.w3.org/2004/02/skos/core#> ' +
              'PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> ' +
              'SELECT DISTINCT ?uri ?id ?label ?definition ' +
              'WHERE { ' +
              '?uri skos:broader <W06/current/CLSS0001/> ; ' +
              'skos:prefLabel  ?label ; ' +
              'dc:identifier   ?id ; ' +
              'skos:definition ?definition . ' +
              'VALUES ?query { "' + searchTerm + '" } ' +
              'FILTER (CONTAINS(LCASE(?uri),        LCASE(?query)) ' +
              '|| CONTAINS(LCASE(?id),         LCASE(?query)) ' +
              '|| CONTAINS(LCASE(?label),      LCASE(?query)) ' +
              '|| CONTAINS(LCASE(?definition), LCASE(?query))) ' +
              '} ' +
              'ORDER BY ?id ' +
              'LIMIT 10',
            output: 'json'
          }
        })
        .subscribe(res => {
          const array: Array<Observable<VocabularyEntry>> = [];
          res.results.bindings.forEach(entry => array.push(this.requestVocabEntry(entry.uri.value)));
          forkJoin(array).subscribe(
            join => observer.next(join),
            error => observer.error(error),
            () => observer.complete()
          );
        });
    });
  }

  private getIdentificationList(): Observable<VocabularyEntry[]> {
    return this.requestVocabEntries('W07/current/');
  }

  private getClassificationList(): Observable<VocabularyEntry[]> {
    return this.requestVocabEntries('W06/current/');
  }

  private getCharacteristicList(): Observable<VocabularyEntry[]> {
    return this.requestVocabEntries('W05/current/');
  }

  private getCapabilityList(): Observable<VocabularyEntry[]> {
    return this.requestVocabEntries('W04/current/');
  }

  private getContactList(): Observable<VocabularyEntry[]> {
    return this.requestVocabEntries('W08/current/');
  }

  private getHistoryEventList(): Observable<VocabularyEntry[]> {
    return this.requestVocabEntries('W03/current/');
  }

  private requestVocabEntries(path: string): Observable<VocabularyEntry[]> {
    return this.httpService.client()
      .get(this.proxyUrl + this.nercUrl + path, { responseType: 'text' })
      .map(res => new NercVocabularyDecoderService().deserialize(res));
  }

  private requestVocabEntry(url: string): Observable<VocabularyEntry> {
    return this.httpService.client()
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
