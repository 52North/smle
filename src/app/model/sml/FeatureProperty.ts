import { DisplayName } from '../../common/decorators/DisplayName';
import { AbstractFeature } from '../gml';
import { AssociationAttributeGroup } from '../gml/AssociationAttributeGroup';

export class FeatureProperty extends AbstractFeature implements AssociationAttributeGroup {

    @DisplayName('Href')
    href: string;

    @DisplayName('Title')
    title: string;

    toString() {
        if (this.href && this.title) {
            return this.href + ' - ' + this.title;
        } else if (this.href) {
            return this.href;
        }
        return 'Feature property';
    }
}
