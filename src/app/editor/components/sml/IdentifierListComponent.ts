import { Component } from '@angular/core';

import { IdentifierList } from '../../../model/sml/IdentifierList';
import { Term } from '../../../model/sml/Term';
import { ConfigurationService } from '../../../services/ConfigurationService';
import { ChildMetadata } from '../base/ChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { VocabBasedTermComponent } from '../extensions/vocab-based-term/vocab-based-term.component';
import { TermComponent } from './TermComponent';

@Component({
    selector: 'sml-identifier-list',
    templateUrl: './IdentifierListComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class IdentifierListComponent extends TypedModelComponent<IdentifierList> {

    constructor(
        private configuration: ConfigurationService
    ) {
        super();
    }

    protected createModel(): IdentifierList {
        return new IdentifierList();
    }

    protected openNewIdentifierItem(item: Term) {
        const config = this.config.getConfigFor('sml:identifier').getConfigFor('sml:Term');
        this.configuration.getConfig().subscribe(smleConfig => {
            let metadata;
            if (smleConfig.showIdentifierVocabularySelection) {
                metadata = new ChildMetadata<VocabBasedTermComponent>(VocabBasedTermComponent, item, config);
            } else {
                metadata = new ChildMetadata<TermComponent>(TermComponent, item, config);
            }
            this.openNewChild(metadata);
        });
    }

    protected onAddIdentifier(): void {
        this.model.identifiers.push(new Term());
    }

    protected onRemoveIdentifier(index: number): void {
        this.model.identifiers.splice(index, 1);
    }
}
