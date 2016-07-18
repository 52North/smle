import {AbstractGML} from './AbstractGML';
import {Envelope} from './Envelope';
import {DisplayName} from '../../decorators/DisplayName';

/**
 * The basic feature model is given by the gml:AbstractFeatureType.
 * The content model for gml:AbstractFeatureType adds two specific properties
 * suitable for geographic features to the content model defined in
 * gml:AbstractGMLType.
 */
export abstract class AbstractFeature extends AbstractGML {
    /**
     * The value of the gml:boundedBy property describes an envelope that encloses
     * the entire feature instance, and is primarily useful for supporting rapid
     * searching for features that occur in a particular location.
     */
    @DisplayName('Bounded by')
    boundedBy: Envelope;
    /**
     * The value of the gml:location property describes the extent, position or
     * relative location of the feature.
     */
    @DisplayName('Location')
    location: any;

    toString() {
        return 'Abstract feature';
    }
}
