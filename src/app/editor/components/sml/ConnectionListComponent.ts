import { Component } from '@angular/core';

import { Connection } from '../../../model/sml';
import { ConnectionList } from '../../../model/sml/ConnectionList';
import { ChildMetadata } from '../base/ChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { ConnectionComponent } from './ConnectionComponent';

@Component({
  selector: 'sml-connection-list',
  templateUrl: './ConnectionListComponent.html',
  styleUrls: ['../styles/editor-component.scss']
})
export class ConnectionListComponent extends TypedModelComponent<ConnectionList> {

  constructor() {
    super();
  }

  protected createModel(): ConnectionList {
    return new ConnectionList();
  }

  protected openNewConnectionItem(item: Connection) {
    const config = this.config.getConfigFor('sml:connection');
    this.openNewChild(new ChildMetadata(ConnectionComponent, item, config));
  }

  protected onAddConnection(): void {
    this.model.connections.push(new Connection());
  }

  protected onRemoveConnection(index: number): void {
    this.model.connections.splice(index, 1);
  }
}
