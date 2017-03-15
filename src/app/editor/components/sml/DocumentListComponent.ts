import { Component } from '@angular/core';
import { TypedModelComponent, ChildMetadata } from '../base';
import { DocumentList } from '../../../model/sml/DocumentList';
import { OnlineResource } from '../../../model/iso/gmd/OnlineResource';
import { OnlineResourceComponent } from '../iso/gmd/OnlineResourceComponent';

@Component({
    selector: 'sml-document-list',
    template: require('./DocumentListComponent.html'),
    styles: [require('../styles/editor-component.scss')]
})
export class DocumentListComponent extends TypedModelComponent<DocumentList> {

    protected createModel() {
        return new DocumentList();
    }

    public onRemove(index: number): void {
        this.model.documents.splice(index, 1);
    }

    public onAdd() {
        this.model.documents.push(new OnlineResource());
    }

    protected openNewOnlineResourceItem(item: OnlineResource) {
        let metadata = new ChildMetadata(OnlineResourceComponent, item, this.config.getConfigFor('documents'));
        this.openNewChild(metadata);
    }
}
