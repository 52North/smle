import { Component } from '@angular/core';

import { Event } from '../../../model/sml/Event';
import { EventList } from '../../../model/sml/EventList';
import { ConfigurationService } from '../../../services/ConfigurationService';
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

  constructor(
    private configuration: ConfigurationService
  ) {
    super();
  }

  protected createModel(): EventList {
    return new EventList();
  }

  protected openNewEventItem(item: Event) {
    const config = this.config.getConfigFor('sml:events');
    this.configuration.getConfig().subscribe(smleConfig => {
      let options: ChildMetadataOptions;
      if (smleConfig.showHistoryVocabularySelection) {
        options = { vocabularyType: VocabularyType.HistoryEvent };
      }
      this.openNewChild(new ChildMetadata(EventComponent, item, config, options));
    });
  }

  protected onAddEvent(): void {
    this.model.events.push(new Event());
  }

  protected onRemoveEvent(index: number): void {
    this.model.events.splice(index, 1);
  }
}
