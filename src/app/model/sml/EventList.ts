import {AbstractMetadataList} from './AbstractMetadataList';
import {Event} from './Event';
import {DisplayName} from '../../decorators/DisplayName';

export class EventList extends AbstractMetadataList {
    @DisplayName('Events')
    events: Event[] = [];

    toString() {
        return 'Event list';
    }
}
