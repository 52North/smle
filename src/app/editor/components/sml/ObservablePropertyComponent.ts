import { Component } from '@angular/core';
import { ObservableProperty } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'sml-observable-property',
    templateUrl: './ObservablePropertyComponent.html'
})
export class ObservablePropertyComponent extends TypedModelComponent<ObservableProperty> {

    protected createModel(): ObservableProperty {
        return new ObservableProperty();
    }
}
