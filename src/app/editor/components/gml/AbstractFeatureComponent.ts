import { Component } from '@angular/core';
import { AbstractFeature } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'gml-abstract-feature',
    templateUrl: './AbstractFeatureComponent.html'
})
export class AbstractFeatureComponent extends TypedModelComponent<AbstractFeature> {
    protected createModel(): AbstractFeature {
        return undefined;
    }
}
