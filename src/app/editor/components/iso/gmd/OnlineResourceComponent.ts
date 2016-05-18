import { Component } from '@angular/core';
import { OnlineResource } from '../../../../model/iso/gmd/OnlineResource';
import { AbstractComponent }  from '../../AbstractEditorComponent';
import { CardHeaderComponent } from '../../CardHeaderComponent';
@Component({
  selector: 'iso-online-resource',
  template: require('./OnlineResourceComponent.html'),
  directives: [CardHeaderComponent]
})
export class OnlineResourceComponent extends AbstractComponent<OnlineResource> {

  protected createModel(): OnlineResource {
    return new OnlineResource();
  }
}
