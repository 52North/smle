import { AbstractNamedMetadataList } from './AbstractNamedMetadataList';
import { Characteristic } from './Characteristic';
import { DisplayName } from '../../common/decorators/DisplayName';


export class CharacteristicList extends AbstractNamedMetadataList {
    @DisplayName('Characteristics')
    characteristics: Characteristic[] = [];

    toString() {
        return super.toString('Characteristic list');
    }

    getLabel() {
        return super.toString('Characteristic list');
    }

    getValue() {
        if (this.characteristics.length > 0) {
            return this.characteristics.join(', ');
        }
    }
}
