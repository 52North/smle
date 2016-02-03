
import {AbstractSWEIdentifiable} from '../swe';
import {CodeWithAuthority} from '../gml';

export class ObservableProperty extends AbstractSWEIdentifiable {
    definition: CodeWithAuthority;
    constructor() {
        super();
    }
}