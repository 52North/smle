import { Citation } from './Citation';
import { DisplayName } from '../../../decorators/DisplayName';

export class Identifier {
    @DisplayName('Authority')
    authority: Citation;

    @DisplayName('Code')
    code: string;

    toString() {
        return 'Identifier';
    }
}
