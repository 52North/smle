
import { AbstractMetadataList } from './AbstractMetadataList';
import { Event } from './Event';

export class EventList extends AbstractMetadataList {
  events: Event[] = [];

  toString() {
    return 'Event list';
  }
}
