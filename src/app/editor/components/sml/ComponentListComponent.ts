import * as angularCore from '@angular/core';

import { Component, ComponentList } from '../../../model/sml';
import { ChildMetadata } from '../base/ChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { ComponentComponent } from './ComponentComponent';

@angularCore.Component({
  selector: 'sml-component-list',
  templateUrl: './ComponentListComponent.html',
  styleUrls: ['../styles/editor-component.scss']
})
export class ComponentListComponent extends TypedModelComponent<ComponentList> {

  constructor() {
    super();
  }

  protected createModel(): ComponentList {
    return new ComponentList();
  }

  protected openNewComponentItem(item: Component) {
    const config = this.config.getConfigFor('sml:component');
    this.openNewChild(new ChildMetadata(ComponentComponent, item, config));
  }

  protected onAddComponent(): void {
    this.model.components.push(new Component());
  }

  protected onRemoveComponent(index: number): void {
    this.model.components.splice(index, 1);
  }
}
