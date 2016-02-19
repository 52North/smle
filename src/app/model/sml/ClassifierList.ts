import { AbstractMetadataList } from './AbstractMetadataList';
import { Term } from './Term';


export class ClassifierList extends AbstractMetadataList {
  classifiers: Term[] = [];
}
