import {Component} from '@angular/core';
import {AbstractGML} from '../../../model/gml/AbstractGML';
import {CodeTypeComponent} from './CodeTypeComponent';
import {TypedModelComponent} from '../base/TypedModelComponent';
import {CodeType} from '../../../model/gml/CodeType';

@Component({
  selector: 'gml-abstract',
  template: require('./AbstractGMLComponent.html'),
  directives: [CodeTypeComponent]
})
export class AbstractGMLComponent extends TypedModelComponent<AbstractGML> {
  protected createModel(): AbstractGML {
    return undefined;
  }

  public createIdentifier() {
    this.model.identifier = new CodeType("", "");
  }
}
