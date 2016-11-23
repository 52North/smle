import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { KeywordList } from '../../../model/sml/KeywordList';
import { EditorComponent } from '../base/EditorComponent';

@Component({
    selector: 'swe-keyword-list',
    template: require('./KeywordListComponent.html'),
    styles: [require('../styles/editor-component.scss')]
})
export class KeywordListComponent extends EditorComponent<KeywordList> {
    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): KeywordList {
        return new KeywordList();
    }
}
