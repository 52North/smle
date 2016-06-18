import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {AbstractMetadataListComponent} from './AbstractMetadataListComponent';
import {KeywordList} from '../../../model/sml/KeywordList';
import {CardComponent} from '../basic/CardComponent';
import {StringsComponent} from '../basic/StringsComponent';
import {EditorComponent} from '../base/EditorComponent';

@Component({
    selector: 'swe-keyword-list',
    template: require('./KeywordListComponent.html'),
    host: {'[class.has-child]': 'hasChild'},
    styles: [require('../styles/editor-component.scss')],
    directives: [AbstractMetadataListComponent, CardComponent, StringsComponent]
})
export class KeywordListComponent extends EditorComponent<KeywordList> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): KeywordList {
        return new KeywordList();
    }
}
