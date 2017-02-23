import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { EventList } from '../../../model/sml/EventList';
import { EventComponent } from './EventComponent';
import { Event } from '../../../model/sml/Event';
import { EditorComponent, ChildMetadata } from '../base';

@Component({
    selector: 'sml-event-list',
    template: require('./EventListComponent.html'),
    styles: [require('../styles/editor-component.scss')]
})
export class EventListComponent extends EditorComponent<EventList> {
    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): EventList {
        return new EventList();
    }

    protected openNewEventItem(item: Event) {
        let metadata = new ChildMetadata(EventComponent, item, this.config.getConfigFor('sml:events'));
        this.openNewChild(metadata);
    }

    protected onAddEvent(): void {
        this.model.events.push(new Event());
    }

    protected onRemoveEvent(index: number): void {
        this.closeChildWithModel(this.model.events[index]);
        this.model.events.splice(index, 1);
    }
}
