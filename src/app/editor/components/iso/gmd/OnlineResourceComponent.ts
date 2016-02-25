
import { Component } from 'angular2/core';
import { OnlineResource } from '../../../../model/iso/gmd/OnlineResource';
import { AbstractComponent }  from '../../AbstractEditorComponent';
import { CardHeaderComponent } from '../../CardHeaderComponent';
@Component({
  selector: 'isoOnlineResource',
  template: require('./OnlineResourceComponent.html'),
  directives: [CardHeaderComponent]
})
export class OnlineResourceComponent extends AbstractComponent<OnlineResource> {

  protected createModel(): OnlineResource {
    return new OnlineResource();
  }
}
