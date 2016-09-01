import { Component } from '@angular/core';
import { CodeType } from '../../../model/gml/CodeType';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { TextFieldComponent } from '../basic/TextFieldComponent';

@Component({
  selector: 'gml-code-type',
  template: require('./CodeTypeComponent.html')
})
export class CodeTypeComponent extends TypedModelComponent<CodeType> {
  protected createModel(): CodeType {
    return undefined;
  }
}
