import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { OnlineResource } from '../../../../model/iso/gmd/OnlineResource';
import { CardComponent } from '../../basic/CardComponent';
import { EditorComponent } from '../../base/EditorComponent';
import { TextFieldComponent } from '../../basic/TextFieldComponent';

@Component({
  selector: 'iso-online-resource',
  template: require('./OnlineResourceComponent.html'),
  styles: [require('../../styles/editor-component.scss')]
})
export class OnlineResourceComponent extends EditorComponent<OnlineResource> {
  constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
    super(componentFactoryResolver, viewContainerRef);
  }

  protected createModel(): OnlineResource {
    return new OnlineResource();
  }
}
