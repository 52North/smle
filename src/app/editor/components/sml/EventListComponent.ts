import { Component } from '@angular/core';
import { Event, EventList } from '@helgoland/sensorml';

import { configuration } from '../../../configuration';
import { VocabularyType } from '../../../services/vocabulary/model';
import { ChildMetadata, ChildMetadataOptions } from '../base/ChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { EventComponent } from './EventComponent';

@Component({
  selector: 'sml-event-list',
  templateUrl: './EventListComponent.html',
  styleUrls: ['../styles/editor-component.scss']
})
export class EventListComponent extends TypedModelComponent<EventList> {

  constructor() {
    super();
  }

  protected createModel(): EventList {
    return new EventList();
  }

  protected openNewEventItem(item: Event) {
    const config = this.config.getConfigFor('sml:events');
    let options: ChildMetadataOptions;
    if (configuration.showHistoryVocabularySelection) {
      options = { vocabularyConfig: { type: VocabularyType.HistoryEvent, navigation: true } };
    }
    this.openNewChild(new ChildMetadata(EventComponent, item, config, options));
  }

  protected onAddEvent(): void {
    this.model.events.push(new Event());
  }

  protected onRemoveEvent(index: number): void {
    this.model.events.splice(index, 1);
  }
}
