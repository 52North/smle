import { AbstractMetadataList } from './AbstractMetadataList';
import { AbstractFeature } from '../gml/AbstractFeature';


export class FeatureList extends AbstractMetadataList {
  features: AbstractFeature[] = [];

  toString() {
    return 'Feature list';
  }
}
