import { Component,ComponentResolver,ViewContainerRef } from '@angular/core';
import { Contact } from '../../../../model/iso/gmd/Contact';
import { AbstractComponent }  from '../../AbstractComponent';
import { AddressComponent } from './AddressComponent';
import { PhoneComponent } from './PhoneComponent';
import { OnlineResourceComponent } from './OnlineResourceComponent';
import { CardHeaderComponent } from '../../CardHeaderComponent';

@Component({
  selector: 'iso-contact',
  template: require('./ContactComponent.html'),
  directives: [CardHeaderComponent, AddressComponent, PhoneComponent, OnlineResourceComponent]
})
export class ContactComponent extends AbstractComponent<Contact> {
  constructor(componentResolver:ComponentResolver,
              viewContainerRef:ViewContainerRef) {
    super(componentResolver, viewContainerRef);
  }
  
  protected createModel(): Contact {
    return new Contact();
  }
}
