import { AbstractModes } from './AbstractModes';
import { Mode } from './Mode';
import { DisplayName } from '../../common/decorators/DisplayName';

export class ModeChoice extends AbstractModes {
    @DisplayName('Modes')
    modes: Mode[];

    toString() {
        return 'Mode choice';
    }
}
