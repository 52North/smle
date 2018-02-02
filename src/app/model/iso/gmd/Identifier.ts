import { DisplayName } from '../../../common/decorators/DisplayName';
import { Citation } from './Citation';

export class Identifier {
    @DisplayName('Authority')
    authority: Citation;

    @DisplayName('Code')
    code: string;

    toString() {
        return 'Identifier';
    }
}
