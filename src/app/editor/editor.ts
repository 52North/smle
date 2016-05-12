import { Component, Injectable, OnInit, Input, Injector, DynamicComponentLoader, ViewContainerRef, ComponentRef } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { AbstractProcess, SimpleProcess, AggregateProcess, PhysicalComponent, PhysicalSystem, ContactList } from '../model/sml';
import { ResponsibleParty, Contact } from '../model/iso/gmd';
import { DescriptionRepository } from '../services/DescriptionRepository';
import { SensorMLDocumentEncoder } from '../services/xml/SensorMLDocumentEncoder';
import { ResponsiblePartyComponent } from './components/iso/gmd/ResponsiblePartyComponent';
import { ContactComponent } from './components/iso/gmd/ContactComponent';
import { AddressListComponent } from './components/iso/gmd/AddressListComponent';
import { ContactsComponent } from './components/sml/ContactsComponent';
import { SensorMLPipe } from './pipes/SensorMLPipe';
//import { AbstractComponent } from './components/AbstractEditorComponent';

@Component({
  selector: 'editor',
  template: require('./editor.html'),
  styles: [require('./editor.scss')],
  directives: [ResponsiblePartyComponent, ContactsComponent, AddressListComponent],
  pipes: [SensorMLPipe]
})
export class Editor implements OnInit {

  @Input()
  public description: AbstractProcess;
  private id: string;

  constructor(
    private service: DescriptionRepository,
    routeParams: RouteParams,
    private dcl: DynamicComponentLoader,
    private vcr: ViewContainerRef
  ) {
    this.id = routeParams.get('id');
  }

  ngOnInit(): void {
    if (this.id === 'new') {
      this.description = new SimpleProcess();
    } else {
      this.service.getDescription(this.id)
        .then(description => this.description = description);
    }
    let contactList = new ContactList();
    let respParty = new ResponsibleParty();
    let contact = new Contact();

    contact.hoursOfService = "test";

    respParty.individualName = "individualName_test";
    respParty.organisationName = "organisationName_test";
    respParty.contactInfo = contact;

    contactList.contacts.push(respParty);
    this.description.contacts.push(contactList);
  }
}
