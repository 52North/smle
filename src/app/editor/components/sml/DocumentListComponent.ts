import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { CardComponent } from '../basic/CardComponent';
import { ListComponent } from '../basic/ListComponent';
import { EditorComponent } from '../base/EditorComponent';
import { ChildMetadata } from '../base/TypedModelComponent';
import { AbstractMetadataListComponent } from './AbstractMetadataListComponent';
import { DocumentList } from '../../../model/sml/DocumentList';
import { OnlineResource } from '../../../model/iso/gmd/OnlineResource';
import { OnlineResourceComponent } from '../iso/gmd/OnlineResourceComponent';

@Component({
  selector: 'sml-document-list',
  template: require('./DocumentListComponent.html'),
  styles: [require('../styles/editor-component.scss')]
})
export class DocumentListComponent extends EditorComponent<DocumentList> {
  constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
    super(componentFactoryResolver, viewContainerRef);
  }

  protected createModel() {
    return new DocumentList();
  }

  public onRemove(index: number): void {
    this.closeChildWithModel(this.model.documents[index]);
    this.model.documents.splice(index, 1);
  }

  public onAdd() {
    this.model.documents.push(new OnlineResource());
  }

  private openNewOnlineResourceItem(item: OnlineResource) {
    var metadata = new ChildMetadata(OnlineResourceComponent, item, this.config.getConfigFor('documents'));
    this.openNewChild(metadata);
  }
}
