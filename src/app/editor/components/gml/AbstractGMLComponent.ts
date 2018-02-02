import { Component } from '@angular/core';
import { AbstractGML } from '../../../model/gml/AbstractGML';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { CodeType } from '../../../model/gml/CodeType';

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
