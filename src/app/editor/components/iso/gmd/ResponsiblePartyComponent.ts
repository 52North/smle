import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';

import { Contact } from '../../../../model/iso/gmd/Contact';
import { ResponsibleParty } from '../../../../model/iso/gmd/ResponsibleParty';
import { ChildMetadata } from '../../base/ChildMetadata';
import { EditorComponent } from '../../base/EditorComponent';
import { SelectionResult, VocabSelectionComponent } from '../../vocabulary/vocab-selection/vocab-selection.component';
import { ContactComponent } from './ContactComponent';

@Component({
  selector: 'iso-responsible-party',
  templateUrl: './ResponsiblePartyComponent.html',
  styleUrls: ['../../styles/editor-component.scss']
})
export class ResponsiblePartyComponent extends EditorComponent<ResponsibleParty> {

  public title = 'Responsible Party';

  protected defaultRoles = [
    { label: 'Resource Provider', value: 'resourceProvider' },
    { label: 'Custodian', value: 'custodian' },
    { label: 'User', value: 'user' },
    { label: 'Originator', value: 'originator' },
    { label: 'Point Of Contact', value: 'pointOfContact' },
    { label: 'Principal Investigator', value: 'principalInvestigator' },
    { label: 'Processor', value: 'processor' },
    { label: 'Publisher', value: 'publisher' },
    { label: 'Author', value: 'author' },
    { label: 'Owner', value: 'owner' }
  ];

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef,
    private modalService: NgbModal
  ) {
    super(componentFactoryResolver, viewContainerRef);
  }

  protected createModel(): ResponsibleParty {
    return new ResponsibleParty();
  }

  onAddContact() {
    this.model.contactInfo = new Contact();
  }

  onRemoveContact() {
    this.closeChildWithModel(this.model.contactInfo);
    this.model.contactInfo = null;
  }

  public onClickVocabSelection() {
    const ref = this.modalService.open(VocabSelectionComponent);
    (ref.componentInstance as VocabSelectionComponent).vocabularyConfig = this.componentOptions.vocabularyConfig;
    ref.result.then((result: SelectionResult) => {
      if (result) {
        const match = this.defaultRoles.find(e => e.value === result.label || e.label === result.label);
        if (match) {
          this.model.role = match.value;
        } else {
          this.defaultRoles.push({ label: result.label, value: result.label });
          this.model.role = result.label;
        }
      }
    });
  }

  protected openNewContactInfoItem(item: Contact) {
    const metadata = new ChildMetadata(ContactComponent, item, this.config.getConfigFor('contactInfo'));
    this.openNewChild(metadata);
  }
}
