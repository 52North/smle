import { Component } from '@angular/core';
import { AbstractGML, CodeType } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'gml-abstract',
    templateUrl: './AbstractGMLComponent.html'
})
export class AbstractGMLComponent extends TypedModelComponent<AbstractGML> {
    protected createModel(): AbstractGML {
        return undefined;
    }

    public createIdentifier() {
        this.model.identifier = new CodeType('', '');
    }
}
