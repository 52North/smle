import { Component } from '@angular/core';

import { AssociationAttributeGroup } from '../../../model/gml/AssociationAttributeGroup';
import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'gml-association-attribute-group',
    templateUrl: './AssociationAttributeGroupComponent.html'
})
export class AssociationAttributeGroupComponent extends TypedModelComponent<AssociationAttributeGroup> {
    protected createModel(): AssociationAttributeGroup {
        return undefined;
    }
}
