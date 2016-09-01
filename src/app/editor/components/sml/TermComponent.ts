import { Component, ComponentResolver, ViewContainerRef } from '@angular/core';
import { CardComponent } from '../basic/CardComponent';
import { AbstractSWEComponent } from '../swe/AbstractSWEComponent';
import { Term } from '../../../model/sml/Term';
import { EditorComponent } from '../base/EditorComponent';
import { TextFieldComponent } from '../basic/TextFieldComponent';

@Component({
  selector: 'sml-term',
  template: require('./TermComponent.html'),
  styles: [require('../styles/editor-component.scss')]
})
export class TermComponent extends EditorComponent<Term> {
  constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
    super(componentResolver, viewContainerRef);
  }

  protected createModel(): Term {
    return new Term();
  }
}
