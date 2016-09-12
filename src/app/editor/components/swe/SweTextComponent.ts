import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { TextFieldComponent } from '../basic/TextFieldComponent';
import { SweText } from '../../../model/swe/SweText';
import { AbstractSimpleComponentComponent } from './AbstractSimpleComponentComponent';
import { AllowedTokensComponent } from './AllowedTokensComponent';

@Component({
  selector: 'swe-text',
  template: require('./SweTextComponent.html')
})
export class SweTextComponent extends TypedModelComponent<SweText> {
  protected createModel(): SweText {
    return new SweText();
  }
}
