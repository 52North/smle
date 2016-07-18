import {AbstractMetadataList} from './AbstractMetadataList';
import {AbstractFeature} from '../gml/AbstractFeature';
import {DisplayName} from '../../decorators/DisplayName';

export class FeatureList extends AbstractMetadataList {
    @DisplayName('Features')
    features: AbstractFeature[] = [];

    toString() {
        return 'Feature list';
    }
}
