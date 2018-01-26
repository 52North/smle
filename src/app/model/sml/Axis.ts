import { DisplayName } from '../../common/decorators/DisplayName';

export class Axis {
    @DisplayName('Name')
    name: string;

    @DisplayName('Description')
    description: string;

    toString() {
        if (this.name && this.name.length) {
            return this.name;
        }

        return 'Axis';
    }
}
