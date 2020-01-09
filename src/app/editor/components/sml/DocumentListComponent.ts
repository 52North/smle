import { Component } from '@angular/core';
import { OnlineResource, DocumentList } from '@helgoland/sensorml';

import { ChildMetadata } from '../base/ChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { OnlineResourceComponent } from '../iso/gmd/OnlineResourceComponent';

@Component({
    selector: 'sml-document-list',
    templateUrl: './DocumentListComponent.html',
    styleUrls: ['../styles/editor-component.scss']
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
        const metadata = new ChildMetadata(OnlineResourceComponent, item, this.config.getConfigFor('documents'));
        this.openNewChild(metadata);
    }
}
