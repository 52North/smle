import { Component } from '@angular/core';

import { ResponsibleParty } from '../../../model/iso';
import { ContactList } from '../../../model/sml';
import { ConfigurationService } from '../../../services/ConfigurationService';
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
    private configuration: ConfigurationService
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
    this.configuration.getConfig().subscribe(smleConfig => {
      let options: ChildMetadataOptions;
      if (smleConfig.showContactVocabularySelection) {
        options = { vocabularyType: VocabularyType.Contact };
      }
      this.openNewChild(new ChildMetadata(ResponsiblePartyComponent, item, newLocal, options));
    });
  }
}
