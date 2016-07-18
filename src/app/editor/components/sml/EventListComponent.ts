import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {CardComponent} from '../basic/CardComponent';
import {ListComponent} from '../basic/ListComponent';
import {AbstractMetadataListComponent} from '../swe/AbstractMetadataListComponent';
import {EventList} from '../../../model/sml/EventList';
import {EventComponent} from './EventComponent';
import {Event} from '../../../model/sml/Event';
import {EditorComponent} from '../base/EditorComponent';
import {ChildMetadata} from '../base/TypedModelComponent';

@Component({
  selector: 'sml-event-list',
  template: require('./EventListComponent.html'),
  styles: [require('../styles/editor-component.scss')],
  directives: [CardComponent, AbstractMetadataListComponent, ListComponent]
})
export class EventListComponent extends EditorComponent<EventList> {
  constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
    super(componentResolver, viewContainerRef);
  }

  protected createModel(): EventList {
    return new EventList();
  }

  private openNewEventItem(item: Event) {
    var metadata = new ChildMetadata(EventComponent, item, this.config.getConfigFor('events'));
    this.openNewChild(metadata);
  }

  private onAddEvent(): void {
    this.model.events.push(new Event());
  }

  private onRemoveEvent(index: number): void {
    this.closeChildWithModel(this.model.events[index]);
    this.model.events.splice(index, 1);
  }
}
