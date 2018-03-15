import { AbstractXmlService } from '../../AbstractXmlService';
import { DecoderUtils } from '../../xml/DecoderUtils';
import { VocabularyEntry } from '../model';
import { NERC_NAMESPACES } from './model';

export class NercVocabularyDecoderService extends AbstractXmlService<VocabularyEntry[]> {

  private utils = new DecoderUtils();

  protected decode(document: Document): VocabularyEntry[] {
    return this.decodeVocabularEntries(document.documentElement);
  }

  protected encode(object: VocabularyEntry[]): Document {
    throw new Error('Method not implemented.');
  }

  private decodeVocabularEntries(elem: Element): VocabularyEntry[] {

    const entries: VocabularyEntry[] = [];

    const collection = this.utils.getElement(elem, 'Collection', NERC_NAMESPACES.SKOS);
    if (collection) {
      this.utils.getMatchingChildElements(collection, 'member', NERC_NAMESPACES.SKOS)
        .forEach(entry => entries.push(this.createVocabularEntry(entry)));
    } else {
      entries.push(this.createVocabularEntry(elem));
    }
    return entries;
  }

  private createVocabularEntry(entry: Element): VocabularyEntry {
    const concept = this.utils.getElement(entry, 'Concept', NERC_NAMESPACES.SKOS);
    const uri = this.utils.getAttributeOfElement(entry, 'Concept', NERC_NAMESPACES.SKOS, 'about', NERC_NAMESPACES.RDF).value;
    const label = this.utils.getElement(concept, 'prefLabel', NERC_NAMESPACES.SKOS).textContent;
    const description = this.utils.getElement(concept, 'definition', NERC_NAMESPACES.SKOS).textContent;
    const narrower = this.utils.getMatchingChildElements(concept, 'narrower', NERC_NAMESPACES.SKOS).map(narr => {
      if (narr.hasAttributeNS(NERC_NAMESPACES.RDF, 'resource')) {
        return narr.getAttributeNS(NERC_NAMESPACES.RDF, 'resource');
      }
    });
    return { label, uri, description, narrower };
  }
}
