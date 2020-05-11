import { Component } from '@angular/core';
import { CodeType } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'gml-code-type',
    templateUrl: './CodeTypeComponent.html'
})
export class CodeTypeComponent extends TypedModelComponent<CodeType> {
    protected createModel(): CodeType {
        return undefined;
    }
}
