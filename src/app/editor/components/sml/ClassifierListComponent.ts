import { Component } from '@angular/core';

import { configuration } from '../../../configuration';
import { ClassifierList } from '../../../model/sml/ClassifierList';
import { Term } from '../../../model/sml/Term';
import { VocabularyType } from '../../../services/vocabulary/model';
import { ChildMetadata, ChildMetadataOptions } from '../base/ChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { TermComponent } from './TermComponent';

@Component({
  selector: 'sml-classifier-list',
  templateUrl: './ClassifierListComponent.html',
  styleUrls: ['../styles/editor-component.scss']
})
export class ClassifierListComponent extends TypedModelComponent<ClassifierList> {

  constructor() {
    super();
  }

  protected createModel(): ClassifierList {
    return new ClassifierList();
  }

  protected openNewClassifierItem(item: Term) {
    const config = this.config.getConfigFor('sml:classifier').getConfigFor('sml:Term');
    let options: ChildMetadataOptions;
    if (configuration.showClassifierVocabularySelection) {
      options = { vocabularyConfig: { type: VocabularyType.Classifier, navigation: true } };
    }
    this.openNewChild(new ChildMetadata(TermComponent, item, config, options));
  }

  protected onAddClassifier(): void {
    this.model.classifiers.push(new Term());
  }

  protected onRemoveClassifier(index: number): void {
    this.model.classifiers.splice(index, 1);
  }
}
