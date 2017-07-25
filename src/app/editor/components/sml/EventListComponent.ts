import { Component } from '@angular/core';
import { EventList } from '../../../model/sml/EventList';
import { EventComponent } from './EventComponent';
import { Event } from '../../../model/sml/Event';
import { TypedModelComponent, ChildMetadata } from '../base';

@Component({
    selector: 'sml-event-list',
    template: require('./EventListComponent.html'),
    styles: [require('../styles/editor-component.scss')]
})
export class EventListComponent extends TypedModelComponent<EventList> {

    protected createModel(): EventList {
        return new EventList();
    }

    protected openNewEventItem(item: Event) {
        const metadata = new ChildMetadata(EventComponent, item, this.config.getConfigFor('sml:events'));
        this.openNewChild(metadata);
    }

    protected onAddEvent(): void {
        this.model.events.push(new Event());
    }

    protected onRemoveEvent(index: number): void {
        this.model.events.splice(index, 1);
    }
}
