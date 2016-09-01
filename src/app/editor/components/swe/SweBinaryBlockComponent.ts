import { Component, ComponentResolver, ViewContainerRef } from '@angular/core';
import { TextFieldComponent } from '../basic/TextFieldComponent';
import { CardComponent } from '../basic/CardComponent';
import { SweBinaryBlock } from '../../../model/swe/SweBinaryBlock';
import { EditorComponent } from '../base/EditorComponent';
import { NumberFieldComponent } from '../basic/NumberFieldComponent';
import { AbstractSWEComponent } from './AbstractSWEComponent';

@Component({
  selector: 'swe-binary-block',
  template: require('./SweBinaryBlockComponent.html'),
  styles: [require('../styles/editor-component.scss')]
})
export class SweBinaryBlockComponent extends EditorComponent<SweBinaryBlock> {
  constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
    super(componentResolver, viewContainerRef);
  }

  protected createModel(): SweBinaryBlock {
    return new SweBinaryBlock();
  }
}
