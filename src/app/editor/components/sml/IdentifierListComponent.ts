import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { CardComponent } from '../basic/CardComponent';
import { ListComponent } from '../basic/ListComponent';
import { AbstractMetadataListComponent } from './AbstractMetadataListComponent';
import { Term } from '../../../model/sml/Term';
import { IdentifierList } from '../../../model/sml/IdentifierList';
import { TermComponent } from './TermComponent';
import { EditorComponent } from '../base/EditorComponent';
import { ChildMetadata } from '../base/TypedModelComponent';

@Component({
  selector: 'sml-identifier-list',
  template: require('./IdentifierListComponent.html'),
  styles: [require('../styles/editor-component.scss')]
})
export class IdentifierListComponent extends EditorComponent<IdentifierList> {
  constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
    super(componentFactoryResolver, viewContainerRef);
  }

  protected createModel(): IdentifierList {
    return new IdentifierList();
  }

  private openNewIdentifierItem(item: Term) {
    var metadata = new ChildMetadata(TermComponent, item, this.config.getConfigFor('identifiers'));
    this.openNewChild(metadata);
  }

  private onAddIdentifier(): void {
    this.model.identifiers.push(new Term());
  }

  private onRemoveIdentifier(index: number): void {
    this.closeChildWithModel(this.model.identifiers[index]);
    this.model.identifiers.splice(index, 1);
  }
}
