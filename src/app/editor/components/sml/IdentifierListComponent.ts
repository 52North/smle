import { Component } from '@angular/core';
import { IdentifierList, Term } from '@helgoland/sensorml';

import { configuration } from '../../../configuration';
import { VocabularyType } from '../../../services/vocabulary/model';
import { ChildMetadata, ChildMetadataOptions } from '../base/ChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { TermComponent } from './TermComponent';

@Component({
  selector: 'sml-identifier-list',
  templateUrl: './IdentifierListComponent.html',
  styleUrls: ['../styles/editor-component.scss']
})
export class IdentifierListComponent extends TypedModelComponent<IdentifierList> {

  constructor() {
    super();
  }

  protected createModel(): IdentifierList {
    return new IdentifierList();
  }

  protected openNewIdentifierItem(item: Term) {
    const config = this.config.getConfigFor('sml:identifier').getConfigFor('sml:Term');
    let options: ChildMetadataOptions;
    if (configuration.showIdentifierVocabularySelection) {
      options = { vocabularyConfig: { type: VocabularyType.Identifier, navigation: true } };
    }
    this.openNewChild(new ChildMetadata(TermComponent, item, config, options));
  }

  protected onAddIdentifier(): void {
    this.model.identifiers.push(new Term());
  }

  protected onRemoveIdentifier(index: number): void {
    this.model.identifiers.splice(index, 1);
  }
}
