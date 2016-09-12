import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Address } from '../../../../model/iso/gmd/Address';
import { CardComponent } from '../../basic/CardComponent';
import { StringsComponent } from '../../basic/StringsComponent';
import { EditorComponent } from '../../base/EditorComponent';
import { TextFieldComponent } from '../../basic/TextFieldComponent';

@Component({
  selector: 'iso-address',
  template: require('./AddressComponent.html'),
  styles: [require('../../styles/editor-component.scss')]
})
export class AddressComponent extends EditorComponent<Address> {
  constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
    super(componentFactoryResolver, viewContainerRef);
  }

  protected createModel(): Address {
    return new Address();
  }
}
