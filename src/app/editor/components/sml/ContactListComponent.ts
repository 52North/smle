import { Component } from '@angular/core';

import { configuration } from '../../../configuration';
import { ResponsibleParty } from '../../../model/iso';
import { ContactList } from '../../../model/sml';
import { VocabularyType } from '../../../services/vocabulary/model';
import { ChildMetadata, ChildMetadataOptions } from '../base/ChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { ResponsiblePartyComponent } from '../iso/gmd/ResponsiblePartyComponent';

@Component({
  selector: 'sml-contact-list',
  templateUrl: './ContactListComponent.html',
  styleUrls: ['../styles/editor-component.scss']
})
export class ContactListComponent extends TypedModelComponent<ContactList> {

  constructor(
  ) {
    super();
  }

  protected createModel() {
    return new ContactList();
  }

  protected onRemove(index: number): void {
    this.model.contacts.splice(index, 1);
  }

  protected onAdd() {
    this.model.contacts.push(new ResponsibleParty());
  }

  protected openNewResponsiblePartyItem(item: ResponsibleParty) {
    const newLocal = this.config.getConfigFor('sml:contact').getConfigFor('gmd:CI_ResponsibleParty');
    let options: ChildMetadataOptions;
    if (configuration.showContactVocabularySelection) {
      options = { vocabularyConfig: { type: VocabularyType.Contact, navigation: true } };
    }
    this.openNewChild(new ChildMetadata(ResponsiblePartyComponent, item, newLocal, options));
  }
}
