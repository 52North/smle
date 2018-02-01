import { Component } from '@angular/core';

import { ClassifierList } from '../../../model/sml/ClassifierList';
import { Term } from '../../../model/sml/Term';
import { ConfigurationService } from '../../../services/ConfigurationService';
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

    constructor(
        private configuration: ConfigurationService
    ) {
        super();
    }

    protected createModel(): ClassifierList {
        return new ClassifierList();
    }

    protected openNewClassifierItem(item: Term) {
        const config = this.config.getConfigFor('sml:classifier').getConfigFor('sml:Term');
        this.configuration.getConfig().subscribe(smleConfig => {
            let options: ChildMetadataOptions;
            if (smleConfig.showClassifierVocabularySelection) {
                options = { vocabType: VocabularyType.Classifier };
            }
            this.openNewChild(new ChildMetadata<TermComponent>(TermComponent, item, config, options));
        });
    }

    protected onAddClassifier(): void {
        this.model.classifiers.push(new Term());
    }

    protected onRemoveClassifier(index: number): void {
        this.model.classifiers.splice(index, 1);
    }
}
