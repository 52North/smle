import { Component, ComponentResolver, ViewContainerRef } from '@angular/core';
import { AbstractMetadataListComponent } from '../sml/AbstractMetadataListComponent';
import { KeywordList } from '../../../model/sml/KeywordList';
import { CardComponent } from '../basic/CardComponent';
import { StringsComponent } from '../basic/StringsComponent';
import { EditorComponent } from '../base/EditorComponent';
import { TextFieldComponent } from '../basic/TextFieldComponent';

@Component({
  selector: 'swe-keyword-list',
  template: require('./KeywordListComponent.html'),
  styles: [require('../styles/editor-component.scss')]
})
export class KeywordListComponent extends EditorComponent<KeywordList> {
  constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
    super(componentResolver, viewContainerRef);
  }

  protected createModel(): KeywordList {
    return new KeywordList();
  }
}
