import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {AbstractMetadataListComponent} from './AbstractMetadataListComponent';
import {KeywordList} from '../../../model/sml/KeywordList';
import {AbstractComponent} from '../AbstractComponent';

@Component({
    selector: 'keyword-list',
    template: require('./KeywordListComponent.html'),
    directives: [AbstractMetadataListComponent]
})
export class KeywordListComponent extends AbstractComponent<KeywordList> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): KeywordList {
        return new KeywordList();
    }
}
