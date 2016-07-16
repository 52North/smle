import {AbstractNamedMetadataList} from './AbstractNamedMetadataList';
import {Characteristic} from './Characteristic';
import {DisplayName} from '../../decorators/DisplayName';


export class CharacteristicList extends AbstractNamedMetadataList {
    @DisplayName('Characteristics')
    characteristics: Characteristic[] = [];

    toString() {
        return super.toString('Characteristic list');
    }
}
