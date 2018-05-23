import { Component } from '@angular/core';

import { FeatureList } from '../../../model/sml';
import { FeatureProperty } from '../../../model/sml/FeatureProperty';
import { ChildMetadata } from '../base/ChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { FeaturePropertyComponent } from './FeaturePropertyComponent';

@Component({
    selector: 'sml-feature-of-interest-list',
    templateUrl: './FeatureOfInterestListComponent.html'
})
export class FeatureOfInterestListComponent extends TypedModelComponent<FeatureList> {

    protected createModel(): FeatureList {
        return new FeatureList();
    }

    protected openNewFeatureProperty(feature: FeatureProperty) {
        this.openNewChild(
            new ChildMetadata(FeaturePropertyComponent, feature, this.config.getConfigFor('sml:feature'))
        );
    }

    protected onAddFeatureProperty(): void {
        const feature = new FeatureProperty();
        this.model.feature.push(feature);
    }

    protected onRemoveFeatureProperty(index: number): void {
        this.model.feature.splice(index, 1);
    }

}
