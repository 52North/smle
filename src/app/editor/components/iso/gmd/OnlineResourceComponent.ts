import { Component,ComponentResolver,ViewContainerRef } from '@angular/core';
import { OnlineResource } from '../../../../model/iso/gmd/OnlineResource';
import { AbstractComponent }  from '../../AbstractComponent';
import { CardHeaderComponent } from '../../CardHeaderComponent';
@Component({
  selector: 'iso-online-resource',
  template: require('./OnlineResourceComponent.html'),
  directives: [CardHeaderComponent]
})
export class OnlineResourceComponent extends AbstractComponent<OnlineResource> {

  constructor(componentResolver:ComponentResolver,
              viewContainerRef:ViewContainerRef) {
    super(componentResolver, viewContainerRef);
  }
  
  protected createModel(): OnlineResource {
    return new OnlineResource();
  }
}
