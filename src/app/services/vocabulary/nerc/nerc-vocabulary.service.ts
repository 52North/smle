import { Injectable } from '@angular/core';
import { HttpService } from '@helgoland/core';
import { Observable, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';

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
        return observableOf([]);
    }
  }

  public getNarrower(url: string): Observable<VocabularyEntry> {
    return this.requestVocabEntry(url);
  }

  public searchVocabEntries(type: VocabularyType, searchTerm: string): Observable<VocabularyEntry[]> {
    switch (type) {
      case VocabularyType.Identifier:
        return this.searchIdentificationEntries(searchTerm);
      case VocabularyType.Classifier:
        return this.searchClassificationEntries(searchTerm);
      case VocabularyType.Characteristic:
        return this.searchCharacteristicEntries(searchTerm);
      case VocabularyType.Capability:
        return this.searchCapabilityEntries(searchTerm);
      case VocabularyType.Contact:
        return this.searchContactEntries(searchTerm);
      case VocabularyType.HistoryEvent:
        return this.searchHistoryEventEntries(searchTerm);
      default:
        return observableOf([]);
    }
  }

  private searchIdentificationEntries(searchTerm: string): Observable<VocabularyEntry[]> {
    return this.httpService.client()
      .get<NercSparqlResponse>(this.sparqlUrl, {
        params: {
          query:
            'BASE <http://vocab.nerc.ac.uk/collection/> ' +
            'PREFIX dc:<http://purl.org/dc/elements/1.1/> ' +
            'PREFIX skos:<http://www.w3.org/2004/02/skos/core#> ' +
            'PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> ' +
            'SELECT ?uri ?id ?label ?definition (COUNT(?narrower) AS ?count)' +
            'WHERE  {' +
            '?uri skos:prefLabel ?label ;' +
            'skos:definition ?definition ;' +
            'dc:identifier   ?id .' +
            'OPTIONAL { ?uri  skos:narrower  ?narrower }' +
            'VALUES ?query { "' + searchTerm + '" }' +
            'FILTER (' +
            '(CONTAINS(LCASE(?id), LCASE(?query)) || CONTAINS(LCASE(?label), LCASE(?query))) && regex(str(?uri), "W07/current")' +
            ')' +
            '}' +
            'GROUP BY ?uri ?id ?label ?definition',
          output: 'json'
        }
      }).pipe(map(res => this.mapSparqlResponse(res)));
  }

  private searchHistoryEventEntries(searchTerm: string): Observable<VocabularyEntry[]> {
    return this.httpService.client()
      .get<NercSparqlResponse>(this.sparqlUrl, {
        params: {
          query:
            'BASE <http://vocab.nerc.ac.uk/collection/> ' +
            'PREFIX dc:<http://purl.org/dc/elements/1.1/> ' +
            'PREFIX skos:<http://www.w3.org/2004/02/skos/core#> ' +
            'PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> ' +
            'SELECT ?uri ?id ?label ?definition (COUNT(?narrower) AS ?count)' +
            'WHERE  {' +
            '?uri skos:prefLabel ?label ;' +
            'skos:definition ?definition ;' +
            'dc:identifier   ?id .' +
            'OPTIONAL { ?uri  skos:narrower  ?narrower }' +
            'VALUES ?query { "' + searchTerm + '" }' +
            'FILTER (' +
            '(CONTAINS(LCASE(?id), LCASE(?query)) || CONTAINS(LCASE(?label), LCASE(?query))) && regex(str(?uri), "W03/current")' +
            ')' +
            '}' +
            'GROUP BY ?uri ?id ?label ?definition',
          output: 'json'
        }
      }).pipe(map(res => this.mapSparqlResponse(res)));
  }

  private searchContactEntries(searchTerm: string): Observable<VocabularyEntry[]> {
    return this.httpService.client()
      .get<NercSparqlResponse>(this.sparqlUrl, {
        params: {
          query:
            'BASE <http://vocab.nerc.ac.uk/collection/> ' +
            'PREFIX dc:<http://purl.org/dc/elements/1.1/> ' +
            'PREFIX skos:<http://www.w3.org/2004/02/skos/core#> ' +
            'PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> ' +
            'SELECT ?uri ?id ?label ?definition (COUNT(?narrower) AS ?count)' +
            'WHERE  {' +
            '?uri skos:prefLabel ?label ;' +
            'skos:definition ?definition ;' +
            'dc:identifier   ?id .' +
            'OPTIONAL { ?uri  skos:narrower  ?narrower }' +
            'VALUES ?query { "' + searchTerm + '" }' +
            'FILTER (' +
            '(CONTAINS(LCASE(?id), LCASE(?query)) || CONTAINS(LCASE(?label), LCASE(?query))) && regex(str(?uri), "W08/current")' +
            ')' +
            '}' +
            'GROUP BY ?uri ?id ?label ?definition',
          output: 'json'
        }
      }).pipe(map(res => this.mapSparqlResponse(res)));
  }

  private searchCapabilityEntries(searchTerm: string): Observable<VocabularyEntry[]> {
    return this.httpService.client()
      .get<NercSparqlResponse>(this.sparqlUrl, {
        params: {
          query:
            'BASE <http://vocab.nerc.ac.uk/collection/> ' +
            'PREFIX dc:<http://purl.org/dc/elements/1.1/> ' +
            'PREFIX skos:<http://www.w3.org/2004/02/skos/core#> ' +
            'PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> ' +
            'SELECT ?uri ?id ?label ?definition (COUNT(?narrower) AS ?count)' +
            'WHERE  {' +
            '?uri skos:prefLabel ?label ;' +
            'skos:definition ?definition ;' +
            'dc:identifier   ?id .' +
            'OPTIONAL { ?uri  skos:narrower  ?narrower }' +
            'VALUES ?query { "' + searchTerm + '" }' +
            'FILTER (' +
            '(CONTAINS(LCASE(?id), LCASE(?query)) || CONTAINS(LCASE(?label), LCASE(?query))) && regex(str(?uri), "W04/current")' +
            ')' +
            '}' +
            'GROUP BY ?uri ?id ?label ?definition',
          output: 'json'
        }
      }).pipe(map(res => this.mapSparqlResponse(res)));
  }

  private searchCharacteristicEntries(searchTerm: string): Observable<VocabularyEntry[]> {
    return this.httpService.client()
      .get<NercSparqlResponse>(this.sparqlUrl, {
        params: {
          query:
            'BASE <http://vocab.nerc.ac.uk/collection/> ' +
            'PREFIX dc:<http://purl.org/dc/elements/1.1/> ' +
            'PREFIX skos:<http://www.w3.org/2004/02/skos/core#> ' +
            'PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> ' +
            'SELECT ?uri ?id ?label ?definition (COUNT(?narrower) AS ?count)' +
            'WHERE  {' +
            '?uri skos:prefLabel ?label ;' +
            'skos:definition ?definition ;' +
            'dc:identifier   ?id .' +
            'OPTIONAL { ?uri  skos:narrower  ?narrower }' +
            'VALUES ?query { "' + searchTerm + '" }' +
            'FILTER (' +
            '(CONTAINS(LCASE(?id), LCASE(?query)) || CONTAINS(LCASE(?label), LCASE(?query))) && regex(str(?uri), "W05/current")' +
            ')' +
            '}' +
            'GROUP BY ?uri ?id ?label ?definition',
          output: 'json'
        }
      }).pipe(map(res => this.mapSparqlResponse(res)));
  }

  private searchClassificationEntries(searchTerm: string): Observable<VocabularyEntry[]> {
    return this.httpService.client()
      .get<NercSparqlResponse>(this.sparqlUrl, {
        params: {
          query: 'BASE <http://vocab.nerc.ac.uk/collection/> ' +
            'PREFIX dc:<http://purl.org/dc/elements/1.1/> ' +
            'PREFIX skos:<http://www.w3.org/2004/02/skos/core#> ' +
            'PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> ' +
            'SELECT ?uri ?id ?label ?definition (COUNT(?narrower) AS ?count)' +
            'WHERE  {' +
            '?uri skos:broader* ?type ;' +
            'skos:prefLabel ?label ;' +
            'skos:definition ?definition ;' +
            'dc:identifier ?id .' +
            'OPTIONAL { ?uri  skos:narrower ?narrower }' +
            'VALUES ?query { "' + searchTerm + '" }' +
            'FILTER (' +
            '(CONTAINS(LCASE(?id), LCASE(?query)) || CONTAINS(LCASE(?label), LCASE(?query))) && ' +
            '(?type = <W06/current/CLSS0001/> || ?type = <W06/current/CLSS0002/>)' +
            ')' +
            '}' +
            'GROUP BY ?uri ?id ?label ?definition ' +
            'LIMIT 999',
          output: 'json'
        }
      }).pipe(map(res => this.mapSparqlResponse(res)));
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

  private mapSparqlResponse(response: NercSparqlResponse) {
    return response.results.bindings.map(entry => {
      return {
        label: entry.label.value,
        uri: entry.uri.value,
        description: entry.definition.value,
        hasNarrower: parseInt(entry.count.value, 10) > 0 ? true : false
      };
    });
  }

  private requestVocabEntries(path: string): Observable<VocabularyEntry[]> {
    return this.httpService.client()
      .get(this.proxyUrl + this.nercUrl + path, { responseType: 'text' }).pipe(
        map(res => new NercVocabularyDecoderService().deserialize(res)));
  }

  private requestVocabEntry(url: string): Observable<VocabularyEntry> {
    return this.httpService.client()
      .get(this.proxyUrl + url, { responseType: 'text' }).pipe(
        map(res => {
          const list = new NercVocabularyDecoderService().deserialize(res);
          if (list.length === 1) {
            return list[0];
          } else {
            return null;
          }
        }));
  }

}
